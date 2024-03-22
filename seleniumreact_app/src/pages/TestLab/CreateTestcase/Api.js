import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AddTestCaseDetails = async (payload, actions, goBack) => {
  try {
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
      const res = await axios.post(
        `${BASE_URL}/AddTestLab/AddTestStepsDetails`,
        payload
      );
      if (res.data.status === "success") {
        toast.info("Successfully saved", {
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
    const res = await axios.post(
      `${BASE_URL}/AddTestLab/UpdateTestCaseDetails`,
      payload
    );
    console.log(res)
    if (res.data.status === "success") {
      toast.info("Successfully saved", {
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
