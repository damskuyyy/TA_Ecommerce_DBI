import React, { useState } from 'react';
// Import Swiper React components
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
// Import Swiper core
import SwiperCore from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Extend CSSProperties to include custom properties
interface CustomCSSProperties extends React.CSSProperties {
  '--swiper-navigation-color'?: string;
  '--swiper-pagination-color'?: string;
}

const Gallery: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  const swiperStyle: CustomCSSProperties = {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff',
  };

  return (
    <div className='w-full'>
      <SwiperComponent
        style={swiperStyle}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" className='w-full h-72 rounded-lg object-cover'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" className='w-full h-72 rounded-lg object-cover'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" className='w-full h-72 rounded-lg object-cover'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" className='w-full h-72 rounded-lg object-cover'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" className='w-full h-72 rounded-lg object-cover'/>
        </SwiperSlide>

      </SwiperComponent>
      <SwiperComponent
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-3"
      >
        <SwiperSlide className='cursor-pointer'>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" className='w-full h-16 object-cover rounded-lg' />
        </SwiperSlide>
        <SwiperSlide className='cursor-pointer'>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" className='w-full h-16 object-cover rounded-lg' />
        </SwiperSlide>
        <SwiperSlide className='cursor-pointer'>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" className='w-full h-16 object-cover rounded-lg' />
        </SwiperSlide>
        <SwiperSlide className='cursor-pointer'>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" className='w-full h-16 object-cover rounded-lg' />
        </SwiperSlide>
        <SwiperSlide className='cursor-pointer'>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="Nature 1" className='w-full h-16 object-cover rounded-lg' />
        </SwiperSlide>

      </SwiperComponent>
    </div>
  );
};

export default Gallery;
