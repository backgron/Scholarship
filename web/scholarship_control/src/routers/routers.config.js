import Index from '../pages/index/index'
import Login from '../pages/login/login'
import CounselorManagement from '../pages/index/accountManagement/counselorManagement/counselorManagement'
import StudentManagement from '../pages/index/accountManagement/studentManagement/studentManagement'
import GradeManagement from '../pages/index/gradeManagement/gradeManagement'

export default [{
    path: '/',
    Element: Login,
    role: []
  },
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
  }
]