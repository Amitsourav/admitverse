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
console.log(`${colors.cyan}   AdmitVerse Setup Script              ${colors.reset}`);
console.log(`${colors.cyan}========================================${colors.reset}\n`);

function runCommand(command, description, cwd = process.cwd()) {
  console.log(`${colors.blue}${description}...${colors.reset}`);
  try {
    execSync(command, { stdio: 'inherit', cwd });
    console.log(`${colors.green}✓ ${description} completed${colors.reset}\n`);
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ ${description} failed${colors.reset}\n`);
    return false;
  }
}

async function setup() {
  const rootDir = path.join(__dirname, '..');
  const webDir = path.join(rootDir, 'apps', 'web');

  // Step 1: Check requirements first
  console.log(`${colors.cyan}Step 1: Checking requirements${colors.reset}`);
  if (!runCommand('node scripts/check-requirements.js', 'Requirements check', rootDir)) {
    console.log(`${colors.red}Please fix the requirements issues before continuing setup${colors.reset}`);
    process.exit(1);
  }

  // Step 2: Install root dependencies
  console.log(`${colors.cyan}Step 2: Installing root dependencies${colors.reset}`);
  runCommand('npm install', 'Root dependencies installation', rootDir);

  // Step 3: Install web app dependencies
  console.log(`${colors.cyan}Step 3: Installing web app dependencies${colors.reset}`);
  runCommand('npm install', 'Web app dependencies installation', webDir);

  // Step 4: Setup environment file if it doesn't exist
  console.log(`${colors.cyan}Step 4: Setting up environment${colors.reset}`);
  const envExamplePath = path.join(webDir, '.env.example');
  const envLocalPath = path.join(webDir, '.env.local');
  
  if (!fs.existsSync(envLocalPath) && fs.existsSync(envExamplePath)) {
    console.log(`${colors.blue}Creating .env.local from .env.example...${colors.reset}`);
    fs.copyFileSync(envExamplePath, envLocalPath);
    console.log(`${colors.green}✓ Environment file created${colors.reset}`);
    console.log(`${colors.yellow}  Please update .env.local with your configuration${colors.reset}\n`);
  } else if (fs.existsSync(envLocalPath)) {
    console.log(`${colors.green}✓ Environment file already exists${colors.reset}\n`);
  }

  // Step 5: Generate Prisma client
  console.log(`${colors.cyan}Step 5: Setting up database${colors.reset}`);
  runCommand('npx prisma generate', 'Prisma client generation', webDir);

  // Step 6: Create database (if PostgreSQL is running)
  console.log(`${colors.blue}Checking database...${colors.reset}`);
  try {
    execSync('pg_isready -h localhost -p 5432', { stdio: 'ignore' });
    
    // Try to create the database
    try {
      execSync('createdb admitverse 2>/dev/null', { stdio: 'ignore' });
      console.log(`${colors.green}✓ Database 'admitverse' created${colors.reset}`);
    } catch {
      console.log(`${colors.yellow}⚠ Database 'admitverse' already exists or couldn't be created${colors.reset}`);
    }

    // Push database schema
    console.log(`${colors.blue}Applying database schema...${colors.reset}`);
    runCommand('npx prisma db push', 'Database schema push', webDir);
  } catch {
    console.log(`${colors.yellow}⚠ PostgreSQL is not running. Skipping database setup${colors.reset}`);
    console.log(`${colors.yellow}  Start PostgreSQL and run: cd apps/web && npx prisma db push${colors.reset}\n`);
  }

  // Step 7: Build the application
  console.log(`${colors.cyan}Step 6: Building application${colors.reset}`);
  runCommand('npm run build', 'Application build', rootDir);

  // Summary
  console.log(`${colors.cyan}========================================${colors.reset}`);
  console.log(`${colors.green}✓ Setup completed successfully!${colors.reset}\n`);
  console.log(`${colors.cyan}Next steps:${colors.reset}`);
  console.log(`1. ${colors.yellow}Make sure PostgreSQL is running${colors.reset}`);
  console.log(`2. ${colors.yellow}Update apps/web/.env.local with your configuration${colors.reset}`);
  console.log(`3. ${colors.green}Run the application: npm run dev${colors.reset}`);
  console.log(`4. ${colors.green}Access the app at: http://localhost:3000${colors.reset}`);
  console.log(`5. ${colors.green}Access admin panel at: http://localhost:3000/admin${colors.reset}`);
  console.log(`\n${colors.cyan}Default admin credentials:${colors.reset}`);
  console.log(`  Username: ${colors.yellow}admin${colors.reset}`);
  console.log(`  Password: ${colors.yellow}admin123456${colors.reset}`);
}

// Run setup
setup().catch(error => {
  console.error(`${colors.red}Setup failed:${colors.reset}`, error);
  process.exit(1);
});