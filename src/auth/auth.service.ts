import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LogUserDto } from './dtos/log-user.dto';
import { hashPassword } from './utils/hash-password';
import { comparePassword } from './utils/compare-password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly jwtService: JwtService){}
    async register(createUserDto: CreateUserDto) {
        let user = await this.userRepository.findOneBy({email: createUserDto.email});
        if(user) {
            throw new BadRequestException("User alredy exist !")
        }
        const hash = hashPassword(createUserDto.password)
        user = this.userRepository.create({email: createUserDto.email, fullName: createUserDto.fullName, password: hash, id: Math.random() * 1000});
        await this.userRepository.save(user)
        const payload = {userID: user.id, email: user.email}
        const token = await this.jwtService.signAsync(payload)
        return {msg: "user created", token}
    }
    async login(logUserDto: LogUserDto) {
        let user = await this.userRepository.findOneBy({email: logUserDto.email});
        if(!user) {
            throw new NotFoundException("User doesn't exist!")
        }
        const isMatch = comparePassword(logUserDto.password, user.password)
        if(!isMatch) {
            throw new BadRequestException("Wrong credentials !")
        }
        const payload = {userID: user.id, email: user.email}
        const token = await this.jwtService.signAsync(payload)
        return {msg: "login successful!", token}
    }
}
