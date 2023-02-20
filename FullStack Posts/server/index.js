import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import commentRoute from './routes/comments.js';
import fileUpload from 'express-fileupload';

mongoose.set('strictQuery', false);

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use(fileUpload());
app.use(express.static('uploads'));

const PORT = process.env.PORT || 5001;

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

const mongodbStart = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/MERN_POSTS').then(() => console.log('DB OK'));
  } catch (error) {
    console.log('DB error', error);
  }
};
mongodbStart();

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server OK port:${PORT}`);
});
