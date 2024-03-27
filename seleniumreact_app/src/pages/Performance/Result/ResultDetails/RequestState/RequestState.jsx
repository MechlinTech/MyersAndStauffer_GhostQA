import React, { useState } from "react";
import { Grid, Card, Button } from "@material-ui/core";
import { RequestStateTable } from "./RequestStateTable";
import { useStyles } from "./styles";
import CustomSearchField from "./CustomSerachField";
import { Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const data = [
  {
    transactions: "Transaction 1",
    sample: "Sample 1",
    avgResponseTime: "100",
    avgHits: "50",
    line904: "80",
    line954: "90",
    line994: "95",
    minResponseTime: "70",
    maxResponseTime: "120",
    avgBandwidth: "10",
    errorPercentage: "5%",
  },
  {
    transactions: "Transaction 2",
    sample: "Sample 2",
    avgResponseTime: "120",
    avgHits: "60",
    line904: "85",
    line954: "95",
    line994: "100",
    minResponseTime: "75",
    maxResponseTime: "130",
    avgBandwidth: "12",
    errorPercentage: "4%",
  },
];

export default function RequestState() {
  const classes = useStyles();
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const handleSearchChange = (transactions) => {
    setSelectedTransactions(transactions);
  };

  return (
    <Grid className={classes.mainContainer}>
      <Grid item xs={12} sm={12}>
        <Card className={classes.requestCard}>
          <Grid container className={classes.RequestStateHeader}>
            <Grid item>
              <Typography
                sx={{
                  fontFamily: "Lexend Deca",
                  fontSize: "30px",
                  fontWeight: "500",
                  color: "#646464",
                }}
              >
                 Request State
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                style={{
                  fontSize: 14,
                  backgroundColor: "rgb(101, 77, 247)",
                  color: "#ffffff",
                  cursor: "pointer",
                  padding: "12px 18px",
                }}
              >
                <PlayCircleOutlineIcon /> Run Now
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} style={{ marginTop: "20px" }}>
            <Grid item xs={12} sm={3} style={{ marginBottom: "10px" }}>
              <CustomSearchField
                placeholder="Search Transactions here..."
                data={data}
                onChange={handleSearchChange}
                selectedTransactions={selectedTransactions}
              />
            </Grid>
            <RequestStateTable
              data={
                selectedTransactions.length > 0 ? selectedTransactions : data
              }
            />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
