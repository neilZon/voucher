// server.js
//===========================================
const express = require('express'); // express app
const app = express();

// placeholder for landing page
app.get('/',(req, res) => {
    res.send('<h1>Welcome to voucher</h1>')
});

const PORT = process.env.PORT || 4000;

//===========================================
// Start server
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
