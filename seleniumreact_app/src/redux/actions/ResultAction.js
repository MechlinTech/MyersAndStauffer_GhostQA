import axios from "axios";
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
export const RESULT_LIST = "RESULT_LIST";
export const SET_IS_RUNNING = "SET_IS_RUNNING";
export const ADD_EXECUTER_DATA = "ADD_EXECUTER_DATA";
export const SET_EXECUTEJMX_DATA = "SET_EXECUTEJMX_DATA"

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const setIsRunning = (isRunning) => {
  console.log("Setting isRunning to:", isRunning);
  return {
    type: SET_IS_RUNNING,
    payload: isRunning,
  };
};


// export const addExecuterData = (data) => {
//   console.log("Adding executer data:", data);

//   if (data.results && data.results.length > 0) {

//     let totals = {
//       sampleCount: 0,
//       errorCount: 0,
//       errorPct: 0,
//       meanResTime: 0,
//       medianResTime: 0,
//       minResTime: 0,
//       maxResTime: 0,
//       pct1ResTime: 0,
//       pct2ResTime: 0,
//       pct3ResTime: 0,
//       throughput: 0,
//       receivedKBytesPerSec: 0,
//       sentKBytesPerSec: 0
//     };

//     data.results.forEach((item) => {
//       if (item.json && item.json.Total) {
//         const total = item.json.Total;
//         for (let key in totals) {
//           if (typeof total[key] === 'number') {
//             totals[key] += total[key];
//           }
//         }
//       }
//     });

//     // Calculate average
//     // const numArrays = data.results.length;
//     // for (let key in totals) {
//     //   totals[key] /= numArrays;
//     //   // Round to 2 decimal places
//     //   totals[key] = totals[key].toFixed(2);
//     // }

//     // Modify the data before sending it in the payload
//     const modifiedData = data.results.map((item) => {
//       console.log("item", item);

//       // Modify the item as usual
//       const modifiedItem = {
//         ...item,
//         // Check if json is not null before accessing its properties
//         home_page:
//           item.json && item.json.home_page
//             ? {
//               transaction: item.json.home_page.transaction,
//               sample: item.json.home_page.sampleCount,
//               errorCount: item.json.home_page.errorCount,
//               errorPct: item.json.home_page.errorPct,
//               meanResTime: typeof item.json.home_page.meanResTime === 'number' ? item.json.home_page.meanResTime.toFixed(2) : null,
//               medianResTime: typeof item.json.home_page.medianResTime === 'number' ? item.json.home_page.medianResTime.toFixed(2) : null,
//               minResTime: typeof item.json.home_page.minResTime === 'number' ? item.json.home_page.minResTime.toFixed(2) : null,
//               maxResTime: typeof item.json.home_page.maxResTime === 'number' ? item.json.home_page.maxResTime.toFixed(2) : null,
//               pct1ResTime: typeof item.json.home_page.pct1ResTime === 'number' ? item.json.home_page.pct1ResTime.toFixed(2) : null,
//               pct2ResTime: typeof item.json.home_page.pct2ResTime === 'number' ? item.json.home_page.pct2ResTime.toFixed(2) : null,
//               pct3ResTime: typeof item.json.home_page.pct3ResTime === 'number' ? item.json.home_page.pct3ResTime.toFixed(2) : null,
//               throughput: typeof item.json.home_page.throughput === 'number' ? item.json.home_page.throughput.toFixed(2) : null,
//               receivedKBytesPerSec: typeof item.json.home_page.receivedKBytesPerSec === 'number' ? item.json.home_page.receivedKBytesPerSec.toFixed(2) : null,
//               sentKBytesPerSec: typeof item.json.home_page.sentKBytesPerSec === 'number' ? item.json.home_page.sentKBytesPerSec.toFixed(2) : null,
//             }
//             : null,
//         Total:
//           item.json && item.json.Total
//             ? {
//               transaction: item.json.Total.transaction,
//               sample: item.json.Total.sampleCount,
//               errorCount: item.json.Total.errorCount,
//               errorPct: item.json.Total.errorPct,
//               meanResTime: typeof item.json.Total.meanResTime === 'number' ? item.json.Total.meanResTime.toFixed(2) : null,
//               medianResTime: typeof item.json.Total.medianResTime === 'number' ? item.json.Total.medianResTime.toFixed(2) : null,
//               minResTime: typeof item.json.Total.minResTime === 'number' ? item.json.Total.minResTime.toFixed(2) : null,
//               maxResTime: typeof item.json.Total.maxResTime === 'number' ? item.json.Total.maxResTime.toFixed(2) : null,
//               pct1ResTime: typeof item.json.Total.pct1ResTime === 'number' ? item.json.Total.pct1ResTime.toFixed(2) : null,
//               pct2ResTime: typeof item.json.Total.pct2ResTime === 'number' ? item.json.Total.pct2ResTime.toFixed(2) : null,
//               pct3ResTime: typeof item.json.Total.pct3ResTime === 'number' ? item.json.Total.pct3ResTime.toFixed(2) : null,
//               throughput: typeof item.json.Total.throughput === 'number' ? item.json.Total.throughput.toFixed(2) : null,
//               receivedKBytesPerSec: typeof item.json.Total.receivedKBytesPerSec === 'number' ? item.json.Total.receivedKBytesPerSec.toFixed(2) : null,
//               sentKBytesPerSec: typeof item.json.Total.sentKBytesPerSec === 'number' ? item.json.Total.sentKBytesPerSec.toFixed(2) : null,
//               }
//             : null,
//             summary: totals  // Assign the calculated totals as the 'Total' key
//       };

