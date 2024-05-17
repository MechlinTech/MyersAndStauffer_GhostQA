import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationList } from "../redux/actions/locationAction";

export default function useLocation() {
  const dispatch = useDispatch();
  const { locationList } = useSelector((state) => state.location);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1); 
  console.log("totalPages",locationList)

  useEffect(() => {
    dispatch(getLocationList(page));
  }, [page, dispatch]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleAddApplication = () => {
    setOpenModal(true);
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, locationList.totalPages));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return {
    locationList,
    openModal,
    setOpenModal,
    handleClose,
    handleAddApplication,
    handleNextPage,
    handlePrevPage,
    page,
    setPage,
  };
}
