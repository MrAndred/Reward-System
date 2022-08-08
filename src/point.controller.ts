import {
  Controller,
  GatewayTimeoutException,
  Get,
  Logger,
} from '@nestjs/common';
import { PointService } from './point.service';
import { Customersinfo } from './types/customers.info.type';

@Controller('points')
export class PointController {
  private logger = new Logger('Point controller');
  constructor(private readonly pointService: PointService) {}

  @Get('/customers-info-by-three-monthes')
  async getTotalCustomerPoints(): Promise<Array<Customersinfo>> {
    try {
      return await this.pointService.getTotalCustomerInfo();
    } catch (error) {
      this.logger.error(error);
      throw new GatewayTimeoutException();
    }
  }
}
