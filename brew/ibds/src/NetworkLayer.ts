import * as express from 'express';
import * as path from 'path';
import Routes from './Routes/Routes';

class NetworkLayer {
    public app: express.Application;

    public routesMap: Routes = new Routes();

    constructor() {
      this.app = express();
      this.app.use('/uploads', express.static(path.resolve(__dirname, './uploads')));
      this.config();
      this.routesMap.routes(this.app);
    }

    private config(): void {
      // example of function
    }
}

export default new NetworkLayer().app;
