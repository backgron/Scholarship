import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/students/schema/student.schema';
import { Admin } from 'src/admins/schema/admin.schema';
import { Counselor } from 'src/counselors/schema/counselor.schema';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

const scrypt = promisify(_scrypt);

//判断密码是否正确
export async function isPassword(
  user: Admin | Student | Counselor,
  model: Model<Admin | Student | Counselor>,
  password: string,
) {
  //数据库中为初始密码可以直接登录
  if (user.password === '123456') {
    return true;
  }

  //获取密码 hash 值
  console.log(user);
  const [salt, rightHash] = user.password.split('.');
  //混合当前密码  制作hash密码
  const hash = (await scrypt(password, salt, 32)) as Buffer;

  if (!(hash.toString('hex') === rightHash)) {
    return false;
  }
  return true;
}

//修改密码
export async function changePassword(
  user: Admin | Student | Counselor,
  model: Model<Admin | Student | Counselor>,
  pre: string,
  next: string,
) {
  //判断密码是否正确或为初始值
  if (await isPassword(user, model, pre)) {
    //创建 hash 密码
    //创建随机 salt
    const salt = randomBytes(8).toString('hex');
    // 创建 hash 密码
    const hash = (await scrypt(next, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    //设置用户密码
    await model.updateOne({ _id: user._id }, { password: result });
    return true;
  }
  return false;
}

//重置密码
export async function restPassword(_id: string, model: Model<any>) {
  let isUser: any;
  try {
    isUser = await model.findOne({ _id: new ObjectId(_id) });
  } catch (err) {
    throw new BadRequestException('id信息错误');
  }

  if (isUser) {
    await model.updateOne({ id: _id }, { password: '123456' });
    return {
      _id: isUser._id,
      status: 200,
      msg: '修改密码成功',
    };
  } else {
    throw new BadRequestException('用户不存在');
  }
}
