const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index.js');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

const port = 3000;

app.listen(port, () => {
   console.log(`Server is listening on port ${port}`); 
});

/*
    Handling server routes (API)
*/
app.get('/', routes)