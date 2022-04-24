import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestsModule } from './tests/tests.module';
import { AdminsModule } from './admins/admins.module';
import { GradesModule } from './grades/grades.module';
import { CounselorsModule } from './counselors/counselors.module';
import { AwardsModule } from './awards/awards.module';
import { NoticesModule } from './notices/notices.module';
import { StudentsModule } from './students/students.module';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';

@Module({
  imports: [
    //连接数据库
    MongooseModule.forRoot(
      'mongodb://admin:backgron@127.0.0.1:27017/scholarship?authSource=admin&authMechanism=SCRAM-SHA-1',
    ),
    AdminsModule,
    GradesModule,
    CounselorsModule,
    AwardsModule,
    NoticesModule,
    StudentsModule,
    TestsModule,
    CounselorsModule,
  ],
  controllers: [AppController],
  providers: [AppService, MetadataScanner],
})
export class AppModule {}
