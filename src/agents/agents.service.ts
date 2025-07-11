import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent, AgentStatus } from '@prisma/client';

@Injectable()
export class AgentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    // 验证Agent API地址可用性
    await this.verifyAgentApiAddress(createAgentDto.address);

    return this.prisma.agent.create({
      data: createAgentDto,
    });
  }

  async findAll(): Promise<Agent[]> {
    return this.prisma.agent.findMany({
      include: {
        jobs: true,
      },
    });
  }

  async findOne(id: string): Promise<Agent> {
    const agent = await this.prisma.agent.findUnique({
      where: { id },
      include: {
        jobs: true,
      },
    });

    if (!agent) {
      throw new NotFoundException(`Agent with ID ${id} not found`);
    }

    return agent;
  }

  async update(id: string, updateAgentDto: UpdateAgentDto): Promise<Agent> {
    const agent = await this.findOne(id);

    if (updateAgentDto.address && updateAgentDto.address !== agent.address) {
      await this.verifyAgentApiAddress(updateAgentDto.address);
    }

    return this.prisma.agent.update({
      where: { id },
      data: updateAgentDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.agent.delete({
      where: { id },
    });
  }

  async setAgentStatus(id: string, status: AgentStatus): Promise<Agent> {
    return this.prisma.agent.update({
      where: { id },
      data: { status },
    });
  }

  private async verifyAgentApiAddress(address: string): Promise<void> {
    // 实现API地址验证逻辑
    // 检查API端点是否有效
  }
}
