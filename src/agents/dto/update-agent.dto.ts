import { PartialType } from '@nestjs/swagger';
import { CreateAgentDto } from './create-agent.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { AgentStatus } from '@prisma/client';

export class UpdateAgentDto extends PartialType(CreateAgentDto) {
  @ApiProperty({
    enum: AgentStatus,
    description: '代理状态',
    required: false,
  })
  @IsEnum(AgentStatus)
  @IsOptional()
  status?: AgentStatus;
}
