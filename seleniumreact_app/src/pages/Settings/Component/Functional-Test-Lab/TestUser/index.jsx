import React, { useEffect, useState } from "react";
import { Grid, Card } from "@material-ui/core";
import { Button } from "@mui/material";
import { useStyles } from "./styles";
import AddNewTestUser from "./AddNewTestUser";
// import SearchField from "../../../../comman/SearchField";
import { CustomTable } from "./CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { GetTestUserList } from "../../../../../redux/actions/settingAction";
import SearchField from "../../../../../comman/SearchField";
// import { GetTestUserList } from "../../../../redux/actions/settingAction";

let UserList = [
  {
    UserId: 1,
    UserName: "Jacob",
    Password: "Dev@123",
  },
  {
    UserId: 2,
    UserName: "Emily",
    Password: "Code!456",
  },
  {
    UserId: 3,
    UserName: "Michael",
    Password: "Pass#789",
  },
  {
    UserId: 4,
    UserName: "Olivia",
    Password: "Secure$321",
  },
  {
    UserId: 5,
    UserName: "Liam",
    Password: "Lock@654",
  },
];

export default function TestUser() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { testUserList } = useSelector((state) => state.settings);
  const [showAddNewTestUser, setShowAddNewTestUser] = useState(false);
  const [userEdit, setUserEdit] = useState(null);
  const [addOredit, setaddOredit] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(GetTestUserList());
  }, []);

  const handleBack = () => {
    setShowAddNewTestUser(false);
    setUserEdit(null);
  };

  const handleAddUser = () => {
    setShowAddNewTestUser(true);
    setaddOredit("Add");
  };

  const handleEdit = (row) => {
    setUserEdit(row);
    setaddOredit("Edit");
    setShowAddNewTestUser(true);
  };

  const filteredData = testUserList
    ? testUserList.filter((data) =>
        data?.UserName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      )
    : [];

  return (
    <>
      <>
        {showAddNewTestUser ? (
          <AddNewTestUser
            onBack={handleBack}
            addOredit={addOredit}
            userEdit={userEdit}
            setUserEdit={setUserEdit}
          />
        ) : (
          <Grid
            container
            className={classes.header}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={6} className={classes.header}>
              <div className={classes.highlight}>Test Users</div>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                onClick={handleAddUser}
                sx={{
                  backgroundColor: "rgb(101, 77, 247)",
                  "&:hover": {
                    backgroundColor: "rgb(101, 77, 247) !important",
                    borderColor: "#654DF7",
                    color: "#fff",
                    "&:before": {
                      backgroundColor: "rgb(101, 77, 247) !important",
                      color: "#fff",
                    },
                  },
                  color: "#fff",
                }}
              >
                Add New Test User
              </Button>
            </Grid>
          </Grid>
        )}

        {/* Body */}

        {!showAddNewTestUser && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Card style={{ textAlign: "center", margin: "20px" }}>
                <Grid item style={{ margin: "8px 20px" }}>
                  <SearchField
                    placeholder="Search Username"
                    onChange={(value) => setSearchTerm(value)}
                  />
                </Grid>
                <Grid item>
                  <CustomTable
                    rows={filteredData}
                    handleEditUser={handleEdit}
                  />
                </Grid>
              </Card>
            </Grid>
          </Grid>
        )}
      </>
    </>
  );
}
