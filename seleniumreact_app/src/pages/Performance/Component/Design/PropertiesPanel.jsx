import React, { useState, useRef } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useStyles } from "../../styles";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Select from "react-select";
import DeleteIcon from '@mui/icons-material/Delete';

export default function LocationPanel({ testCase }) {
    const classes = useStyles();
    const [formData, setFormData] = useState({       
        selectedLocation:null,
      });
    const [valueLocation,setValueLocation] =useState([
        {
            value: 'Mumbai India',
            label:'Mumbai India', 
        },
        
    ]);
    const [selectedLocation,setSelectedLocation] = useState([]);
    const [addLocation,setAddLocation] = useState(false);

    const [designTabsActive, setDesignTabsActive] = useState(false);
    const handleActiveTabs = () => {
        setDesignTabsActive(!designTabsActive)
    }
    const handleFieldChange = (fieldName, value) => {
        setFormData({
          ...formData,
          [fieldName]: value,
        });
        console.log(fieldName, value)
      };

    return (
        <>
            <Button
                variant="contained"
                onClick={()=>setAddLocation(!addLocation)}


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
                            <TableCell align="center" style={{width: '50%'}}>Locations</TableCell>
                            <TableCell align="center" style={{width: '20%'}}>% of Traffic</TableCell>
                            <TableCell align="center" style={{width: '20%'}}>no. of Users (s)</TableCell>
                            <TableCell align="center" style={{width: '10%'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key={0}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell style={{width: '50%'}} >
                                
                                        <Select
                                             options={valueLocation}
                                             value={formData.selectedLocation}
                                             isClearable={true}
                                             onChange={(selected) =>
                                               handleFieldChange("selectedLocation", selected.value)
                                             }
                                            menuPosition={"fixed"}
                                        />
                                      
                            </TableCell>
                            <TableCell align="left" style={{width: '20%'}}>
                                <input type="number" value={25} className={classes.inputField} />
                            </TableCell>

                            <TableCell align="left" style={{width: '20%'}}>
                                <input type="number" value={10} className={classes.inputField} />
                            </TableCell>
                            <TableCell align="left" style={{width: '10%'}}>
                            <DeleteIcon sx={{ color: '#f74d4d' }} style={{ cursor: 'pointer' }} />
                            </TableCell>

                        </TableRow>
                                             {addLocation && 
                                             <TableRow
                                             key={0}
                                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                         >
                                             <TableCell style={{width: '50%'}} >
                                                 
                                                         <Select
                                                              options={valueLocation}
                                                              value={formData.selectedLocation}
                                                              isClearable={true}
                                                              onChange={(selected) =>
                                                                handleFieldChange("selectedLocation", selected.value)
                                                              }
                                                             menuPosition={"fixed"}
                                                         />
                                                       
                                             </TableCell>
                                             <TableCell align="left" style={{width: '20%'}}>
                                                 <input type="number" value={25} className={classes.inputField} />
                                             </TableCell>
                 
                                             <TableCell align="left" style={{width: '20%'}}>
                                                 <input type="number" value={10} className={classes.inputField} />
                                             </TableCell>
                                             <TableCell align="left" style={{width: '10%'}}>
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