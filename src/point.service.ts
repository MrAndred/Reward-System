import { Inject, Injectable, Logger } from '@nestjs/common';
import { PG_CONNECTION } from './constants/const';
import { getAllTransactionsByThreeMonth } from './database/queries';
import { CustomerTransaction } from './types/customer.transaction.type';
import { Customersinfo } from './types/customers.info.type';

@Injectable()
export class PointService {
  constructor(@Inject(PG_CONNECTION) private connection: any) {}
  private logger = new Logger('Point Service');
  private rewardPoints = [50, 100];

  async getAllTransactionsByThreeMonth(): Promise<Array<CustomerTransaction>> {
    try {
      const transactions = await this.connection.query(
        getAllTransactionsByThreeMonth,
      );
      return transactions.rows;
    } catch (error) {
      this.logger.error(error);
      throw `Database error: ${error}`;
    }
  }

  calculatePoints(purchase): number {
    if (purchase < 0) {
      this.logger.error('Negative purchase');
      throw 'Purchase can not be negative';
    }
    let totalPoints = 0;

    for (let i = 0; i < this.rewardPoints.length; i++) {
      if (purchase > this.rewardPoints[i]) {
        totalPoints += purchase - this.rewardPoints[i];
      }
    }
    return totalPoints;
  }

  getLastThreeMonth(): Array<number> {
    const nowDate = new Date();
    const nowMonth = nowDate.getMonth();

    return [nowMonth, nowMonth - 1, nowMonth - 2];
  }

  async getTotalCustomerInfo(): Promise<Array<Customersinfo>> {
    try {
      const transactions: Array<CustomerTransaction> =
        await this.getAllTransactionsByThreeMonth();

      const monthes = this.getLastThreeMonth();

      const customers = [];
      for (let i = 0; i < transactions.length; i++) {
        if (!customers.includes(transactions[i].customer_id)) {
          customers.push(transactions[i].customer_id);
        }
      }

      const totalInfo: Array<Customersinfo> = [];
      for (let i = 0; i < customers.length; i++) {
        const customer = {
          customerId: customers[i],
          totalPoints: 0,
          lastMonth: 0,
          secondMonth: 0,
          thirdMonth: 0,
        };

        for (let j = 0; j < transactions.length; j++) {
          const transaction = transactions[j];
          const calcPoints = this.calculatePoints(transaction.price);
          if (customers[i] === transaction.customer_id) {
            customer.totalPoints += calcPoints;
            const transactionMonth = transaction.created_at.getMonth();
            if (transactionMonth === monthes[0]) {
              customer.lastMonth += calcPoints;
            }
            if (transactionMonth === monthes[1]) {
              customer.secondMonth += calcPoints;
            }
            if (transactionMonth === monthes[2]) {
              customer.thirdMonth += calcPoints;
            }
          }
        }
        totalInfo.push(customer);
      }

      return totalInfo;
    } catch (error) {
      this.logger.error(error);
      throw `Internal error: ${error}`;
    }
  }
}
