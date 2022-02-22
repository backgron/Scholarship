import { Injectable } from '@nestjs/common'
import { StudentsService } from './students/students.service'

@Injectable()
export class AppService {
  constructor(private readonly studentsService: StudentsService) { }

  getHello() {
    return 'Hello'
  }
}
