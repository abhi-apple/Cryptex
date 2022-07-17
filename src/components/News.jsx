import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";

import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptoQuery } from "../services/cryptoApi";
import icon from "../images/demoimage.jpeg";

const { Text, Title } = Typography;

const { Option } = Select;

const demoimage = { icon };

const News = ({ simplified }) => {
  const [newscatg, setnewscatg] = useState("cryptocurrency");
  const { data: cryptonews } = useGetCryptoNewsQuery({
    newscatg,
    count: simplified ? 6 : 12,
  });
  // console.log(cryptonews);

  const { data } = useGetCryptoQuery(100);

  if (!cryptonews?.value) return "Loading ......";
  return (
    <div>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setnewscatg(value)}
              filterOption={(input, option) =>
                option.children.toLoweCase().indexOf(input.toLowerCase())>=0
              }
            >
              <Option value="cryptocurrency"> Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptonews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoimage}
                    alt="news"
                  ></img>
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description}....`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoimage
                      }
                      alt=""
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
