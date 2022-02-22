import { Module } from '@nestjs/common'
import { AdminsService } from './admins.service'
import { AdminsController } from './admins.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Admin, AdminSchema } from './schema/admin.schema'
import { StudentsModule } from 'src/students/students.module'
import { CounselorsModule } from 'src/counselors/counselors.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]), StudentsModule, CounselorsModule],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService]
})
export class AdminsModule { }
