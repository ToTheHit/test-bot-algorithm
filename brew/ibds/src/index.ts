const PORT = 3000;

import path from 'path';
import 'dotenv/config';

process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '../config');

import App from "./NetworkLayer";
import TelegramRoute from '@routes/telegram.route';
import AlgorithmRoute from '@routes/algorithm.route';

// const app = new App([new TelegramRoute()]);
const app = new App([
  new AlgorithmRoute(),
  new TelegramRoute()
]);
app.listen(PORT);
