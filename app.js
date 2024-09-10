require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'indexpage' });
});

const PORT = app.listen(PORT, () =>
  console.log(`server running on http://127.0.0.1:${PORT}`)
);
