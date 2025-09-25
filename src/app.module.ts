import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb', // Tell TypeORM to use MongoDB
      url: 'mongodb://127.0.0.1:27017/taskmanager', // MongoDB URL
      // useUnifiedTopology: true, // Required for newer Mongo clients
      entities: [Task], // Register our Task entity
      synchronize: true, // Auto-create DB schema on startup (great for development)
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (this.dataSource.isInitialized) {
      this.logger.log('MongoDB connected successfully!');
    } else {
      this.logger.error('MongoDB connection is NOT initialized.');
    }
  }
}
