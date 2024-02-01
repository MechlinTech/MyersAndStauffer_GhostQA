import React from 'react';
import { styled } from "@mui/material/styles";

export const BrowserIcon = ({ isActive, color }) => {
  return (
    <div style={{ color: isActive ? color : 'inherit' }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="16" height="16" rx="2" fill="white" />
        <path
          d="M3 1C1.89543 1 1 1.89543 1 3V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V3C15 1.89543 14.1046 1 13 1H3ZM14 3.5C14 3.22386 13.7761 3 13.5 3C13.2239 3 13 3.22386 13 3.5V11.5C13 11.7761 13.2239 12 13.5 12C13.7761 12 14 11.7761 14 11.5V3.5ZM10 3.5C10 3.22386 9.77614 3 9.5 3C9.22386 3 9 3.22386 9 3.5V11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5V3.5ZM6 3.5C6 3.22386 5.77614 3 5.5 3C5.22386 3 5 3.22386 5 3.5V11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5V3.5Z"
          fill="black"
        />
      </svg>
    </div>
  );
};

