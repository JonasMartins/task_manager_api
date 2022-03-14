import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    return { msg: 'test' };
  }

  logout() {
    return { msg: 'test' };
  }
}
