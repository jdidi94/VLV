import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { promiseMiddleware, localStorageMiddleware } from "./middleware";
import reducer from "./reducer";

import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions

const getMiddleware = (his) => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(
      routerMiddleware(his),
      promiseMiddleware,
      localStorageMiddleware
    );
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(
      routerMiddleware(his),
      promiseMiddleware,
      localStorageMiddleware,
      createLogger()
    );
  }
};

export const store = createStore(
  reducer(history),
  composeWithDevTools(getMiddleware(history))
);
