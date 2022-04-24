/** @format */

import { Tabs } from "antd-mobile"
import ChangeGrade from "./components/changeGrade/changeGrade"
import "./index.scss"
import AwardApply from "./components/awardApply/awardApply"
import AllApply from "./components/allApply/allApply"
import { useState } from "react"
export default () => {
  const [renderKey, setRenderKey] = useState(0)
  return (
    <div className="applyBox">
      <div className="card-container">
        <Tabs
          activeLineMode={false}
          defaultActiveKey="1"
          onChange={(v) => {
            setRenderKey(v)
          }}
        >
          <Tabs.Tab title="申请记录" key="1">
            <AllApply renderKey={renderKey} />
          </Tabs.Tab>
          <Tabs.Tab title="成绩修改" key="2">
            <ChangeGrade renderKey={renderKey} />
          </Tabs.Tab>
          <Tabs.Tab title="奖金申请" key="3">
            <AwardApply renderKey={renderKey} />
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  )
}
