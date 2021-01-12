const express = require('express');

const app = express();
const PORT = 3333;
const path = require('path');

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
