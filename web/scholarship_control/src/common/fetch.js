/** @format */

import Fetch from "./axios.js"
import config from "./config.js"
let header = {
  "Content-Type": "application/json",
}
// post接口测试
export function tests(opt) {
  Fetch.post(config.TESTS, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// login登录接口
export function login(opt) {
  Fetch.post(config.LOGIN, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

//getStudentInfo 获取学生账号信息接口
export function getStudentInfo(opt, userType) {
  let path = ""
  if (userType === "admin") {
    path = config.adminGetStudentInfo
  } else if (userType === "counselor") {
    path = config.counselorGetStudentInfo
  }
  if (userType === "admin") {
    Fetch.get(config.adminGetStudentInfo, opt.params, header)
      .then(function (data) {
        opt.success && opt.success(data)
      })
      .catch(function (error) {
        opt.error && opt.error(error)
      })
  }
}

// resetStuPassword 重置学生密码接口
export function resetStuPassword(opt) {
  Fetch.post(config.adminResetStuPassword, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// adminFindStuBy 管理员条件查询学生
export function adminFindStuBy(opt) {
  Fetch.post(config.adminFindStuBy, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// adminGetCounselorInfo 查询导员信息
export function adminGetCounselorInfo(opt) {
  Fetch.get(config.adminGetCounselorInfo, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// adminFindStuBy 管理员条件查询导员
export function adminFindCounselorBy(opt) {
  Fetch.post(config.adminFindCounselorBy, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

//adminResetCounselorPassword 管理员重置导员密码
export function adminResetCounselorPassword(opt) {
  Fetch.post(config.adminResetCounselorPassword, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

//adminGetStudentDetail 管理员查询学生详情
export function adminGetStudentDetail(opt) {
  Fetch.post(config.adminGetStudentDetail, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

export function adminGetCounselorDetail(opt) {
  Fetch.post(config.adminGetCounselorDetail, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 查询所有课程申请
export function findAllGradeApply(opt) {
  Fetch.get(config.findAllGradeApply, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

//根据学生id查询学生所有成绩
export function findStuAllGradesById(opt) {
  Fetch.post(config.findStuAllGradesById, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

//根据学生ID申请修改成绩
export function studentChangeGrade(opt) {
  Fetch.post(config.studentChangeGrade, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

//学生申请奖学金
export function createAward(opt) {
  Fetch.post(config.createAward, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 学生查询自己的申请信息
export function findAllApply(opt) {
  Fetch.get(config.findAllApply, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 学生查询自己的成绩信息
export function findAllGrades(opt) {
  Fetch.get(config.findAllGrades, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 学生查询自己的成绩信息
export function findAllActions(opt) {
  Fetch.get(config.findAllActions, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

//学生修改自己密码
export function changeStuPassword(opt) {
  Fetch.post(config.changeStuPassword, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

//学生修改自己基本信息
export function upDateInfo(opt) {
  Fetch.post(config.upDateInfo, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

//学生撤销奖学金申请
export function deleteApply(opt) {
  Fetch.post(config.deleteApply, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 管理员条件查询成绩申请
export function adminFindsGradeConditionBy(opt) {
  Fetch.post(config.adminFindsGradeConditionBy, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 管理员通过成绩申请
export function adminPassGradeApply(opt) {
  Fetch.post(config.adminPassGradeApply, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 管理员驳回成绩申请
export function adminRejectGradeApply(opt) {
  Fetch.post(config.adminRejectGradeApply, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 条件查询奖学金申请
export function adminFindAwardApply(opt) {
  Fetch.post(config.adminFindAwardApply, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 驳回奖学金申请
export function adminRejectAwardApply(opt) {
  Fetch.post(config.adminRejectAwardApply, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 同意奖学金申请
export function adminPassAwardApply(opt) {
  Fetch.post(config.adminPassAwardApply, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 条件查询公告
export function adminFindNoticelorBy(opt) {
  Fetch.post(config.adminFindNoticelorBy, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 创建一个公告
export function adminCreateNotices(opt) {
  Fetch.post(config.adminCreateNotices, opt.params, header)
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}

// 修改一条公告
export function adminUpdateNotice(opt) {
  Fetch.post(
    config.adminUpdateNotice + "?_id=" + opt.params._id,
    opt.params,
    header
  )
    .then(function (data) {
      opt.success && opt.success(data)
    })
    .catch(function (error) {
      opt.error && opt.error(error)
    })
}
