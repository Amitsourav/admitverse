#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(`${colors.cyan}========================================${colors.reset}`);
console.log(`${colors.cyan}   AdmitVerse Requirements Checker      ${colors.reset}`);
console.log(`${colors.cyan}========================================${colors.reset}\n`);

// Load requirements
const requirementsPath = path.join(__dirname, '..', 'requirements.json');
const requirements = JSON.parse(fs.readFileSync(requirementsPath, 'utf8'));

let hasErrors = false;
let hasWarnings = false;

// Helper functions
function checkCommand(command) {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function getVersion(command, versionFlag = '--version') {
  try {
    const output = execSync(`${command} ${versionFlag}`, { encoding: 'utf8' });
    return output.trim();
  } catch {
    return null;
  }
}

function compareVersions(current, required) {
  const currentParts = current.split('.').map(Number);
  const requiredParts = required.split('.').map(Number);
  
  for (let i = 0; i < Math.max(currentParts.length, requiredParts.length); i++) {
    const currentPart = currentParts[i] || 0;
    const requiredPart = requiredParts[i] || 0;
    
    if (currentPart > requiredPart) return 1;
    if (currentPart < requiredPart) return -1;
  }
  
  return 0;
}

function extractVersion(versionString) {
  const match = versionString.match(/(\d+\.\d+\.\d+)/);
  return match ? match[1] : null;
}

// Check Node.js
console.log(`${colors.blue}Checking Node.js...${colors.reset}`);
if (checkCommand('node')) {
  const nodeVersion = getVersion('node', '-v');
  const cleanVersion = nodeVersion ? nodeVersion.replace('v', '') : null;
  
  if (cleanVersion && compareVersions(cleanVersion, requirements.system.node.minimum) >= 0) {
    console.log(`${colors.green}✓ Node.js ${cleanVersion} (minimum: ${requirements.system.node.minimum})${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Node.js version ${cleanVersion} is below minimum ${requirements.system.node.minimum}${colors.reset}`);
    hasErrors = true;
  }
} else {
  console.log(`${colors.red}✗ Node.js is not installed${colors.reset}`);
  hasErrors = true;
}

// Check npm
console.log(`\n${colors.blue}Checking npm...${colors.reset}`);
if (checkCommand('npm')) {
  const npmVersion = getVersion('npm', '-v');
  
  if (npmVersion && compareVersions(npmVersion, requirements.system.npm.minimum) >= 0) {
    console.log(`${colors.green}✓ npm ${npmVersion} (minimum: ${requirements.system.npm.minimum})${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ npm version ${npmVersion} is below minimum ${requirements.system.npm.minimum}${colors.reset}`);
    hasErrors = true;
  }
} else {
  console.log(`${colors.red}✗ npm is not installed${colors.reset}`);
  hasErrors = true;
}

// Check PostgreSQL
console.log(`\n${colors.blue}Checking PostgreSQL...${colors.reset}`);
if (checkCommand('psql')) {
  const psqlVersion = getVersion('psql', '--version');
  const cleanVersion = psqlVersion ? extractVersion(psqlVersion) : null;
  
  if (cleanVersion) {
    console.log(`${colors.green}✓ PostgreSQL ${cleanVersion} found${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠ PostgreSQL found but version couldn't be determined${colors.reset}`);
    hasWarnings = true;
  }
} else {
  console.log(`${colors.yellow}⚠ PostgreSQL client not found in PATH${colors.reset}`);
  console.log(`  ${colors.yellow}Make sure PostgreSQL is installed and running${colors.reset}`);
  hasWarnings = true;
}

// Check if PostgreSQL is running (macOS/Linux)
console.log(`\n${colors.blue}Checking PostgreSQL service...${colors.reset}`);
try {
  // Try to connect to PostgreSQL
  execSync('pg_isready -h localhost -p 5432', { stdio: 'ignore' });
  console.log(`${colors.green}✓ PostgreSQL is running on port 5432${colors.reset}`);
} catch {
  console.log(`${colors.red}✗ PostgreSQL is not running or not accessible on port 5432${colors.reset}`);
  console.log(`  ${colors.yellow}Start PostgreSQL before running the application${colors.reset}`);
  hasErrors = true;
}

// Check environment file
console.log(`\n${colors.blue}Checking environment configuration...${colors.reset}`);
const envPath = path.join(__dirname, '..', 'apps', 'web', '.env.local');
if (fs.existsSync(envPath)) {
  console.log(`${colors.green}✓ Environment file found (.env.local)${colors.reset}`);
  
  // Check required environment variables
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key.trim()] = value.trim();
    }
    return acc;
  }, {});
  
  requirements.environment.required.forEach(envVar => {
    if (envVars[envVar.name]) {
      console.log(`  ${colors.green}✓ ${envVar.name} is set${colors.reset}`);
    } else {
      console.log(`  ${colors.red}✗ ${envVar.name} is missing${colors.reset}`);
      hasErrors = true;
    }
  });
} else {
  console.log(`${colors.red}✗ Environment file not found${colors.reset}`);
  console.log(`  ${colors.yellow}Copy .env.example to .env.local and configure it${colors.reset}`);
  hasErrors = true;
}

// Check node_modules
console.log(`\n${colors.blue}Checking dependencies...${colors.reset}`);
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
const webNodeModulesPath = path.join(__dirname, '..', 'apps', 'web', 'node_modules');

if (fs.existsSync(nodeModulesPath)) {
  console.log(`${colors.green}✓ Root dependencies installed${colors.reset}`);
} else {
  console.log(`${colors.red}✗ Root dependencies not installed${colors.reset}`);
  console.log(`  ${colors.yellow}Run: npm install${colors.reset}`);
  hasErrors = true;
}

if (fs.existsSync(webNodeModulesPath)) {
  console.log(`${colors.green}✓ Web app dependencies installed${colors.reset}`);
} else {
  console.log(`${colors.yellow}⚠ Web app dependencies may need installation${colors.reset}`);
  hasWarnings = true;
}

// Check Prisma
console.log(`\n${colors.blue}Checking Prisma...${colors.reset}`);
const prismaClientPath = path.join(__dirname, '..', 'apps', 'web', 'node_modules', '.prisma', 'client');
if (fs.existsSync(prismaClientPath)) {
  console.log(`${colors.green}✓ Prisma client generated${colors.reset}`);
} else {
  console.log(`${colors.yellow}⚠ Prisma client not generated${colors.reset}`);
  console.log(`  ${colors.yellow}Run: cd apps/web && npx prisma generate${colors.reset}`);
  hasWarnings = true;
}

// Summary
console.log(`\n${colors.cyan}========================================${colors.reset}`);
if (!hasErrors && !hasWarnings) {
  console.log(`${colors.green}✓ All requirements satisfied!${colors.reset}`);
  console.log(`${colors.green}  You can run: npm run dev${colors.reset}`);
  process.exit(0);
} else if (hasErrors) {
  console.log(`${colors.red}✗ Some requirements are not met${colors.reset}`);
  console.log(`${colors.red}  Please fix the errors above before running the application${colors.reset}`);
  process.exit(1);
} else {
  console.log(`${colors.yellow}⚠ Some warnings detected${colors.reset}`);
  console.log(`${colors.yellow}  The application may run but some features might not work${colors.reset}`);
  process.exit(0);
}