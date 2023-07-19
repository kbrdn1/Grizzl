# Grizzl 🐻

Grizzl is a simple project to learn how to use React and Node.

## Description 📝

This application is a Twitter like application. You can create an account, post and comment on posts.

## Tech stack 🛠️

### Frontend

- Vite ⚡
- React ⚛️
- TailwindCSS + DaisyUI 🍃
- Iconoir 😎
- React Router 🛣️
- MobX 🧬
- ESLint 🧹

### Backend

- Node
- Express 🚂
- Cors 🌐
- Mongoose 🍃
- JWT 🍪
- Bcrypt 🔒

### Common

- Prettier 🧼

## Installation 📥

### Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

### Frontend

```bash
cd app
pnpm install
# or
npm install
```

### Backend

```bash
pnpm install
# or
npm install
```

In the `app` folder, rename the `.env.example` file to `.env` and fill it with your own values.

```env
VITE_API_URL=http://localhost:<backend-port>
```

In the `root` folder, rename the `.env.example` file to `.env` and fill it with your own values.

```env
PORT=<port>
MONGODB_URI=<your_mongodb_uri>
MONGODB_USER=<your_mongodb_user>
MONGODB_PASS=<your_mongodb_pass>
JWT_SECRET=<jwt_secret>
SALT_ROUNDS=<salt_rounds>
APP_URL=<app_url>
```

## Getting started 🏁

### Frontend

```bash
cd app
pnpm dev
```

and go to http://localhost:5173

### Backend

```bash
pnpm dev
```

and go to http://localhost:3000

## Postman 🟠

You can find the Postman collection in the `api/postman` folder.