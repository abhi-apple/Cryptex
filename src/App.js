import React, { Fragment } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Exchanges,
  Homepage,
  CryptoDetails,
  Cryptocurrncies,
  News,
} from "./components";
import "./App.css";
import 'antd/dist/antd.min.css'

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <>
              <Routes>
                <Route exact  path="/" element={<Homepage />} />
                <Route exact  path="/news" element={<News />} />
                <Route  exact path="/navbar" element={<Navbar />} />
                <Route  exact path="/exchanges" element={<Exchanges />} />
                <Route  exact path="/crypto/:coinId" element={<CryptoDetails />} />
                <Route  exact path="/cryptocurrncies" element={<Cryptocurrncies />} />
              </Routes>
            </>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptoverse <br />@ All rights Reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home </Link>
            <Link to="/news">News </Link>
            <Link to="/exchanges">Exchanges </Link>
            <Link to="/cryptocurrncies">Cryptocurrncies </Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
