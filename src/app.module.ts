import { Module } from '@nestjs/common';
import { AgentsModule } from './agents/agents.module';
import { JobsModule } from './jobs/jobs.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AgentsModule,
    JobsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
