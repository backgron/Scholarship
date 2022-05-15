import { Controller } from '@nestjs/common';
import { isAuth } from 'src/guard/auth-guard.guard';
import { NoticesService } from './notices.service';
@Controller('notice')
@isAuth('admin', 'student')
export class NoticeController {
  constructor(private readonly noticeService: NoticesService) {}
}
