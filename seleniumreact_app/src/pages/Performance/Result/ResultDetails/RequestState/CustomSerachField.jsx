import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import {
  ClickAwayListener,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

export default function CustomSearchField({
  data,
  onChange,
  checkedItems,
  setCheckedItems,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTestRuns, setShowTestRuns] = useState(false);
  
  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (!value) {
      setShowTestRuns(false);
    }
  };

  const handleToggle = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    const selected = data?.filter((item, idx) => newCheckedItems[idx]);
    onChange(selected);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowTestRuns(false);
    setCheckedItems(Array(data?.length).fill(false));
  };

  const filteredData = data?.filter((item) =>
    Object.keys(item).some((key) =>
      item[key]?.transaction?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Grid>
      <ClickAwayListener onClickAway={() => setShowTestRuns(false)}>
        <div style={{ position: "relative", width: "100%" }}>
          <TextField
            ref={searchRef}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderColor: "transparent !important",
                height: "40px",
                "&:hover fieldset": {
                  borderColor: "#654DF7",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#654DF7",
                },
              },
            }}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <SearchRoundedIcon sx={{ color: "rgb(115, 115, 115)" }} />
              ),
              endAdornment: searchTerm && (
                <ClearIcon
                  onClick={clearSearch}
                  sx={{ cursor: "pointer", color: "grey" }}
                />
              ),
              onClick: () => setShowTestRuns(true),
            }}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Transactions here..."
          />
          {showTestRuns && (
            <Box
              sx={{
                position: "absolute",
                zIndex: 9999,
                width: "100%",
                maxHeight: 200,
                overflowY: "auto",
                backgroundColor: "#fff",
                borderRadius: "4px",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
              }}
            >
              <List sx={{ width: "100%" }}>
                {filteredData?.map((item, index) => (
                  <ListItem
                    key={index}
                    onClick={() => handleToggle(index)}
                    button
                  >
                    <Checkbox
                      checked={checkedItems[index]}
                      style={{ color: "#654DF7" }}
                      size="small"
                    />
                    <ListItemText>
                      <Typography>
                        {Object.keys(item).find(
                          (key) => item[key]?.transaction
                        )}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </div>
      </ClickAwayListener>
    </Grid>
  );
}
