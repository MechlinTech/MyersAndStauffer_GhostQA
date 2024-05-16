import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocationList } from "../redux/actions/locationAction";

export default function useLocation() {
  const dispatch = useDispatch();
  const { locationList } = useSelector((state) => state.location);
  const [openModal, setOpenModal] = useState(false);
  const totalPages = useSelector((state) => state.location.totalPages);
  const [page, setPage] = useState(1); // State variable for current page
  const pageSize = 10; // Set the page size

  useEffect(() => {
    dispatch(getLocationList(page, pageSize));
  }, [page, dispatch]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleAddApplication = () => {
    setOpenModal(true);
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
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
    page, setPage,
    totalPages,
    pageSize
  };
}
