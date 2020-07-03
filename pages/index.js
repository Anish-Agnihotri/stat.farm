import Head from 'next/head'
import Layout from '../components/Layout'
import SmallCard from '../components/SmallCard'
import WideCard from '../components/WideCard'
import MidCard from '../components/MidCard'
import TickerItem from '../components/TickerItem'
import AddressItem from '../components/AddressItem'
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
        <p className="data-retrieved"><div className="status-light"></div> Data retrieved in real-time.</p>
        <SmallCard name="COMP Price" content={"$" + data.current_price} />
        <SmallCard name="Market Cap" content={"$" + (data.current_price * data.total_supply).toLocaleString()} />
        <SmallCard name="COMP Dispensed" content={data.total_comp_distributed.toLocaleString()} />
        <SmallCard name="24H Volume" content={"$" + data.total_volume.toLocaleString()}/>
        <WideCard name="Token Mining Profitability"/>
        <MidCard name="COMP Market Volume">
          {data.tickers.map((ticker, i) => {
            return <TickerItem key={i} ticker={ticker} />
          })}
        </MidCard>
        <MidCard name="Adresses by Voting Weight">
          {data.addresses.map((address, i) => {
            return <AddressItem key={i} price={data.current_price} address={address} />
          })}
        </MidCard>
        <WideCard name="Profitability calculator"/>
      </Layout>
      <style jsx>{`
      .data-retrieved {
        display: inline-block;
        width: calc(100% - 50px);
        margin-block-end: 0px;
        background-color: #fff;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #e7eaf3;
        box-shadow: 0 0 35px rgba(127,150,174,.125);
        line-height: 40px;
      }
      .status-light {
        height: 8px;
        width: 8px;
        display: inline-block;
        border-radius: 50%;
        transform: scale(1);
        vertical-align: middle;
        margin-right: 5px;
        margin-top: -2px;
        background-color: rgb(0, 190, 0);
        box-shadow: 0 0 0 0 rgba(0, 190, 0, 1);
        animation: pulsegreen 2s infinite;
      }
      @keyframes pulsegreen {
        0% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(0, 190, 0, 0.7);
        }
      
        70% {
          transform: scale(1);
          box-shadow: 0 0 0 5px rgba(0, 190, 0, 0);
        }
      
        100% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(0, 190, 0, 0);
        }
      }
      `}</style>
    </div>
  )
}