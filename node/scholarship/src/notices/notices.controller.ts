import { Controller } from '@nestjs/common';
import { NoticesService } from './notices.service';
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticesService) {}
}
