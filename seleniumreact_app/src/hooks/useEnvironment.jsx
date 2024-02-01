import React from "react";
import { GetEnvironment } from "../redux/actions/seleniumAction";
import { useSelector ,useDispatch} from "react-redux";
import { useState,useEffect } from "react";


export default function  useEnvironment ()  {
    const dispatch=useDispatch();
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
        console.log("Adding Environment...");
      };
    
      const handleEditEnvironment = (rowData) => {
        setShowEditNewEnvironment(true);
        setEditEnvironmentData(rowData);
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
