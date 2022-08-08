import { Test, TestingModule } from '@nestjs/testing';
import { DbModule } from './database/database.module';
import { PointController } from './point.controller';
import { PointService } from './point.service';

describe('PointController', () => {
  let appController: PointController;
  const customers = [
    {
      customerId: '8a77436a-b10a-4f5a-b7c3-78d2a96d3070',
      lastMonth: 100,
      secondMonth: 0,
      thirdMonth: 0,
      totalPoints: 100,
    },
    {
      customerId: 'daa99672-9fb8-42d2-a74f-bbde29fe87c3',
      lastMonth: 0,
      secondMonth: 10,
      thirdMonth: 0,
      totalPoints: 10,
    },
    {
      customerId: '1c561be8-214e-42ad-85f8-e788d7607740',
      lastMonth: 0,
      secondMonth: 20,
      thirdMonth: 250,
      totalPoints: 270,
    },
    {
      customerId: 'ce54d83d-bcfe-445e-8084-566f256805b8',
      lastMonth: 0,
      secondMonth: 0,
      thirdMonth: 50,
      totalPoints: 50,
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      controllers: [PointController],
      providers: [PointService],
    }).compile();

    appController = app.get<PointController>(PointController);
  });

  it('should return list of customers with their points', async () => {
    try {
      expect(await appController.getTotalCustomerPoints()).toStrictEqual(
        customers,
      );
    } catch (error) {
      throw `Internal error: ${error}`;
    }
  });
});
