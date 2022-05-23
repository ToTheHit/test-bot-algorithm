import { Router } from 'express';
import TelegramController from '@controllers/telegram.controller';
import { Routes } from '@interfaces/routes.interface';

class TelegramRoute implements Routes {
  public path = '/telegram';
  public router = Router();
  public telegramController = new TelegramController();

  constructor() {
    this.initializeRoutes();
    // FIXME: hardcode
    this.telegramController.autoAuth({
      body: {
        phone: 79306924137,
        userId: 1793944123,
        accessHash: 8527567006830283274,
      },
    });
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/auth`, this.telegramController.getUser);
    this.router.post(`${this.path}/test`, this.telegramController.test);
    this.router.post(`${this.path}/code/send`, this.telegramController.sendCode);
    this.router.post(`${this.path}/code/accept`, this.telegramController.signIn);
    this.router.post(`${this.path}/code/password`, this.telegramController.signInPassword);

    this.router.post(`${this.path}/start`, this.telegramController.start);
    this.router.post(`${this.path}/stop`, this.telegramController.stop);

  }
}

export default TelegramRoute;
