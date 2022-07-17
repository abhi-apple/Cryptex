// import React, { useEffect, useState } from "react";
// import millify from "millify";
// import { Link } from "react-router-dom";
// import { Card, Row, Col, Input } from "antd";
// import { useGetCryptoQuery } from "../services/cryptoApi";
// const Cryptocurrncies = ({ simplified }) => {
//   const count = simplified ? 10 : 100;
//   const { data: cryptolist, isFeteching } = useGetCryptoQuery(count);
//   const [cryptos, setcryptos] = useState([]);
//   const [searchterm, setsearchterm] = useState("");

//   useEffect(() => {
//     const filterdata = cryptolist?.data.coins.filter((item) =>
//       item.name.toLowerCase().includes(searchterm.toLowerCase())
//     );

//     setcryptos(filterdata);
//   }, [cryptolist, searchterm]);
//   // console.log(cryptolist)
//   if (isFeteching) return "Loading.....";
//   return (
//     <>
//       {!simplified && (
//         <div className="search-crypto">
//           <Input
//             placeholder="Search Crypto "
//             onChange={(e) => setsearchterm(e.target.value)}
//           />
//         </div>
//       )}
//       <Row gutter={[32, 32]} className="crypto-card-containers">
//         {cryptos?.map((currency) => (
//           <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
//             <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
//               <Card
//                 title={`${currency.rank}.${currency.name}`}
//                 extra={<img className="crypto-image" src={currency.iconUrl} />}
//                 hoverable
//               >
//                 <p>Price : {millify(currency.price)}</p>
//                 <p>MarketCap : {millify(currency.marketCap)}</p>
//                 <p>Daily Change : {millify(currency.change)}</p>
//               </Card>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };

// export default Cryptocurrncies;


import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptoQuery } from "../services/cryptoApi";


const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptoQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

 

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
