import React, { useState,useEffect } from "react";
import TableCell from "@material-ui/core/TableCell";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import VideocamIcon from "@mui/icons-material/Videocam";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Icon } from "@material-ui/core";
import { getVideoUrl } from "../../utils/configService";

const CustomVideoChell =  (row) => {
  const [openModal, setOpenModal] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    const fetchBaseUrl = async () => {
      const url = await getVideoUrl();
      setBaseUrl(url);
    };
    fetchBaseUrl();
  }, []);

  const videoUrl = (apiPath) => {
    console.log("API Path URL : " + apiPath);
    console.log("Test Case Video base URL : " + row.row.TestCaseVideoURL);
    return baseUrl ? `${baseUrl}${apiPath.replace(/\\/g, '/')}` : `${baseUrl}`;
  };
  
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <TableCell>
        <Icon
          component={VideocamIcon}
          style={{ color: "rgb(25, 118, 210)" }}
          onClick={handleOpenModal}
        />
      </TableCell>

      
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              maxWidth: "60vw",
              position: "relative",
            }}
          >
            <video
              autoPlay
              muted
              controls
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            >
              <source
                src={videoUrl(row.row.TestCaseVideoURL)}
                type="video/webm"
              />
            </video>
            <Box
              onClick={handleCloseModal}
              sx={{
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                right: "10px",
                height: "20px",
                color: "rgb(25, 118, 210)",
              }}
            >
              <ClearOutlinedIcon />
            </Box>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default CustomVideoChell;