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
import propertyReducer from "./redusers/propertyReducer";
import testcaseReducer from "./redusers/TestCase/testcaseReducer";
import testlabReduer from "./redusers/testlabReducer";
import userReducer from "./redusers/userReducer";

const rootReducer = combineReducers({
  auth: authReduser,
  selenium: seleniumReduser,
  settings: settingsReduser,
  result: resultReduser,
  performance:performanceReducer,
  location:locationReducer,
  testData:testdataReducer,
  property:propertyReducer,
  testcase:testcaseReducer,
  testlab:testlabReduer,
  user:userReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;