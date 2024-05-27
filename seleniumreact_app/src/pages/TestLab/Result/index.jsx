import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableData } from "./TableData";
import { Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { StyledTypography } from "./style";

export default function Result({ inprogress }) {
  const dispatch = useDispatch();
  const { testSuiteLists, expandedAccord } = useSelector(
    (state) => state.selenium
  );
  const handleExpandAccord = (panel) => (e, isExpanded) => {
  };

  function formatDateStringWithTime(dateString) {
    const date = new Date(dateString);
    // Extract the month and day in UTC
    const month = date.getUTCMonth(); // getUTCMonth() returns 0-11, so add 1
    const day = date.getUTCDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the month name
    const monthName = monthNames[month];
    // const options = {
    //   month: "short",
    //   day: "numeric",
    // };

    // const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    // return formattedDate;

    return `${monthName} ${day}`;
  }

  return (
    <Box sx={{}}>
      {inprogress ? (
        <CircularProgress
          size={25}
          style={{ marginRight: "8px", color: "#fff" }}
        />
      ) : testSuiteLists.length === 0 ? (
        <StyledTypography>No testcase to show</StyledTypography>
      ) : (
        testSuiteLists?.map((item, index) => (
          <Accordion
            expanded={expandedAccord === item}
            onChange={handleExpandAccord(item)}
            key={index}
            sx={{
              boxShadow: "none",
              border: "1px solid rgb(217, 217, 217)",
              marginBottom: "3px",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontFamily={"Lexend Deca"} fontSize="14px">
                {`${formatDateStringWithTime(item.TestRunDateYear)} (${
                  item?.RunDetails?.length
                })`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: "0" }}>
              <TableData rows={item.RunDetails} />
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
}
