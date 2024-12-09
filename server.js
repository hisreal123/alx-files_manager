import 'dotenv/config';
import express from 'express';
import Routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

Routes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

