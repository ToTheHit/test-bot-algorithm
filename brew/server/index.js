const express = require('express');
const asyncify = require('express-asyncify');
const telegramRouter = require('../ibds/src/Routes/Telegram');

const PORT = process.env.PORT || 3000;
const app = asyncify(express());

app.use(express.json());
app.use('/test', (req, res) => {
  res.end('ok');
});
app.use('/telegram', telegramRouter);
app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
