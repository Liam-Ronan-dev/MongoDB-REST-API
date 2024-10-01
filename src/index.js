import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { protect } from './modules/auth.js';
import { router } from './router.js';
import { createUser, signin } from './handlers/user.js';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', (req, res) => {
//   res.send('hello world');
// });
app.use('/api', protect, router);
app.post('/user', createUser);
app.post('/signin', signin);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: http://localhost:${process.env.PORT}`);
});
