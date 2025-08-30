# AdmitVerse Setup Guide

This guide will help you set up and run the AdmitVerse application on your local machine.

## Prerequisites

Before running AdmitVerse, ensure you have the following installed:

- **Node.js** (v18.17.0 or higher)
- **npm** (v9.0.0 or higher)
- **PostgreSQL** (v13.0 or higher)

## Quick Setup

We've created automated scripts to make setup easy:

### 1. First-time Setup

Run the complete setup script:

```bash
npm run setup
```

This will:
- Check all requirements
- Install dependencies
- Set up environment files
- Generate Prisma client
- Create database (if PostgreSQL is running)
- Build the application

### 2. Check Requirements Only

To verify your system meets all requirements:

```bash
npm run check
```

### 3. Run the Application

After setup, start the development server:

```bash
npm run dev
```

The application will automatically check requirements before starting.

## Manual Setup (Alternative)

If you prefer manual setup:

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install web app dependencies
cd apps/web
npm install
cd ../..
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local` with your configuration:

```env
DATABASE_URL=postgresql://localhost:5432/admitverse
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up Database

Make sure PostgreSQL is running, then:

```bash
# Create database
createdb admitverse

# Generate Prisma client
cd apps/web
npx prisma generate

# Push database schema
npx prisma db push
```

### 4. Run the Application

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server (with pre-run checks)
- `npm run dev:safe` - Start without checks (use if checks are failing)
- `npm run build` - Build for production
- `npm run setup` - Run complete setup
- `npm run check` - Check requirements only

## Accessing the Application

Once running, you can access:

- **Main Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

### Default Admin Credentials

- Username: `admin`
- Password: `admin123456`

## Troubleshooting

### PostgreSQL Not Running

If you see "PostgreSQL is not running", start it:

**macOS:**
```bash
brew services start postgresql
```

**Linux:**
```bash
sudo systemctl start postgresql
```

**Windows:**
Start PostgreSQL from Services or use pg_ctl.

### Dependencies Not Installing

If you encounter npm workspace errors, try:

```bash
cd apps/web
npm install
cd ../..
```

### Port 3000 Already in Use

Kill the process using port 3000:

```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Failed

1. Ensure PostgreSQL is running
2. Check DATABASE_URL in `.env.local`
3. Create the database: `createdb admitverse`

## Requirements File

The `requirements.json` file contains detailed information about:
- System requirements (Node.js, npm, PostgreSQL)
- Required and optional services
- Environment variables
- Dependencies
- Port configurations

Run `npm run check` to verify all requirements are met.

## Development Workflow

1. Always run `npm run check` before starting development
2. Use `npm run dev` to start with automatic checks
3. If checks fail, run `npm run setup` to fix issues
4. For production builds, use `npm run build`

## Need Help?

If you encounter issues:
1. Run `npm run check` to diagnose problems
2. Check the troubleshooting section above
3. Ensure all prerequisites are installed
4. Verify PostgreSQL is running and accessible