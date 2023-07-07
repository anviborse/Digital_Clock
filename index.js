const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());


    app.get('/dc', (req, res) => {
      let currentTime = new Date().toLocaleTimeString();
      res.json({currentTime});
    });
    
    app.get('/wc', (req, res) => {
      let currentTime = new Date().toLocaleTimeString();
      res.json({currentTime});
    });
    app.get('/timer', (req, res) => {

      res.json();
    });
    app.get('/st', (req, res) => {
      const data = {message: 'server connected' };
      res.json(data);
    });
    app.post('/alarm' ,(req,res)=>{
      const {alarmTime} = req.body;
      console.log(`Received Alarm time : ${alarmTime}`);
      res.sendStatus('Alarm triggered');
    });
app.listen(9000,() => {console.log("server ready @ 9000")});
