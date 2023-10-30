import React, { useState, useRef, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField ,TextFieldProps, Input} from "@mui/material"
import Header from "../../components/Header"
import { Typography, Switch, FormControlLabel, Button} from '@mui/material';



import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from 'react-router-dom';
import { yellow, blue } from '@mui/material/colors';
import axios from 'axios';


export default function CreateChart() {
    

    const [selectedType, setSelectedType] = useState("StartDate");
    const [selectedType2, setSelectedType2] = useState<string | null>(null);

    //title holder
    const [title, setTitle] = useState('');
    // this controls what branches will be shown Add to this list or Remove from the list 
    const [branches, setBranches] = useState<string[]>(['Restrictions', 'Footnotes', 'None']);
    
    // constants that should not be changed
    const [BranchOpen, setBranchOpen] = useState(false);
    const inputRef = useRef(null);
    const [newValue, setnewValue] = useState('');
    const [customBranch, setCustomBranch] = useState<string | null>(null);

    // for the datePicker
    const [date, setDate] = useState<Date | null>(new Date());
    const [date2, setDate2] = useState<Date | null>(new Date());

    //Footnote 
    const [footnoteDescription, setFootnoteDescription] = useState<string>('');

    //Restricted stored
    const [isToggled, setIsToggled] = useState(false);



    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedType(event.target?.value);
    };

    const handleChange2 = (event: SelectChangeEvent<string>) => {
        if(event.target.value !== "add-branch"){
            setSelectedType2(event.target?.value);
            setBranchOpen(false);  
        } else {
            // Don't close the dropdown if 'Add a new branch' is clicked.
        }
    };


    const textFieldRef = useRef(null);

    const BranchCloseAction = () => {
        // DO NOT CLOSE WITH TEXTFIELD BEING FOCUSED
        setTimeout(() => {
            if (newValue.trim()) {
                setCustomBranch(newValue.trim());
                setSelectedType2(newValue.trim());
                setnewValue('');
            } else if (customBranch && !selectedType2) {
                setSelectedType2(customBranch);
            }
        }, 100);
    };

    const moveDirectory = useNavigate();

    const handleSubmit = () => {
        console.log({
            
            chart_name: title,
            description: footnoteDescription,
            category: selectedType
        });

        const stringValue = localStorage.getItem("userId");

        // Convert the string to an integer using parseInt

        if (stringValue != null) {
            const intValue = parseInt(stringValue, 10); 
            if (!isNaN(intValue)) {
                const jsonObject = {
                    user_id: intValue,
                    chart_name: title,
                    description: footnoteDescription,
                    category: selectedType
                }

                axios.post("http://localhost:8080/chart/add", jsonObject, {headers: {
                    'Content-Type' :'application/json'
                }})
                .then((response) => {
                    localStorage.setItem("currentChartId", response.data)
                    console.log(response.data)

                })
                .catch((error) => console.log(error));
            }
        }

        //add navaigation again
        moveDirectory('/taskList'); // change for different page // 
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!BranchOpen) return;
            if (inputRef.current && (inputRef.current as any).contains(event.target)) {
                return;
            }
            if (textFieldRef.current && (textFieldRef.current as any).contains(event.target)) {
                return;
            }
            BranchCloseAction();
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [BranchOpen, newValue]);

    //



    return (
        <Box className="h-full w-full  absolute bg-black bg-opacity-5">
   
            <Header />
            <Box
                  sx={{
                  padding: 5,
                  position: 'relative',
                  zIndex: 10,
                  marginTop: 20,}}
             >
                
                <Typography variant='h4' align='center' fontWeight="bold" color="textPrimary">
                  Start a new Gantt Chart
                </Typography>
               
            </Box>

            <main className="">
                <Box width='75%' mx='auto'>

                    <TextField fullWidth={true }
                        id="outlined-basic" 
                        label="Title" 
                        variant="outlined" 
                        placeholder="Enter the title of the new Gantt Chart..." 
                        onChange={(e) => setTitle(e.target.value)}
                        
                        />

                    
                </Box>
       
                <Box
                sx={{
                width: '75%', // Equivalent to "w-9/12"
                margin: '0 auto', // Equivalent to "mx-auto"
                display: 'flex',
                justifyContent: 'center',
                marginTop: 5, // Equivalent to "mt-5"
                position: 'relative',
                }} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gantt Chart Type</InputLabel>
                        <Select
                            labelId="GanttChartType"
                            id="GanttChartType"
                            value={selectedType}
                            label="Gantt Chart Type"
                            onChange={handleChange}
                        >

                            <MenuItem value={"Personal"}>Personal</MenuItem>
                            <MenuItem value={"School"}>School</MenuItem>
                            <MenuItem value={"Business"}>Business</MenuItem>
                            <MenuItem value={"Group"}>Group</MenuItem>
                            <MenuItem value={"Etc"}>Etc</MenuItem>
                        </Select>
                    </FormControl>
                </Box>    
                <Box
                 sx={{
                  width: '75%', // Equivalent to "w-9/12"
                  margin: '0 auto', // Equivalent to "mx-auto"
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 5, // Equivalent to "mt-5"
                  position: 'relative',
                  }} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Associated Branchs</InputLabel>
                        <Select
                            labelId="AssociatedBranchs"
                            id="AssociatedBranchs"
                            value={selectedType2 || ''}
                            label="Associated Branchs"
                            open ={BranchOpen}
                            onOpen={() => setBranchOpen(true)}
                            onChange={handleChange2}
                            onClose={BranchCloseAction}
                            input={<Input inputRef={inputRef}/>}
                        >
                            {branches.map((branch) => (
                                    <MenuItem key={branch} value={branch}>
                                    {branch}
                                    </MenuItem>
                                ))}
                                    {customBranch && (
                                        <MenuItem key={customBranch} value={customBranch}>
                                        {customBranch}
                                    </MenuItem>
                                )}
                                <MenuItem value = "add-branch" >
                                    <TextField
                                        inputRef = {textFieldRef}
                                        fullWidth
                                        value={newValue}
                                        onChange={(NEWBRANCH) => setnewValue(NEWBRANCH.target.value)}
                                        placeholder='Add a new branch'

                                        onBlur = {() => {
                                            if (newValue.trim()) {
                                                setTimeout(() => {
                                                    BranchCloseAction();
                                                }, 80);
                                            }
                                        }}
                                        
                                        onKeyDown={(NEWBRANCH)=>{
                                            NEWBRANCH.stopPropagation();
                                            if (NEWBRANCH.key === 'Enter'){
                                                NEWBRANCH.preventDefault();
                                                setBranchOpen(false)
                                                if(inputRef.current){
                                                    (inputRef.current as any).blur();
                                                }
                                            }
                                        }

                                        
                                    }
                                    />
                                </MenuItem>
                        </Select>

                    </FormControl>
                </Box>

                {/* <Box className="w-9/12 mx-auto flex justify-between gap-x-10 mt-4"> */}
                <Box
                 sx={{
                  width: '80%', 
                  margin: '0 auto', //
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap:'2rem',
                  marginTop: 10, 
                  position:"relative"
                  
                  }} >

                    <Box width='48%'>
                        <Typography variant='h5' align="center" fontWeight='bold' gutterBottom>Gantt chart Detail</Typography>

                        {/* Box that wraps both the papers> */}
                        <Box sx={{
                            padding: 4,
                            height: '35rem',
                            borderRadius: 16,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',  // Align content to the top
                        }}>
                        <Paper elevation={3} sx={{  backgroundColor: blue[300], padding: 3, display: 'flex', flexDirection: 'column', width: ['100%'], height: '60rem' , position:"relative"}}>
      
                        <Box sx ={{display: 'flex', alignItems: 'center', gap: 2 ,marginBottom: '1rem', marinRight:'30rem'}}>  
                            <Typography variant='h6' fontWeight='bold'>Start Date
                            </Typography>

                            <DatePicker
                                label="Starting Date"
                                selected={date}
                                onChange={(newDate: Date | null) => setDate(newDate)}
                                dateFormat="MM/dd/yyyy"
                                sx={{width: "30%" }}
                            />
                            </Box> 

                        <Box sx ={{display: 'flex', alignItems: 'center', gap: 2 ,marginBottom: '1rem'}}>    
                            <Typography variant='h6' fontWeight='bold'>Finish Date</Typography>
                            <DatePicker
                                label="Finish Date"
                                selected={date2}
                                onChange={(newDate: Date | null) => setDate2(newDate)}
                                dateFormat="MM/dd/yyyy"
                                sx={{width: "30%" }}
                            />
                            </Box>

                        <Box sx ={{display: 'flex', alignItems: 'center', gap: 2 ,marginBottom: '1rem'}}>   
                            <Typography variant='h6' fontWeight='bold'>Estimate Days</Typography>
                            <TextField
                                    size="small"
                                    type="number"
                                    variant="outlined"
                                    sx={{ width: '25%',backgroundColor: 'white'}}  // Adjust width
                                    inputProps={{ inputMode: 'numeric', pattern: "[0-9]*" }}
                                />
                            </Box>
                            </Paper>
                        </Box>
                    </Box>



                    <Box width='48%'>
                    <Typography variant='h5' align="center" fontWeight='bold' gutterBottom>Personalization</Typography>
                    <Box sx = {{
                          padding:4,
                          margin: '0 auto', 
                          height: '35rem',
                          borderRadius:16,
                          display:'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginLeft:'3rem',
                          position:"relative",
                          marinRight:'5rem'

                        }}>
                          <Paper elevation={3} sx={{ backgroundColor: yellow[300], padding: 3, display: 'flex', flexDirection: 'column' ,width:['100%'],height:'60rem', position:"relative"}}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 , marginBottom: '1rem'}}>
                            <Typography variant='h6' fontWeight='bold' component="span">Restrictions</Typography>
                                <Switch
                                    checked={isToggled}
                                    onChange={(e) => setIsToggled(e.target.checked)}
                                    name="restrictionsSwitch"
                                    color="primary"
                                />
                            </Box>
                           <Typography variant='h6' fontWeight='bold' >Footnotes</Typography>

                            <TextField
                                multiline
                                rows={12}
                                fullWidth
                                variant="outlined"
                                placeholder="Type here!"
                                value={footnoteDescription}
                                onChange={(e) => setFootnoteDescription(e.target.value)}
                            />

                            </Paper>
                        </Box>
                    </Box>

                </Box>
            </main >


            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 4,  
                    width: '100%',
                    position: 'relative',
                    bottom: 0
                }}
            >
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ 
                        backgroundColor: 'lightgreen',
                        '&:hover': {
                            backgroundColor: 'lightgreen',
                        },
                        fontSize: '1.5rem',
                        borderRadius: '1.5rem' 
                    }}
                    onClick={(event) => {
                        handleSubmit();
                    }}

                >
                    Create!
                </Button>
            </Box>
        </Box>
     

    )
}