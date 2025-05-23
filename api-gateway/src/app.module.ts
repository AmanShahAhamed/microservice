import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
// import { InventoryController } from './inventory/inventory.controller';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          inventoryService: {
            transport: Transport.TCP,
            options: {
              host: 'inventory-service',
              port: 4001,
            },
          },
          orderService: {
            transport: Transport.TCP,
            options: {
              host: 'order-service',
              port: 4002,
            },
          },
          paymentService: {
            transport: Transport.TCP,
            options: {
              host: 'payment-service',
              port: 4003,
            },
          },
          userManagementService: {
            transport: Transport.TCP,
            options: {
              host: 'user-management-service',
              port: 4004,
            },
          },
        }),
      ],
    }),
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: 'INVENTORY_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get('inventoryService');
        if (!tokenServiceOptions) {
          throw new Error('Missing config for inventoryService');
        }
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'ORDER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get('orderService');
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'PAYMENT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get('paymentService');
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'USER_MANAGEMENT_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get('userManagementService');
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
