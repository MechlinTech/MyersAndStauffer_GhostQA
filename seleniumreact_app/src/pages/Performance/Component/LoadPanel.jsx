import React, { useState, useRef } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chart from "react-apexcharts";
import { useNavigate } from 'react-router-dom';
import { useStyles } from "./../styles";

export default function LoadPanel({ testCase }) {
    const classes = useStyles();
    const navigate = useNavigate()
    const [graphState, setGraphState] = useState({
        options: {
            chart: {
                type: 'line',
            },
            stroke: {
                curve: 'stepline',
            },

        },
        series: [{
            data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
        }],

    }
    );
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
        <>
            <TableContainer component={Paper} style={{
                border: 'solid 2px #DADADA',
                borderRadius: '5px'
            }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Total Users*</TableCell>
                            <TableCell align="center">Total Users*</TableCell>
                            <TableCell align="center">Ramp up Time (s)</TableCell>
                            <TableCell align="center">Ramp up steps</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key={0}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell  >
                                <input type="number" value={100} className={classes.inputField} />
                            </TableCell>
                            <TableCell align="left">
                                <input type="number" value={300} className={classes.inputField} />
                            </TableCell>

                            <TableCell align="left">
                                <input type="number" value={25} className={classes.inputField} />
                            </TableCell>
                            <TableCell align="left">
                                <input type="number" value={10} className={classes.inputField} />
                            </TableCell>
                        </TableRow>


                    </TableBody>
                </Table>
            </TableContainer>
            <Chart
                options={graphState.options}
                series={graphState.series}
                type="area"

            />
        </>


    );
}