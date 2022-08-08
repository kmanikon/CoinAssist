/*
  news element
  present cryptocurrencies news tabs from bing search API
*/

import React from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

// not using redux here
//import { useGetCryptosQuery } from '../services/cryptosApi';
//import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const { Text, Title } = Typography;
//const { Option } = Select;

// image if none is available for a news article
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

// API call options
const options = {
  method: 'GET',
  url: 'https://bing-news-search1.p.rapidapi.com/news',
  params: {safeSearch: 'Off', textFormat: 'Raw', newsCategory: 'Cryptocurrency'},
  headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'e522d44591msh8f67deca2799f3ap1ae6a8jsnc8660dd82fed',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }
};


// went with a different approach here (class instead)

// what to search
const newsCategory = 'Cryptocurrency';


class News extends React.Component {

  // states for loading + data
  state = {
    loading: true,
    cryptoNews: null
  };


  // do API call and update state
  async componentDidMount() {

    // number of articles (simplified = 6)
    const count = this.props.simplified ? 6 : 12;

    // do API call
    const url = `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`;
    const response = await fetch(url, options);
    const data = await response.json();
    this.setState({ cryptoNews: data, loading: false });
  }


  render() {

    // loading during call
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    // no data to be found after call
    if (!this.state.cryptoNews) {
      return <div>Error Loading News</div>;
    }

    // on success row -> col 
    // show articles as cards
    
    return (
      
      <Row gutter={[24, 24]}>

        {this.state.cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title style={{ maxWidth: '170px' }} className="news-title" level={4}>{news.name}</Title>
                  <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                </div>
                <p>
                  {news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
      
    )
  
  }

}

export default News