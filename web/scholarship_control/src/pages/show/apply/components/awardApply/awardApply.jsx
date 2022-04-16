/** @format */

import { message } from "antd"
import { Card, CascadePicker, TextArea, Button } from "antd-mobile"
import { useState } from "react"
import "./awardApply.scss"
import { createAward } from "../../../../../common/fetch"

const options = [
  {
    label: "综合奖学金",
    value: "综合奖学金",
    children: [
      {
        label: "国家奖学金",
        value: "国家奖学金",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
      {
        label: "校奖学金",
        value: "校奖学金",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
    ],
  },
  {
    label: "助学金",
    value: "助学金",
    children: [
      {
        label: "校助学金",
        value: "校助学金",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
      {
        label: "国家助学金",
        value: "国家助学金",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
      {
        label: "国家励志奖学金",
        value: "国家励志奖学金",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
    ],
  },
  {
    label: "个人奖学金",
    value: "个人奖学金",
    children: [
      {
        label: "三好学生",
        value: "三好学生",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
      {
        label: "优秀学生干部",
        value: "优秀学生干部",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
      {
        label: "优秀毕业生",
        value: "优秀毕业生",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
    ],
  },
  {
    label: "单项奖学金",
    value: "单项奖学金",
    children: [
      {
        label: "道德风尚奖",
        value: "道德风尚奖",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
      {
        label: "学习优秀奖",
        value: "学习优秀奖",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
      {
        label: "科技创新奖",
        value: "科技创新奖",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
      {
        label: "文体竞赛奖",
        value: "文体竞赛奖",
        children: [
          { label: "一级", value: "一级" },
          { label: "二级", value: "二级" },
          { label: "三级", value: "三级" },
        ],
      },
    ],
  },
]

export default () => {
  const [applyType, setApplyType] = useState()
  const [applyName, setApplyName] = useState()
  const [applyLevel, setApplyLevel] = useState()
  const [applyMain, setApplyMain] = useState()
  const [visible, setVisible] = useState(false)

  return (
    <div className="awardApply">
      <Card
        className="card"
        onClick={() => {
          setVisible(true)
        }}
      >
        <span>奖助学金类型</span>
        <span className="labelValue">{applyType ? applyType : "选择"}</span>
      </Card>
      {applyType ? (
        <>
          <Card
            className="card"
            onClick={() => {
              setVisible(true)
            }}
          >
            <span>奖助学金名称</span>
            <span className="labelValue">{applyName}</span>
          </Card>
          <Card
            className="card"
            onClick={() => {
              setVisible(true)
            }}
          >
            <span>奖助学金等级</span>
            <span className="labelValue">{applyLevel}</span>
          </Card>
          <Card>
            <span>申请理由</span>
            <TextArea
              autoSize={false}
              showCount
              maxLength={500}
              placeholder="请输入内容"
              style={{ fontSize: "30px" }}
              rows={5}
              value={applyMain}
              onChange={(e) => {
                setApplyMain(e)
              }}
            />
          </Card>

          <Button
            className="subBtn"
            block
            color="primary"
            size="large"
            onClick={() => {
              createAward({
                params: {
                  applyType,
                  applyName,
                  applyLevel,
                  applyMain,
                },
                success: (res) => {
                  message.success(res.data.message)
                },
              })
            }}
          >
            提交申请
          </Button>
        </>
      ) : null}

      <CascadePicker
        title="级联选择"
        options={options}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        onConfirm={(value, extend) => {
          setApplyType(value[0])
          setApplyName(value[1])
          setApplyLevel(value[2])
        }}
      />
    </div>
  )
}
