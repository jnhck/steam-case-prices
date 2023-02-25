import express from 'express';
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const port = 420;

app.listen(port, function(){
    console.log('Express started on http://localhost:' + port + '; press Ctrl-C to terminate.');
  });
  
app.get("/api/case/:name", async (req, res) => {
    const name = req.params.name;
    await getPrice(name)
          .then(price => res.send(price));
  });
  
async function getPrice(name) {
    const url = "https://steamcommunity.com/market/priceoverview/?market_hash_name=" + name + "&appid=730&currency=3";
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data;
    } 
  }
    // const price_gross = priceToFloat(data["lowest_price"])
    // const price_net = price_gross / 1.15 - 0.01
    // c.price_gross = price_gross
    // c.price_net = price_net.toFixed(2)
    // await c.save();




// function priceToFloat(input) {
//   return parseFloat(input.slice(0, -1).replace(",", "."))
// }