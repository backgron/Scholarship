import { forwardRef, Module } from '@nestjs/common'
import { StudentsService } from './students.service'
import { StudentsController } from './students.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Student, StudentSchema } from './schema/student.schema'
import { AwardsModule } from 'src/awards/awards.module'
import { GradesModule } from 'src/grades/grades.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]), forwardRef(() => AwardsModule), forwardRef(() => GradesModule)],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService]
})
export class StudentsModule { }
