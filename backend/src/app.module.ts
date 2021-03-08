import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CapacityModule } from './capacity/capacity.module';
import { WorkloadModule } from './workload/workload.module';
import { PiModule } from './pi/pi.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: process.env.DATABASE_SCHEMA,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    CapacityModule,
    WorkloadModule,
    PiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
