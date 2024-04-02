import React, { useState, useCallback, useEffect } from "react";
import { useStylesTree } from "./styleTree";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { header } from "../../utils/authheader";
import { useDispatch } from "react-redux";
import { ResetLocationScenarioVUCount } from "../../redux/actions/settingAction";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Card = ({
  newElementName,
  setNewElementName,
  toggleExpand,
  handleCRUDCancel,
  handleKeyPress,
  handleDelete,
  expanded = [],
  handleCRUD,
  handleEdit,
  editMode,
  editData,
  setEditData,
  setEditMode,
  handleEditChange,
  handleKeyPressEdit,
  setListData,
  data,
  expandedData = true,
  nodeData = 0,
  handleCRUDAtParent,
  nodeCount = 1,
  handleNodeCount,
  expandedInputId,
  setExpandedInputId,
  handleTask,
  keyData = 0,
  selectedNodeId,
  setSelectedNodeId,
}) => {
  const styleClass = useStylesTree();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    function updateNodeDepth(data, parentId, depth) {
      const children = data.filter((node) => node.parentId === parentId);
      for (const child of children) {
        child.node = depth;
        updateNodeDepth(data, child.id, depth + 1);
      }
    }

    function calculateDepth(data) {
      const roots = data.filter((node) => node.parentId === 0);
      for (const root of roots) {
        updateNodeDepth(data, root.id, 1);
      }
    }
    nodeCount = calculateDepth(data);
  }, [data]);

  return (
    <>
      <ul
        style={{
          display: !expanded.includes(keyData)
            ? keyData == 0
              ? "block"
              : "none"
            : expanded.includes(keyData)
            ? "block"
            : "none",
        }}
        className={nodeData == 0 ? styleClass.rootNodeFolder : styleClass.child}
      >
        {data.map((item) => {
          if (item.parentId === nodeData) {
            return (
              <li key={item.id} className={styleClass.cardListHolder}>
                <div
                  className={styleClass.cardListHolderList}
                  style={
                    selectedNodeId === item.id
                      ? {
                          backgroundColor: "#654df7",
                          border: "2px solid #654df7",
                          color: "white",
                        }
                      : {}
                  }
                >
                  <div style={{display:'flex'}}>
                  {data.some((child) => child.parentId === item.id) && (
                    <>
                      {!expanded.includes(item.id) ? (
                        <ExpandMoreIcon onClick={() => toggleExpand(item.id)} />
                      ) : (
                        <ExpandLessIcon onClick={() => toggleExpand(item.id)} />
                      )}
                    </>
                  )}
                  {editMode === item.id && (
                    <div className={styleClass.updateEdit}>
                      <input
                        type="text"
                        value={editData}
                        className={styleClass.editTheFolder}
                        onChange={(e) =>
                          handleEditChange(item.id, e.currentTarget.value)
                        }
                        onKeyPress={(event) =>
                          handleKeyPressEdit(event, item.id, nodeCount)
                        }
                        maxLength={250}
                      />
                      {/* <CancelIcon
                        sx={{ color: "#f74d4d" }}
                        onClick={() => handleEdit(item.id, item.name, "cancel")}
                      /> */}
                    </div>
                  )}
                  {editMode !== item.id && (
                    <span
                      onClick={() => {
                        navigate('/performance') 
                        handleTask(item.id,nodeCount);
                        setSelectedNodeId(item.id);
                        if(item.id !== selectedNodeId)
                        dispatch(ResetLocationScenarioVUCount())
                      }}
                      style={{
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                     <Tooltip title={item.name.length>30 && item.name}>
                      <Typography
                        style={{ fontFamily: "Lexend Deca", fontSize: "14px" }}
                      >
                        {" "}
                        {item.name.length>30?item.name.slice(0,30)+"...":item.name}
                      </Typography>
                      </Tooltip>
                    </span>
                  )}
                  </div>
                  <div className={styleClass.crud} style={{}}>
                    {editMode == 0 && (
                      <EditIcon
                        sx={{
                          color:
                            selectedNodeId === item.id ? "white" : "#654df7",
                        }}
                        onClick={() => handleEdit(item.id, item.name)}
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                      />
                    )}
                    {editMode === item.id && <CancelIcon
                        sx={{ color: "#f74d4d" }}
                        onClick={() => handleEdit(item.id, item.name, "cancel")}
                      />}
                    <DeleteIcon
                      sx={{ color: selectedNodeId === item.id?'white': "#f74d4d" }}
                      onClick={() => handleDelete(item.id)}
                      style={{ cursor: "pointer" }}
                    />
                    {nodeCount < 2 && (
                      <AddIcon
                        sx={{
                          color:
                            selectedNodeId === item.id ? "white" : "#654df7",
                        }}
                        onClick={(event) => handleCRUD(event, item.id)}
                        style={{
                          marginLeft: "auto",
                        }}
                      />
                    )}
                  </div>
                </div>
                {expandedInputId === item.id && expandedInputId != null && (
                  <div
                    className={styleClass.updateEdit}
                    style={{
                      display: expandedInputId === item.id ? "block" : "block",
                    }}
                  >
                    <input
                      type="text"
                      className={styleClass.editTheFolder}
                      value={newElementName}
                      key={item.id}
                      onChange={(e) => setNewElementName(e.target.value)}
                      onKeyPress={(event) =>
                        handleKeyPress(event, item.id, nodeCount)
                      }
                    />
                    <CancelIcon
                      sx={{ color: "#f74d4d" }}
                      onClick={() => handleCRUDCancel()}
                      style={{ marginLeft: "20px" }}
                    />
                  </div>
                )}

                {data.some((child) => child.parentId === item.id) && (
                  <Card
                    data={data}
                    handleEdit={handleEdit}
                    keyData={item.id}
                    nodeData={item.id}
                    handleCRUDAtParent={handleCRUDAtParent}
                    expandedData={expanded}
                    getparentId={item.parentId}
                    nodeCount={nodeCount + 1}
                    handleNodeCount={handleNodeCount}
                    expandedInputId={expandedInputId}
                    setExpandedInputId={setExpandedInputId}
                    handleTask={handleTask}
                    setListData={setListData}
                    handleKeyPressEdit={handleKeyPressEdit}
                    handleEditChange={handleEditChange}
                    editData={editData}
                    setEditData={setEditData}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    newElementName={newElementName}
                    setNewElementName={setNewElementName}
                    handleCRUD={handleCRUD}
                    expanded={expanded}
                    toggleExpand={toggleExpand}
                    handleCRUDCancel={handleCRUDCancel}
                    handleKeyPress={handleKeyPress}
                    handleDelete={handleDelete}
                    selectedNodeId={selectedNodeId}
                    setSelectedNodeId={setSelectedNodeId}
                  />
                )}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </>
  );
};

const DynamicTreeView = ({ TestCaseHandle, listData, setListData,  params }) => {
  const styleClass = useStylesTree();
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodeCount, setNodeCount] = useState(0);
  const [expandedInputId, setExpandedInputId] = useState(null);
  const [editData, setEditData] = useState(""); // State to store the value of the input field
  const [editMode, setEditMode] = useState(0); // State to store the value of the input field
  const [expanded, setExpanded] = useState([]);
  const [newElementName, setNewElementName] = useState(""); // State to store the value of the input field

  useEffect(() => {
    if (params !== null && params !== undefined) {
      setSelectedNodeId(parseInt(params)); 
    } 
  }, [params]);

  console.log("selectedNodeId", params)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/Performance/GetProjectData`,
          header()
        );
        // Assuming response.data is the array of data you want to set as listData
        setListData(response.data == "" ? [] : response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setListData([]);
      }
    };

    fetchData();
  }, [setListData]);
  useEffect(() => {
    if (selectedNodeId) {
      const expandedNode = listData.find(item => item.id === selectedNodeId);
      if (expandedNode) {
       let  parentid = expandedNode.parentId
        const parentids = []
        while(parentid !== 0){
          parentids.unshift(parentid)
          let parentNode = listData.find(item => item.id === parentid);
          parentid = parentNode.parentId
        }
        parentids.unshift(parentid)
        setExpanded([...parentids]);
        const nodeCount = findDepth(expandedNode,listData)
        TestCaseHandle(expandedNode.id,nodeCount-1)
      }
    }
  }, [listData, selectedNodeId]);

  const findDepth = (item, items) => {
    if (item.parentId === 0) {
        return 1; // Base case: root item
    } else {
        const parentItem = items.find(parent => parent.id === item.parentId);
        if (parentItem) {
            return 1 + findDepth(parentItem, items); // Recursive call to find parent's depth
        } else {
            return 1; // If parent item is not found, assume depth of 1
        }
    }
};
  const handleCRUD = (event, parentId) => {
    event.preventDefault();
    console.log(parentId);
    // For demonstration purposes, let's add a new element if the node count is less than 2
    if (nodeCount < 2) {
      setExpandedInputId(parentId);
    } else {
      alert("Maximum node limit reached.");
    }
  };
  const handleCRUDAtParent = async (newItem) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/Performance/AddProjectData`,
        {
          id: 0,
          parentId: newItem.parentId,
          name: newItem.name,
        },

        header()
      );
      setListData([...listData, response.data.Data[0]]); // Reset form data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCRUDNewItem = useCallback(
    (parentId, nodeData) => {
      if (nodeCount < 3) {
        setExpandedInputId(null); // Hide the input field
        if (newElementName) {
          const newId = Math.max(...listData.map((item) => item.id)) + 1;
          const newItem = {
            name: newElementName,
            id: newId,
            parentId: parentId,
            new: "new",
          };
          handleCRUDAtParent(newItem);
          setExpanded([...expanded, parentId]);

          setNewElementName("");
        }
      } else {
        alert("Maximum node limit reached.");
      }
      console.log(listData);
    },
    [nodeCount, newElementName, listData, handleCRUDAtParent]
  );

  const handleNodeCount = (count) => {
    setNodeCount(count);
  };
  const handleKeyPressEdit = async (event, itemId, node) => {
    if (event.key === "Enter") {
      setEditMode(0);
      const itemToEdit = listData.find((item) => item.id === itemId);
      try {
        const response = await axios.post(
          `${BASE_URL}/Performance/UpdateProjectData`,
          {
            id: itemToEdit.id,
            parentId: itemToEdit.parentId,
            name: editData,
          },

          header()
        );
        const newData = listData.filter((item) => {
          if (item.id !== itemId) {
            return item;
          } else if (item.id === itemId) {
            item.name = editData;
            return item;
          }
        });
        setListData(newData);
        setEditData("");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const handleEdit = (itemId, name, mode = "edit") => {
    if (mode == "edit") {
      setEditMode(itemId);
      setEditData(name);
    } else if (mode == "cancel") {
      setEditData("");
      setEditMode(0);
    }
  };

  const handleEditChange = (itemId, name) => {
    setEditData(name);
  };

  const toggleExpand = (id) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter((item) => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  };
  const handleCRUDCancel = () => {
    setNewElementName("");
    setExpandedInputId(0);
  };

  const handleKeyPress = (event, parentId, nodeData) => {
    if (event.key === "Enter") {
      handleCRUDNewItem(parentId, nodeData);
    }
  };
  const handleDelete = async (itemId) => {
    console.log(itemId, listData);
    const itemToDelete = listData.find((item) => item.id === itemId);
    try {
      const response = await axios.post(
        `${BASE_URL}/Performance/DeleteProjectData`,
        {
          id: itemToDelete.id,
          parentId: itemToDelete.parentId,
          name: itemToDelete.name,
        },

        header()
      );
      const childrenToDelete = listData.filter(
        (item) => item.parentId === itemId
      );
      const updatedData = listData.filter(
        (item) => item.id !== itemId && item.parentId !== itemId
      );
      const parentIdOfParent = itemToDelete ? itemToDelete.parentId : null;
      const updatedChildren = childrenToDelete.map((child) => ({
        ...child,
        parentId: parentIdOfParent,
      }));
      const newData = [...updatedData, ...updatedChildren];

      const responsedata = await axios.get(
        `${BASE_URL}/Performance/GetProjectData`,
        header()
      );
      // Assuming response.data is the array of data you want to set as listData
      setListData(responsedata.data == "" ? [] : responsedata.data);
      console.log(responsedata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styleClass.orgTree}>
      {listData.length != 0 && (
        <Card
          handleEdit={handleEdit}
          handleKeyPressEdit={handleKeyPressEdit}
          handleEditChange={handleEditChange}
          editData={editData}
          setEditData={setEditData}
          editMode={editMode}
          setEditMode={setEditMode}
          data={listData}
          keyData={0}
          handleTask={TestCaseHandle}
          nodeData={0}
          handleCRUDAtParent={handleCRUDAtParent}
          nodeCount={nodeCount}
          handleNodeCount={handleNodeCount}
          expandedInputId={expandedInputId}
          setExpandedInputId={setExpandedInputId}
          setListData={setListData}
          newElementName={newElementName}
          setNewElementName={setNewElementName}
          handleCRUD={handleCRUD}
          expanded={expanded}
          toggleExpand={toggleExpand}
          handleCRUDCancel={handleCRUDCancel}
          handleKeyPress={handleKeyPress}
          handleDelete={handleDelete}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
        />
      )}
    </div>
  );
};

export default DynamicTreeView;
