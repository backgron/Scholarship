/** @format */

import "./allApply.scss"
import {
  DeleteFilled,
  BookFilled,
  ClockCircleFilled,
  InteractionFilled,
} from "@ant-design/icons"
import { Dialog, Toast, ProgressCircle } from "antd-mobile"
import { useEffect, useState } from "react"
import { deleteApply, findAllApply } from "../../../../../common/fetch"
import { formatDate } from "../../../../../common/util"
import { message } from "antd"

const ShowBox = ({ item, isRender, setIsRender }) => {
  let mainColor = "#3d7bc7"
  // const mainColor = "#ccc"
  const isClassApply = item?.className ? true : false
  const status = isClassApply
    ? item.classStatus.status
    : item.applyStatus.status
  const statusConfig = (() => {
    if (status === -1) {
      mainColor = "#999"
      return "已驳回"
    } else if (status === 0) {
      mainColor = "#ef7292"
      return "学生已申请"
    } else if (status === 1) {
      mainColor = "#3d7bc7"
      return "导员已审批"
    } else if (status === 2) {
      mainColor = "#3cb371"
      return "申请已通过"
    }
  })()

  return (
    <div className="showBox">
      <div className="mainBox" style={{ border: `1px solid ${mainColor}` }}>
        <div className="top">
          <div className="topLeft">
            <h3>
              {isClassApply ? item.className + "-成绩修改" : item.applyName}
            </h3>
            <div className="topItem">
              <BookFilled style={{ color: mainColor }} />
              <span>
                {isClassApply
                  ? item.classStatus.newGrade + "分"
                  : item.applyType}
              </span>
            </div>
            <div className="topItem">
              <ClockCircleFilled style={{ color: mainColor }} />
              <span>
                {isClassApply
                  ? formatDate(new Date(parseInt(item.classStatus.applyTime)))
                  : formatDate(new Date(parseInt(item.applyTime)))}
              </span>
            </div>
            <div className="topItem">
              <InteractionFilled style={{ color: mainColor }} />
              <span>{statusConfig}</span>
            </div>
          </div>
          <div className="topRight">
            <ProgressCircle
              percent={30 * (status + 1)}
              style={{
                "--fill-color": mainColor,
                "--size": "90px",
                "--track-width": "10px",
              }}
            >
              <span>{statusConfig}</span>
            </ProgressCircle>
          </div>
        </div>
        <div
          className="bottom"
          style={{
            background: mainColor,
          }}
        >
          <div
            className="bottomItem"
            onClick={() => {
              if (status === 2) {
                return message.error("已申请成功，无法撤销")
              }
              Dialog.confirm({
                content: "确定撤回申请？（撤回后不可恢复）",
                onConfirm: async () => {
                  deleteApply({
                    params: {
                      _id: item._id,
                      applyType: isClassApply ? "gradeApply" : "awardApply",
                    },
                    success: (res) => {
                      if (res.data.code < 400) {
                        message.success(res.data.message)
                        setIsRender(!isRender)
                      } else {
                        message.error(res.data.message)
                      }
                    },
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

export default (props) => {
  const [data, setData] = useState(undefined)
  const [isRender, setIsRender] = useState(false)

  useEffect(() => {
    findAllApply({
      success: (res) => {
        let sortData = res.data.sort((a, b) => {
          let timeA = a.className ? a.classStatus.applyTime : a.applyTime
          let timeB = b.className ? b.classStatus.applyTime : b.applyTime
          return timeA > timeB ? -1 : 1
        })
        setData(sortData)
      },
    })
  }, [isRender, props.renderKey])
  return (
    <div className="allApply">
      {data
        ? data.map((item) => (
            <ShowBox
              item={item}
              key={item._id}
              isRender={isRender}
              setIsRender={setIsRender}
            />
          ))
        : null}
    </div>
  )
}
