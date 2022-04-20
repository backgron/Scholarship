/** @format */
import "./index.scss"
import Image from "../../../../../assets/image/show/aboutUs.jpg"

export default () => {
  return (
    <div className="aboutUsBox">
      <div className="mainBox">
        <div className="imageBox">
          <img src={Image} alt="" />
        </div>
        <div className="infoItem">
          <span>开发者：</span>
          <span>backgron</span>
        </div>
      </div>
    </div>
  )
}
