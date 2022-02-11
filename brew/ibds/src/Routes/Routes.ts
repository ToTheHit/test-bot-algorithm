import { Request, Response, Application } from 'express';
import * as path from 'path';
import * as Busboy from 'busboy';
// eslint-disable-next-line import/extensions,import/no-unresolved
import FileUploader from '../RequestHandlers/FileUploader';

export default class Routes {
  public routes(app: Application): void {
    // Allow Cross-Origin access to this server.
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, ' +
          'Access-Control-Request-Method, Access-Control-Request-Headers'
      );
      next();
    });

    app.get('/test', (req, res) => {
      res.end("That's all folks, yeah!55555");
    });

    // Uploads a new file on the server.
    app.post('/upload', (req: Request, res: Response) => {
      const saveDir = path.resolve('./uploads/');
      const fu : FileUploader = new FileUploader(saveDir, 31457280, 10); // 30 MB and 1 file maximum

      // Lets create config for busboy
      const config = {
        headers: req.headers,
        limits: {
          fileSize: fu.MaxFileSize,
          files: fu.FilesCount
        }
      };

      const busboy = new Busboy(config);

      req.pipe(busboy);

      const uploadedFiles:Array<string> = [];

      busboy.on('file', (fieldname, file, filename, encoding, mimeType) => {
        fu.OnFile(fieldname, file, filename, encoding, mimeType);
        // Save name of uploaded file to array.
        file.on('end', () => {
          uploadedFiles.push(filename);
        });
      });

      busboy.on('finish', () => {
        // eslint-disable-next-line no-console
        console.log('Upload complete');
        res.writeHead(200, { Connection: 'close' });
        const response = {
          uploaded: uploadedFiles
        };

        res.end(JSON.stringify(response));
      });
    });
  }
}
