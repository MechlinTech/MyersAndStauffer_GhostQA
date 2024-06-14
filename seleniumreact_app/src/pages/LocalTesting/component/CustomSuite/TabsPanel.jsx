import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledTypography } from "./styles";
import Design from "./Design";
import Graph from "../InbuiltSuite/Components/Graph";
import BasicAccordion from "../../../../comman/Accordion";

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

export default function TabsPanel() {
  const [value, setValue] = useState("Design");
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
          value="Design"
          label={
            <StyledTypography style={{ textTransform: "capitalize" }}>
              Dashboard
            </StyledTypography>
          }
        />
        <Tab
          value="Run"
          label={
            <StyledTypography style={{ textTransform: "capitalize" }}>
              History
            </StyledTypography>
          }
        />
      </Tabs>

      <TabPanel value={value} index={"Design"}>
        {/* <Design /> */}
        <Graph />
      </TabPanel>
      <TabPanel value={value} index={"Run"}>
        <BasicAccordion />
      </TabPanel>
    </Box>
  );
}
