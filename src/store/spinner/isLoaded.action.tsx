import { REQUEST_FINISHED, REQUEST_STARTED } from "./isLoaded.type";


export const requestStart = () => {
    return {
      type: REQUEST_STARTED   };
  };
  export const requestFinish = () => {
    return {
      type: REQUEST_FINISHED   };
  };
