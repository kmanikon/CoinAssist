/*
    handle coinranking API call with redux
*/

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API url + key info
const baseUrl = 'https://coinranking1.p.rapidapi.com';
const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'e522d44591msh8f67deca2799f3ap1ae6a8jsnc8660dd82fed',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

// do request to server
const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

/* 3 different endpoints
    - getCryptos = general data about all coins + overview of each coin
    - getCryptoDetails = specific data about 1 coin
    - getCryptoHistory = get historical coin price data + timestamps
*/

export const cryptoApi = createApi({
    reducer: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({

        getCryptos: builder.query({
            query: (count) => createRequest(`/coins/?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
        }),

    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;