import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';

@Module({
  providers: [HashingService]
})
export class IamModule {}
