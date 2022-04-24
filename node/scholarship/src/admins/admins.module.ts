import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schema/admin.schema';
import { StudentsModule } from 'src/students/students.module';
import { CounselorsModule } from 'src/counselors/counselors.module';
import { AwardsModule } from 'src/awards/awards.module';
import { GradesModule } from 'src/grades/grades.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    StudentsModule,
    CounselorsModule,
    AwardsModule,
    GradesModule,
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
