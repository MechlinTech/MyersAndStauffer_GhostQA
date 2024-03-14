import React, { useState, useRef, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useStyles } from "../styles";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Select from "react-select";
import DeleteIcon from '@mui/icons-material/Delete';
const data =[{
    value: 'mumbaiindia',
    label: 'Mumbai India',
},{
    value: 'mumbaiindia1',
    label: 'Mumbai India',
}];
export default function LocationPanel({ testCase }) {
   
    const classes = useStyles();
    const [locationData, setLocationData] = useState([{
        location: 'mumbaiindia',
        traffic: 25,
        numUser: 10,
        id: 1
    }, {
        location: 'mumbaiindia',
        traffic: 25,
        numUser: 15,
        id: 2
    }
    ]);
    const [formData, setFormData] = useState({
        selectedLocation: null,
    });
    const [valueLocation, setValueLocation] = useState(data);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [addLocation, setAddLocation] = useState(false);

    const [designTabsActive, setDesignTabsActive] = useState(false);
    const handleActiveTabs = () => {
        setDesignTabsActive(!designTabsActive)
    }
    const handleFieldChange = (index, fieldName, value) => {
        console.log(index,locationData,'sdfsdfsfs')
        const newData = [...locationData];
        newData[index] = { ...newData[index], [fieldName]: value };
        setLocationData(newData);

    };
    useEffect(()=>{

    },[locationData])
    return (
        <>
            <Button
                variant="contained"
                onClick={() => setAddLocation(!addLocation)}


                style={{
                    fontSize: 14,
                    backgroundColor: "rgb(101, 77, 247)",
                    color: "#ffffff",
                    cursor: "pointer",
                    padding: "8px 14px",
                    marginTop: '0px',
                    marginBottom: '10px',
                    marginLeft: "auto",
                    display: 'block',
                }}
            >

                <AddIcon />  Add more test
            </Button>
            <TableContainer component={Paper} style={{
                border: 'solid 2px #DADADA',
                borderRadius: '5px'
            }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ width: '50%' }}>Locations</TableCell>
                            <TableCell align="center" style={{ width: '20%' }}>% of Traffic</TableCell>
                            <TableCell align="center" style={{ width: '20%' }}>no. of Users (s)</TableCell>
                            <TableCell align="center" style={{ width: '10%' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {  locationData.map((item,index)=>{
                       
                        return(
                        <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell style={{ width: '50%' }} >
                                
                                <Select
                                    options={valueLocation}
                                    value={item.location}                                 
                                    isClearable={true}                   
                                    key={item.id}
                                    menuPosition={"fixed"}
                                />

                            </TableCell>
                            <TableCell align="left" style={{ width: '20%' }}>
                                <input type="number" value={item.traffic} className={classes.inputField} />
                            </TableCell>

                            <TableCell align="left" style={{ width: '20%' }}>
                                <input type="number" value={item.numUser} className={classes.inputField} />
                            </TableCell>
                            <TableCell align="left" style={{ width: '10%' }}>
                                <DeleteIcon sx={{ color: '#f74d4d' }} style={{ cursor: 'pointer' }} />
                            </TableCell>

                        </TableRow>
                      )
                    })
                        }
                        {addLocation &&
                            <TableRow
                                key={'a'}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{ width: '50%' }} >

                                    <Select
                                        options={valueLocation}
                                        value={formData.selectedLocation}
                                        isClearable={true}
                                        key={'a'}
                                        onChange={(selected) =>
                                            handleFieldChange("selectedLocation", selected.value)
                                        }
                                        menuPosition={"fixed"}
                                    />

                                </TableCell>
                                <TableCell align="left" style={{ width: '20%' }}>
                                    <input type="number" value={25} className={classes.inputField} />
                                </TableCell>

                                <TableCell align="left" style={{ width: '20%' }}>
                                    <input type="number" value={10} className={classes.inputField} />
                                </TableCell>
                                <TableCell align="left" style={{ width: '10%' }}>
                                    <DeleteIcon sx={{ color: '#f74d4d' }} style={{ cursor: 'pointer' }} />
                                </TableCell>

                            </TableRow>
                        }

                    </TableBody>
                </Table>
            </TableContainer>

        </>


    );
}