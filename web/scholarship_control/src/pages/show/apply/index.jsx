/** @format */

import { Tabs } from "antd-mobile"
import ChangeGrade from "./components/changeGrade/changeGrade"
import "./index.scss"
const { TabPane } = Tabs
export default () => {
  return (
    <div className="applyBox">
      <div className="card-container">
        <Tabs activeLineMode={false} activeKey="vegetables">
          <Tabs.Tab title="申请记录" key="fruits">
            菠萝
          </Tabs.Tab>
          <Tabs.Tab title="成绩修改" key="vegetables">
            <ChangeGrade />
          </Tabs.Tab>
          <Tabs.Tab title="奖金申请" key="animals">
            蚂蚁
          </Tabs.Tab>
        </Tabs>
      </div>
      ,
    </div>
  )
}
