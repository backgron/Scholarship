import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateTestDto } from './dto/create-test.dto'
import { UpdateTestDto } from './dto/update-test.dto'
import { Test, TestDocument } from './schema/test.schema'

@Injectable()
export class TestsService {
  constructor(@InjectModel(Test.name) private testModel: Model<TestDocument>) { }

  create(createTestDto: CreateTestDto) {
    const test = new this.testModel(createTestDto)
    return test.save()
  }

  findAll() {
    return this.testModel.find({ name: '123' })
  }

  findOne(id: number) {
    return `This action returns a #${id} test`
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`
  }

  remove(id: number) {
    return `This action removes a #${id} test`
  }
}
