import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Import redux-thunk

import adminReducer from './Admin/AdminLoginSlice';
import productReducer from './Admin/ProductsSlice';
import sliderReducer from './Admin/SliderSlice';
import bannerReducer from './Admin/bannerSlice';
import videoReducer from './Admin/videoSlice';
import singleFormReducer from './User/SingleFormSlice';
import enquiryFormReducer from './User/EnquirySlice';
import feedbackFormReducer from './User/FeedBackSlice';



const store = configureStore({
  reducer: {
    admin: adminReducer,
    products: productReducer,
    slider: sliderReducer,
    banner: bannerReducer,
    video: videoReducer,
    form: singleFormReducer,
    enquiry: enquiryFormReducer,
    feedback: feedbackFormReducer,


  },
});

export default store;
// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Use local storage

// import adminReducer from './Admin/AdminLoginSlice';
// import productReducer from './Admin/ProductsSlice';
// import sliderReducer from './Admin/SliderSlice';
// import bannerReducer from './Admin/bannerSlice';
// import videoReducer from './Admin/videoSlice';



// const persistConfig = {
//   key: 'root', // Root key for persisting the entire store
//   storage,
//   // Optionally, you can whitelist specific reducers to be persisted
//   whitelist: ['slider'],
// };

// const persistedReducer = persistReducer(persistConfig, combineReducers({
//   admin: adminReducer,
//   products: productReducer,
//   slider: sliderReducer,
//   banner:bannerReducer,
//   video:videoReducer,

// }));

// const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);

// export default store;
