import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledTypography } from "./styles";
import CustomeImgView from "./modals/CustomeImgView";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Rundetails() {
  const { runIdDetails } = useSelector(
    (state) => state.testlabResult
  );
  const [value, setValue] = useState("screenshot");
  let parsedDetail;
  if (runIdDetails && runIdDetails.length > 0) {
    parsedDetail = JSON.parse(runIdDetails[0]?.TestScreenShotUrl);
  } else {
    parsedDetail = null;
  }
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "rgb(101, 77, 247)",
          },
          "& .Mui-selected": {
            color: "rgb(101, 77, 247)",
          },
        }}
      >
        <Tab
          value="screenshot"
          label={
            <StyledTypography style={{ textTransform: "capitalize" }}>
              Screenshots
            </StyledTypography>
          }
        />
        <Tab
          value="logs"
          label={
            <StyledTypography style={{ textTransform: "capitalize" }}>
              Logs
            </StyledTypography>
          }
        />
      </Tabs>

      <TabPanel value={value} index={"screenshot"}>
        {parsedDetail &&
          parsedDetail?.map((item, index) => {
            if(item.type === "screenshot")  
             return  <CustomeImgView ScreenshotUrl={item.files} />
            
          })}
      </TabPanel>
      <TabPanel value={value} index={"logs"}>
        <StyledTypography>
        No log for now
        </StyledTypography>
      </TabPanel>
    </Box>
  );
}
