import { Box, Grid, OutlinedInput, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { StyledFormControl, StyledOutlinedInput } from "./style";
import { Button } from "@mui/material";
import { header, headerForm } from "../../../utils/authheader";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function DataEntryPanel({ PerformanceFileId }) {
  const [testDataList, settestDataList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Performance/GetTestDataByPerformanceFileId?PerformanceFileId=${PerformanceFileId}`,
        header()
      );
      console.log("res", response);
      settestDataList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    // Get the selected file from the input event
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('Id',0)
    formData.append('PerformanceFileId',PerformanceFileId)
    formData.append("file", selectedFile);
    submitTestData(formData)
  };

  const submitTestData = async (formData) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/Performance/AddTestData`,
        formData,
        headerForm()
      );
      if (res.data === "Success") {
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
        
        // Update propertyList after successful submission
        fetchData();
      }
    } catch (error) {
      console.log("error saving ", error);
      toast.error("Network error");
    }
  };
  return (
    <Box
      style={{
        border: "solid 2px #DADADA",
        borderRadius: "5px",
        padding:'3px'
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {testDataList.map((test, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={12} md={6}>
                  <Typography
            style={{ fontSize: "12px", color: "rgba(196, 196, 196, 0.8)" }}
          >
             file name
          </Typography>
                    <Box
                      style={{
                        padding:"5px ",
                        border: "1px solid #DADADA",
                        width: "100%",
                      }}
                    >
                      {test.Name}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                  <Typography
            style={{ fontSize: "12px", color: "rgba(196, 196, 196, 0.8)" }}
          >
            uploaded file
          </Typography>
                    <Box
                      style={{
                        padding:"5px ",
                        border: "1px solid #DADADA",
                        width: "100%",
                      }}
                    >
                      {test.Name}
                    </Box>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography
            style={{ fontSize: "12px", color: "rgba(196, 196, 196, 0.8)" }}
          >
            upload a file
          </Typography>
          <input
            accept=".csv"
            style={{ display: "none" }}
            id="file-input"
            type="file"
            onChange={handleFileChange}
          />
          <Box style={{
              width: "100%",
              border: "1px solid #DADADA",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>

          
          <label
            htmlFor="file-input"
          >
            <Typography>Add a file</Typography>
          </label>

            <Box
              variant="contained"
              color="primary"
              component="span"
              style={{
                borderRadius: "3px",
                padding: "5px 8px",
                fontSize: 25,
                backgroundColor: "rgb(101, 77, 247)",
                color: "#ffffff",
                cursor: "pointer",
              }}
              // disabled={!selectedFile}
              onClick={handleUpload}
            >
              +
            </Box>
            </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
