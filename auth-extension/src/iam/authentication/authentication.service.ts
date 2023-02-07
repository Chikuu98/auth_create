import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly hashingService: HashingService,
    ) {}

    async signUp(signUpDto: SignUpDto) {

        try {
            const user = new User();
            user.email = signUpDto.email;
            user.password = await this.hashingService.hash(signUpDto.password);

            await this.usersRepository.save(user);
        } catch (err) {
            const uniqueViolationErrorCode = 'ER_DUP_ENTRY';
            if (err.code === uniqueViolationErrorCode) {
                throw new ConflictException();
            }
            throw err;
        }
    }

    async signIn(signInDto: SignInDto) {
        const user = await this.usersRepository.findOneBy({
            email: signInDto.email,
        });
        if (!user) {
            throw new UnauthorizedException('User does not exists');
        }
        const IsEmail = await this.hashingService.compare(
            signInDto.password,
            user.password
        );
        if (!IsEmail) {
            throw new UnauthorizedException('Password does not match');
        }
        
        return true;
    }
}
