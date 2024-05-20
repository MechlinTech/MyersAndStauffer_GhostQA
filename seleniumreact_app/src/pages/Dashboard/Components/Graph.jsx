import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import axios from "axios";
import { getBaseUrl } from "../../../utils/configService";
import { header } from "../../../utils/authheader";
import Select from "react-select";

import { FormControl, Typography, FormControlLabel, Grid } from "@mui/material";

import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import useStyles from "./style";
import clsx from "clsx";
import DownloadIcon from '@mui/icons-material/Download';

// const BASE_URL = process.env.REACT_APP_BASE_URL || "api";

const Graph = (props) => {
  const classes = useStyles();
  const { selectedSuite } = useSelector((state) => state.selenium);

  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        type: "bar",
        toolbar: {
          show: true,
          tools: {
            download:  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>',             
            },
        },
      },
      colors: ["#0000ff", "#008000", "#ff0000"],
      xaxis: {
        categories: [],
      },
      // plotOptions: {   
      //   bar: {
      //     horizontal: false,
      //     columnWidth: "100%",
      //     endingShape: "rounded",
      //   },
      // },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
  
      yaxis: {
        title: {
          text: "Number Of Test Cases",
          style: {
            fontSize: '14px',
            fontFamily: 'Lexend Deca',
          },
        },
        labels: {
          formatter: function (val) {
            return parseInt(val);
          }
        }
      },
      fill: {
        opacity: 1,
      },
  
      tooltip: {
        y: {
          formatter: function (val) {
            return "" + val + " ";
          },
        },
      },
    },
    series: [],
    // chart: {
    //   type: "bar",
    // },
   
  });
  const staticOptions = [
    { value: "7", label: "7" },
    { value: "15", label: "15" },
    { value: "30", label: "30" },
    { value: "45", label: "45" },
    { value: "60", label: "60" },
    { value: "90", label: "90" },
    // Add more options as needed
  ];

  const [filterType, setFilterType] = useState("runs");
  const [filterValue, setFilterValue] = useState({ value: "7", label: "7" });
  const { testSuiteLists,executingSuite } = useSelector((state) => state.selenium);
  const [empty, setEmpty] = useState(true);
  const get_host = async () => {
    const BASE_URL = await getBaseUrl();
    await axios
      .get(
        // `${BASE_URL}/Selenium/GetChartDetails?TestSuiteName=${props.testSuitName.TestSuiteName}&Filtertype=${filterType}&FilterValue=${filterValue.value}`,
        `${BASE_URL}/Selenium/GetChartDetails?TestSuiteName=${selectedSuite}&Filtertype=${filterType}&FilterValue=${filterValue.value}`,
        header()
      )
      .then((response) => {
        const TestRunStartDate = [];
        const TotalFailedTestCase = [];
        const TotalPassedTestCase = [];
        const TotalTestCase = [];

        if (response.data.length) {
          response.data.forEach((item) => {
            // const date = new Date(item.TestRunStartDate);
            // const formattedDate = date.toLocaleDateString("en-US", {
            //   month: "long", // full month name
            //   day: "numeric", // day of the month
            //   year: "numeric", // full year
            // });
            const formattedDate = extractDate(item.TestRunStartDate)
            TestRunStartDate.push(formattedDate);
            TotalFailedTestCase.push(item.TotalFailedTestCase);
            TotalPassedTestCase.push(item.TotalPassedTestCase);
            TotalTestCase.push(item.TotalTestCase);
          });

          setEmpty((current) => false);
        } else {
          setEmpty((current) => true);
        }
        const newData = {
          ...data,
          options: {
            ...data.options,
            xaxis: {
              categories: TestRunStartDate,
            }
          },
          series: [
            {
              name: "Total Test Case",
              data: TotalTestCase,
            },
            {
              name: "Passed",
              data: TotalPassedTestCase,
            },
            {
              name: "Failed",
              data: TotalFailedTestCase,
            },
          ],
        };

        setData((current) => newData);
      });
  };
  useEffect(() => {
    get_host();
  }, [filterType, filterValue, testSuiteLists]);

  useEffect(()=>{
    if(!executingSuite)
      get_host();
  },[executingSuite])
  const handleRadioChange = (event) => {
    setFilterType(event.target.value);
  };
  const handleFilterValue = (value) => {
    setFilterValue(value);
  };
  
  // following two line is to change the title of inbuilt menu title
useEffect(()=>{
  const menuIcon = document.querySelector('.apexcharts-menu-icon');
menuIcon?.setAttribute('title', 'Download');
})

function extractDate(dateStr) {
  if (typeof dateStr !== 'string') {
    return null; // Return null or some default value if dateStr is invalid
  }
  const [year, month, day] = dateStr?.split("-");

  const monthNames = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const formattedDate = `${monthNames[month]} ${parseInt(day, 10)}, ${year}`;

  return formattedDate;
}
  return (
    <>
      <div>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Typography
              className={classes.customFontSize}
              fontFamily="Lexend Deca"
              mr={3}
            >
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
                      fontFamily="Lexend Deca"
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
                      fontFamily="Lexend Deca"
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
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography
            variant="subtitle1"
            className={clsx(classes.customFontSize)}
            fontFamily="Lexend Deca"
            mr={3}
          >
            For
          </Typography>
          <Select
            options={staticOptions}
            value={filterValue}
            onChange={handleFilterValue}
            styles={{
              container: (provided) => ({
                ...provided,
                backgroundColor: "rgb(242, 242, 242)",
                zIndex: 999, // Adjust the zIndex value
                width: "130px",
              }),
              control: (provided, state) => ({
                ...provided,
                backgroundColor: "rgb(242, 242, 242)",
                borderWidth: "2px",
                "&:hover": {
                  border: "2px solid #654DF7",
                },
                borderColor: Error.environment
                  ? "red"
                  : state.isFocused
                  ? "#654DF7"
                  : "rgb(242, 242, 242)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#654DF7" : "transparent",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                cursor: "pointer",
                ":hover": {
                  color: "#654DF7", // Change the color on hover if desired
                },
              }),
            }}
          />
        </Grid>
        <Chart
          options={data.options}
          series={data.series}
          type="bar"
          height={350}
        />
      </div>
    </>
  );
};

export default Graph;
