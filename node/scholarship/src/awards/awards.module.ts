import { forwardRef, Module } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Award, AwardSchema } from './schema/award.schema';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Award.name, schema: AwardSchema }]),
    forwardRef(() => StudentsModule),
  ],
  controllers: [AwardsController],
  providers: [AwardsService],
  exports: [AwardsService],
})
export class AwardsModule {}
