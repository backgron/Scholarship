/** @format */

import "./index.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Autoplay } from "swiper"
import "swiper/css"
import "swiper/css/autoplay"
import { adminFindNoticelorBy } from "../../../common/fetch"

import jpg1 from "../../../assets/image/swiperImage/1.jpg"
import jpg2 from "../../../assets/image/swiperImage/2.jpg"
import jpg3 from "../../../assets/image/swiperImage/3.jpg"
import jpg4 from "../../../assets/image/swiperImage/4.jpg"
import jpg5 from "../../../assets/image/swiperImage/5.jpg"
import jpg6 from "../../../assets/image/swiperImage/6.jpg"
import { useEffect, useState } from "react"

SwiperCore.use([Autoplay])

export default () => {
  const [info, setInfo] = useState()
  const [notice, setNotice] = useState()
  const swiperConfig = {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 700,
  }

  useEffect(() => {
    adminFindNoticelorBy({
      params: {
        type: "公告",
      },
      success: (res) => {
        setNotice(res.data.splice(0, 4))
      },
    })
    adminFindNoticelorBy({
      params: {
        type: "通知",
      },
      success: (res) => {
        setInfo(res.data.splice(0, 4))
      },
    })
  }, [])

  return (
    <div className="homeBox">
      <div className="swiper">
        <Swiper {...swiperConfig}>
          <SwiperSlide>
            <img src={jpg1} className="swiperImage"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={jpg2} className="swiperImage"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={jpg3} className="swiperImage"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={jpg4} className="swiperImage"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={jpg5} className="swiperImage"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={jpg6} className="swiperImage"></img>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="mainInfo">
        <div className="InfoTitle">
          <span>重要 · 通知</span>
        </div>
        <hr />

        <div className="info">
          {info &&
            info.map((item) => (
              <div className="infoItem" key={item._id}>
                <span>{item.main}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="mainInfo">
        <div className="InfoTitle">
          <span>公告 · 新闻</span>
        </div>
        <hr />
        <div className="info">
          {notice &&
            notice.map((item) => (
              <div className="infoItem" key={item._id}>
                <span>{item.main}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="news"></div>
    </div>
  )
}
