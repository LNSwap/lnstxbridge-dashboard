# LN - STX Bridge Admin Dashboard

* This frontend app displays data from an [lnstxbridge](https://github.com/pseudozach/lnstxbridge) or [lnstxbridge-client](https://github.com/pseudozach/lnstxbridge-client) instance.
* Allows manual rebalancing of bridge funds via [OKCoin API](https://www.okcoin.com/docs/en/#README).

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpseudozach%2Flnstxbridge-dashboard&env=NEXT_PUBLIC_BACKEND_URL&envDescription=URL%20of%20LN-STX%20Bridge%20Backend)  

* Host your own admin dashboard for your lnstxbridge instance.
* You will need your backend URL and username/password from your provider client config.  
```
providerUrl="http://<server IP>:9008" -> set as NEXT_PUBLIC_BACKEND_URL
[dashboard]  
username = "admin" -> Use these to login
password = "xxx" -> Use these to login
```  

### Development - Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/reverseSwap.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
