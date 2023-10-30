import { FrappeGantt } from "frappe-gantt-react";
import LandingHeader from '../components/LandingHeader';
import HolidayList from "../components/holidays";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Gantt() {

    //Placeholder gantt chart stuff
    let d1 = new Date();
    let d2 = new Date();
    d2.setDate(d2.getDate() + 5);
    let d3 = new Date();
    d3.setDate(d3.getDate() + 8);
    let d4 = new Date();
    d4.setDate(d4.getDate() + 20);

    const tasks: any = [
      {
        id: "Task 1",
        name: "Fill out form",
        start: d1,
        end: d2,
        progress: 10,
        dependencies: ""
      },
      {
        id: "Task 2",
        name: "Do my homework",
        start: d3,
        end: d4,
        progress: null
        // dependencies: "Task 1"
      },
      {
        id: "Task 3",
        name: "Create thesis",
        start: d3,
        end: d4,
        progress: 0,
        dependencies: "Task 2, Task 1",
        hideChildren: true
      }
    ];

    // const [tasks, setTasks] = useState([]);

  //   useEffect(() => {
  //   // Fetch data using Axios
  //   axios.get('OUR_API_ENDPOINT')
  //     .then((response) => {

  //       setTasks(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  
    return (
      <div>
      <div style={{ marginBottom: '1rem', padding: '1.5rem', marginTop: '5rem', display: 'flex', justifyContent: 'space-between' }}>
        <LandingHeader/>
        <span>&nbsp;&nbsp;</span>
        <FrappeGantt
          tasks={tasks}
          // viewMode={this.state.mode}
          onClick={task => console.log(task, "click")}
          onDateChange={(task, start, end) =>
            console.log(task, start, end, "date")
          }
          onProgressChange={(task, progress) =>
            console.log(task, progress, "progress")
          }
          onTasksChange={tasks => console.log(tasks, "tasks")}
        />
      </div>
      <HolidayList/>
      </div>
      
    );
}