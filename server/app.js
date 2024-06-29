const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const credentials = require('./middleware/credentials');
const connectDB = require('./config/dbConn');
const cors = require('cors');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


app.use(express.json());

const foldersRouter = require('./routes/folder.js');
const filesRouter = require('./routes/files.js');

app.use('/folders', foldersRouter);
app.use('/files', filesRouter);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
