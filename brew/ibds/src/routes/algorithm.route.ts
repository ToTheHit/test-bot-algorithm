import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import AlgorithmController from '@controllers/algorithm.controller';

class AlgorithmRoute implements Routes {
  public path = '/algorithm';
  public router = Router();
  public algorithmController = new AlgorithmController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.algorithmController.create);
    this.router.patch(`${this.path}`, this.algorithmController.update);
    this.router.get(`${this.path}`, this.algorithmController.get);
  }
}

export default AlgorithmRoute;
