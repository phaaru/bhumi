import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signin(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const mobile =  await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!mobile) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload: JwtPayload = { mobile };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
