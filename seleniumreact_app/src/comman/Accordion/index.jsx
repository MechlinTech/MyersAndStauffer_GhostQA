import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableData } from "./TableData";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

export default function BasicAccordion() {
  const { testSuiteLists } = useSelector((state) => state.selenium);
  const [expandedAccord, setExpandedAccord] = React.useState("");
  const handleExpandAccord = (panel) => (e, isExpanded) => {
    setExpandedAccord(isExpanded ? panel : "");
  };

  console.log("testSuiteLists",testSuiteLists)



  return (
    <Box sx={{ }}>
      {testSuiteLists?.map((item, index) => (
        <Accordion
          expanded={expandedAccord === item}
          onChange={handleExpandAccord(item)}
          key={index}
          sx={{
            boxShadow: "none",
            border: "1px solid rgb(217, 217, 217)",
            marginBottom: "3px",
            // '&:hover': {
            //   border: "2px solid rgb(101, 77, 247)",
            // },
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