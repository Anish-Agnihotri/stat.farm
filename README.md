<p align="center">
    <img src="https://i.imgur.com/ahmwq3S.png" alt="Stat.Farm Github Header">
</p>

# Stat.Farm
Stat.Farm is a simple [Compound Finance](https://compound.finance) dashboard and COMP governance token distribution calculator built with NextJS + Node.JS serverless funtions. It pulls data from a collection of API's (listed below) and presents the information in a simple mobile-responsive grid.

**API's consumed:**

* [Shrimpy](https://dev-api.shrimpy.io/) for COMP/USD pair Coinbase Pro candlestick data.
* [Compound Finance](https://api.compound.finance) for COMP holder, governance proposal, market, and historic market data.
* [CoinGecko](https://api.coingecko.com/api/v3/) for general COMP token information, ETH price, and exchange volume data.

Stat.Farm is deployed to [Vercel](https://vercel.com). 

Stat.Farm has no affiliation with StateFarm. Just a fun play on words.

# Run locally
```
# If using yarn
yarn && yarn dev

# If using npm
npm install && npm run dev
```
# Contributions

I built this out over about a day, so that I wouldn't have to use Excel to calculate COMP yield. I'll potentially come back to this in the future and add in more functionality (like governance proposal vote charting, etc.).

If there's a feature that would improve your COMP-observing quality of life, I'm open to PRs, or [message me on Twitter](https://twitter.com/_anishagnihotri) and I'll add the feature.