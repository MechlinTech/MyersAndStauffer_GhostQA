import React, { forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchField = forwardRef(({ onChange, ...props }, ref) => {
  const onSearchChange = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <TextField
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          borderColor: 'transparent !important',
          height:'40px',
          '&:hover fieldset': {
            borderColor: '#654DF7',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#654DF7',
          },
        },
      }}
      variant="outlined"
      InputProps={{
        startAdornment: <SearchRoundedIcon sx={{ color: 'rgb(115, 115, 115)' }} />,
      }}
      inputRef={ref}
      onChange={onSearchChange}
      {...props}
    />
  );
});

export default SearchField;