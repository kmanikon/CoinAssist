/* 
    handle routing + page layout
*/

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar, Homepage, About, Cryptocurrencies, News, CryptoDetails} from './components';

import './App.css'

/*
    structure:
        navbar, main -> home/about/cryptocurrencies/news, footer
*/

const App = () => {

  return (
    <div className="app">
        <div className="navbar">
            <Navbar />
        </div>
        <div className="main">
            <Layout>
                <div className="routes">
                    <Routes>
                        <Route exact path="/" element={ <Homepage />}/>
                        <Route exact path="/About" element={<About />}/>
                        <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />}/>
                        <Route exact path="/crypto/:coinId" element={<CryptoDetails />}/>
                        <Route exact path="/news" element={<News />}/>
                        <Route
                            path="*"
                            element={
                                <Homepage />
                            }
                        />
                    </Routes>
                </div>
            </Layout>

            <div className="footer">
                <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}> Coin Assist Inc.
                <br />
                </Typography.Title>
                <Space>
                    <Link to="/">Home</Link>
                    <Link to="/About">About</Link>
                    <Link to="/news">News</Link>
                </Space>
            </div>
        </div>
    </div> 
  )
}

export default App