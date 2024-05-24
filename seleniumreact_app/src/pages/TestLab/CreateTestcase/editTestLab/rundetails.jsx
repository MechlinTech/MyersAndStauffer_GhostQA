import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledTypography } from "./styleTestCase";
import CustomeTableChell from "./CustomeTableChell";

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

export default function Rundetail({ runIdDetails }) {
  const [value, setValue] = useState("screenshot");
  const escapeSequenceString = '\\x1b[?25l\\r\\n\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[?25l\\x1b[2K\\x1b[1A\\x1b[2K\\x1b[G\\x1b[?25h\\r\\n\\r\\nDevTools listening on ws://127.0.0.1:35435/devtools/browser/e1262e6a-8860-4fb9-ac5d-e0ee39bda9f5\\r\\n\\r\\n\\x1b[90m====================================================================================================\\x1b[39m\\r\\n\\r\\n\\x1b[0m  (\\x1b[4m\\x1b[1mRun Starting\\x1b[22m\\x1b[24m)\\x1b[0m\\r\\n\\r\\n\\x1b[90m  \\xe2\\x94\\x8c\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\x1b[90m\\xe2\\x94\\x80\\x1b[39m\\';

const regex = /\x1b\[30m/g; // Define the regular expression pattern
console.log(regex.test(escapeSequenceString));
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
             return  <CustomeTableChell ScreenshotUrl={item.files} />
            
          })}
      </TabPanel>
      <TabPanel value={value} index={"logs"}>
          <div id="output"></div>
      </TabPanel>
    </Box>
  );
}
