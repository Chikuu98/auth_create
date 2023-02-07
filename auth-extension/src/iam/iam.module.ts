import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService
    }
  ],
  controllers: [AuthenticationController]
})
export class IamModule {}
