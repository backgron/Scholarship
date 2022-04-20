/** @format */

import { Card, ActionSheet } from "antd-mobile"
import "./index.scss"
import Image from "../../../assets/image/show/headPic.webp"
import { AppstoreFilled, CaretRightFilled } from "@ant-design/icons"
import { useSessionStorageState } from "ahooks"
import { message } from "antd"
import { useNavigate } from "react-router"
import { useState } from "react"

export default () => {
  const [visible, setVisible] = useState(false)
  const [{ user }] = useSessionStorageState("userInfo")
  const navigate = useNavigate()

  return (
    <div className="mineBox">
      <Card
        className="mineInfo"
        onClick={() => {
          navigate("/infoPage", {
            state: { pageType: "mineInfo", pageTitle: "我的" },
          })
        }}
      >
        <div className="imageBox">
          <img src={Image} />
        </div>
        <div className="infoBox">
          <h3>{user.name}</h3>
          <span>
            {user.position.academy} {user.position._class}
          </span>
        </div>
        <AppstoreFilled className="mineIcon" />
      </Card>
      <Card
        className="mineItem"
        onClick={() => {
          navigate("/infoPage", {
            state: { pageType: "mineGrades", pageTitle: "成绩" },
          })
        }}
      >
        <span>我的成绩</span>
        <CaretRightFilled />
      </Card>
      <Card
        className="mineItem"
        onClick={() => {
          navigate("/infoPage", {
            state: { pageType: "mineRewards", pageTitle: "奖惩" },
          })
        }}
      >
        <span>我的奖惩</span>
        <CaretRightFilled />
      </Card>
      <Card
        className="mineItem"
        onClick={() => {
          navigate("/infoPage", {
            state: { pageType: "accountSecurity", pageTitle: "账号与安全" },
          })
        }}
      >
        <span>账号与安全</span>
        <CaretRightFilled />
      </Card>
      <Card
        className="mineItem"
        onClick={() => {
          navigate("/infoPage", {
            state: { pageType: "aboutUs", pageTitle: "关于我们" },
          })
        }}
      >
        <span>关于我们</span>
        <CaretRightFilled />
      </Card>
      <Card
        className="logout"
        onClick={() => {
          setVisible(true)
        }}
      >
        <span>退出登录</span>
      </Card>
      <ActionSheet
        visible={visible}
        actions={[
          {
            text: "退出登录",
            key: "logout",
            description: "确定要退出登录吗？",
            danger: true,
          },
        ]}
        onAction={() => {
          sessionStorage.removeItem("userInfo")
          sessionStorage.removeItem("userType")
          message.success("退出成功")
          navigate("/")
        }}
        onClose={() => setVisible(false)}
      />
    </div>
  )
}
