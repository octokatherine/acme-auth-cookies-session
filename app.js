const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: 'Pandas Rock', 
  
    resave: false,
  
    saveUninitialized: true
  }))

  app.use((req, res, next) => {
    console.log('SESSION: ', req.session)
    next()
  })

  app.get('/', (req, res, next) => {
    res.send('hi')
  })

  app.listen(8080, () => console.log('Listening on port 8080'));