import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import LandingHeader from '../components/LandingHeader'
import Carousel from 'react-material-ui-carousel'


export default function Landing() {
    return (
    <div>
            {/* <LandingHeader /> */}


        
         <Container >
            <Carousel>
              <Paper>
              

          {/* <img src="img_chania.jpg" alt="Chania" width="460" height="345" /> */}
          <Typography variant="h1">Chania</Typography>
          <Typography>The atmosphere in Chania has a touch of Florence and Venice.</Typography>
          <script src="www.google.com"></script>




        </Paper>
        <Paper>
          {/* <img src="img_chania2.jpg" alt="Chania" width="460" height="345" /> */}
          <Typography variant="h5">Chania</Typography>
          <Typography>The atmosphere in Chania has a touch of Florence and Venice.</Typography>
        </Paper>
        <Paper>
          {/* <img src="img_flower.jpg" alt="Flower" width="460" height="345" /> */}
          <Typography variant="h5">Flowers</Typography>
          <Typography>Beautiful flowers in Kolymbari, Crete.</Typography>
        </Paper>
        <Paper>
          {/* <img src="img_flower2.jpg" alt="Flower" width="460" height="345" /> */}
          <Typography variant="h5">Flowers</Typography>
          <Typography>Beautiful flowers in Kolymbari, Crete.</Typography>
        </Paper>
      </Carousel>
      </Container>



       

    
       
          
      </div>
           
      
         


       
           
        
        
        
      );
}





 





 








