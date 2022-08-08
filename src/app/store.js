/* 
  redux store for coinranking API
*/

// not calling this API using redux
//import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { cryptoApi } from '../services/cryptosApi';
import { configureStore } from '@reduxjs/toolkit';


export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,  
    //[cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});

