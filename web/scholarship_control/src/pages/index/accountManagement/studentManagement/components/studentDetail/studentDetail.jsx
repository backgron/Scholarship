/** @format */

import React from "react"
import { Modal } from "antd"
import "./studentDetail.scss"

export default ({ visible, setVisible, stu }) => {
  const hasProp = (prop) => {
    return prop ? prop : "暂未收录"
  }

  const Actions = ({ actions }) => {
    if (actions.length !== 0) {
      return (
        <li>
          <span>奖惩</span>
          <div>
            <table rules="all" cellPadding="3px">
              <thead>
                <td>级别</td>
                <td>名称</td>
              </thead>
              <tbody>
                {actions.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.grade}</td>
                      <td>{item.name}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </li>
      )
    } else {
      return null
    }
  }

  if (stu) {
    return (
      <Modal
        visible={visible}
        title="学生详情"
        okText="确定"
        cancelButtonProps={{ className: "cancelBtn" }}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <div className="detail_box">
          <ul>
            <li>
              <span>姓名：</span>
              <span>{hasProp(stu.name)}</span>
            </li>
            <li>
              <span>学号：</span>
              <span>{hasProp(stu.stuId)}</span>
            </li>
            <li>
              <span>年纪：</span>
              <span>{hasProp(stu.age)}</span>
            </li>
            <li>
              <span>性别：</span>
              <span>{hasProp(stu.sex)}</span>
            </li>
            <li>
              <span>系院：</span>
              <span>{hasProp(stu.position.academy)}</span>
            </li>
            <li>
              <span>专业：</span>
              <span>{hasProp(stu.position.major)}</span>
            </li>
            <li>
              <span>班级：</span>
              <span>{hasProp(stu.position._class)}</span>
            </li>
            <li>
              <span>手机：</span>
              <span>{hasProp(stu.phone)}</span>
            </li>
            <Actions actions={stu.actions} />
          </ul>
        </div>
      </Modal>
    )
  } else {
    return null
  }
}
