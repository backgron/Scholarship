import { PartialType } from '@nestjs/swagger';
import { CreateCounselorDto } from './create-counselor.dto';

export class UpdateCounselorDto extends PartialType(CreateCounselorDto) {}
