import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ description: '执行任务的代理ID' })
  @IsUUID()
  @IsOptional()
  agentId?: string;

  @ApiProperty({
    description: '任务执行的参数',
    type: 'object',
    example: {
      imageUrl: 'https://example.com/image.jpg',
      processingOptions: { quality: 'high', format: 'png' },
    },
  })
  @IsJSON()
  @IsOptional()
  parameters?: Record<string, any>;

  @ApiProperty({ description: '任务描述', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
