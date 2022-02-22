import { PartialType } from '@nestjs/swagger';
import { CreateAwardDto } from './create-award.dto';

export class UpdateAwardDto extends PartialType(CreateAwardDto) {}
