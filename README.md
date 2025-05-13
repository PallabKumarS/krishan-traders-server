# Krishan Traders Server

A robust backend server for Krishan Traders, a stock management system that
helps track and manage inventory, sales, and records.

## Features

- Stock Management
- Sales Tracking
- User Authentication & Authorization
- Record Keeping
- Real-time Stock Updates
- Role-based Access Control

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod (for validation)
- JWT Authentication
- Error Handling Middleware

## API Routes

### Auth Routes

- POST `/api/v1/auth/login` - User login
- POST `/api/v1/auth/register` - User registration

### Stock Routes

- GET `/api/v1/stocks` - Get all stocks
- POST `/api/v1/stocks` - Add new stock
- GET `/api/v1/stocks/:id` - Get single stock
- PATCH `/api/v1/stocks/:id` - Update stock
- DELETE `/api/v1/stocks/:id` - Delete stock

### Record Routes

- GET `/api/v1/records` - Get all records
- POST `/api/v1/records/add-stock` - Add stock record
- POST `/api/v1/records/sell-stock` - Create sell record
- PATCH `/api/v1/records/:id` - Update record status

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb://localhost:27017/krishan-traders
BCRYPT_SALT_ROUNDS=12
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
```

## Related Links

- Client Repository:
  [Krishan Traders Client](https://github.com/pallabKumarS/krishan-traders-client)
- Live Server:
  [https://krishan-traders-server.vercel.app](https://krishan-traders-server.vercel.app)

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```
