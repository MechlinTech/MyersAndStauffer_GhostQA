import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableData } from "./TableData";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetResultsList } from "../../../redux/actions/ResultAction";
import CircularProgress from "@mui/material/CircularProgress";

export default function Results({ rootId }) {
  const [expandedAccord, setExpandedAccord] = useState("");
  const dispatch = useDispatch();
  const { resultsList } = useSelector((state) => state.result);
  const [loading, setLoading] = useState(false);

  const handleExpandAccord = (panel) => (e, isExpanded) => {
    setExpandedAccord(isExpanded ? panel : "");
  };
  useEffect(() => {
    dispatch(GetResultsList(rootId, setLoading));
  }, [rootId]);

  console.log("rootId", rootId, loading, resultsList);
  return (
    <Box>
      {loading && (
        <CircularProgress
          style={{
            color: "#654DF7",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          size={25}
        />
      )}
      {!loading && resultsList && resultsList.length > 0
        ? resultsList.map((item, index) => (
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
                  {`${item?.TestRunDate} (${item?.RunDetails?.length})`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: "0" }}>
                <TableData rows={item.RunDetails} />
              </AccordionDetails>
            </Accordion>
          ))
        : !loading && (
            <Typography
              fontFamily={"Lexend Deca"}
              fontSize="14px"
              variant="body1"
            >
              No data available
            </Typography>
          )}
    </Box>
  );
}
