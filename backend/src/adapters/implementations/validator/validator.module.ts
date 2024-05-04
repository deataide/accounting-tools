import { DataValidatorAdapterService } from './validator.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DataValidatorAdapterService],
  exports: [DataValidatorAdapterService],
})
export class DataValidatorAdapterModule {}
