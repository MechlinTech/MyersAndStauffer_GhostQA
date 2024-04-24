import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableData } from "./TableData";
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
 
export default function BasicAccordion({ inprogress }) {
  const { testSuiteLists } = useSelector((state) => state.selenium);
  const [expandedAccord, setExpandedAccord] = React.useState("");
  const handleExpandAccord = (panel) => (e, isExpanded) => {
    setExpandedAccord(isExpanded ? panel : "");
  };
 
  function formatDateStringWithTime(dateString) {
    const options = {
      month: "short",
      day: "numeric",
    };
 
    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  }
 
 
 
  return (
    <Box sx={{ }}>
      {inprogress ? (
        <CircularProgress size={25} style={{ marginRight: "8px", color: "#fff" }} />
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
              {`${formatDateStringWithTime(item.TestRunDateYear)} (${item?.RunDetails?.length})`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: "0" }}>
              <TableData rows={item.RunDetails} />
            </AccordionDetails>
          </Accordion>
        )))}
    </Box>
  );
}