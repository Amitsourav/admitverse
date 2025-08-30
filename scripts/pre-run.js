#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(`${colors.cyan}Pre-run checks...${colors.reset}`);

// Quick checks before running the app
function quickCheck() {
  const errors = [];
  
  // Check if node_modules exists
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  const webNodeModulesPath = path.join(__dirname, '..', 'apps', 'web', 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath)) {
    errors.push('Root dependencies not installed. Run: npm install');
  }
  
  if (!fs.existsSync(webNodeModulesPath)) {
    errors.push('Web app dependencies not installed. Run: cd apps/web && npm install');
  }
  
  // Check if .env.local or .env exists
  const envLocalPath = path.join(__dirname, '..', 'apps', 'web', '.env.local');
  const envPath = path.join(__dirname, '..', 'apps', 'web', '.env');
  if (!fs.existsSync(envLocalPath) && !fs.existsSync(envPath)) {
    errors.push('Environment file missing. Copy apps/web/.env.example to apps/web/.env.local or apps/web/.env');
  }
  
  // Check if Prisma client is generated
  const prismaClientPath = path.join(__dirname, '..', 'apps', 'web', 'node_modules', '.prisma', 'client');
  if (!fs.existsSync(prismaClientPath)) {
    errors.push('Prisma client not generated. Run: cd apps/web && npx prisma generate');
  }
  
  // Check if PostgreSQL is running (skip for Supabase)
  // Commenting out local PostgreSQL check since we're using Supabase
  // try {
  //   execSync('pg_isready -h localhost -p 5432', { stdio: 'ignore' });
  // } catch {
  //   errors.push('PostgreSQL is not running. Please start PostgreSQL service');
  // }
  
  if (errors.length > 0) {
    console.log(`${colors.red}✗ Pre-run checks failed:${colors.reset}`);
    errors.forEach(error => {
      console.log(`  ${colors.yellow}- ${error}${colors.reset}`);
    });
    console.log(`\n${colors.cyan}Run 'npm run setup' to fix these issues${colors.reset}`);
    process.exit(1);
  }
  
  console.log(`${colors.green}✓ All pre-run checks passed${colors.reset}\n`);
}

// Run the checks
quickCheck();

// If all checks pass, run the actual command
const command = process.argv.slice(2).join(' ');
if (command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    process.exit(error.status || 1);
  }
}