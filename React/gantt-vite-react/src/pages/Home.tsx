import Header from '../components/Header';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import image9 from '../assets/image9.jpg';
import home from '../assets/home.png';
import school from '../assets/school.png';
import business from '../assets/work.png';
import group from '../assets/group.png';
import task from '../assets/task.png';
import CelebrationIcon from '@mui/icons-material/Celebration';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// have code here 
let numCharts = 9 + 1; // 9 should be changed to the real number 1 needs to be retained
let backgroundImage;

function pickIcon(categoryName) {
  //console.log(categoryName);

  switch(categoryName) {
    case 'Personal':
      backgroundImage = home;
      break;
    case 'School':
      backgroundImage = school;
      break;
    case 'Business':
      backgroundImage = business;
      break;
    case 'Group':
      backgroundImage = group;
      break;
    case 'Etc':
      backgroundImage = task;
      break;
    default:
      backgroundImage = task;
  }

  return backgroundImage;

  //console.log(backgroundImage);
}


export default function Home() {

  const [charts, setCharts] = useState([]);
  const [chartCount, setChartCount] = useState(0);

  useEffect(() => {
    const userIdStringValue = localStorage.getItem("userId");
    if (userIdStringValue != null) {
      const userIdIntValue = parseInt(userIdStringValue, 10);
    }  
    const apiUrl = "http://localhost:8080/chart/" + userIdStringValue;
    console.log(apiUrl);

    axios.get(apiUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json', // Indicate that you expect JSON response
        'Content-Type': 'application/json', // Set the content type to JSON
      }})
      .then((response) => {
        const chartData = response.data;

        // Appending blank array to front
        const newChart = {
          chartName: "blank",
          category: "",
          chartID: 0
        }
        chartData.unshift(newChart);

        setCharts(chartData);
        setChartCount((chartData.length));

        console.log(chartData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log("loading...");


  return (
    <div>
      <Header />
      <main>
       
        <div style={{ marginBottom: '1rem', padding: '1.5rem', marginTop: '5rem', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            My Projects
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap'}}>
            <TextField
              sx={{
                marginLeft:'1rem',
                marginTop:'1rem',
                backgroundColor: '#f8f8f8',
                '& .MuiOutlinedInput-root': {
                  height:'2.5rem',
                  '& fieldset': {
                      border: 'yes', 
                  },
                  '&:hover fieldset': {
                      border: 'yes', 
                  },
                },
              }}
              type="text"
              placeholder="Search for..."
            />
            <Button variant="contained" color="primary" style={{ marginLeft: '1rem', marginTop:'1rem' }}>
              Search
            </Button>
          </div>
        </div>
      </main>

      <Grid container spacing={3} style={{ marginLeft:'0rem', marginRight:'0rem'}}>
        {charts.map((chart, index) => (
          <Grid item xs={10} sm={6} md={3} key={index}>
            {index === 0 ? (
              <Link to="/createnew" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Paper 
                  elevation={3} 
                  style={{ 
                    background: `url(${image9}), #d9d9d8`,
                    backgroundPosition: 'center center',
                    backgroundSize: '50% auto',
                    backgroundRepeat: 'no-repeat',
                    width: "93%", 
                    height: "20rem", 
                    padding: "1rem", 
                  }}
                ></Paper>
              </Link>
            ) : (
              <a href="https://myaccount.google.com/?utm_source=chrome-profile-chooser&pli=1" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Paper 
                  elevation={3} 
                  style={{ 
                    backgroundRepeat: 'no-repeat',
                    background: `url(${pickIcon(chart.category)})no-repeat center center, #d9d9d8`,
                    backgroundSize: '50% auto',
                    backgroundPosition: 'center center',
                    width: "93%", 
                    height: "20rem", 
                    padding: "1rem", 
                  }}
                ></Paper>
              </a>
            )}
            <Typography variant="h6" style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom:'1.5rem', marginRight:'4rem', fontWeight: (index === 0) ? 'bold' : 'normal' }}>
              {index === 0 ? "Create a new Gantt chart" : chart.chartName}
            </Typography>
          </Grid>
          
        ))}
      </Grid>
    </div>
  );
}
