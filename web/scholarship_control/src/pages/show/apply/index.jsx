/** @format */

import { Tabs } from "antd-mobile"
import ChangeGrade from "./components/changeGrade/changeGrade"
import "./index.scss"
import AwardApply from "./components/awardApply/awardApply"
import AllApply from "./components/allApply/allApply"
export default () => {
  return (
    <div className="applyBox">
      <div className="card-container">
        <Tabs activeLineMode={false} defaultActiveKey="1">
          <Tabs.Tab title="申请记录" key="1">
            <AllApply />
          </Tabs.Tab>
          <Tabs.Tab title="成绩修改" key="2">
            <ChangeGrade />
          </Tabs.Tab>
          <Tabs.Tab title="奖金申请" key="3">
            <AwardApply />
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  )
}
