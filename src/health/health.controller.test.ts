import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule, HttpModule],
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('Health check should show ok status', async () => {
    try {
      expect(await controller.check()).toStrictEqual({
        status: 'ok',
        info: { 'Health Check of reward point API': { status: 'up' } },
        error: {},
        details: { 'Health Check of reward point API': { status: 'up' } },
      });
    } catch (error) {
      throw `Server does not work: ${error}`;
    }
  });
});
