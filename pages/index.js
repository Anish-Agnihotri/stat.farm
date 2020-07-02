import Head from 'next/head'
import Layout from '../components/Layout'
import SmallCard from '../components/SmallCard'
import WideCard from '../components/WideCard'
import MidCard from '../components/MidCard'
import TickerItem from '../components/TickerItem'
import useSWR from 'swr'
import fetch from 'unfetch'

const fetcher = url => fetch(url).then(r => r.json())

export default function Compound() {
  const { data, error } = useSWR('/api/compound', fetcher, { refreshInterval: 2000 });

  if (!data) return (
    <div>
      <Layout>
        <span>Loading...</span>
      </Layout>
    </div>
  )

  return (
    <div className="container">
      <Head>
        <title>StatFarm | Compound</title>
      </Head>
      <Layout>
        <SmallCard name="COMP Price" content={"$" + data.current_price} />
        <SmallCard name="Market Cap" content={"$" + (data.current_price * data.total_supply).toLocaleString()} />
        <SmallCard name="COMP Dispensed" content={data.total_comp_distributed.toLocaleString()} />
        <SmallCard name="24H Volume" content={"$" + data.total_volume.toLocaleString()}/>
        <WideCard name="Token Mining Profitability"/>
        <MidCard name="COMP Markets">
          {data.tickers.map((ticker, i) => {
            return <TickerItem key={i} ticker={ticker} />
          })}
        </MidCard>
        <MidCard name="Largest Holders"/>
        <WideCard name="Profitability calculator"/>
      </Layout>
    </div>
  )
}