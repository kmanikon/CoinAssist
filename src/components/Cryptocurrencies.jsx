/*
  return tab for cryptocurrencies component (what the user first sees)
    - fetch data from coinranking API
    - display cryptocurrencies + stats as tabs in row element
    - simplified = limit to 10 cards, else 100
*/
import React, { useState, useEffect} from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input} from 'antd';

import { useGetCryptosQuery } from '../services/cryptosApi';


// return currences as cards
const Cryptocurrencies = ( { simplified }) => {

  // number of cards
  const count = simplified ? 10: 100;
  
  // results from coinranking API call
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  // state for what cryptos should be rendered
  const [cryptos, setCryptos] = useState([]);

  // state for serachbar input
  const [searchTerm, setSearchTerm] = useState('');


  // update cards each time user input changes
  useEffect(() => {

    // data filtered by new seach input
    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    // update current cards
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  // loading element until API call is done
  if (isFetching) return 'Loading...';


  // return cards with crypto names + stats
  // simplified = 10 cards, else 100
  return (
    <>
      {!simplified && (

        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>

      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
             <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt=""/>}
                hoverable
              >
                 <p>Price: {millify(currency.price)}</p> 
                 <p>Market Cap: {millify(currency.marketCap)}</p> 
                 <p>Daily Change: {millify(currency.change)}%</p> 

              </Card>
            </Link>

          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
