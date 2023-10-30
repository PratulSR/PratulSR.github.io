import LandingHeader from '../../components/LandingHeader';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Typography from '@mui/material/Typography';

import image1 from '../../assets/Slide1.jpg';
import image2 from '../../assets/Slide2.jpg';
import image3 from '../../assets/Slide3.jpg';
import image4 from '../../assets/Slide4.jpg';
import image5 from '../../assets/image5.jpg';
import image6 from '../../assets/image6.jpg';
import image10 from '../../assets/image10.jpg';

import "./index.css"

export default function Landing() {
    return (
        <div>
            <LandingHeader />

            <main style={{ marginTop: "1rem",marginBottom:'1rem' }}>
                <div className='carousel-container'>
                    <Swiper style ={{ marginBottom: '1rem'}}
                        // swiper modules
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={'1rem'}
                        slidesPerView={1}
                        loop
                        navigation
                        pagination={{ clickable: true }}
                        onSwiper={(swiper: any) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                    >
                        <SwiperSlide className={"carousel-item"}>
                            <img src= {image1}/>
                        </SwiperSlide>
                        <SwiperSlide className={"carousel-item"}>
                            <img src={image2} />
                        </SwiperSlide>
                        <SwiperSlide className={"carousel-item"}>
                            <img src={image3} />
                        </SwiperSlide>
                        <SwiperSlide className={"carousel-item"}>
                            <img src={image4} />
                        </SwiperSlide>
                    </Swiper>
                </div>

                <Typography variant="h6" style={{ 
                    textAlign: 'center', 
                    marginTop: '0.5rem' , 
                    marginBottom:'1.5rem', 
                    marginRight:'4rem',
                    fontWeight: 'bold', 
                    fontSize: '3rem' }}>
                     How to get Started on Ganttalf:
                </Typography>

                 
                <div className='showcase-container'
                    style={{marginLeft: '5.5rem', marginRight:'2rem', width : '90%'}}>
                {
                    [
                        { image: image5, text: "Click Log-In (TOP RIGHT)" },
                        { image: image6, text: "Sign up" },
                        { image: image10, text: "Click on Create new" },
                        { image: image3, text: "Start Your Ganttalf Journey" }
                    ].map((item, i) => (
                        <>
                            <div className='showcase-item' key={i}>
                                <div className='showcase-box'
                                    onClick={_ => {
                                        
                                    }}
                                >
                                    <img src={item.image} alt="Detail" />
                                </div>
                                <p className="showcase-text">{item.text}</p>
                            </div>
                            
                        </>
                    ))
                }
                </div>
            </main>
        </div>

    );
}