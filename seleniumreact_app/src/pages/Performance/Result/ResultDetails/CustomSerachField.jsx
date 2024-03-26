import React, { forwardRef, useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const CustomSearchField = forwardRef(
  ({ onChange, data, selectedTransactions, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const searchRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setAnchorEl(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSearchChange = (e) => {
      const { value } = e.target;
      setSearchTerm(value);
    };

    const handleMenuOpen = () => {
      setAnchorEl(searchRef.current);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleTransactionToggle = (transaction) => () => {
      const currentIndex = selectedTransactions.findIndex(
        (item) => item.transactions === transaction
      );
      const newSelectedTransactions = [...selectedTransactions];

      if (currentIndex === -1) {
        const transactionToAdd = data.find(
          (item) => item.transactions === transaction
        );
        newSelectedTransactions.push(transactionToAdd);
      } else {
        newSelectedTransactions.splice(currentIndex, 1);
      }

      onChange && onChange(newSelectedTransactions);
    };

    return (
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
            
            onClick: handleMenuOpen,
          }}
          value={searchTerm}
          onChange={handleSearchChange}
          {...props}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: anchorEl ? anchorEl.clientWidth : undefined,
            },
          }}
        >
          {data
            .filter((item) =>
              item.transactions
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((transaction, index) => (
              <MenuItem key={index}>
                <Checkbox
                  checked={selectedTransactions.some(
                    (item) => item.transactions === transaction.transactions
                  )}
                  onChange={handleTransactionToggle(transaction.transactions)}
                />
                <span>{transaction.transactions}</span>
              </MenuItem>
            ))}
        </Menu>
      </div>
    );
  }
);

export default CustomSearchField;




