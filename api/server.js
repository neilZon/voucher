//==========  server.js  ===========
const express = require('express') // express app

const app = express();

// routing 
app.use('/', require('./routes/index'));

app.get('/', (req, res) => {
    res.send("welcome to voucher");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started on port ${PORT} `));