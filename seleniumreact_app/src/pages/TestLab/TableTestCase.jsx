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


export default function TableTestCase({testCase}) {



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Testcase Title</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell  align="center">Video</TableCell>
            <TableCell align="center">Last run on</TableCell>
            <TableCell  align="center">Run Now</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testCase.map((row) => (
            <TableRow
              key={row.TestCaseDetailsId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.TestCaseName}
              </TableCell>
              <TableCell  align="center">{"running"}</TableCell>
              <TableCell  align="center"><span style={{
                border:"2px solid #1E1E1E",
                color:'#1E1E1E',
                padding:'8px 6px',
                borderRadius:'10px',
                display: 'flex',
                alignItems:' center',
                width: '50px',
                justifyContent: 'center',
                margin: 'auto',
              }}><PlayArrowOutlinedIcon /></span></TableCell>
              <TableCell  align="center">{'yymmddhhmmss'}</TableCell>
              <TableCell  align="center"><span style={{
                backgroundColor:'#654df7',
                color:'#fff',
                padding:'10px 6px',
                borderRadius:'50%',
                display: 'flex',
                alignItems:' center',
                width: '44px',
                justifyContent: 'center',
                margin: 'auto',
              }}><PlayArrowSharpIcon /></span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}