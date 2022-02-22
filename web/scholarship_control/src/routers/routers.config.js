import Index from '../pages/index/index'
import Login from '../pages/login/login'
import CounselorManagement from '../pages/index/accountManagement/counselorManagement/counselorManagement'
import StudentManagement from '../pages/index/accountManagement/studentManagement/studentManagement'

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
      },
    ]
  }
]