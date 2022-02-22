import { Module } from '@nestjs/common'
import { TestsService } from './tests.service'
import { TestsController } from './tests.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestSchema } from './schema/test.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }])],
  controllers: [TestsController],
  providers: [TestsService]
})
export class TestsModule { }
