import express from 'express';
import greetRouter from './routes/greet.js';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';
const app = express();
app.use(express.json());

app.use('/greet',greetRouter)
app.use('/users', usersRouter);
app.use('/posts', postsRouter);


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
