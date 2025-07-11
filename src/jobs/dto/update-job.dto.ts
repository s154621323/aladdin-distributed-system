import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { JobStatus } from '@prisma/client';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @ApiProperty({
    enum: JobStatus,
    description: '任务状态',
    required: false,
  })
  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;
}
