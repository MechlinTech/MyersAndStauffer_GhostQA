import React from "react";
import { GetEnvironment } from "../redux/actions/seleniumAction";
import { useSelector ,useDispatch} from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function  useEnvironment ()  {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddNewEnvironment, setShowAddNewEnvironment] = useState(false);
    const [showEditNewEnvironment, setShowEditNewEnvironment] = useState(false);
    const [editEnvironmentData, setEditEnvironmentData] = useState(null);
    useEffect(() => {
        dispatch(GetEnvironment());
        
        
      }, []);

      const { environementList} =useSelector((state) => state.selenium);
      console.log("environments",environementList);
      const handleAddEnvironment = () => {
        setShowAddNewEnvironment(true);
        navigate("/setting/add-environment");
        console.log("Adding Environment...");
      };
    
      const handleEditEnvironment = (rowData) => {
        setEditEnvironmentData(rowData);
        // setShowEditNewEnvironment(true);
        console.log("editdate",editEnvironmentData);
        navigate("/setting/edit-environment", { state: { editEnvironmentData: rowData } });
        console.log("editdata",editEnvironmentData);
    
    
      };
    
      const handleBackFromAddNew = () => {
        setShowAddNewEnvironment(false);
        setShowEditNewEnvironment(false);
      };

    return{
       searchTerm,
       showAddNewEnvironment,
       handleBackFromAddNew,
       showEditNewEnvironment,
       editEnvironmentData,
       handleAddEnvironment,
       showAddNewEnvironment,
       showEditNewEnvironment,
       setSearchTerm,
       handleEditEnvironment,
       environementList
    };
}
