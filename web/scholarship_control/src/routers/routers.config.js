import Index from '../pages/index/index'
import Login from '../pages/login/login'
import CounselorManagement from '../pages/index/accountManagement/counselorManagement/counselorManagement'
import StudentManagement from '../pages/index/accountManagement/studentManagement/studentManagement'
import GradeManagement from '../pages/index/gradeManagement/gradeManagement'

import Show from '../pages/show/index'
import Home from '../pages/show/home/index'
import Mine from '../pages/show/mine/index'
import Apply from '../pages/show/apply/index'

export default [
  {
    path: '/',
    Element: Login,
    role: []
  },

  // 管理员 & 辅导员
  {
    path: '/index',
    Element: Index,
    role: ['admin', 'counselor'],
    children: [{
        path: 'counselorManagement',
        Element: CounselorManagement,
        role: ['admin']
      },
      {
        path: 'studentManagement',
        Element: StudentManagement,
        role: ['admin', 'counselor']
      }, {
        path: 'gradeManagement',
        Element: GradeManagement,
        role: ['admin', 'counselor']
      }
    ]
  },

  // 学生
  {
    path:'/show',
    Element:Show,
    role:['student'],
    children:[
      {
        path:'/show/home',
        Element:Home,
        role:['student']
      },
      {
        path:'/show/mine',
        Element:Mine,
        role:['student']
      },
      {
        path:'/show/apply',
        Element:Apply,
        role:['student']
      }
    ]
  },

]