import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoapiheaders = {
  "X-RapidAPI-Key": "ce222f844dmshe102f93562134c4p184e64jsn78b106510366",
  // "X-RapidAPI-Key": "f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoapiheaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl:'https://coinranking1.p.rapidapi.com' }),
  endpoints: (builder) => ({
    getCrypto: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    getCryptoDetails:builder.query({
      query:(coinId)=>createRequest(`/coin/${coinId}`)
    }),
    getCryptoHistory:builder.query({
      query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
    getCryptoexchnage:builder.query({
      query: ({ coinId,timePeriod }) => createRequest(`coin/${coinId}/exchanges?orderDirection=${timePeriod}`),
    })
  }),
});

export const { useGetCryptoQuery,useGetCryptoexchnageQuery ,useGetCryptoDetailsQuery ,useGetCryptoHistoryQuery} = cryptoApi;