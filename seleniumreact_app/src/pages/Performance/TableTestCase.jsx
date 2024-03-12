import React, { useState, useRef } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useNavigate } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';

import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useStyles } from "./styles";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DesignTabs from "./Component/DesignTabs";
export default function TableTestCase({ testCase }) {
  const navigate = useNavigate()
  const classes = useStyles();
  const testNamefield = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [designTabsActive, setDesignTabsActive] = useState(false);
  const handleActiveTabs = () => {
    setDesignTabsActive(!designTabsActive)
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const [testCaseData, setTestCaseData] = useState([{
    id: 1,
    name: 'Test name ',
    file: '',
    fileName: 'Myscript1.jmx'
  }, {
    id: 2,
    name: 'Test name ',
    file: '',
    fileName: 'Myscript1.jmx'
  }]);
  const [expanded, setExpanded] = useState([]);

  const toggleExpand = (id) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter(item => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
    handleActiveTabs();
  };
  return (
    <TableContainer component={Paper} style={{
      border: 'solid 2px #DADADA',
      borderRadius: '5px'
    }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Test Name</TableCell>
            <TableCell align="left">File name</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testCaseData?.map((item) => (
            <>
              <TableRow
                key={0}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" onClick={() => {

                  handleActiveTabs();
                }} sx={{ cursor: 'pointer' }}>
                  {'Test Name'}
                </TableCell>
                <TableCell align="left">{"Running"}</TableCell>


                <TableCell align="right">
                  <DeleteIcon sx={{ color: '#f74d4d' }} style={{ cursor: 'pointer' }} />
                  {!expanded.includes(item.id) ? <ExpandMoreIcon onClick={() => toggleExpand(item.id)} /> : <ExpandLessIcon onClick={() => toggleExpand(item.id)} />}

                </TableCell>

              </TableRow>
              {expanded.includes(item.id) &&
                <TableRow>
                  <TableCell colSpan='4'>
                    <DesignTabs />
                  </TableCell>

                </TableRow>
              }

            </>


          ))}


          <TableRow
            key={0}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" sx={{ cursor: 'pointer' }}>
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

              <input type='text' placeholder='Enter Test Name' ref={testNamefield} style={{
                fontSize: 14,
                borderRadius: '4px',
                border: "solid 2px #DADADA",
                padding: "6px 14px"
              }} />
            </TableCell>
            <TableCell align="left">
              <Button style={{
                fontSize: 14,
                backgroundColor: "rgb(101, 77, 247)",
                color: "#ffffff",
                cursor: "pointer",
                padding: "6px 14px"
              }}
                onClick={handleButtonClick}>
                <AddIcon />
                {selectedFile ? `${selectedFile.name}` : 'Add '}

              </Button>

            </TableCell>


            <TableCell align="left">

            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}