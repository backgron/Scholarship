import { forwardRef, Module } from '@nestjs/common'
import { GradesService } from './grades.service'
import { GradesController } from './grades.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Grade, GradeSchema } from './schema/grade.schema'
import { StudentsModule } from 'src/students/students.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Grade.name, schema: GradeSchema }]), forwardRef(() => StudentsModule)],
  controllers: [GradesController],
  providers: [GradesService],
  exports: [GradesService]
})
export class GradesModule { }
