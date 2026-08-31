# Linktree Clone

A Next.js application for creating a shareable profile page with a unique handle, profile image, description, and external links.

## Requirements

- Node.js 20 or newer
- A MongoDB database

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   MONGODB_URI=your-mongodb-connection-string
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Handle and link rules

- Handles use 3-30 lowercase letters, numbers, or underscores.
- Handles are normalized to lowercase and are unique.
- Links and profile image URLs must use `http` or `https`.
- A Linktree can contain up to 20 links; link titles are limited to 80 characters and descriptions to 160 characters.

Create the case-insensitive unique index before deploying:

```bash
npm run ensure-handle-index
```

The API also verifies the `unique_handle` index before reading or writing handles. It applies to records with a string handle, so legacy incomplete records are left untouched. If the database already contains duplicate string handles, remove or rename those duplicates before creating the index.

## Verification

```bash
npm run lint
npm run build
```

## Deployment

Deploy to a Node-compatible Next.js host such as Vercel. Add `MONGODB_URI` to the host's environment variables before deploying. Do not commit `.env` files or database credentials.
