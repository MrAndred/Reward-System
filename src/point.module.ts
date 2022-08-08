import { Module } from '@nestjs/common';
import { DbModule } from './database/database.module';
import { PointController } from './point.controller';
import { PointService } from './point.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [DbModule, HealthModule],
  controllers: [PointController],
  providers: [PointService],
})
export class AppModule {}
