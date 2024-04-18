import React, { useState, useRef, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CircularProgress } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import { useStyles } from "../../styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { header } from "../../../../utils/authheader";
import { toast } from "react-toastify";
import { StyledTypography } from "./style";
import {
  GetLocationOptions,
  GetLocationScenarioVUCount,
  GetUsedLocation,
} from "../../../../redux/actions/performanceAction";
import { getBaseUrl } from "../../../../utils/configService";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";
import { useDispatch, useSelector } from "react-redux";
import {
  GetLocationData,
  deleteLocation,
  submitLocation,
  updateLocation,
} from "../../../../redux/actions/locationAction";

const data = [
  {
    value: "mumbai",
    label: "mumbai",
  },
  {
    value: "mumbaiindia1",
    label: "Mumbai India",
  },
];
export default function LocationPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [valueLocation, setValueLocation] = useState(data);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [trafficPercentage, settrafficPercentage] = useState(0);
  const [noOfUser, setnoOfUser] = useState(0);
  const [addLocation, setAddLocation] = useState(false);

  const {
    usedLocation,
    suitId,
    locationOptions,
    scenarioId,
    scenarios,
  } = useSelector((state) => state.performance);
  const {
    totalUsers,
    totalTrafficPercent,
    locations,
    isLoading,
  } = useSelector((state) => state.location);
  const [locationData, setLocationData] = useState(locations);
  useEffect(() => {
    dispatch(GetLocationData(scenarioId));
  }, [scenarioId]);
  useEffect(() => {
    setLocationData(locations);
    dispatch(GetUsedLocation())
    dispatch(GetLocationScenarioVUCount(scenarios))
  }, [locations]);

  useEffect(()=>{
    dispatch(GetLocationOptions());
  },[usedLocation])
  const handleFieldChange = (fieldName, fieldInput) => {
    if (fieldName === "selectedLocation") setSelectedLocation(fieldInput);
    else {
      const traffic = fieldInput.target.value;
      settrafficPercentage(traffic);
      setnoOfUser((totalUsers / 100) * traffic);
    }
  };
  const handleKeyPress = (event) => {
    let totalPercent = 0;
    totalPercent =
      locations &&
      locations?.reduce((sum, data) => {
        return sum + parseInt(data.PercentageTraffic, 10);
      }, 0);
    totalPercent += parseInt(trafficPercentage ? trafficPercentage : 0);
    if (event.key === "Enter") {
      // Submit form or take action
      if (!selectedLocation) {
        toast.error("select location");
        return;
      }
      if (!Number.isInteger(noOfUser)) {
        toast.error("No of users must be integer");
        return;
      }
      if (totalPercent > 100) {
        toast.error("Total percentage should be 100");
        return;
      }
      let payload = {
        id: 0,
        performanceFileId: scenarioId,
        name: selectedLocation?.value,
        numberUser: noOfUser,
        percentageTraffic: trafficPercentage,
      };
      // submitLocation(payload);
      dispatch(submitLocation(payload));
      dispatch(GetLocationScenarioVUCount(scenarios));
      setSelectedLocation(null);
      setnoOfUser(0);
      settrafficPercentage(0);
    }
  };
  // when condition satisfy, following function will add location
  // const submitLocation = async (payload) => {
  //   try {
  //     const BASE_URL = await getBaseUrl();
  //     const res = await axios.post(
  //       `${BASE_URL}/Performance/AddLocation`,
  //       payload,
  //       header()
  //     );
  //     console.log("res", res);
  //     if (res.data === "Success") {
  //       toast.info("Successfully saved", {
  //         style: {
  //           background: "rgb(101, 77, 247)",
  //           color: "rgb(255, 255, 255)",
  //         },
  //       });

  //       // Update propertyList after successful submission
  //       dispatch(GetLocationData(scenarioId));
  //       setLocationData(locations);
  //       dispatch(GetLocationScenarioVUCount(scenarios));
  //       setSelectedLocation(null);
  //       setnoOfUser(0);
  //       settrafficPercentage(0);
  //     } else {
  //       toast.error("Submitting error");
  //     }
  //   } catch (error) {
  //     console.log("error saving ", error);
  //     toast.error("Network error");
  //   }
  // };

  // this one for updating the location
  const handleLocationFieldChange = (event, id, type) => {
    if (type === "percentage") {
      
      const updateLocationData = locationData.map((data) =>{
        if(data.Id !== id)
          return data
        else{
          settrafficPercentage(data.PercentageTraffic)
         return { ...data, PercentageTraffic: event.target.value }}}
      );
      setLocationData(updateLocationData);
    } else {
      const updateLocationData = locationData.map((data) =>
        data.Id !== id ? data : { ...data, Name: event?.label }
      );
      setLocationData(updateLocationData);
    }
  };

  // const handleLocationUpdate = async (event, id) => {
  //   if (event.key === "Enter") {
  //     const locationToUpdate = locationData.find((data) => data.Id === id);
  //     let totalPercent = locations.reduce((sum, data) => {
  //       if (data.Id === id)
  //         return sum + parseInt(locationToUpdate?.PercentageTraffic, 10);
  //       else return sum + parseInt(data.PercentageTraffic, 10);
  //     }, 0);
  //     if (totalPercent > 100) {
  //       toast.error("Total percentage should be 100");
  //       return;
  //     }

  //     if (!locationToUpdate.Name) {
  //       toast.error("Please select location");
  //       return;
  //     } else {
  //       try {
  //         const BASE_URL = await getBaseUrl();
  //         const res = await axios.post(
  //           `${BASE_URL}/Performance/UpdateLoaction`,
  //           locationToUpdate,
  //           header()
  //         );
  //         if (res.data.status === "success") {
  //           toast.info("Successfully saved", {
  //             style: {
  //               background: "rgb(101, 77, 247)",
  //               color: "rgb(255, 255, 255)",
  //             },
  //           });

  //           // Update propertyList after successful submission
  //           // fetchData();
  //           dispatch(GetLocationData(scenarioId));
  //         }
  //       } catch (error) {
  //         console.log("error saving ", error);
  //         toast.error("Network error");
  //       }
  //     }
  //   }
  // };

  const handleLocationUpdate = async (event, id) => {
    let locationToUpdate = locationData.find((data) => data.Id === id);
    if(locationToUpdate?.PercentageTraffic === "0" || locationToUpdate?.PercentageTraffic === ""){
      toast.warn("Traffic can't be 0")
      setLocationData(locationData.map((data)=>data.Id === id?{...data,PercentageTraffic:trafficPercentage}:data))
      return
    }
    locationToUpdate.NumberUser = Math.ceil(
      (totalUsers / 100) * parseInt(locationToUpdate?.PercentageTraffic, 10)
    );
    if (!locationToUpdate.Name) {
      toast.error("Please select location");
      return;
    } else {
      // try {
      //   const BASE_URL = await getBaseUrl();
      //   const res = await axios.post(
      //     `${BASE_URL}/Performance/UpdateLoaction`,
      //     locationToUpdate,
      //     header()
      //   );
      //   if (res.data.status === "success") {
      //     toast.info("Successfully saved", {
      //       style: {
      //         background: "rgb(101, 77, 247)",
      //         color: "rgb(255, 255, 255)",
      //       },
      //     });

      //     // Update propertyList after successful submission
      //     // fetchData();
      //     dispatch(GetLocationData(scenarioId));
      //   }
      // } catch (error) {
      //   console.log("error saving ", error);
      //   toast.error("Network error");
      // }
      dispatch(updateLocation(locationToUpdate));
    }
  };
  const handleDelete = async (locationId) => {
    dispatch(deleteLocation(locationId));
    dispatch(GetLocationScenarioVUCount(scenarios));
  };
  const handleAddLocationBtn = () => {
    if (!totalUsers) {
      toast.warn("Total user for this scenario is 0");
      return;
    }
    if (locations.length > 10) {
      toast.warn("Cannot add more then 10 location");
      return;
    }
    if (!(locations.length < totalUsers)) {
      toast.warn("Cannot add more than total users");
      return;
    }
    //  setAddLocation(!addLocation);
    let loadPerLocation = 100 / (locations.length + 1);
    let accumalatedPoint = 0
    // Calculate loadPerLocation with two decimal places if necessary
    if (!Number.isInteger(loadPerLocation)) {
      const decimalPart = loadPerLocation - Math.floor(loadPerLocation)
      loadPerLocation = Math.floor(loadPerLocation);
      accumalatedPoint = Math.round(decimalPart*(locations.length + 1))
    }

    // Calculate common numberUser for each existing location
    const commonNumberUser = Math.ceil((totalUsers / 100) * loadPerLocation);

    // Dispatch the updateLocation action for each existing location with the common numberUser
    let remainingUser = totalUsers;
    locationData.forEach((loc) => {
      if (remainingUser > 0) {
        dispatch(
          updateLocation({
            ...loc,
            PercentageTraffic: loadPerLocation,
            NumberUser: commonNumberUser,
          })
        );

        remainingUser -= commonNumberUser;
      } else
        dispatch(
          updateLocation({
            ...loc,
            PercentageTraffic: loadPerLocation,
            NumberUser: 0,
          })
        );
    });

    // Determine the number of users for the new location
    // const remainingUsers = totalUsers - remainingUser;

    // Dispatch the submitLocation action for the new location with the remaining users
    let payload = {
      id: 0,
      performanceFileId: scenarioId,
      name: locationOptions[0]?.value,
      numberUser: remainingUser,
      percentageTraffic: loadPerLocation+accumalatedPoint,
    };
    dispatch(submitLocation(payload));
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={handleAddLocationBtn}
        style={{
          fontSize: 14,
          backgroundColor: "rgb(101, 77, 247)",
          color: "#ffffff",
          cursor: "pointer",
          padding: "8px 14px",
          marginTop: "0px",
          marginBottom: "10px",
          marginLeft: "auto",
          display: "block",
        }}
      >
        <AddIcon /> Add
      </Button>
      <TableContainer
        component={Paper}
        style={{
          border: "solid 2px #DADADA",
          borderRadius: "5px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "50%" }}>
                <StyledTypography> Locations</StyledTypography>
              </TableCell>
              <TableCell align="center" style={{ width: "20%" }}>
                <StyledTypography>% of Traffic</StyledTypography>
              </TableCell>
              <TableCell align="center" style={{ width: "20%" }}>
                <StyledTypography>no. of Users (s)</StyledTypography>
              </TableCell>
              <TableCell align="center" style={{ width: "10%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: "center" }}>
                  <CircularProgress
                    style={{ color: "rgb(101, 77, 247)" }}
                    size={25}
                  />
                </TableCell>
              </TableRow>
            ) : locationData && locationData.length > 0 ? (
              locationData.map((item) => (
                <TableRow
                  key={item.Id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{ width: "50%" }}>
                    <Select
                      options={locationOptions}
                      value={{ label: item.Name, value: item.Name }}
                      isClearable={true}
                      menuPosition={"fixed"}
                      onChange={(loc) =>
                        handleLocationFieldChange(loc, item.Id, "location")
                      }
                    />
                  </TableCell>
                  <TableCell align="left" style={{ width: "20%" }}>
                    <input
                      type="number"
                      min={0}
                      value={item.PercentageTraffic}
                      className={classes.inputField}
                      onChange={(e) =>
                        handleLocationFieldChange(e, item.Id, "percentage")
                      }
                      // onKeyDown={(e) => handleLocationUpdate(e, item.Id)}
                      onBlur={(e) => handleLocationUpdate(e, item.Id)}
                    />
                  </TableCell>

                  <TableCell align="center" style={{ width: "20%" }}>
                    <StyledTypography>
                      {/* {(totalUsers / 100) * item.PercentageTraffic} */}
                      {item.NumberUser}
                    </StyledTypography>
                  </TableCell>
                  <TableCell align="left" style={{ width: "10%" }}>
                    <DeleteIcon
                      onClick={() => {
                        handleDelete(item.Id);
                      }}
                      style={{ cursor: "pointer", color: "#f74d4d" }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: "center" }}>
                  <StyledTypography>No location</StyledTypography>
                </TableCell>
              </TableRow>
            )}
            {/* 
            {addLocation && totalTrafficPercent<100 && (
              <TableRow
                key={"a"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={{ width: "50%" }}>
                  <Select
                    options={valueLocation}
                    value={selectedLocation}
                    isClearable={true}
                    onChange={(selected) =>
                      handleFieldChange("selectedLocation", selected)
                    }
                    menuPosition={"fixed"}
                  />
                </TableCell>
                <TableCell align="left" style={{ width: "20%" }}>
                  <input
                    type="number"
                    value={trafficPercentage}
                    className={classes.inputField}
                    onChange={(e) => {
                      handleFieldChange("trafficPercentage", e);
                    }}
                    onKeyDown={handleKeyPress}
                  />
                </TableCell>

                <TableCell align="center" style={{ width: "20%" }}>
                  <StyledTypography>{noOfUser}</StyledTypography>
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
        {totalTrafficPercent !== 100 && (
          <StyledTypography color="error" textAlign="left" m={3}>
            Traffic Percentage always should be equal to 100%..
          </StyledTypography>
        )}
      </TableContainer>
    </>
  );
}
