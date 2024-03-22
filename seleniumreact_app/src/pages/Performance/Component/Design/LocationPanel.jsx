import React, { useState, useRef, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
const BASE_URL = process.env.REACT_APP_BASE_URL;

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
export default function LocationPanel({
  PerformanceFileId = { PerformanceFileId },
}) {
  const classes = useStyles();
  const [locationData, setLocationData] = useState([]);
  const [formData, setFormData] = useState({
    selectedLocation: null,
  });
  const [valueLocation, setValueLocation] = useState(data);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [trafficPercentage, settrafficPercentage] = useState(0);
  const [noOfUser, setnoOfUser] = useState(0);
  const [addLocation, setAddLocation] = useState(false);

  const [designTabsActive, setDesignTabsActive] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Performance/GetLocationByPerformanceFileId?PerformanceFileId=${PerformanceFileId}`,
        header()
      );
      const resData = response.data
      if(Array.isArray(resData)){
        setLocationData(resData)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleActiveTabs = () => {
    setDesignTabsActive(!designTabsActive);
  };
  const handleFieldChange = (fieldName, fieldInput) => {
    if (fieldName === "selectedLocation") setSelectedLocation(fieldInput);
    else if (fieldName === "noOfUser") {
        setnoOfUser(fieldInput.target.value)
    } else {
        settrafficPercentage(fieldInput.target.value)
    }
  };
  
  const handleKeyPress = (event)=>{
    if (event.key === "Enter") {
        // Submit form or take action
        let payload = {
                id: 0,
                performanceFileId: 1,
                name: selectedLocation.value,
                numberUser: noOfUser,
                percentageTraffic: trafficPercentage

        }
        submitLocation(payload)
      }
  }

  const submitLocation = async (payload) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/Performance/AddLocation`,
        payload,
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
        setSelectedLocation(null)
        setnoOfUser(0)
        settrafficPercentage(0)
      }else{
      toast.error("Submitting error");
      }
    } catch (error) {
      console.log("error saving ", error);
      toast.error("Network error");
    }
  };

  const handleDelete = async (locationId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/Performance/DeleteLocation?Id=${locationId}`,
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
    <>
      <Button
        variant="contained"
        onClick={() => setAddLocation(!addLocation)}
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
        <AddIcon /> Add more test
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
            {locationData?.map((item) => {
              return (
                <TableRow
                  key={item.Id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{ width: "50%" }}>
                    <Select
                      options={valueLocation}
                      value={{ label: item.Name, value: item.Name }}
                      isClearable={true}
                      menuPosition={"fixed"}
                    />
                  </TableCell>
                  <TableCell align="left" style={{ width: "20%" }}>
                    <input
                      type="number"
                      value={item.PercentageTraffic}
                      className={classes.inputField}
                    />
                  </TableCell>

                  <TableCell align="left" style={{ width: "20%" }}>
                    <input
                      type="number"
                      value={item.NumberUser}
                      className={classes.inputField}
                    />
                  </TableCell>
                  <TableCell align="left" style={{ width: "10%" }}>
                    <DeleteIcon
                    onClick={()=>{handleDelete(item.Id)}}
                      style={{ cursor: "pointer", color: "#f74d4d" }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            {addLocation && (
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
                      handleFieldChange("trafficPercentage",e);
                    }}
                    onKeyDown={handleKeyPress}
                  />
                </TableCell>

                <TableCell align="left" style={{ width: "20%" }}>
                  <input
                    type="number"
                    value={noOfUser}
                    className={classes.inputField}
                    onChange={(e) => {
                        handleFieldChange("noOfUser",e);
                      }}
                    onKeyDown={handleKeyPress}

                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
