import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LogUserDto } from './dtos/log-user.dto';
import { Response } from 'express';

@UsePipes(ValidationPipe)
@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post("register")
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const jwt = (await this.authService.register(createUserDto)).token;
        res.cookie("token", jwt, {
            maxAge: 3600*1000*24
        })
        res.json({msg: "Register successful !"})
    }
    @Post("login")
    async login(@Body() logUserDto: LogUserDto, @Res() res: Response) {
        const jwt = (await this.authService.login(logUserDto)).token;
        res.cookie("token", jwt, {
            maxAge: 3600*1000*24
        })
        res.json({msg: "Login successful !"})
    }
}
