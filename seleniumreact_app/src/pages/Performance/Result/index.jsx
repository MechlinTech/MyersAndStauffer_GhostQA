import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableData } from "./TableData";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

let data = [
  {
    TestRunDateYear: "February 13",
    RunDetails: [
      {
        TestSuiteName: "eds",
        TestRunName: "TestRun-1",
        TestRunStartDateTime: "2024-02-13T19:33:54.0865355+05:30",
        TestRunEndDateTime: "2024-02-13T19:33:55.9766040+05:30",
        TestRunLoactaion: "US East (South Carolina, Google)",
        RunBy: "Nimit Jain",
        TestRunStatus: "Complete",
      },
      {
        TestSuiteName: "another_suite",
        TestRunName: "TestRun-2",
        TestRunStartDateTime: "2024-02-14T10:00:00.0000000+05:30",
        TestRunEndDateTime: "2024-02-14T10:30:00.0000000+05:30",
        TestRunLoactaion: "US East (South Carolina, Google)",
        RunBy: "Nimit Jain",
        TestRunStatus: "Running",
      },
      {
        TestSuiteName: "yet_another_suite",
        TestRunName: "TestRun-3",
        TestRunStartDateTime: "2024-02-15T08:00:00.0000000+05:30",
        TestRunEndDateTime: "2024-02-15T08:45:00.0000000+05:30",
        TestRunLoactaion: "US East (South Carolina, Google)",
        RunBy: "Nimit Jain",
        TestRunStatus: "Aborted",
      },
    ],
  },
  {
    TestRunDateYear: "March 11",
    RunDetails: [
      {
        TestSuiteName: "eds",
        TestRunName: "TestRun-1",
        TestRunStartDateTime: "2024-02-13T19:33:54.0865355+05:30",
        TestRunEndDateTime: "2024-02-13T19:33:55.9766040+05:30",
        TestRunLoactaion: "US East (South Carolina, Google)",
        RunBy: "Nimit Jain",
        TestRunStatus: "Complete",
      },
      {
        TestSuiteName: "another_suite",
        TestRunName: "TestRun-2",
        TestRunStartDateTime: "2024-02-14T10:00:00.0000000+05:30",
        TestRunEndDateTime: "2024-02-14T10:30:00.0000000+05:30",
        TestRunLoactaion: "US East (South Carolina, Google)",
        RunBy: "Nimit Jain",
        TestRunStatus: "Running",
      },
     
    ],
  },
];

export default function Results() {
  const [expandedAccord, setExpandedAccord] = React.useState("");

  const handleExpandAccord = (panel) => (e, isExpanded) => {
    setExpandedAccord(isExpanded ? panel : "");
  };

  return (
    <Box sx={{}}>
      {data?.map((item, index) => (
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
              {`${item.TestRunDateYear} (${item?.RunDetails?.length})`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: "0" }}>
            <TableData rows={item.RunDetails} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
