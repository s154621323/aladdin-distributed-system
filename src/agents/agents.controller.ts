import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseGuards, // 暂时注释
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // 暂时注释，等认证模块创建后再使用
import { JobExecutionService } from './services/job-execution.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Agent } from '@prisma/client';

@ApiTags('agents')
@Controller('agents')
// @UseGuards(JwtAuthGuard) // 暂时注释，等认证模块创建后再使用
export class AgentsController {
  constructor(
    private readonly agentsService: AgentsService,
    private readonly jobExecutionService: JobExecutionService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '创建新代理',
    description: '创建新的代理并返回代理信息',
  })
  @ApiResponse({ status: 201, description: '代理创建成功' })
  @ApiResponse({ status: 400, description: '无效的请求数据' })
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有代理', description: '返回所有代理的列表' })
  @ApiResponse({ status: 200, description: '成功获取代理列表' })
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定代理', description: '根据ID获取代理详情' })
  @ApiParam({ name: 'id', description: '代理ID' })
  @ApiResponse({ status: 200, description: '成功获取代理信息' })
  @ApiResponse({ status: 404, description: '代理不存在' })
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新代理', description: '更新指定代理的信息' })
  @ApiParam({ name: 'id', description: '代理ID' })
  @ApiResponse({ status: 200, description: '代理更新成功' })
  @ApiResponse({ status: 404, description: '代理不存在' })
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentsService.update(id, updateAgentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除代理', description: '删除指定的代理' })
  @ApiParam({ name: 'id', description: '代理ID' })
  @ApiResponse({ status: 200, description: '代理删除成功' })
  @ApiResponse({ status: 404, description: '代理不存在' })
  remove(@Param('id') id: string) {
    return this.agentsService.remove(id);
  }

  @Post(':id/deploy')
  @ApiOperation({
    summary: '部署代理',
    description: '将代理状态设置为在线并部署',
  })
  @ApiParam({ name: 'id', description: '代理ID' })
  @ApiResponse({ status: 200, description: '代理部署成功' })
  @ApiResponse({ status: 404, description: '代理不存在' })
  async deployAgent(@Param('id') id: string) {
    const agent = await this.agentsService.findOne(id);
    await this.agentsService.setAgentStatus(id, 'ONLINE');
    return { success: true, message: 'Agent deployed successfully', agent };
  }

  @Post(':id/jobs/:jobId/execute')
  @ApiOperation({
    summary: '执行任务',
    description: '使用指定代理执行特定任务',
  })
  @ApiParam({ name: 'id', description: '代理ID' })
  @ApiParam({ name: 'jobId', description: '任务ID' })
  @ApiResponse({ status: 200, description: '任务执行成功' })
  @ApiResponse({ status: 404, description: '代理或任务不存在' })
  async executeJob(
    @Param('id') agentId: string,
    @Param('jobId') jobId: string,
  ) {
    return this.jobExecutionService.executeJob(jobId, agentId);
  }
}
