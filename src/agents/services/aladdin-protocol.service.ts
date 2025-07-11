import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JobResult } from '../interfaces/job-result.interface';
import { Agent, Job } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AladdinProtocolService {
  constructor(private httpService: HttpService) {}

  async sendJobToAgent(job: Job, agent: Agent): Promise<JobResult> {
    try {
      const endpoint = `${agent.address}/jobs/execute`;
      const response = await firstValueFrom(
        this.httpService.post<JobResult>(endpoint, {
          jobId: job.id,
          parameters: job.result ? (job.result as any).parameters : {},
        }),
      );

      return response.data;
    } catch (error) {
      console.error(`发送任务到代理时出错: ${error.message}`);
      return {
        success: false,
        message: '无法连接到代理',
        errorDetails: error.message,
        anomalies: [无法连接到代理: ${agent.address}],
      };
    }
  }

  async checkAgentHealth(agent: Agent): Promise<boolean> {
    try {
      const endpoint = `${agent.address}/health`;
      const response = await firstValueFrom(
        this.httpService.get(endpoint),
      );
      return response.status === 200;
    } catch (error) {
      console.error(
        `检查代理健康状态时出错: ${agent.id}, ${error.message}`,
      );
      return false;
    }
  }
}
