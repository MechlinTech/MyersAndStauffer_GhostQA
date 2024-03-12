import * as React from 'react';
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

export default function TableTestCase({testCase,showTab}) {
const navigate = useNavigate()


  return (
    <TableContainer component={Paper} style={{
      border:'solid 2px #DADADA',
      borderRadius:'5px'
    }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Test Name</TableCell>
            <TableCell align="center">Status</TableCell>
           <TableCell align="center">Last Ecxecuted On</TableCell>
            <TableCell  align="center">Base Line</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {testCase?.map((row) => ( */}
            <TableRow
              key={0}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" onClick={()=>{
               console.log('test')
               showTab();
              }} sx={{cursor:'pointer'}}>
                {'Test Name'}
              </TableCell>
              <TableCell  align="center">{"Running"}</TableCell>
             
              <TableCell  align="center">{''}</TableCell>
              <TableCell  align="center"></TableCell>
            </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}