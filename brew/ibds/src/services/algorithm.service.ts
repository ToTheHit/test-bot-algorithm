import algorithmModel from '@models/algorithmFlow.model';
import Algorithm from '@interfaces/algorithm.interface';

class AlgorithmService {
  public algorithm = algorithmModel;

  public async createAlgorithm(data): Promise<Algorithm> {
    const createdAlgorithm = await this.algorithm.create(data);
    return createdAlgorithm;
  }

  public async updateAlgorithm(data) {
    // FIXME: hardcode
    await this.algorithm.updateOne({ _id: '62068f3ef5b5096300d3aeb3' }, { $set: data });
  }
  public async getAlgorithm() {
    // FIXME: hardcode
    return this.algorithm.findOne({ _id: '62068f3ef5b5096300d3aeb3' }, { engine: 1 });
  }
}

export default AlgorithmService;
