import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AgentsService } from '../agents.service';
import { AladdinProtocolService } from './aladdin-protocol.service';

@Injectable()
export class AgentMonitoringService {
  constructor(
    private readonly agentsService: AgentsService,
    private readonly aladdinProtocolService: AladdinProtocolService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async checkAgentsHealth() {
    const agents = await this.agentsService.findAll();
    
    for (const agent of agents) {
      // 对于在线的代理，我们检查其健康状态
      if (agent.status === 'ONLINE' || agent.status === 'WORKING') {
        const isHealthy = await this.aladdinProtocolService.checkAgentHealth(agent);
        
        // 如果代理不健康，将其状态设置为离线
        if (!isHealthy && agent.status !== 'OFFLINE') {
          await this.agentsService.setAgentStatus(agent.id, 'OFFLINE');
          console.log(`Agent ${agent.name} (${agent.id}) is not responding and has been set to OFFLINE`);
        }
      }
    }
  }
}
