import * as React from "react";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Card, CardContent } from "@mui/material";
import { useStyles } from "./styles";
import { TableData } from "./TableData";

// let data = [
//   {
//     HeaderLabel: "February 13",
//     HeaderResponseCode: "12407",
//     HeaderAssertions: "0",
//     HeaderEmbeddedResources: "10162",
//     ErrorDetails: [
//       {
//         Code: "Non HTTP response code:javax.net.sslException",
//         description1: "Number of samples in transactions : 15",
//         description2: "Number of falling samples : 1",
//         Count: "2",
//       },
//       {
//         Code: "Non HTTP response code:javax.net.sslException",
//         description1: "Number of samples in transactions : 15",
//         description2: "Number of falling samples : 1",
//         Count: "2",
//       },
//       {
//         Code: "Non HTTP response code:javax.net.sslException",
//         description1: "Number of samples in transactions : 15",
//         description2: "Number of falling samples : 1",
//         Count: "2",
//       },
//     ],
//   },
//   {
//     HeaderLabel: "February 13",
//     HeaderResponseCode: "12407",
//     HeaderAssertions: "0",
//     HeaderEmbeddedResources: "10162",
//     ErrorDetails: [
//       {
//         Code: "Non HTTP response code:javax.net.sslException",
//         description1: "Number of samples in transactions : 15",
//         description2: "Number of falling samples : 1",
//         Count: "2",
//       },
//       {
//         Code: "Non HTTP response code:javax.net.sslException",
//         description1: "Number of samples in transactions : 15",
//         description2: "Number of falling samples : 1",
//         Count: "2",
//       },
//     ],
//   },
// ];

export default function Error() {
  const classes = useStyles();
  const { executerData } = useSelector((state) => state.result);
  const [expandedAccord, setExpandedAccord] = React.useState("");

  const handleExpandAccord = (panel) => (e, isExpanded) => {
    setExpandedAccord(isExpanded ? panel : "");
  };

  let totalErrorCount = 0;
  const headerResponseCodes = {};

   // Initialize data array with common headers
   const data = [
    {
      HeaderLabel: "All",
      HeaderResponseCode: "",
      HeaderAssertions: "0",
      HeaderEmbeddedResources: "10162",
      ErrorDetails: []
    }
  ];

  // if (executerData?.error && executerData.error.length > 0) {
  //   // If executerData.error exists and has length > 0
  //   executerData.error.forEach((errorItem) => {
  //     // Push ErrorDetails inside the data array
  //     data[0].ErrorDetails.push({
  //       Code: errorItem.code,
  //       description: errorItem.description,
  //       count: errorItem.count
  //     });
  //   });
  // }

  if (executerData?.error && executerData.error.length > 0) {
    executerData.error.forEach((errorItem) => {
      // Update total error count
      totalErrorCount += errorItem.count;

      // Update HeaderResponseCode count
      const responseCode = errorItem.responseCode;
      if (headerResponseCodes[responseCode]) {
        headerResponseCodes[responseCode] += errorItem.count;
      } else {
        headerResponseCodes[responseCode] = errorItem.count;
      }

      // Push ErrorDetails inside the data array
      data[0].ErrorDetails.push({
        Code: errorItem.code,
        description: errorItem.description,
        count: errorItem.count
      });
    });

    // Populate HeaderResponseCode with counts
    data[0].HeaderResponseCode = Object.entries(headerResponseCodes)
      .map(([code, count]) => ` ${count}`)
      .join(", ");
  }


  return (
    <Grid container className={classes.mainContainer}>
      <Card style={{ width: "100%" }}>
        <CardContent>
          <Grid container xs={12} sm={12} className={classes.ErrorHeader}>
            <Grid item>
              <Typography
                sx={{
                  fontFamily: "Lexend Deca",
                  fontSize: "30px",
                  fontWeight: "500",
                  color: "#646464",
                }}
              >
                Errors
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="span" className={classes.subHeading}>
                Group Errors by
              </Typography>{" "}
              <Typography
                component="span"
                className={classes.subHeading}
                sx={{
                  color: "#654DF7",
                }}
              >
                Label
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            {/* Header row */}
            <Grid container spacing={0} className={classes.headerRow}>
              <Typography className={classes.headerContent}>Label</Typography>
              <Typography className={classes.headerContent}>
                Response Codes
              </Typography>
              <Typography className={classes.headerContent}>
                Assertions
              </Typography>
              <Typography className={classes.headerContent}>
                Embedded Resources
              </Typography>
              <Typography
                className={classes.headerContent}
                style={{ textAlign: "right", paddingRight: "10px" }}
              >
                Embedded Resources
              </Typography>
            </Grid>
            {/* Accordion items */}
            {/* if we empty object then its show undefine, need optimize the response */}
            {executerData?.error && executerData.error.length > 0 ? (
              <Grid container className={classes.accordionContainer}>
                {data?.map((item, index) => (
                  <Accordion
                  expanded={expandedAccord === index}
                  onChange={handleExpandAccord(index)}
                  key={index}
                  className={classes.accordion}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.accordianSummary}>
                        {`${item.HeaderLabel}`}
                      </Typography>
                      <Typography className={classes.accordianSummary}>
                        {`${item.HeaderResponseCode}`}
                      </Typography>
                      <Typography className={classes.accordianSummary}>
                        {`${item.HeaderAssertions}`}
                      </Typography>
                      <Typography className={classes.accordianSummary}>
                        {`${item.HeaderEmbeddedResources}`}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: "0" }}>
                      <TableData rows={item.ErrorDetails} />
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid>
            ) : (
              <Typography fontFamily={"Lexend Deca"} fontSize="14px">No data found</Typography>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
