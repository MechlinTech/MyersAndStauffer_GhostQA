import axios from "axios";
import { toast } from "react-toastify";
import { headerCypres } from "../../../utils/authheader";
import { getBaseUrl } from "../../../utils/configService";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";



export const AddTestCaseDetails = async (payload, actions, goBack) => {
  try {
    const BASE_URL = await getBaseUrl();
    const res = await axios.post(
      `${BASE_URL}/AddTestLab/AddTestCaseDetails`,
      payload
    ); // to add testcase name and return testcase id
    console.log("response ", res.data);
    const Data = res.data.Data;
    if (res.data.status === "success") {
      const stepDetails = {
        testCaseID: Data[0].id,
        actions: actions,
      };
      const resSteps = await axios.post(
        `${BASE_URL}/AddTestLab/AddTestStepsDetails`,
        stepDetails
      ); // to add steps to testcase
      if (resSteps.data.status === "success") {
        goBack();
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      }
    }else{
      toast.error(res.data.message)
    }
  } catch (error) {
    console.log("error saving ", error);
    toast.error("Network error");
  }
};


export const UpdateTestStepsDetails = async(payload, savetoEdit) => {
  
    try {
      const BASE_URL = await getBaseUrl();
      const res = await axios.post(
        `${BASE_URL}/AddTestLab/AddTestStepsDetails`,
        payload
      );
      if (res.data.status === "success") {
        toast.info("Successfully update steps", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
        savetoEdit();
      }
    } catch (error) {
      console.log("error saving ", error);
      toast.error("Network error");
    }
  
};

export const UpdateTestCaseDetail = async(payload) => {
  
  try {
    const BASE_URL = await getBaseUrl();
    const res = await axios.post(
      `${BASE_URL}/AddTestLab/UpdateTestCaseDetails`,
      payload
    );
    console.log(res)
    if (res.data.status === "success") {
      toast.info("Successfully update testcase", {
        style: {
          background: "rgb(101, 77, 247)",
          color: "rgb(255, 255, 255)",
        },
      });
    }
  } catch (error) {
    console.log("error saving ", error);
    toast.error("Network error");
  }

};

export const SaveAndExecute = async (data,steps,testCaseDetailId,handleExecuteLoading) => {
  try {
    const BASE_URL = await getBaseUrl();
    // Combined HTTP Requests
    const [updateRes, addStepsRes] = await Promise.all([
      axios.post(`${BASE_URL}/AddTestLab/UpdateTestCaseDetails`, data),
      axios.post(`${BASE_URL}/AddTestLab/AddTestStepsDetails`, steps)
    ]);
    const testCaseDetail = updateRes.data.Data[0]
    if (updateRes.data.status === "success") {
      // Toast message for saving the testcase
      toast.info("Successfully saved testcase", {
        style: {
          background: "rgb(101, 77, 247)",
          color: "rgb(255, 255, 255)",
        },
      });
    } else {
      toast.error("Failed to save testcase");
    }

    if (addStepsRes.data.status === "success") {
      // Toast message for saving the steps
      toast.info("Successfully saved steps", {
        style: {
          background: "rgb(101, 77, 247)",
          color: "rgb(255, 255, 255)",
        },
      });
    } else {
      toast.error("Failed to save steps");
    }

    const jsonData = await axios.get(`${BASE_URL}/AddTestLab/GetExcutedByRootId?RootId=${testCaseDetail.rootId}&TestName=${testCaseDetail.testCaseName}`);
    const payload = { name: "name", request_json: jsonData.data };

    const executedDetail = await axios.post(`http://65.1.188.67:8010/codeengine/api/test-suitesV2/execute3/`, payload, headerCypres());
    const runId = executedDetail.data.container_runs[0].id;

    console.log("execution detail", executedDetail);
    getRunDetail(runId, 1000, testCaseDetailId,handleExecuteLoading);
  } catch (error) {
    console.log("error:", error);
    handleExecuteLoading()
    toast.error("Network error");
  }
};


const getRunDetail = async (runId, delay, testCaseDetailId,handleExecuteLoading) => {
  try {
    const BASE_URL = await getBaseUrl();
    const res = await axios.get(
      `http://65.1.188.67:8010/codeengine/api/test-suitesV2/${runId}/monitor_container_run/`
    );

    if (res.data.container_status === "exited") {
      handleExecuteLoading()
      const rundetails = res.data;
      try {
        const res = await axios.post(`${BASE_URL}/AddTestLab/AddExecuteResult?testCaseDetailId=${testCaseDetailId}`,rundetails)
        if (res.data.status === "success") {
            toast.info("Successfully executed", {
              style: {
                background: "rgb(101, 77, 247)",
                color: "rgb(255, 255, 255)",
              },
            });
          }
      } catch (error) {
        console.log('error',error)
        toast.error('Error AddExecuteResult')
      }
      console.log("rundetails : ", rundetails);
    } else {
      setTimeout(() => {
        getRunDetail(runId, delay, testCaseDetailId,handleExecuteLoading);
      }, delay);
    }
  } catch (error) {
    console.error("Error getting run details:", error);
    toast.error("Network error");
  }
};