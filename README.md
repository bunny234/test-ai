# Full-Stack Trading Platform

This is a monorepo project for a full-stack trading platform. The frontend is built with React and the backend is built with NestJS.

## Project Structure

The project is organized as a monorepo with the following structure:

- `apps/frontend`: The React frontend application.
- `apps/backend`: The NestJS backend application.

## Getting Started

To get started with this project, you'll need to have Node.js and npm installed.

### Backend

To start the backend server, run the following commands:

```bash
cd apps/backend
npm install
npm run start:dev
```

### Frontend

To start the frontend development server, run the following commands:

```bash
cd apps/frontend
npm install
npm run dev
```

## Linting and Formatting

This project uses ESLint for linting and Prettier for formatting. To run the linters, use the `lint` script in the respective `package.json` files.