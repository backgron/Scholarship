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
        <h4>版本：V 1.0.0</h4>
        <div className="infoItem">
          <span>开发者：</span>
          <span>backgron</span>
        </div>
        <div className="infoItem">
          <span>加入我们：</span>
          <span>backgron@163.com</span>
        </div>
        <div className="infoItem">
          <span>关于更多：</span>
          <a src="https://github.com/backgron/Scholarship">
            https://github.com/backgron/Scholarship
          </a>
        </div>
      </div>
    </div>
  )
}
