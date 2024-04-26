import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Modal from '@material-ui/core/Modal';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { getImageUrl } from '../../utils/configService';

const CustomeTableChell = async ({ row }) => {
  const [openModal, setOpenModal] = useState(false);
  const baseUrl = await getImageUrl();
  const ImageUrl = (apiPath) => {
    return `${baseUrl}${apiPath.replace(/\\/g, '/')}`;
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
        <ImageOutlinedIcon
          style={{ cursor: 'pointer' }}
          onClick={handleOpenModal}
        />
      </TableCell>

      {/* Modal for displaying the full image */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            {/* Close button */}
            <IconButton onClick={handleCloseModal} color="primary">
              <CloseIcon />
            </IconButton>
          </div>
          <img
           src={ImageUrl(row.FailureScreenShots)}
            alt="Full Screenshot"
            style={{ maxWidth: '80vw', maxHeight: '80vh', margin: 'auto' }}
          />
        </div>
      </Modal>
    </>
  );
};

export default CustomeTableChell;