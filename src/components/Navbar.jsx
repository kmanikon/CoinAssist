/*
  navigation bar on left of screen
  link to home, cryptocurrencies, news, about
*/

import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons';

// my logo
import icon from '../images/coin_assist_no_bg_logo.png';


const Navbar = () => {

  // state for mobile-specifc navbar
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  // set navbar to mobile-specifc depending on setActive Menu
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // determine if we are on mobile
  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);


  // return navbar with links + icons from antd
  // "3 lines" link to normal navbar if on mobile
  return (
    <div className="nav-container">
        <div className="logo-container">
            <Avatar src={icon} size="large"/>
            <Typography.Title level={2} className="logo">
                <Link to="/">Coin Assist</Link>
            </Typography.Title>
            <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                <MenuOutlined/>
            </Button>
        </div>
        {activeMenu && ( 
            <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
                <Link to="/news">News</Link>
            </Menu.Item>
            <Menu.Item icon={<InfoCircleOutlined />}>
                <Link to="/About">About</Link>
            </Menu.Item>

        </Menu>
        )}
    </div>
  )
}

export default Navbar