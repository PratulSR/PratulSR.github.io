import Header from "../../components/Header";
// import LandingHeader from "../components/LandingHeader";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, MenuItem, Select, SelectChangeEvent, TextField, useMediaQuery, useTheme, Checkbox } from "@mui/material"
import { CSSProperties, RefObject, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { I_taskItem, readTasks, saveTasks } from "./util"
import * as React from "react";
import { parseISO } from 'date-fns';
import "./index.css"
import axios from "axios";



export default function TaskList() {

    const notCapital: CSSProperties = {
        textTransform: 'none'
    }




    const newTask = (length: number) => {
        const defaultVal = `Task ${length}`
        return {
            name: defaultVal,
            type: "task",
            isEdit: false,
            form: {
                start: "",
                finish: "",
                catgory: "",
                description: "",
                priority: "",
            },
            isSelect: false,
        }
    }

    const newMilestone = (length: number) => {
        const defaultVal = `Milestone ${length}`
        return {
            name: defaultVal,
            type: "milestone",
            isEdit: false,
            form: {
                start: "",
                finish: "",
                catgory: "",
                description: "",
                priority: "",
            },
            isSelect: false,
        }
    }



    const taksData = readTasks()
    const dateKey = ['start', 'finish']
    taksData.forEach(item => {
        for (const key in item.form) {
            const _key = key as 'start' | 'finish'
            if (dateKey.indexOf(key) !== -1) {
                if (typeof item.form[_key] === 'string' && item.form[_key]) {
                    item.form[_key] = parseISO(item.form[_key] as string)
                } // 
            }
        }
    })
    const [arrTask, setArrTask] = useState<I_taskItem[]>(taksData)


    // setTimeout(() => {
    //     console.log(arrTask[1])
    // }, 100);



    //!~dialog
    const [open, setOpen] = React.useState(false)
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const handleClickOpen = () => setOpen(true);
    const handleConfirm = () => {
        setTimeout(() => saveTasks(arrTask))
        setOpen(false)
    };
    const handleClose = () => setOpen(false);
    //~!

    //!~ dialog2
    const [open2, setOpen2] = React.useState(false)
    const handleClickOpen2 = () => setOpen2(true)
    const handleClose2 = () => setOpen2(false)
    //~!

    //!~ dialog3 deletes button
    let [selectsLen, setSelectsLen] = React.useState<number>(-1)
    const [open3, setOpen3] = React.useState(false)
    const handleClickOpen3 = () => {
        // 拿当前选择中状态的列表数组长度
        const selects = arrTask.filter(item => item.isSelect)
        setSelectsLen(selects.length)
        setOpen3(true)
    }
    const handleClose3 = () => setOpen3(false)
    const handleConfirm3 = () => {
        //  ”删除“
        setArrTask(arrTask.filter(item => !item.isSelect))
        setOpen3(false)
    }
    //~!

    const handleSubmitToBackend = () => {
        const selectItems = arrTask.filter(item => item.isSelect)

        const jsonArray: any[] = [];

        const userIdString = localStorage.getItem("userId");
        const chartIdString = localStorage.getItem("currentChartId")

        if (userIdString != null && chartIdString != null) {
            const userIdInt = parseInt(userIdString, 10); 
            const chartIdInt = parseInt(chartIdString, 10);
            if (!isNaN(userIdInt) && !isNaN(chartIdInt)) {
                for (const [index, item] of selectItems.entries()) {
                    const jsonObject = {
                        "chart_id": chartIdInt,
                        "user_id": userIdInt,
                        "task_name": item.name,
                        "category": item.form.catgory,
                        "description": item.form.description,
                        "progress": parseInt(item.form.progress),
                        "start": new Date(item.form.start).toISOString(),
                        "end": new Date(item.form.finish).toISOString()
                    };
                    jsonArray.push(jsonObject);
                }
            }
        }
        for (const item of jsonArray) {
            const jsonItem = JSON.stringify(item);
            axios.post("http://localhost:8080/task/add", jsonItem, {headers: {
                    'Content-Type' :'application/json'
                }})
                .then((response) => {
                    console.log(response.data)

                })
                .catch((error) => console.log(error));
        }

        // axios.post("http://localhost:8080/task/add", jsonArray[0], {headers: {
        //             'Content-Type' :'application/json'
        //         }})
        //         .then((response) => {
        //             console.log(response.data)

        //         })
        //         .catch((error) => console.log(error));
    }


    // Processing callbacks for selecting form 

    const handlerDate = (val: string | Date, index: number, formKey: 'start' | 'finish' | 'catgory' | 'description' | 'progress') => {
        const updateData = [...arrTask]
        updateData[index].form[formKey] = val as string
        setArrTask(updateData)
    }

    return (
        <div style={{}}>
            <Header />

            <main style={{ marginTop: "100px", display: "flex", height: "500px", gap: "0 40px", padding: "0 20px" }}>

                <div style={{ width: "65%", height: "100%", background: "rgba(255,255,255,1)", borderRadius: "10px", padding: "10px", overflow: "auto" }}>

                    {
                        arrTask.map((item, index) => {
                            return (
                                <div key={index} style={{ paddingTop: "10px" }}
                                >

                                    <div style={{ boxShadow: "0px 2px 1px rgba(0,0,0,0.2)", borderRadius: "5px", margin: "0 5px", padding: "10px" }}>

                                        <div style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                            {
                                                item.isEdit ?
                                                    <TextField style={{ width: "90%" }}
                                                        onBlur={_ => {
                                                            console.log(_)
                                                        }}
                                                        onChange={e => {
                                                            const updateData = [...arrTask]
                                                            updateData[index].name = e.target.value
                                                            setArrTask(updateData)
                                                        }}
                                                        value={item.name} size="small" label="describe" variant="standard" />
                                                    :
                                                    <p style={{ width: "90%", margin: "0" }}>
                                                        <Checkbox
                                                            checked={item.isSelect}
                                                            onChange={_ => {
                                                                const updateData = [...arrTask]
                                                                updateData[index].isSelect = !updateData[index].isSelect
                                                                setArrTask(updateData)
                                                            }}
                                                        />
                                                        {item.name}
                                                    </p>
                                            }
                                            <div style={{
                                                display: "flex", justifyContent: "center", alignItems: "center",
                                                cursor: "pointer",
                                                boxShadow: "0px 2px 1px rgba(0,0,0,0.2)", padding: "5px 15px", borderRadius: "10px", marginLeft: "15px"
                                            }}
                                                onClick={_ => {
                                                    const updateData = [...arrTask]
                                                    updateData[index].isEdit = !item.isEdit
                                                    setArrTask(updateData)
                                                }}
                                            >
                                                edit
                                            </div>
                                        </div>


                                        {
                                            item.isEdit ?
                                                <div>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <p style={{ width: "200px" }}>Start</p>
                                                        <DatePicker selected={item.form.start as Date} placeholderText="Choose start"
                                                            onChange={(date) => handlerDate(date!, index, 'start')}
                                                        />
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <p style={{ width: "200px" }}>Finish</p>
                                                        <DatePicker selected={item.form.finish as Date} placeholderText="Choose a time"
                                                            onChange={(date) => handlerDate(date!, index, 'finish')}
                                                        />
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <p style={{ width: "200px" }}>catgory</p>
                                                        <TextField size="small" label="Input category..." variant="standard"
                                                            value={item.form.catgory}
                                                            onChange={e => handlerDate(e.target.value, index, 'catgory')}
                                                        />
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <p style={{ width: "200px" }}>description</p>
                                                        <TextField size="small" label="Input description..." variant="standard"
                                                            value={item.form.description}
                                                            onChange={e => handlerDate(e.target.value, index, 'description')}
                                                        />
                                                    </div>

                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <p style={{ width: "200px" }}>progress</p>
                                                        <TextField size="small" label="Input progress..." variant="standard"
                                                            value={item.form.progress}
                                                            onChange={e => handlerDate(e.target.value, index, 'progress')}
                                                        />
                                                    </div>
                                                </div>
                                                : ""
                                        }


                                    </div>


                                </div>
                            )
                        })
                    }

                </div>

                <div style={{ width: "35%", height: "100%", background: "rgba(255,255,255,1)", borderRadius: "10px", padding: "10px", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Button variant="contained" color="info" style={{ color: "white", ...notCapital }}
                            onClick={_ => {
                                const { length } = arrTask.filter(item => item.type === "task")
                                const newTaskData: any = newTask(length + 1);
                                setArrTask([newTaskData, ...arrTask]);
                            }}
                        >
                            Add task
                        </Button>
                        <Button
                            onClick={_ => {
                                const { length } = arrTask.filter(item => item.type === "milestone")
                                const newTaskData: any = newMilestone(length + 1);
                                setArrTask([newTaskData, ...arrTask]);
                            }}
                            variant="contained" color="info" style={{ color: "white", marginTop: "10px", ...notCapital }}>
                            Add Milestone
                        </Button>
                    </div>

                    <div style={{ marginTop: "150px", display: "flex", flexDirection: "column" }}>
                        <Button
                            onClick={_ => { handleSubmitToBackend()}}
                            variant="contained" color="success"
                            style={{ color: "white", marginTop: "10px", ...notCapital }} >
                            Submit
                        </Button>
                        <Button
                            onClick={_ => handleClickOpen()}
                            variant="contained" color="primary"
                            style={{ color: "white", marginTop: "10px", ...notCapital }} >
                            Save to local
                        </Button>
                        <Button
                            onClick={_ => handleClickOpen3()}
                            variant="contained" color="error"
                            style={{ color: "white", marginTop: "10px", ...notCapital }} >
                            Deletes
                        </Button>
                        <Button
                            onClick={_ => handleClickOpen2()}
                            variant="contained" color="primary"
                            style={{ color: "white", marginTop: "70px", ...notCapital }} >
                            Preview
                        </Button>
                    </div>
                </div>

            </main >

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle >
                    {"Prompt"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to save?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        NO
                    </Button>
                    <Button onClick={handleConfirm} autoFocus>
                        YES
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullScreen={fullScreen}
                open={open2}
                onClose={handleClose2}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle>
                    {"Preview"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            {
                                arrTask.map((item, index) => {
                                    return (
                                        <div key={index} style={{ paddingTop: "10px", width: "500px" }}>
                                            {
                                                <div>
                                                    <p>Item name: {item.name}</p>
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose2} autoFocus>
                        Close this Preview
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Deletes dialog */}
            <Dialog
                fullScreen={fullScreen}
                open={open3}
                onClose={handleClose3}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle>
                    {"Prompt"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {
                            selectsLen > 0 ?
                                `Are you sure you want to delete these ${selectsLen} pieces of data?`
                                :
                                'Please select the item to delete'
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        selectsLen > 0 ?
                            <Button autoFocus onClick={handleClose3}>
                                NO
                            </Button>
                            : ''
                    }

                    <Button onClick={handleConfirm3} autoFocus>
                        {selectsLen > 0 ? 'YES' : 'Got it'}
                    </Button>
                </DialogActions>
            </Dialog>

        </div >

    );
}


