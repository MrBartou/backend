import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: {
    expiresIn: configService.get<string | number>('JWT_EXPIRES_IN'),
  },
});
