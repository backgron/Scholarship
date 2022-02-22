import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TestsService } from './tests.service'
import { CreateTestDto } from './dto/create-test.dto'
import { UpdateTestDto } from './dto/update-test.dto'

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) { }

  @Post()
  async create(@Body() createTestDto: CreateTestDto) {
    return await this.testsService.create(createTestDto)
  }

  @Get()
  async findAll() {
    console.log(await this.testsService.findAll())

    return await this.testsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testsService.update(+id, updateTestDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testsService.remove(+id)
  }
}
