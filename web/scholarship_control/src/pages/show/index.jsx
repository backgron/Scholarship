/** @format */

import {
  HomeOutlined,
  ReconciliationOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Outlet, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import "./index.scss"
import { userContext } from "../../app"

export default () => {
  const [isCurrent, setIsCurrent] = useState("/home")
  const navigate = useNavigate()

  useEffect(() => {
    setIsCurrent(window.location.pathname)
  })

  const changeRouter = (text) => {
    navigate("/show" + text)
  }

  return (
    <div className="showBox">
      <header className="logoHeader">
        <div className="logo"></div>
      </header>
      <section className="main">
        <Outlet></Outlet>
      </section>

      <footer className="bottomBar">
        <div
          onClick={() => changeRouter("/home")}
          className={isCurrent.includes("/show/home") ? "currentRouter" : ""}
        >
          <HomeOutlined />
          <span className="barText">首页</span>
        </div>
        <div
          onClick={() => changeRouter("/apply")}
          className={isCurrent.includes("/show/apply") ? "currentRouter" : ""}
        >
          <ReconciliationOutlined />
          <span className="barText">申请</span>
        </div>
        <div
          onClick={() => changeRouter("/mine")}
          className={isCurrent.includes("/show/mine") ? "currentRouter" : ""}
        >
          <UserOutlined />
          <span className="barText">我的</span>
        </div>
      </footer>
    </div>
  )
}
