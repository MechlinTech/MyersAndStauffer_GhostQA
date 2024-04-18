import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

// Redusers
import authReduser from "./redusers/authReduser";
import seleniumReduser from "./redusers/seleniumReduser";
import settingsReduser from "./redusers/settingsReduser";
import resultReduser from "./redusers/ResultReduser";
import performanceReducer from "./redusers/performanceReducer";
import locationReducer from "./redusers/locationReducer";
import testdataReducer from "./redusers/testDataReducer";

const rootReducer = combineReducers({
  auth: authReduser,
  selenium: seleniumReduser,
  settings: settingsReduser,
  result: resultReduser,
  performance:performanceReducer,
  location:locationReducer,
  testData:testdataReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;