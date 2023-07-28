import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./appReducer";

let reducers = combineReducers({
  app: appReducer,

});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export type AppReducerType = ReturnType<typeof reducers>
// @ts-ignore
window.store = store;

export default store;


