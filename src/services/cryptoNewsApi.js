import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewshead={
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': 'ce222f844dmshe102f93562134c4p184e64jsn78b106510366',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'

}

const baseUrl = "https://coinranking1.p.rapidapi.com";


const createRequest = (url) => ({ url, headers: cryptoNewshead });



export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getCryptoNews: builder.query({
        query: ({newscatg,count}) => createRequest(`/news/search?q=${newscatg}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
      }),
    }),
  });
  
  export const { useGetCryptoNewsQuery } = cryptoNewsApi;