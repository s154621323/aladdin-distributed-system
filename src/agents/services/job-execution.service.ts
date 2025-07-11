import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AladdinProtocolService } from './aladdin-protocol.service';
import { JobResult } from '../interfaces/job-result.interface';

@Injectable()
export class JobExecutionService {
  constructor(
    private prisma: PrismaService,
    private aladdinProtocolService: AladdinProtocolService,
  ) {}

  async executeJob(jobId: string, agentId: string): Promise<JobResult> {
    // 查找任务和代理
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { agent: true },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }

    // 更新任务状态为运行中
    await this.prisma.job.update({
      where: { id: jobId },
      data: {
        status: 'RUNNING',
      },
    });

    try {
      // 调用Aladdin协议服务执行任务
      const result = await this.aladdinProtocolService.sendJobToAgent(
        job,
        job.agent,
      );

      // 更新任务结果和状态
      await this.prisma.job.update({
        where: { id: jobId },
        data: {
          status: result.success ? 'COMPLETED' : 'FAILED',
          result: result,
        },
      });

      return result;
    } catch (error) {
      // 更新任务状态为失败
      await this.prisma.job.update({
        where: { id: jobId },
        data: {
          status: 'FAILED',
          result: {
            success: false,
            errorDetails: error.message,
            anomalies: [error.message],
          },
        },
      });

      return {
        success: false,
        message: '任务执行失败',
        errorDetails: error.message,
        anomalies: [error.message],
      };
    }
  }
}
