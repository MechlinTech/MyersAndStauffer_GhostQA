import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Avatar } from "@material-ui/core";

const CustomeImgView = ({ ScreenshotUrl }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    if(ScreenshotUrl)
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Avatar
        src={ScreenshotUrl?ScreenshotUrl:""}
        alt="Screenshot"
        style={{ marginRight: "10px", backgroundColor: ScreenshotUrl?"#fff":"#654DF7",cursor:'pointer' }}
        onClick={handleOpenModal}
      />

      {/* Modal for displaying the full image */}
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
        <div>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <IconButton onClick={handleCloseModal} color="primary">
              <CloseIcon />
            </IconButton>
          </div> */}
          <img
            src={ScreenshotUrl?ScreenshotUrl:""}
            alt="Full Screenshot"
            style={{ width: "200px", height: "200px", margin: "auto",borderRadius:'50%' }}
          />
        </div>
      </Modal>
    </>
  );
};

export default CustomeImgView;
