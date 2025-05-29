import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.getOrThrow<string>('DB_HOST'),
    port: configService.getOrThrow<number>('DB_PORT'),
    username: configService.getOrThrow<string>('DB_USER'),
    password: configService.getOrThrow<string>('DB_PASS'),
    database: configService.getOrThrow<string>('DB_NAME'),
    entities: ['dist/*/**/***.entity{.ts,.js}'],
    migrations: ['dist/*/**/***.migration{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
    // logger: 'simple-console',
    // logging: true,
  }),
};
