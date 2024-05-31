import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const CustomeImgView = ({ ScreenshotUrl }) => {
  const [openModal, setOpenModal] = useState(false);
  console.log("ScreenshotUrl", ScreenshotUrl);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <img
        src={ScreenshotUrl}
        alt="Screenshot"
        onClick={handleOpenModal}
        style={{ maxWidth: "40px", maxHeight: "40px", margin: "10px",cursor:'pointer',border:'1px solid rgb(101, 77, 247)' }}
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
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            {/* Close button */}
            <IconButton onClick={handleCloseModal} color="primary">
              <CloseIcon />
            </IconButton>
          </div>
          <img
            src={ScreenshotUrl}
            alt="Full Screenshot"
            style={{ maxWidth: "80vw", maxHeight: "80vh", margin: "auto" }}
          />
        </div>
      </Modal>
    </>
  );
};

export default CustomeImgView;
