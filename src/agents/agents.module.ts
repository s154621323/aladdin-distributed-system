import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { JobExecutionService } from './services/job-execution.service';
import { AladdinProtocolService } from './services/aladdin-protocol.service';
import { AgentMonitoringService } from './services/agent-monitoring.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AgentsController],
  providers: [
    AgentsService,
    JobExecutionService,
    AladdinProtocolService,
    AgentMonitoringService,
  ],
  exports: [AgentsService, JobExecutionService],
})
export class AgentsModule {}
