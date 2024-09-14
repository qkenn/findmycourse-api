require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

// router imports
const uniRouter = require('./routes/uni.router');
const programmeRouter = require('./routes/programme.router');
const subjectRouter = require('./routes/subject.router');
const courseRouter = require('./routes/course.router');

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/universities', uniRouter);
app.use('/api/programmes', programmeRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/courses', courseRouter);
app.use('*', (req, res) =>
  res.status(404).json({ message: 'route not found' })
);

// main error middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'internal server error' });
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`server running on http://127.0.0.1:${PORT}`)
);
