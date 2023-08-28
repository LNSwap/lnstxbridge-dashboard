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

### Optimizations & Requirements

* To avoid error: `System limit for number of file watchers reached`  
>echo fs.inotify.max_user_watches= 131070 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

* if you're running dashboard on a VM, you probably want to set below in your ~/.bashrc replace IP:port with your own providerUrl
> export NEXT_PUBLIC_BACKEND_URL="http://34.132.87.225:9008"  
