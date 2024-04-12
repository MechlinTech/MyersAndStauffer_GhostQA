import React, { useEffect, useState } from "react";
import {
  StyledFormControl,
  StyledOutlinedInput,
  StyledTypography,
} from "./style";
import { Grid } from "@mui/material";
import { Box } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import { getBaseUrl } from "../../../../utils/configService";
import { header } from "../../../../utils/authheader";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProperty,
  fetchPropertyData,
  submitProperty,
} from "../../../../redux/actions/performanceAction";
import { CircularProgress } from "@material-ui/core";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

export default function Properties() {
  const dispatch = useDispatch();
  const [pName, setPname] = useState("");
  const [pValue, setPvalue] = useState("");
  const [Errors, setErrors] = useState({
    pNameError: "",
    pValueError: "",
  });
  const { propertyData, propertyLoading, propertyError, scenarioId } =
    useSelector((state) => state.performance);

  useEffect(() => {
    dispatch(fetchPropertyData(scenarioId));
  }, [scenarioId]);

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

      if (!pName.trim()) {
        errors.pNameError = "required name";
        toast.error("Name is required");
        setErrors(errors);

        return;
      }
      if (!pValue.trim()) {
        errors.pValueError = "required value";
        toast.error("Value is required");
        setErrors(errors);

        return;
      }

      setErrors(errors);

      if (Object.keys(errors).length === 0) {
        // Form is valid, submit or take action
        const payload = {
          id: 0,
          performanceFileId: scenarioId,
          name: pName,
          value: pValue,
        };
        dispatch(submitProperty(payload));
        setPname("");
        setPvalue("");
      }
    }
  };

  const handleDelete = async (pId) => {
    dispatch(deleteProperty(pId));
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
          <StyledTypography>Property</StyledTypography>
        </Grid>
        <Grid item xs={5}>
          <StyledTypography>Value</StyledTypography>
        </Grid>
        {propertyLoading ? (
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <CircularProgress
              style={{ color: "rgb(101, 77, 247)" }}
              size={25}
            />
          </Grid>
        ) : propertyData?.length === 0 ? (
          // Render message when no property data is available
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <StyledTypography>No property data available</StyledTypography>
          </Grid>
        ) : (
          propertyData.map((property, index) => (
            <React.Fragment key={index}>
              <Grid item xs={5}>
                <StyledFormControl>
                  <StyledOutlinedInput value={property.Name} />
                </StyledFormControl>
              </Grid>
              <Grid item xs={5}>
                <StyledFormControl>
                  <StyledOutlinedInput value={property.Value} />
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
          ))
        )}

        <Divider />
        <Grid item xs={5}>
          <StyledFormControl>
            <StyledOutlinedInput
              value={pName}
              placeholder="Property"
              error={Errors.pNameError}
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
              error={Errors.pValueError}
              onChange={(event) => handleInputChange(event, "value")}
              onKeyDown={handleKeyPress}
            />
          </StyledFormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
