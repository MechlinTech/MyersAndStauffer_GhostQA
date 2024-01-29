import React from "react";
import { styled } from "@mui/material/styles";

export const UserManagementIcon = styled(({ className, isActive, color }) => (
  <div className={className} color={color} isActive={isActive}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M14.2853 12.5446C14.2853 13.2589 14.068 13.8229 13.6335 14.2366C13.199 14.6503 12.6216 14.8571 11.9014 14.8571H4.0978C3.37756 14.8571 2.80018 14.6503 2.36565 14.2366C1.93113 13.8229 1.71387 13.2589 1.71387 12.5446C1.71387 12.2291 1.72428 11.9211 1.74512 11.6205C1.76595 11.3199 1.80762 10.9955 1.87012 10.6473C1.93262 10.2991 2.01149 9.97616 2.10672 9.67854C2.20196 9.38092 2.32994 9.09074 2.49065 8.808C2.65137 8.52526 2.83589 8.28419 3.04422 8.08479C3.25256 7.88538 3.50702 7.72616 3.80762 7.60711C4.10821 7.48806 4.44006 7.42854 4.80315 7.42854C4.85672 7.42854 4.98172 7.49252 5.17815 7.6205C5.37458 7.74848 5.59631 7.89133 5.84333 8.04907C6.09035 8.20681 6.41178 8.34967 6.80762 8.47764C7.20345 8.60562 7.60077 8.66961 7.99958 8.66961C8.39839 8.66961 8.79571 8.60562 9.19155 8.47764C9.58738 8.34967 9.90881 8.20681 10.1558 8.04907C10.4029 7.89133 10.6246 7.74848 10.821 7.6205C11.0174 7.49252 11.1424 7.42854 11.196 7.42854C11.5591 7.42854 11.891 7.48806 12.1915 7.60711C12.4921 7.72616 12.7466 7.88538 12.9549 8.08479C13.1633 8.28419 13.3478 8.52526 13.5085 8.808C13.6692 9.09074 13.7972 9.38092 13.8924 9.67854C13.9877 9.97616 14.0665 10.2991 14.129 10.6473C14.1915 10.9955 14.2332 11.3199 14.254 11.6205C14.2749 11.9211 14.2853 12.2291 14.2853 12.5446ZM11.4282 4.57139C11.4282 5.51782 11.0933 6.32586 10.4237 6.9955C9.75405 7.66514 8.94601 7.99996 7.99958 7.99996C7.05315 7.99996 6.24512 7.66514 5.57547 6.9955C4.90583 6.32586 4.57101 5.51782 4.57101 4.57139C4.57101 3.62496 4.90583 2.81693 5.57547 2.14729C6.24512 1.47764 7.05315 1.14282 7.99958 1.14282C8.94601 1.14282 9.75405 1.47764 10.4237 2.14729C11.0933 2.81693 11.4282 3.62496 11.4282 4.57139Z"
        fill={color}
      />
    </svg>
  </div>
))`
  display: flex;
  color: ${(props) => (props.isActive ? props.color : "inherit")};
`;
