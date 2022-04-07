import style from './index.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore,{ Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay'

import jpg1 from '../../../assets/image/swiperImage/1.jpg'
import jpg2 from '../../../assets/image/swiperImage/2.jpg'
import jpg3 from '../../../assets/image/swiperImage/3.jpg'
import jpg4 from '../../../assets/image/swiperImage/4.jpg'
import jpg5 from '../../../assets/image/swiperImage/5.jpg'
import jpg6 from '../../../assets/image/swiperImage/6.jpg'

SwiperCore.use([Autoplay])


export default ()=>{

  const swiperConfig={
    loop:true,
    autoplay:{
      delay:3000,
      disableOnInteraction:false
    },
    speed:700
  }

  return (

    <div className='homeBox'>
      <div className='swiper'>
        <Swiper 
        {...swiperConfig}
        >
          <SwiperSlide><img src={jpg1} className='swiperImage'></img></SwiperSlide>
          <SwiperSlide><img src={jpg2} className='swiperImage'></img></SwiperSlide>
          <SwiperSlide><img src={jpg3} className='swiperImage'></img></SwiperSlide>
          <SwiperSlide><img src={jpg4} className='swiperImage'></img></SwiperSlide>
          <SwiperSlide><img src={jpg5} className='swiperImage'></img></SwiperSlide>
          <SwiperSlide><img src={jpg6} className='swiperImage'></img></SwiperSlide>
        </Swiper>
      </div>
      <div className='mainInfo'>
        <div className='InfoTitle'><span>重要 · 通知</span></div>
        <hr />
        <div className='info'>
          <div className='infoItem'>
            <span>坚决守住校园疫情防控底线---河南财政金融学院召开全校疫情防范工作视频会议</span>
          </div>
          <div className='infoItem'>
            <span>国家助学金开始了！需要申请国家助学金的同学可以到</span>
          </div>
          <div className='infoItem'>
            <span>坚决守住校园疫情防控底线---河南财政金融学院召开全校疫情防范工作视频会议</span>
          </div>
          <div className='infoItem'>
            <span>坚决守住校园疫情防控底线---河南财政金融学院召开全校疫情防范工作视频会议</span>
          </div>
        </div>

      </div>
      <div className='mainInfo'>
        <div className='InfoTitle'><span>公告 · 新闻</span></div>
        <hr />
        <div className='info'>
          <div className='infoItem'>
            <span>坚决守住校园疫情防控底线---河南财政金融学院召开全校疫情防范工作视频会议</span>
          </div>
          <div className='infoItem'>
            <span>坚决守住校园疫情防控底线---河南财政金融学院召开全校疫情防范工作视频会议</span>
          </div>
          <div className='infoItem'>
            <span>坚决守住校园疫情防控底线---河南财政金融学院召开全校疫情防范工作视频会议</span>
          </div>
          <div className='infoItem'>
            <span>坚决守住校园疫情防控底线---河南财政金融学院召开全校疫情防范工作视频会议</span>
          </div>
        </div>

      </div>
      <div className='news'></div>
    </div>
  )
}