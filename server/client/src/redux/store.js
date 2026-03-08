import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
//import financeReducer from './slices/financeSlice';
//import hrReducer from './slices/hrSlice';
//import manufacturingReducer from './slices/manufacturingSlice';
//import scmReducer from './slices/scmSlice';
//import crmReducer from './slices/crmSlice';
//import salesReducer from './slices/salesSlice';
//import inventoryReducer from './slices/inventorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  //  finance: financeReducer,
   // hr: hrReducer,
    //manufacturing: manufacturingReducer,
    //scm: scmReducer,
    //crm: crmReducer,
    //sales: salesReducer,
    //inventory: inventoryReducer,
  },
});

export default store;