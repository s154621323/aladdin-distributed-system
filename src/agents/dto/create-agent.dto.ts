import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AgentStatus } from '@prisma/client';

export class CreateAgentDto {
  @ApiProperty({ description: '代理名称' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '代理标签',
    type: [String],
    example: ['AI', 'image-processing', 'data-analysis'],
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    description: '是否自动接受任务',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  autoAcceptJobs?: boolean;

  @ApiProperty({ description: '代理分类' })
  @IsString()
  @IsNotEmpty()
  classification: string;

  @ApiProperty({
    description: '代理API地址',
    example: 'http://agent-server:8080/api',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: '代理描述', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '创建者信息', required: false })
  @IsString()
  @IsOptional()
  authorBio?: string;

  @ApiProperty({
    description: '是否为免费代理',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isFree?: boolean;
}
