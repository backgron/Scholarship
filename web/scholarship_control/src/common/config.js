/** @format */

let adr = "/api"
// 系统接口
let TESTS = adr + "tests"
//登录
let LOGIN = adr + "login"

//管理员接口
let adminApi = adr + "admins/"
//学生信息管理
let adminGetStudentInfo = adminApi + "getStudentInfo"
//重置学生密码接口
let adminResetStuPassword = adminApi + "resetStuPassword"
//条件 查询学生
let adminFindStuBy = adminApi + "findStuBy"
//根据_id查询学生详情
let adminGetStudentDetail = adminApi + "getStudentDetail"
// 导员信息管理
let adminGetCounselorInfo = adminApi + "getCounselorInfo"
//条件 查询导员
let adminFindCounselorBy = adminApi + "findCounselorBy"
//重置导员密码
let adminResetCounselorPassword = adminApi + "resetCounselorPassword"
// 根据_id查询导员详情
let adminGetCounselorDetail = adminApi + "getCounselorsDetail"
// 条件查询成绩修改
let adminFindsGradeConditionBy = adminApi + "findsGradeConditionBy"
// 同意成绩修改
let adminPassGradeApply = adminApi + "passGradeApply"
// 驳回成绩修改
let adminRejectGradeApply = adminApi + "rejectGradeApply"
// 条件查询奖学金生申请
let adminFindAwardApply = adminApi + "findAwardApply"
//同意奖学金申请
let adminPassAwardApply = adminApi + "passAwardApply"
// 驳回奖学金申请
let adminRejectAwardApply = adminApi + "rejectAwardApply"
// 条件查找公告
let adminFindNoticelorBy = adminApi + "findNoticelorBy"
// 创建一个公告
let adminCreateNotices = adminApi + "createNotices"
// 修改一个公告
let adminUpdateNotice = adminApi + "updateNotice"

//导员接口
let counselorApi = adr + "counselors/"
let counselorGetStudentInfo = counselorApi + "getStudentInfo"

//成绩接口
let gradeApi = adr + "grades/"
let findAllGradeApply = gradeApi + "findAllGradeApply"
let findStuAllGradesById = gradeApi + "findStuAllGradesById"
let studentChangeGrade = gradeApi + "studentChangeGrade"

//学生接口
let studentAPI = adr + "students/"
let createAward = studentAPI + "createAward"
let findAllApply = studentAPI + "findAllApply"
let findAllGrades = studentAPI + "findAllGrades"
let findAllActions = studentAPI + "findAllActions"
let changeStuPassword = studentAPI + "changeStuPassword"
let upDateInfo = studentAPI + "upDateInfo"
let deleteApply = studentAPI + "deleteApply"

export default {
  //系统接口
  LOGIN,
  TESTS,

  //管理员接口
  adminGetStudentInfo,
  adminResetStuPassword,
  adminFindStuBy,
  adminGetCounselorInfo,
  adminFindCounselorBy,
  adminResetCounselorPassword,
  adminGetStudentDetail,
  adminGetCounselorDetail,
  adminFindsGradeConditionBy,
  adminPassGradeApply,
  adminRejectGradeApply,
  adminFindAwardApply,
  adminPassAwardApply,
  adminRejectAwardApply,
  adminFindNoticelorBy,
  adminCreateNotices,
  adminUpdateNotice,

  //导员接口
  counselorGetStudentInfo,

  //成绩接口
  findAllGradeApply,
  findStuAllGradesById,
  studentChangeGrade,

  //学生接口
  createAward,
  findAllApply,
  findAllGrades,
  findAllActions,
  changeStuPassword,
  upDateInfo,
  deleteApply,
}
