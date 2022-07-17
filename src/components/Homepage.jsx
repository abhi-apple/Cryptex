import React from 'react'
import millify from 'millify'
import { Typography,Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'

import {Cryptocurrncies,News} from '../components'

import { useGetCryptoQuery } from '../services/cryptoApi'
const {Title}=Typography;
const Homepage = () => {

  const {data,isFetching}=useGetCryptoQuery(10);
  const globalstats=data?.data?.stats
  // console.log(data);

  if(isFetching)return 'Loaidng ......';
  return (
    <>
    <Title level={1} className='heading'>
      Global Crypto Stats
    </Title>
    <Row>
      <Col span={12}><Statistic title="TOtal Cryptocurrencies" value={globalstats.total}/></Col>
      <Col span={12}><Statistic title="TOtal Exchanges" value={millify(globalstats.totalExchanges)}/></Col>
      <Col span={12}><Statistic title="TOtal Market Cap" value={millify(globalstats.totalMarketCap)}/></Col>
      <Col span={12}><Statistic title="TOtal 24h Volume " value={millify(globalstats.total24hVolume)}/></Col>
      <Col span={12}><Statistic title="TOtal Markets " value={millify(globalstats.totalMarkets)}/></Col>
    </Row>
    <div className='home-heading-container'>
      <Title level={2} className="home-title">Top 10 CryptoCurrencies in the World </Title>
      <Title level={3} className="show-more"><Link to="/cryptocurrncies" > Show More</Link></Title>
    </div>
    <Cryptocurrncies simplified/>
    <div className='home-heading-container'>
      <Title level={2} className="home-title">Latest Crypto News </Title>
      <Title level={3} className="show-more"><Link to="/news" > Show More</Link></Title>
    </div>
    <News simplified />
    </>
  )
}
 


export default Homepage