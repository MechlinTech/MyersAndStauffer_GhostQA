import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadPanel from './LoadPanel';
import LocationPanel from './LocationPanel';


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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function DesignTabs() {
  const theme = useTheme();
  const [value, setValue] = useState('Load');
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box >
     
      <Tabs
         value={value}
         onChange={handleChange}
         centered
        sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'rgba(101, 77, 247,0)',
              margin:'auto',                  
            },
            '& .MuiTab-root': {
              backgroundColor: 'transparent', // set background color for non-active tabs
              color: '#646464', // set text color for non-active tabs
              borderRadius:"4px",
              border:"solid 1px #646464",
              margin:'10px 8px' ,
             
              '&.Mui-selected': {
                backgroundColor: 'rgb(101, 77, 247)',
                color: '#fff',
                borderRadius:"4px",
                border:"solid 1px rgb(101, 77, 247)",
              }
              
            },
          }}
        >
          <Tab value="Load" label="Load" />
          <Tab value="Location" label="Location" />
          <Tab value="Data Entity" label="Data Entity" />
          <Tab value="Properties" label="Properties" />
          
        </Tabs>

        <TabPanel value={value} index={'Load'} dir={theme.direction}>
       <LoadPanel />
        </TabPanel>
        <TabPanel value={value} index={"Location"} dir={theme.direction}>
        <LocationPanel />
        </TabPanel>
        <TabPanel value={value} index={"Data Entity"} dir={theme.direction}>
        {"Data Entity"}
        </TabPanel>
        <TabPanel value={value} index={"Properties"} dir={theme.direction}>
        {"Properties"}
        </TabPanel>
        
    </Box>
  );
}