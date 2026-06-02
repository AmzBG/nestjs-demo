import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto {
  @ApiProperty()
  success!: Boolean;

  @ApiProperty({ required: false, type: Object })
  data?: any;

  @ApiProperty({ required: false })
  error?: string;

  @ApiProperty({ required: false, type: Object })
  meta?: any;
}