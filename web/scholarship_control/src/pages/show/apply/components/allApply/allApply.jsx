/** @format */
import "./allApply.scss"
import {
  DeleteFilled,
  BookFilled,
  ClockCircleFilled,
  InteractionFilled,
} from "@ant-design/icons"
import { Dialog, Toast, ProgressCircle } from "antd-mobile"

const ShowBox = () => {
  const mainColor = "#3d7bc7"
  // const mainColor = "#ccc"

  return (
    <div className="showBox">
      <div className="mainBox">
        <div className="top">
          <div className="topLeft">
            <h3>成绩修改</h3>
            <div className="topItem">
              <BookFilled style={{ color: mainColor }} />
              <span>语文</span>
            </div>
            <div className="topItem">
              <ClockCircleFilled style={{ color: mainColor }} />
              <span>2022-04-17</span>
            </div>
            <div className="topItem">
              <InteractionFilled style={{ color: mainColor }} />
              <span>辅导员已审批</span>
            </div>
          </div>
          <div className="topRight">
            <ProgressCircle
              percent={30}
              style={{
                "--fill-color": mainColor,
                "--size": "90px",
                "--track-width": "10px",
              }}
            >
              <span>
                30
                <br />
                次/天
              </span>
            </ProgressCircle>
          </div>
        </div>
        <div className="bottom" style={{ backgroundColor: mainColor }}>
          <div
            className="bottomItem"
            onClick={() => {
              Dialog.confirm({
                content: "确定撤回申请？（撤回后不可恢复）",
                onConfirm: async () => {
                  Toast.show({
                    icon: "success",
                    content: "提交成功",
                    position: "bottom",
                  })
                },
              })
            }}
          >
            <DeleteFilled />
            <span>取消申请</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default () => {
  return (
    <div className="allApply">
      <ShowBox />
      <ShowBox />
      <ShowBox />
      <ShowBox />
    </div>
  )
}
