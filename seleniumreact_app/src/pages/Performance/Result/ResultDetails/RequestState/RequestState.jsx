import React, { useState, useEffect } from "react";
import { Grid, Card, Button, Chip } from "@material-ui/core";
import { RequestStateTable } from "./RequestStateTable";
import { useStyles } from "./styles";
import CustomSearchField from "./CustomSerachField";
import { Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import SearchField from "../../../../../comman/SearchField";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { GetResultsDetailsBysRunId } from "../../../../../redux/actions/ResultAction";

export default function RequestState() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { runId } = useParams();
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const { executerData } = useSelector((state) => state.result);
  // Define checkedItems state
  const [checkedItems, setCheckedItems] = useState(
    Array(executerData?.results?.length).fill(false)
  );
useEffect(()=>{
  if(!executerData){
    dispatch(GetResultsDetailsBysRunId(runId))
  }
},[])

  const handleSearchChange = (transactions) => {
    console.log("handleSearchChange", transactions);
    setSelectedTransactions(transactions);
  };

  // const handleDeleteChip = (transactionId) => {
  //   setSelectedTransactions((prevSelectedTransactions) =>
  //     prevSelectedTransactions.filter(
  //       (transaction) => transaction.id !== transactionId
  //     )
  //   );
  // };

  const handleDeleteChip = (transactionId) => {
    setSelectedTransactions((prevSelectedTransactions) =>
      prevSelectedTransactions.filter(
        (transaction) => transaction.id !== transactionId
      )
    );

    // Update the state of checkboxes
    const updatedCheckedItems = checkedItems.map((checked, index) => {
      const transaction = selectedTransactions[index];
      return transaction && transaction.id === transactionId ? false : checked;
    });
    setCheckedItems(updatedCheckedItems);
  };

  const updateCheckboxes = (deletedTransactionId) => {
    const updatedCheckedItems = checkedItems.map((checked, index) => {
      const transaction = selectedTransactions[index];
      return transaction && transaction.id === deletedTransactionId
        ? false
        : checked;
    });
    setCheckedItems(updatedCheckedItems);
  };
const filteredtransactions = executerData?.transactions?.filter((trans) =>
  trans?.transaction.toLowerCase().includes(searchTerm.toLowerCase())
)
  const filteredExecuterData = executerData ? {...executerData, transactions: filteredtransactions} : null
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
                Request Statistics
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
            {/* <Grid item xs={12} sm={3} style={{ marginBottom: "10px" }}>
              <CustomSearchField
                placeholder="Search Transactions here..."
                data={executerData?.results?.map((item) => item)}
                onChange={handleSearchChange}
                selectedTransactions={selectedTransactions}
                checkedItems={checkedItems} // Pass checkedItems state
                setCheckedItems={setCheckedItems} // Pass setCheckedItems function
              />
            </Grid>
            <Grid container spacing={1} style={{ margin: "10px" }}>
              {selectedTransactions.map((transaction) => (
                <Chip
                  key={transaction.id}
                  label={transaction?.home_page?.transaction}
                  onDelete={() => handleDeleteChip(transaction.id)}
                  style={{ backgroundColor: "#654df7", color: "#fff" }}
                  deleteIcon={<ClearIcon style={{ color: "#fff" }} />}
                />
              ))}
            </Grid> */}
            <Grid item xs={12} sm={3} style={{ marginBottom: "10px" }}>
              <SearchField
                placeholder="Search transaction name..."
                onChange={(value) => setsearchTerm(value)}
              />
            </Grid>
            <RequestStateTable
              // data={
              //   selectedTransactions.length > 0 ? selectedTransactions : executerData
              // }
              data={filteredExecuterData}
            />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
