import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from 'react-apexcharts';
import axios from "axios";
import { header } from "../../../utils/authheader";
import Select from "react-select";

import {
 
  FormControl,
  
  Typography,
  FormControlLabel,
  Grid,
 
} from "@mui/material";

import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import useStyles from "./../../../pages/Dashboard/Modal/styles";
import clsx from "clsx";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Graph = (props) => {
  const classes = useStyles();

  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    },
    series: [],
    chart: {
      type: 'bar',

    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '100%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },

    yaxis: {
      title: {
        text: 'Number Of Test'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "" + val + " "
        }
      }
    }
  });
  const staticOptions = [
    { value: "7", label: "7" },
    { value: "15", label: "15" },
    { value: "30", label: "30" },
    { value: "30", label: "45" },
    { value: "30", label: "60" },
    { value: "30", label: "90" }
    // Add more options as needed
  ];
  const [filterType, setFilterType] =useState('runs');
  const [filterValue, setFilterValue] =useState( { value: "7", label: "7" });
  const [empty, setEmpty] =useState( true);
  useEffect(() => {
    const get_host = async () => {
     await axios.get(`${BASE_URL}/Selenium/GetChartDetails?TestSuiteName=Mississippi&Filtertype=${filterType}&FilterValue=${filterValue.value}`, header())
      .then((response) => {
        const  TestRunStartDate = [];
        const  TotalFailedTestCase = [];
        const TotalPassedTestCase = [];
        const TotalTestCase = [];
        if(response.data.length){
          response.data.forEach((item)=>{
            const date = new Date(item.TestRunStartDate);            
            TestRunStartDate.push(date.getDate()+'/'+(date.getMonth()+1));
            TotalFailedTestCase.push(item.TotalFailedTestCase);
            TotalPassedTestCase.push(item.TotalPassedTestCase);
            TotalTestCase.push(item.TotalTestCase);
          })
         
          setEmpty(current=>false);
        }else{
          setEmpty(current=>true);
        }
        const newData = {
          ...data,
          options: {
            ...data.options,
            xaxis: {
              categories: TestRunStartDate
            }
          },
          series: [{
            name: "Total Failed Test Case",
            data: TotalFailedTestCase
          },
          {
            name: "Total Passed Test Case",
            data: TotalPassedTestCase
          },
          {
            name: "Total Test Case",
            data: TotalTestCase
          }
          
        ]
        };

        setData((current)=>newData);
        console.log(data,'test',response); 
      });
      
    }
    get_host();





  }, [filterType,filterValue]);
  const handleRadioChange = (event) => {
    
    setFilterType(event.target.value);
  };
  const handleFilterValue= (value) => {

    setFilterValue(value);
  };
  return (
    <>
      <div>

        
                  <Grid container alignItems="center" sx={{ display: "grid" }}>
            <Grid item>
              <Typography className={classes.customFontSize}>
                Results
              </Typography>
            </Grid>
            <Grid item>
              <FormControl component="fieldset" className={classes.radioGroup}>
                <RadioGroup
                  aria-label="options"
                  name="options"
                  value={filterType}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel
                    value="runs"
                    control={<Radio />}
                    label={
                      <Typography
                        variant="body1"
                        className={classes.radioButtonLabel}
                      >
                       Runs
                      </Typography>
                    }
                    className={clsx(classes.radioLabel, classes.customFontSize)}
                  />
                  <FormControlLabel
                    value="days"
                    control={<Radio />}
                    label={
                      <Typography
                        variant="body1"
                        className={classes.radioButtonLabel}
                      >
                      Days
                      </Typography>
                    }
                    className={classes.radioLabel}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item>
            <div className={classes.input}>
              <Typography
                variant="subtitle1"
                className={clsx(classes.customFontSize)}
              >
                Application
              </Typography>
              <Select
                options={staticOptions}
                value={filterValue}
                onChange={handleFilterValue}
                className={clsx(classes.select, classes.customBackgroung)}
                sx={{
                  "& .MuiSelect-outlined": {
                    backgroundColor: "red", // Background color
                    "&:hover": {
                      borderColor: "red", // Hover border color
                    },
                    "&.Mui-focused": {
                      borderColor: "green !important", // Active border color
                    },
                  },
                }}
              />
              
            </div>
          </Grid>
         {!empty && <Chart
          options={data.options}
          series={data.series}
          type="bar"

        />}
      </div>
    </>
  );
};

export default Graph;
