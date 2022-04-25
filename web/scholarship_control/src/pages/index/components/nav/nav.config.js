/** @format */

import {
  CalendarOutlined,
  DeploymentUnitOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons"

export default [
  // {
  //   type: "MenuItem",
  //   key: "sub0",
  //   icon: DeploymentUnitOutlined,
  //   innerHtml: "首页",
  //   path: "",
  //   role: ["admin", "counselor"],
  // },
  {
    type: "SubMenu",
    key: "sub1",
    icon: UserOutlined,
    title: "用户账号管理",
    role: ["admin", "counselor"],
    innerHtml: [
      {
        type: "MenuItem",
        key: "1",
        path: "studentManagement",
        role: ["admin", "counselor"],
        innerHtml: "学生账号管理",
      },
      {
        type: "MenuItem",
        key: "2",
        path: "counselorManagement",
        role: ["admin"],
        innerHtml: "导员账号管理",
      },
    ],
  },
  {
    type: "SubMenu",
    key: "sub2",
    icon: AppstoreOutlined,
    title: "奖助学金管理",
    role: ["admin", "counselor"],
    innerHtml: [
      // {
      //   type: 'MenuItem',
      //   key: '3',
      //   path: 'counselorManagement',
      //   role: ['admin', 'counselor'],
      //   innerHtml: '奖助学金历史',
      // },
      {
        type: "MenuItem",
        key: "4",
        path: "awardManagement",
        role: ["admin", "counselor"],
        innerHtml: "奖助学金审批",
      },
    ],
  },
  {
    type: "SubMenu",
    key: "sub3",
    icon: SettingOutlined,
    title: "学生成绩管理",
    role: ["admin", "counselor"],
    innerHtml: [
      {
        type: "MenuItem",
        key: "5",
        path: "gradeManagement",
        role: ["admin", "counselor"],
        innerHtml: "学生成绩审批",
      },
    ],
  },
  {
    type: "SubMenu",
    key: "sub4",
    icon: CalendarOutlined,
    title: "官网公告管理",
    role: ["admin"],
    innerHtml: [
      {
        type: "MenuItem",
        key: "6",
        path: "counselorManagement",
        role: ["admin"],
        innerHtml: "官网公告管理",
      },
    ],
  },
]
