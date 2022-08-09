import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('Server on port: ' + PORT);
});
