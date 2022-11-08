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
      <div className="home-heading-container">
        <Title level={2} className="home-title">Currency Overview</Title>
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