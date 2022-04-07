/** @format */

import { useSessionStorageState } from "ahooks"
import { Card, Form, Input } from "antd-mobile"
import "./changeGrade.scss"

export default () => {
  const [{ user, userType }, setUserInfo] = useSessionStorageState("userInfo")

  return (
    <div className="changeGrade">
      <Card className="card">
        <span>课程</span>
        <span className="labelValue">语文</span>
      </Card>
      <Card className="card">
        <span>课程</span>
        <span className="labelValue">语文</span>
      </Card>
      <Card className="card">
        <span>课程</span>
        <span className="labelValue">语文</span>
      </Card>
      <Card className="card">
        <span>课程</span>
        <span className="labelValue">语文</span>
      </Card>
    </div>
  )
}
