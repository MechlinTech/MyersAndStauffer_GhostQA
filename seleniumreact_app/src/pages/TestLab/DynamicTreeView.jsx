import React, { useState } from "react";
import { useStylesTree } from "./styleTree";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const data = [
  {
    "name": "Root",
    "id": 1,
    "parentId": 0
  },
  {
    "name": "Root 2",
    "id": 10,
    "parentId": 0
  },
  {
    "name": "data 1",
    "id": 2,
    "parentId": 1
  },
  {
    "name": "data 2",
    "id": 3,
    "parentId": 1
  },
  {
    "name": "data 3",
    "id": 4,
    "parentId": 3
  }
];

const Card = ({ setListData, data, expandedData = true, nodeData = 0, handleCRUDAtParent, nodeCount = 0, handleNodeCount, expandedInputId, setExpandedInputId, handleTask }) => {
  const styleClass = useStylesTree();
  const [expanded, setExpanded] = useState(false);
  const [newElementName, setNewElementName] = useState(''); // State to store the value of the input field
  const [editMode, setEditMode] = useState(0); // State to store the value of the input field


  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleCRUD = (parentId) => {
    // For demonstration purposes, let's add a new element if the node count is less than 4
    if (nodeCount < 4) {
      setExpandedInputId(parentId);
    } else {
      alert('Maximum node limit reached.');
    }
  };
  const handleCRUDNewItem = (parentId) => {
    // For demonstration purposes, let's add a new element if the node count is less than 4
    if (nodeCount < 4) {
      setExpandedInputId(null); // Hide the input field
      if (newElementName) {
        const newId = Math.max(...data.map(item => item.id)) + 1;
        const newItem = { name: newElementName, id: newId, parentId: parentId };
        handleCRUDAtParent(newItem);
        setExpanded(true);
        setNewElementName('');
      }
    } else {
      alert('Maximum node limit reached.');
    }
  };

  const handleKeyPress = (event, parentId) => {
    if (event.key === 'Enter') {
      handleCRUDNewItem(parentId);
    }
  };
  const handleKeyPressEdit = (event) => {
    if (event.key === 'Enter') {
      setEditMode(0);
    }
  };
  const handleEdit = (itemId) => {

    setEditMode(current => itemId);
  };
  const handleEditChange = (itemId, name) => {
    const itemToEdit = data.find(item => item.id === itemId);
    console.log(itemToEdit, data, itemId, name, itemToEdit.name)

    const newData = data.filter((item) => {
      if (item.id !== itemId) {
        return item;
      } else if (item.id === itemId) {
        item.name = name;
        return item;
      }
    });
    setListData(newData);

  };

  const handleDelete = (itemId) => {
    console.log(itemId, data);
    const itemToDelete = data.find(item => item.id === itemId);
    const childrenToDelete = data.filter(item => item.parentId === itemId);
    const updatedData = data.filter(item => item.id !== itemId && item.parentId !== itemId);
    const parentIdOfParent = itemToDelete ? itemToDelete.parentId : null;
    const updatedChildren = childrenToDelete.map(child => ({
      ...child,
      parentId: parentIdOfParent,
    }));
    const newData = [...updatedData, ...updatedChildren];
    console.log(newData, itemId, itemToDelete, childrenToDelete);
    setListData(newData);
  };

  return (
    <>
      <ul style={{ display: (expandedData ? 'block' : 'none') }} className={(nodeData == 0 ? styleClass.rootNodeFolder : styleClass.child)}>
        {data.map(item => {
          if (item.parentId === nodeData) {
            return (
              <li key={item.id} className={styleClass.cardListHolder}>
                <div className={styleClass.cardListHolderList}>
                  {data.some(child => child.parentId === item.id) && (
                    <>
                      {expanded ? <ExpandMoreIcon onClick={toggleExpand} /> : <ExpandLessIcon onClick={toggleExpand} />}
                    </>
                  )}
                  {editMode === item.id &&
                    <input type="text" value={item.name} className={styleClass.editTheFolder}
                      onChange={(e) => handleEditChange(item.id, e.currentTarget.value)}
                      onKeyPress={(event) => handleKeyPressEdit(event)}
                    />

                  }
                  {editMode !== item.id &&
                    <span onClick={handleTask} style={{
                      cursor: 'pointer',
                      fontSize:'18px'
                    }}>
                      {item.name}
                    </span>
                  }
                  <div className={styleClass.crud} style={{
                    
                  }}>
                    <EditIcon sx={{ color: '#654df7' }} onClick={() => handleEdit(item.id)} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                    <DeleteIcon sx={{ color: '#f74d4d' }} onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer' }} />
                    {nodeCount < 4 && (
                      <AddIcon sx={{ color: '#654df7' }} onClick={() => handleCRUD(item.id)} style={{
                        marginLeft: 'auto'
                      }} />
                    )}
                  </div>

                </div>
                <div style={{ display: (expandedInputId === item.id ? 'block' : 'none') }}>
                  <input type="text" className={styleClass.editTheFolder} value={newElementName} onChange={(e) => setNewElementName(e.target.value)} onKeyPress={(event) => handleKeyPress(event, item.id)} />
                </div>
                {data.some(child => child.parentId === item.id) && (
                  <Card
                    data={data}
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

const DynamicTreeView = ({ TestCaseHandle }) => {
  const [listData, setListData] = useState(data);
  const [nodeCount, setNodeCount] = useState(0);
  const [expandedInputId, setExpandedInputId] = useState(null);

  const handleCRUDAtParent = (newItem) => {
    setListData([...listData, newItem]);
  };

  const handleNodeCount = (count) => {
    setNodeCount(count);
  };

  return (
    <div className="org-tree">
      <Card data={listData} keyData={0} handleTask={TestCaseHandle} nodeData={0} handleCRUDAtParent={handleCRUDAtParent} nodeCount={nodeCount} handleNodeCount={handleNodeCount} expandedInputId={expandedInputId} setExpandedInputId={setExpandedInputId} setListData={setListData} />
    </div>
  );
};

export default DynamicTreeView;