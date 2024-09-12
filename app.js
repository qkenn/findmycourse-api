require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

// import routers
const uniRouter = require('./routes/uni.router');
const courseRouter = require('./routes/course.router');

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/unis', uniRouter);
app.use('/api/courses', courseRouter);
app.use('*', (req, res) =>
  res.status(404).json({ success: false, message: 'route not found' })
);

// main error middleware
app.use((err, req, res, next) => {
  res.status(500).json({ sucess: false, message: 'internal server error' });
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`server running on http://127.0.0.1:${PORT}`)
);
