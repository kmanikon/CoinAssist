/*
  return homepage element
  navbar on left

  general market states
  simplified cryptocurrencies element
  simplified news element
*/

import React from 'react'
import millify from 'millify';
import {Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptosApi';
import { Cryptocurrencies, News } from '../components';


const { Title } = Typography;


/*
  no input, return homepage with general stats, cryptocurrencies, news

  general stats
    - row -> cols

  simplified cryptocurrencies
    - limit to 10 coins
    - link to crypto details with coinID input

  simplified news (limit to 6)
    - limit to 6 articles
  
*/

const Homepage = () => {

  // fetch stats about all coins + market
  const { data, isFetching } = useGetCryptosQuery(10);

  // filter stats about market
  const globalStats = data?.data?.stats;

  // loading while fetching
  if (isFetching) return 'Loading...';

  // global stats = title + row -> col (millify)

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.totalCoins}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the World</Title>
        <Title level={2} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified={true}/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={2} className="show-more"><Link to="/news">Show More</Link></Title>
      </div>
      <News simplified={true}/>
    </>
  )
}

export default Homepage