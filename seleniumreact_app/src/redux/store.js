import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

// Redusers
import authReduser from "./redusers/authReduser";
import seleniumReduser from "./redusers/seleniumReduser";
import settingsReduser from "./redusers/settingsReduser"

const rootReducer = combineReducers({
  auth: authReduser,
  selenium: seleniumReduser,
  settings: settingsReduser
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;