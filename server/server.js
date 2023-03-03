const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.static('server/public'));

//start listening
app.listen(PORT, () => {
    console.log('server running on port', PORT);
})