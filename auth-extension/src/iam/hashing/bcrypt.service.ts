import { Injectable } from '@nestjs/common';
import { genSalt } from 'bcrypt';
import { HashingService } from './hashing.service';

@Injectable()
export class BcryptService implements HashingService {
    async hash(data: string | Buffer): Promise<string> {
        const salt = await genSalt();
        return this.hash(salt);
    }

    compare(data: string | Buffer, encrypted: string): Promise<boolean> {
        return this.compare(data, encrypted);
    }
}
