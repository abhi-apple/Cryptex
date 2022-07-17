import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import Chart from "chart.js/auto";
const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const conTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i = i + 1) {
    coinPrice.push(coinHistory.data.history[i].price);
    conTimestamp.push(
      new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()

    );
    // console.log((coinHistory.data.history[i].timestamp))
  }
  var dates=new Date(1658051178);

  // console.log(new Date(coinHistory?.data?.history[189]?.timestamp).toLocaleDateString());
  // console.log(dates.toLocaleDateString());

  const data = {
    labels: conTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "rgba(105, 255, 255, 0.8)",
        // backgroundColor: "rgba(178,,0)",
        borderColor: "rgba(0, 9, 0, 1)"
      },
    ],
  };

  // const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         display:true,
  //         ticks: {
  //           suggestedMin:0,
  //           beginAtZero: true,
  //         },
  //         gridLines: {
  //           color: "blue",
  //         },
  //       },
  //     ],
  //   },
  // };


  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  // console.log(coinHistory.data.history[287])
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {" "}
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {" "}
            {coinHistory?.data?.change}%{" "}
          </Title>
          <Title level={5} className="current-price">
            {" "}
            Current {coinName} Price: ${currentPrice}{" "}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
