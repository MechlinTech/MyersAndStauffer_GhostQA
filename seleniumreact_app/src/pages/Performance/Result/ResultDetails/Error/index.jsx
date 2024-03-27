import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Card, CardContent } from "@mui/material";
import { useStyles } from "./styles";
import { TableData } from "./TableData";

let data = [
  {
    HeaderLabel: "February 13",
    HeaderResponseCode: "12407",
    HeaderAssertions: "0",
    HeaderEmbeddedResources: "10162",
    ErrorDetails: [
      {
        Code: "Non HTTP response code:javax.net.sslException",
        description1: "Number of samples in transactions : 15",
        description2: "Number of falling samples : 1",
        Count: "2",
      },
      {
        Code: "Non HTTP response code:javax.net.sslException",
        description1: "Number of samples in transactions : 15",
        description2: "Number of falling samples : 1",
        Count: "2",
      },
      {
        Code: "Non HTTP response code:javax.net.sslException",
        description1: "Number of samples in transactions : 15",
        description2: "Number of falling samples : 1",
        Count: "2",
      },
    ],
  },
  {
    HeaderLabel: "February 13",
    HeaderResponseCode: "12407",
    HeaderAssertions: "0",
    HeaderEmbeddedResources: "10162",
    ErrorDetails: [
      {
        Code: "Non HTTP response code:javax.net.sslException",
        description1: "Number of samples in transactions : 15",
        description2: "Number of falling samples : 1",
        Count: "2",
      },
      {
        Code: "Non HTTP response code:javax.net.sslException",
        description1: "Number of samples in transactions : 15",
        description2: "Number of falling samples : 1",
        Count: "2",
      },
    ],
  },
];

export default function Error() {
  const classes = useStyles();
  const [expandedAccord, setExpandedAccord] = React.useState("");

  const handleExpandAccord = (panel) => (e, isExpanded) => {
    setExpandedAccord(isExpanded ? panel : "");
  };

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
            <Grid container className={classes.accordionContainer}>
              {data?.map((item, index) => (
                <Accordion
                  expanded={expandedAccord === item}
                  onChange={handleExpandAccord(item)}
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
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
