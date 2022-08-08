/*
  return element for showing crypto stats from coinranking
  accessible after user clicks on a cyptocurrencies card
*/

import React, { useState } from 'react';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from '../services/cryptosApi';
import { useGetCryptoHistoryQuery } from '../services/cryptosApi';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;


// return chart + other stats from coinranking API

const CryptoDetails = () => {

  // given coin ID from crypto card
  const { coinId } = useParams();

  // state for drag down bar with chart
  const [timePeriod, setTimePeriod] = useState('7d'); // 7 days

  // coinranking API call results (for specific coin)
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  // coinranking API call results with chart data
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

  // data about the specific coin
  const cryptoDetails = data?.data?.coin;

  // 24 hour volume (taken out here since JS is throwing errors)
  const vol = data?.data?.coin["24hVolume"];

  // loading while fetching data 
  if (isFetching) return "Loading...";

  // drop down time options
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  // table with data in left column
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${vol && millify(vol)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  // table with data in right column
  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  /*
    return:
      chart header
      chart
      coin value stats        other stats info
      what is ___ ?           Links
  */

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol.toLowerCase()}) Price
        </Title>
        <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>

      <Select 
        defaultValue="7d" 
        className="select-timeperiod" 
        placeholder="Select Time Period" 
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>

      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        
        </Col>
        
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {cryptoDetails.name}?
            </Title>
            {parse(cryptoDetails.description)}
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
            </Title> 
            {cryptoDetails.links?.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
               <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
          ))}
        </Col>
      </Col>


      
    </Col>
    
  )
}

export default CryptoDetails