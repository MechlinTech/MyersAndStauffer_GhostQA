import React, { useEffect, useState } from "react";
import { StyledFormControl, StyledOutlinedInput } from "./style";
import { Grid } from "@mui/material";
import { Box } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import { header } from "../../../../utils/authheader";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Properties({ PerformanceFileId }) {
  const [propertyList, setPropertyList] = useState([]);
  const [pName, setPname] = useState("");
  const [pValue, setPvalue] = useState("");
  const [errors, setErrors] = useState({
    pNameError: "",
    pValueError: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Performance/GetPropertyByPerformanceFileId?PerformanceFileId=${PerformanceFileId}`,
        header()
      );
      const resData = response.data
      if(Array.isArray(resData))
      setPropertyList(resData);
        else
        setPropertyList([])
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
   fetchData();
  }, [PerformanceFileId]); // Include PerformanceFileId in the dependency array to fetch data whenever it changes

  const handleInputChange = (event, type) => {
    if (type === "name") {
      setPname(event.target.value);
    } else {
      setPvalue(event.target.value);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      let errors = {};

      if (!pName) errors.pNameError = "required name";
      if (!pValue) errors.pValueError = "required value";

      setErrors(errors);

      if (Object.keys(errors).length === 0) {
        // Form is valid, submit or take action
        submitProperty();
      }
    }
  };

  const submitProperty = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/Performance/AddProperty`,
        {
          id: 0,
          performanceFileId: PerformanceFileId,
          name: pName,
          value: pValue,
        },
        header()
      );
        console.log('res',res)
      if (res.data === "Success") {
        toast.info("Successfully saved", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
        
        // Update propertyList after successful submission
        fetchData();
        setPname(""); // Clear input values after submission
        setPvalue("");
      }
    } catch (error) {
      console.log("error saving ", error);
      toast.error("Network error");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/Performance/DeleteProperties?Id=${pId}`,
        header()
      );

      if (res.data.status === "success") {
        toast.info("Successfully deleted", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });

        // Update propertyList after successful deletion
        fetchData();

      }
    } catch (error) {
      console.log("error deleting ", error);
      toast.error("Network error");
    }
  };

  return (
    <Box
      style={{
        border: "solid 2px #DADADA",
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={5}>
          Property
        </Grid>
        <Grid item xs={5}>
          Value
        </Grid>
        {propertyList?.map((property, index) => (
          <React.Fragment key={index}>
            <Grid item xs={5}>
              <StyledFormControl>
                <StyledOutlinedInput
                  value={property.Name}
                />
              </StyledFormControl>
            </Grid>
            <Grid item xs={5}>
              <StyledFormControl>
                <StyledOutlinedInput
                  value={property.Value}
                />
              </StyledFormControl>
            </Grid>
            <Grid item xs={2}>
              <DeleteIcon
                onClick={() => handleDelete(property.Id)}
                sx={{ cursor: "pointer", color: "red" }}
              />
            </Grid>
            <Divider />
          </React.Fragment>
        ))}
        <Divider />
        <Grid item xs={5}>
          <StyledFormControl>
            <StyledOutlinedInput
              value={pName}
              placeholder="Property"
              onChange={(event) => handleInputChange(event, "name")}
              onKeyDown={handleKeyPress}
            />
          </StyledFormControl>
        </Grid>
        <Grid item xs={5}>
          <StyledFormControl>
            <StyledOutlinedInput
              value={pValue}
              placeholder="value"
              onChange={(event) => handleInputChange(event, "value")}
              onKeyDown={handleKeyPress}
            />
          </StyledFormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
