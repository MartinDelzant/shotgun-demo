This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Connecting to the Vercel Postgres

You'll need to have a pre-existing Vercel Postgres SQL connected to your deployed project already.

Once this is done, you should be able to :

```bash
vercel env pull .env.development.local
```

This should allow you to connect your local dev env to the deployed SQL Server.

More info : [https://vercel.com/docs/storage/vercel-postgres/quickstart](https://vercel.com/docs/storage/vercel-postgres/quickstart)
