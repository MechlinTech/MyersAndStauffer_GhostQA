import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  StyledListItem,
  StyledOutlinedInput,
  StyledTableCell,
  StyledTypography,
  useStyles,
} from "./style";
import SearchField from "../../../../comman/SearchField";
import { Delete, Edit } from "@mui/icons-material";
import { StyledFormControl } from "../Design/style";
import { ClickAwayListener } from "@material-ui/core";

export default function CompareResults() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [showTestRuns, setshowTestRuns] = useState(false)
  const [comparisionName, setcomparisionName] = useState("");
  const [checkedItems, setCheckedItems] = useState(
    Array(tests.length).fill(false)
  );

  const handleToggle = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };
  const handleCompare = ()=>{
    const runsToCompare = checkedItems.filter((item,index)=>item&&tests[index]) 
    console.log('testRuns ',runsToCompare)
  }
  const filteredData = tests.filter((data) =>
    data.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sampleData = [
    {
      name: "compare1",
      Date: "02/02/23",
      Runs: ["TestRun1","TestRun2","TestRun3","TestRun5"],
    },
    {
      name: "compare2",
      Date: "03/05/23",
      Runs: ["TestRun1","TestRun2","TestRun3","TestRun5"]
    },
    {
      name: "compare3",
      Date: "06/12/23",
      Runs: ["TestRun1","TestRun2","TestRun3","TestRun5"],
    },
    {
      name: "compare4",
      Date: "09/21/23",
      Runs: ["TestRun1","TestRun2","TestRun3","TestRun5"],
    },
    {
      name: "compare5",
      Date: "11/08/23",
      Runs: ["TestRun1","TestRun2","TestRun3","TestRun5"],
    },
  ];

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} sm={9} style={{padding:"0"}}>
        <TableContainer className={classes.tableContainerStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Runs</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleData.map((data, index) => (
                <TableRow className={classes.tableRow}>
                  <StyledTableCell>{data.name}</StyledTableCell>
                  <StyledTableCell>{data.Date}</StyledTableCell>
                  <StyledTableCell>{data.Runs[0]}<span className={classes.runs}>+{data.Runs.length-1}</span></StyledTableCell>
                  <StyledTableCell align="left">
                    <Edit sx={{color:'#654DF7',cursor:'pointer',mr:'5px'}}/>
                    <Delete sx={{color:'red',cursor:'pointer'}}/>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} sm={3} style={{ border: "1px solid #dadada" }} display="flex" flexDirection="column">
        <Grid container spacing={1} padding='5px' display='flex' justifyContent='center'>
          <Grid item xs={12} style={{padding:'0 0 10px 0'}}>
            <StyledTypography fontSize="18px" fontWeight="400">
              Start New Comparison
            </StyledTypography>
          </Grid>
          <Grid item xs={12}style={{padding:'0' }} mb={1}>
            <Typography
              style={{
                fontSize: "12px",
                color: "rgba(196, 196, 196, 0.8)",
              }}
            >
              Name of the comparison
            </Typography>
            <StyledFormControl>
            <StyledOutlinedInput
            fullWidth
              placeholder="Enter Comparison name"
              value={comparisionName}
              onChange={(e)=>setcomparisionName(e.target.value)}
            />
            </StyledFormControl>
          </Grid>
          <ClickAwayListener onClickAway={()=>setshowTestRuns(false)}>

          <Grid item xs={12} className={classes.testListContainer} style={{padding:'0'}}>
            <SearchField
              placeholder="Testruns"
              onFocus={()=>setshowTestRuns(true)}
              onChange={(value) => setSearchTerm(value)}
            />
            {showTestRuns&&(
            <Box>
              <List>
                {filteredData.map((test, index) => (
                  <StyledListItem
                    key={index}
                    onClick={() => handleToggle(index)}
                  >
                    <Checkbox
                      checked={checkedItems[index]}
                      style={{ color: "#654DF7" }}
                      size="small"
                    />
                    <ListItemText>
                      <StyledTypography>{test}</StyledTypography>
                    </ListItemText>
                  </StyledListItem>
                ))}
              </List>
            </Box>
           )}
          </Grid>
          </ClickAwayListener>
        </Grid>
        <Grid item alignSelf='end'>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "rgb(101, 77, 247)",
            "&:hover": {
              backgroundColor: "rgb(101, 77, 247)",
              borderColor: "#654DF7",
            },
          }}
          onClick={handleCompare}
        >
          Compare
        </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

const tests = ["testRun1", "testRun2", "testRun3"];
