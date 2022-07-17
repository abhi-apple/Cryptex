import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";

import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import { useGetCryptoDetailsQuery  ,useGetCryptoexchnageQuery,useGetCryptoHistoryQuery} from "../services/cryptoApi";

import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;
var dates;

const CryptoDetails = () => {
  const { coinId } = useParams();
  // const coinId='Qwsogvtv82FCd'
  const [timePeriod, settimePeriod] = useState("24h");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data : coinHistory} = useGetCryptoHistoryQuery({coinId,timePeriod});
  const {data: coinex}=useGetCryptoexchnageQuery({coinId,timePeriod});
  const cryptoDetails = data?.data?.coin;
  console.log(coinex?.data)

  // const [dates, setdates] = useState(0)

  // console.log(data);
  // console.log({coinId})
  if(isFetching) return "Loading.....";

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  // console.log(data?.data?.coin);
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.) at",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </Title>
        <p>
          {data?.data?.coin.name} live Price in US dollars view value Statistics
          , market cap and supply
        </p>
        <Select
          defaultValue="24h"
          className="select-timeperiod"
          placeholder="select Time Period"
          onChange={(value) => settimePeriod(value)}
        >
          {time.map((timestamp) => (
            <Option key={timestamp}>{timestamp}</Option>
          ))}
        </Select>
        <LineChart coinHistory={coinHistory} currentPrice={millify(data?.data?.coin.price)}  coinName={data?.data?.coin.name}/>
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details heading">
                {data?.data?.coin.name} Value Statistics{" "}
              </Title>
              <p>
                An Overview showing the statistics of {data?.data?.coin.name}
                ,Such as base and quote currency, the rank, and trading volume.
              </p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value} </Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {" "}
                Other Stats Info
              </Title>
              <p>
                An Overview showing the statistics of {data?.data?.coin.name}{" "}
                ,Such as base and quote currency, the rank, and trading volume.
              </p>
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

        <Col className="coin-dec-link">
          <Row className="coin-des">
            <Title level={3} className="coin-details-heading">
              What is {data?.data?.coin.name} ?
              
            </Title>
            {HTMLReactParser(data?.data?.coin.description)}
          </Row>
          {/* {console.log(data?.data?.coin.description)} */}
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {data?.data?.coin.name} Links
            </Title>
            {data?.data?.coin.links?.map((link) => (
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
    </Col>
  );
};

export default CryptoDetails;
