import { getProductsReducers } from "./Productreducers";

import {combineReducers} from "redux";

const rootreducers = combineReducers({
    getProductsdata : getProductsReducers
});

export default rootreducers;