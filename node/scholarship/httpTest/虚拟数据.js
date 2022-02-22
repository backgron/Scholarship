// 创建导员
for (let i = 0; i < 25; i++) {
  db.counselors.insert({
    counselorId: 'counselor' + i,
    password: '123456',
    name: '18计科导员' + i,
    sex: i / 3 === 0 ? '男' : '女',
    position: {
      academy: '计算机学院',
      major: '计算机专业',
      _class: [
        '18计科1班',
        '18计科2班',
        '18计科3班',
        '18计科4班'
      ]
    },
    phone: '1503141341' + i
  })
}

//创建学生
for (let i = 0; i < 25; i++) {
  db.students.insert({
    "stuId": "20181506210411",
    "password": "123456",
    "name": "张三",
    "age": 15,
    "position": {
      "academy": "计算机院",
      "major": "计算机专业",
      "_class": "18计科4班"
    },
    "phone": 17530111012,
    "actions": [{
      "name": "三好学生",
      "grade": "校级"
    }, {
      "name": "优秀班干部",
      "grade": "校级"
    }]
  })
}