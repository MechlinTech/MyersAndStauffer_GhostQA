import { styled } from "@mui/material/styles";

export const StepsIcon = styled((props) => {
  const { className } = props;

  return (
    <div className={className}>
    <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="0.8396" width="33.8507" height="26.4314" rx="4" fill="#00A879" fill-opacity="0.19"/>
    <path d="M12.5185 14.8065H7.11719V20.2078H12.5185V14.8065ZM19.7228 9.40132H14.3215V20.2078H19.7228V9.40132ZM21.5259 4V20.2078H26.9272V4H21.5259ZM7.11719 23.81H26.9272V22.0108H7.11719V23.81Z" fill="#00A879"/>
    </svg>
    </div>
  );
})`
  display: flex;
`;
