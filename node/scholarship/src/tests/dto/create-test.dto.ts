
import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, Max, Min } from "class-validator"

export class CreateTestDto {
  @IsString()
  @ApiProperty({
    description: '姓名'
  })
  name: string

  @IsNumber()
  @Max(130)
  @Min(0)
  @ApiProperty({
    description: '年龄',
  })
  age: number
}
