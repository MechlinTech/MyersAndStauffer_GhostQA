import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {TableData} from "./TableData";
import { Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { StyledTypography } from "./style";

export default function Result({ inprogress }) {
  const dispatch = useDispatch();
  const [expandedAccord, setExpandedAccord] = React.useState(false);

  const testSuiteLists = [
    {
      TestRunDateYear: "2024-04-25",
      RunDetails: [
        {
          TestSuiteName: "Aa-Test-Demo1",
          TestRunId: "TestRun-1",
          LastRunOn: "2024-04-25",
          TestRunStatus: "failed",
          TotalTestCases: 1,
          PassedTestCases: 0,
          FailedTestCases: 1,
          RunBy: "admin",
        },
      ],
    },
  ];

  const handleExpandAccord = (panel) => (event, isExpanded) => {
    setExpandedAccord(isExpanded ? panel : false);
  };

  function formatDateStringWithTime(dateString) {
    const date = new Date(dateString);
    const month = date.getUTCMonth();
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
    const monthName = monthNames[month];
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
        testSuiteLists.map((item, index) => {
          const panelId = `panel${index}`;
          return (
            <Accordion
              expanded={expandedAccord === panelId}
              onChange={handleExpandAccord(panelId)}
              key={index}
              sx={{
                boxShadow: "none",
                border: "1px solid rgb(217, 217, 217)",
                marginBottom: "3px",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontFamily={"Lexend Deca"} fontSize="14px">
                  {`${formatDateStringWithTime(item.TestRunDateYear)} (${item.RunDetails.length})`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: "0" }}>
                <TableData rows={item.RunDetails} />
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </Box>
  );
}
