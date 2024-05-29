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
import { toast } from "react-toastify";
import { header } from "../../utils/authheader";
import { CircularProgress, Tooltip } from "@mui/material";
import { getBaseUrl } from "../../utils/configService";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./Comman/DeleteModal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useSelector, useDispatch } from "react-redux";
import {
  ExpandParent,
  SetSchedule,
  setExpandedNodes,
  setRootId,
  setSelectedNode,
} from "../../redux/actions/testlab/testlabAction";
import { Box } from "@material-ui/core";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

const Card = ({
  newElementName,
  setNewElementName,
  toggleExpand,
  handleCRUDCancel,
  handleKeyPress,
  handleDelete,
  // expanded = [],
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
  // selectedNodeId,
  // setSelectedNodeId,
}) => {
  const styleClass = useStylesTree();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { expanded, selectedNodeId } = useSelector((state) => state.testlab);
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
                      : {} // Apply border only if the current node is the selected node
                  }
                >
                  <div style={{ display: "flex" }}>
                    {data.some((child) => child.parentId === item.id) && (
                      <>
                        {!expanded.includes(item.id) ? (
                          <ExpandMoreIcon
                            onClick={() => toggleExpand(item.id)}
                          />
                        ) : (
                          <ExpandLessIcon
                            onClick={() => toggleExpand(item.id)}
                          />
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
                          required
                        />
                      </div>
                    )}
                    {editMode !== item.id && (
                      <span
                        onClick={() => {
                          handleTask(item, nodeCount);
                          // setSelectedNodeId(item.id); // Update the clicked node ID
                          // dispatch(setRootId(item.id));
                          dispatch(setSelectedNode(item));
                          // navigate(`/testLab/${item.id}`)
                          toggleExpand(item.id);
                          dispatch(SetSchedule(false));
                        }}
                        style={{
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      >
                        <Tooltip title={item.name.length > 30 && item.name}>
                          <Typography
                            style={{
                              fontFamily: "Lexend Deca",
                              fontSize: "14px",
                            }}
                          >
                            {" "}
                            {item.name.length > 30
                              ? item.name.slice(0, 30) + "..."
                              : item.name}
                          </Typography>
                        </Tooltip>
                      </span>
                    )}
                  </div>
                  <div className={styleClass.crud} style={{}}>
                    {nodeCount > 1 && (
                      <Tooltip title="schedule" arrow>
                        <CalendarMonthIcon
                          sx={{
                            color:
                              selectedNodeId === item.id ? "white" : "#654df7",
                          }}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            dispatch(setSelectedNode(item));
                            dispatch(SetSchedule(true));
                          }}
                        />
                      </Tooltip>
                    )}
                    {editMode == 0 && (
                      <Tooltip title="Edit" arrow>
                        <EditIcon
                          sx={{
                            color:
                              selectedNodeId === item.id ? "white" : "#654df7",
                          }}
                          onClick={() => handleEdit(item.id, item.name)}
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                    {editMode === item.id && (
                      <Tooltip title="Cancel" arrow>
                        <CancelIcon
                          sx={{ color: "#f74d4d" }}
                          onClick={() =>
                            handleEdit(item.id, item.name, "cancel")
                          }
                        />
                      </Tooltip>
                    )}
                    <Tooltip title="Delete" arrow>
                      <DeleteIcon
                        sx={{
                          color:
                            selectedNodeId === item.id ? "white" : "#f74d4d",
                        }}
                        onClick={() => handleDelete(item)}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                    {nodeCount < 4 && (
                      <Tooltip title="Add" arrow>
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
                      </Tooltip>
                    )}
                  </div>
                </div>
                {expandedInputId === item.id && expandedInputId != null && (
                  <div
                    className={styleClass.updateEdit}
                    style={{
                      display: expandedInputId === item.id ? "block" : "block",
                      marginLeft: "20px",
                    }}
                  >
                    <input
                      type="text"
                      style={{
                        fontFamily: "Lexend Deca",
                        fontSize: "14px",
                      }}
                      placeholder={
                        nodeCount == 0
                          ? "Add Project"
                          : nodeCount == 1
                          ? "Add Suite"
                          : "Test"
                      }
                      className={styleClass.addNewFolder}
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
                      // style={{ marginLeft: "20px" }}
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
                    // selectedNodeId={selectedNodeId}
                    // setSelectedNodeId={setSelectedNodeId}
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

const DynamicTreeView = ({ TestCaseHandle, listData, setListData }) => {
  const styleClass = useStylesTree();
  const dispatch = useDispatch();
  const { expanded, selectedNodeId } = useSelector((state) => state.testlab);
  // const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isFetching, setisFetching] = useState(false);
  const [nodeCount, setNodeCount] = useState(0);
  const [expandedInputId, setExpandedInputId] = useState(null);
  const [editData, setEditData] = useState(""); // State to store the value of the input field
  const [editMode, setEditMode] = useState(0); // State to store the value of the input field
  // const [expanded, setExpanded] = useState([]);
  const [newElementName, setNewElementName] = useState("");
  const [openDelModal, setopenDelModal] = useState(false);
  const [deleteItem, setsDeleteItem] = useState("");

  useEffect(() => {
    if (selectedNodeId) {
      const expandedNode = listData.find((item) => item.id === selectedNodeId);
      if (expandedNode) {
        let parentid = expandedNode.parentId;
        const parentids = [];
        while (parentid !== 0) {
          parentids.unshift(parentid);
          let parentNode = listData.find((item) => item.id === parentid);
          parentid = parentNode.parentId;
        }
        parentids.unshift(parentid);
        // setExpanded([...parentids]);
        const nodeCount = findDepth(expandedNode, listData);
        TestCaseHandle(expandedNode, nodeCount - 1);
      }
    }
  }, [listData, selectedNodeId]);
  const findDepth = (item, items) => {
    if (item.parentId === 0) {
      return 1; // Base case: root item
    } else {
      const parentItem = items.find((parent) => parent.id === item.parentId);
      if (parentItem) {
        return 1 + findDepth(parentItem, items); // Recursive call to find parent's depth
      } else {
        return 1; // If parent item is not found, assume depth of 1
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setisFetching(true);
      try {
        const BASE_URL = await getBaseUrl();
        const response = await axios.get(
          `${BASE_URL}/AddTestLab/GetDataRootRelation`,
          header()
        );
        // Assuming response.data is the array of data you want to set as listData
        setListData(response.data == "" ? [] : response.data);
        setisFetching(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setListData([]);
        setisFetching(false);
      }
    };

    fetchData();
  }, [setListData]);
  const handleCRUD = (event, parentId) => {
    event.preventDefault();
    console.log(parentId);
    // For demonstration purposes, let's add a new element if the node count is less than 4
    if (nodeCount < 4) {
      setExpandedInputId(parentId);
    } else {
      alert("Maximum node limit reached.");
    }
  };
  const handleCRUDAtParent = async (newItem) => {
    try {
      // Check if newItem.name contains only whitespace
      if (newItem.name.trim() === "") {
        console.log("Name cannot be empty.");
        toast.error("Whitespace is not allowed.");
        return;
      }
      const BASE_URL = await getBaseUrl();
      const response = await axios.post(
        `${BASE_URL}/AddTestLab/AddRootRelation`,
        {
          rootId: 0,
          node: 0,
          parent: newItem.parentId,
          name: newItem.name,
        },

        header()
      );
      if (response.data.status === "fail") {
        toast.error("Duplicate name");
      } else {
        setListData([...listData, response.data.Data[0]]); // Reset form data
        // setSelectedNodeId(response.data.Data[0].id)
        dispatch(setRootId(response.data.Data[0].id));
      }
      // setListData([...listData, response.data.Data[0]]); // need to check the response
      // setSelectedNodeId(response.data.Data[0].id);
      console.log("response after creating new node", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCRUDNewItem = useCallback(
    (parentId, nodeData) => {
      if (nodeCount < 5) {
        setExpandedInputId(null); // Hide the input field
        if (newElementName) {
          // we can trim and check if its able to add with wide space
          const newId = Math.max(...listData.map((item) => item.id)) + 1;
          const newItem = {
            name: newElementName,
            id: newId,
            parentId: parentId,
            new: "new",
          };
          handleCRUDAtParent(newItem);
          // setExpanded([...expanded, parentId]);
          dispatch(ExpandParent(parentId));
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
      // setEditMode(0);
      const itemToEdit = listData.find((item) => item.id === itemId);
      try {
        if (editData.trim() === "") {
          console.log("Name cannot be empty.", editData);
          toast.error("Whitespace is not allowed.");
          return;
        }
        const BASE_URL = await getBaseUrl();
        const response = await axios.post(
          `${BASE_URL}/AddTestLab/UpdateRootRelation`,
          {
            rootId: itemToEdit.id,
            node: 0,
            parent: itemToEdit.parentId,
            name: editData,
          },

          header()
        );
        if (response.data.status === "fail") {
          toast.error(response.data.message);
        } else {
          setEditMode(0);
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
        }
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
    // if (expanded.includes(id)) {
    //   setExpanded(expanded.filter((item) => item !== id));
    // } else {
    //   setExpanded([...expanded, id]);
    // }
    dispatch(setExpandedNodes(id));
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

  const handleDeleTeModal = (item) => {
    console.log("item", item);
    setsDeleteItem(item);
    setopenDelModal(true);
  };

  const handleDelete = async (itemId) => {
    console.log(itemId, listData);
    const itemToDelete = listData.find((item) => item.id === itemId);
    try {
      const BASE_URL = await getBaseUrl();
      const response = await axios.post(
        `${BASE_URL}/AddTestLab/DeleteRootRelation`,
        {
          rootId: itemToDelete.id,
          node: 0,
          parent: itemToDelete.parentId,
          name: itemToDelete.name,
        },

        header()
      );
      console.log("response", response.data);
      if (response.data.status == "success") {
        TestCaseHandle(itemToDelete, 0);
        setopenDelModal(false);
        toast.info("Successfully deleted", {
          style: {
            background: "rgb(101, 77, 247)",
            color: "rgb(255, 255, 255)",
          },
        });
      }
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

      console.log(newData, itemId, itemToDelete, childrenToDelete);
      try {
        const BASE_URL = await getBaseUrl();
        const response = await axios.get(
          `${BASE_URL}/AddTestLab/GetDataRootRelation`,
          header()
        );
        // Assuming response.data is the array of data you want to set as listData
        setListData(response.data == "" ? [] : response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setListData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setopenDelModal(false);
  };

  return (
    <>
      <DeleteModal
        open={openDelModal}
        onClose={() => setopenDelModal(false)}
        deleteItem={deleteItem}
        handleDelete={handleDelete}
      />
      <div className={styleClass.orgTree}>
        {isFetching ? (
          <Box style={{ textAlign: "center", padding: "10px" }}>
            <CircularProgress
              style={{ color: "rgb(101, 77, 247)" }}
              size={25}
            />
          </Box>
        ) : listData.length === 0 ? (
          <Box style={{ textAlign: "center" }}>
            <p>No workspace available.</p>
          </Box>
        ) : (
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
            // handleDelete={handleDelete}
            handleDelete={handleDeleTeModal}
            // selectedNodeId={selectedNodeId}
            // setSelectedNodeId={setSelectedNodeId}
          />
        )}
      </div>
    </>
  );
};

export default DynamicTreeView;
