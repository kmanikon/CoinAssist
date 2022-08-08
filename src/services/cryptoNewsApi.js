/*
    unused file for this project
    ran into problems with redux, so I'm calling bing search from News.jsx from a class
*/


/*

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'e522d44591msh8f67deca2799f3ap1ae6a8jsnc8660dd82fed',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news';

const createNewsRequest = (url) => ({ url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducer: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({

        getCryptoNews: builder.query({
            query: ( {newsCategory, count} ) => createNewsRequest(`/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

*/