/** @format */
import { useState } from "react"
import { Tabs } from "antd-mobile"
import ChangeGrade from "./components/changeGrade/changeGrade"
import "./index.scss"
const { TabPane } = Tabs
export default () => {
  const [tab, setTab] = useState(1)

  return (
    <div className="applyBox">
      <div className="card-container">
        <Tabs
          activeLineMode={false}
          activeKey={tab}
          onChange={(res) => setTab(res)}
        >
          <Tabs.Tab title="申请记录" key="1">
            菠萝
          </Tabs.Tab>
          <Tabs.Tab title="成绩修改" key="2">
            <ChangeGrade />
          </Tabs.Tab>
          <Tabs.Tab title="奖金申请" key="3">
            蚂蚁
          </Tabs.Tab>
        </Tabs>
      </div>
      ,
    </div>
  )
}
