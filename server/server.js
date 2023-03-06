import express from 'express';
import { getSteamData, getCases } from './utils.js';
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const port = 4000;

app.listen(port, function(){
    console.log('Express started on http://localhost:' + port + '; press Ctrl-C to terminate.');
  });
  
app.get("/api/cases", (req, res) => {
    res.send(getCases());
  });

app.get("/api/case/:name", async (req, res) => {
    const name = req.params.name;
    await getSteamData(name)
          .then(price => res.send(price));
  });