//       // Remove json key if it exists
//       if (modifiedItem.json) delete modifiedItem.json;

//       return modifiedItem;
//     });

//     console.log("modifiedData", modifiedData);
//     return {
//       type: ADD_EXECUTER_DATA,
//       payload: modifiedData,
//     };
//   }
// };

export const addExecuterData = (data) => {
  console.log("Adding executer data:", data);

  if (data.results && data.results.length > 0) {
    let errors = [];
    let successes = [];

    let totals = {
      sampleCount: 0,
      errorCount: 0,
      errorPct: 0,
      meanResTime: 0,
      medianResTime: 0,
      minResTime: 0,
      maxResTime: 0,
      pct1ResTime: 0,
      pct2ResTime: 0,
      pct3ResTime: 0,
      throughput: 0,
      receivedKBytesPerSec: 0,
      sentKBytesPerSec: 0
    };

    data.results.forEach((item) => {
      if (item.json && item.json.Total) {
        const total = item.json.Total;
        for (let key in totals) {
          if (typeof total[key] === 'number') {
            totals[key] += total[key];
          }
        }
      }
      if (item.error_group_data && item.error_group_data.length > 0) {
        errors.push(...item.error_group_data);
      }
      if (item.success_group_data && item.success_group_data.length > 0) {
        successes.push(...item.success_group_data);
      }
    });

    // Calculate average
    // const numArrays = data.results.length;
    // for (let key in totals) {
    //   totals[key] /= numArrays;
    //   // Round to 2 decimal places
    //   totals[key] = totals[key].toFixed(2);
    // }

    // Modify the data before sending it in the payload
    const modifiedData = {
      results: data.results.map((item) => {
        // Modify the item as usual
        const modifiedItem = {
          ...item,
          // Check if json is not null before accessing its properties
          home_page:
            item.json && item.json.home_page
              ? {
                transaction: item.json.home_page.transaction,
                sample: item.json.home_page.sampleCount,
                errorCount: item.json.home_page.errorCount,
                errorPct: item.json.home_page.errorPct,
                meanResTime: typeof item.json.home_page.meanResTime === 'number' ? item.json.home_page.meanResTime.toFixed(2) : null,
                medianResTime: typeof item.json.home_page.medianResTime === 'number' ? item.json.home_page.medianResTime.toFixed(2) : null,
                minResTime: typeof item.json.home_page.minResTime === 'number' ? item.json.home_page.minResTime.toFixed(2) : null,
                maxResTime: typeof item.json.home_page.maxResTime === 'number' ? item.json.home_page.maxResTime.toFixed(2) : null,
                pct1ResTime: typeof item.json.home_page.pct1ResTime === 'number' ? item.json.home_page.pct1ResTime.toFixed(2) : null,
                pct2ResTime: typeof item.json.home_page.pct2ResTime === 'number' ? item.json.home_page.pct2ResTime.toFixed(2) : null,
                pct3ResTime: typeof item.json.home_page.pct3ResTime === 'number' ? item.json.home_page.pct3ResTime.toFixed(2) : null,
                throughput: typeof item.json.home_page.throughput === 'number' ? item.json.home_page.throughput.toFixed(2) : null,
                receivedKBytesPerSec: typeof item.json.home_page.receivedKBytesPerSec === 'number' ? item.json.home_page.receivedKBytesPerSec.toFixed(2) : null,
                sentKBytesPerSec: typeof item.json.home_page.sentKBytesPerSec === 'number' ? item.json.home_page.sentKBytesPerSec.toFixed(2) : null,
              }
              : null,
          Total:
            item.json && item.json.Total
              ? {
                transaction: item.json.Total.transaction,
                sample: item.json.Total.sampleCount,
                errorCount: item.json.Total.errorCount,
                errorPct: item.json.Total.errorPct,
                meanResTime: typeof item.json.Total.meanResTime === 'number' ? item.json.Total.meanResTime.toFixed(2) : null,
                medianResTime: typeof item.json.Total.medianResTime === 'number' ? item.json.Total.medianResTime.toFixed(2) : null,
                minResTime: typeof item.json.Total.minResTime === 'number' ? item.json.Total.minResTime.toFixed(2) : null,
                maxResTime: typeof item.json.Total.maxResTime === 'number' ? item.json.Total.maxResTime.toFixed(2) : null,
                pct1ResTime: typeof item.json.Total.pct1ResTime === 'number' ? item.json.Total.pct1ResTime.toFixed(2) : null,
                pct2ResTime: typeof item.json.Total.pct2ResTime === 'number' ? item.json.Total.pct2ResTime.toFixed(2) : null,
                pct3ResTime: typeof item.json.Total.pct3ResTime === 'number' ? item.json.Total.pct3ResTime.toFixed(2) : null,
                throughput: typeof item.json.Total.throughput === 'number' ? item.json.Total.throughput.toFixed(2) : null,
                receivedKBytesPerSec: typeof item.json.Total.receivedKBytesPerSec === 'number' ? item.json.Total.receivedKBytesPerSec.toFixed(2) : null,
                sentKBytesPerSec: typeof item.json.Total.sentKBytesPerSec === 'number' ? item.json.Total.sentKBytesPerSec.toFixed(2) : null,
              }
              : null,
        };

        // Remove json key if it exists
        if (modifiedItem.json) delete modifiedItem.json;

        return modifiedItem;
      }),
      summary: totals,  // Add the calculated totals as 'summary' field
      error: errors, // Add the error group data
      success: successes  // Add the success group data
    };

    console.log("modifiedData", modifiedData);
    return {
      type: ADD_EXECUTER_DATA,
      payload: modifiedData,
    };
  }
};

export const setExecuteJMXData= (data) => {
  console.log("setExecuteJMXData", data);
  return {
    type: SET_EXECUTEJMX_DATA,
    payload: data,
  };
};


export const GetResultsList = (rootId, setLoading) => {
  setLoading(true);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Performance/GetExecutedPerformanceByRootId?RootId=${rootId}`,
        header()
      );
      console.log("GetResultsList ", response.data);
      dispatch({
        type: RESULT_LIST,
        payload: response.data,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
};
