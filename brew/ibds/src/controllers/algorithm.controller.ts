import { logger } from '@utils/logger';
import { HttpException } from '@exceptions/HttpException';
import Algorithm from '@interfaces/algorithm.interface';
import AlgorithmService from '@services/algorithm.service';
import parser from '../engine/engineParser';
class AlgorithmController {
  public algorithmService = new AlgorithmService();

  public create = async (req, res) => {
    const data = req.body;
    const algorithm = {
      engine: data,
      parsedEngine: parser(data),
      title: '123',
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const createdAlgorithm = await this.algorithmService.createAlgorithm(algorithm);
    res.send(createdAlgorithm);
  };

  public update = async (req, res) => {
    const data = req.body;
    const algorithm = {
      engine: data,
      parsedEngine: parser(data),
      title: '123',
    };

    const createdAlgorithm = await this.algorithmService.updateAlgorithm(algorithm);
    res.send(createdAlgorithm);
  };

  public get = async (req, res) => {
    const { engine } = await this.algorithmService.getAlgorithm();

    res.send(engine);
  };
}

export default AlgorithmController;
