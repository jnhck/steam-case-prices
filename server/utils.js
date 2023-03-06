import { readFileSync, writeFileSync } from 'fs'

const dbPath = './db/realDB.json';
const imgPath = './db/images.json';

export const readDB = (path = dbPath) => {
    const data = readFileSync(path, 'utf8');
    return JSON.parse(data);
}

export const searchByName = (name, data = readDB()) => {
    return data.find(c => c.name === name);
}

export const convertPrice = (price) => {
    if (price.slice(-1) === "€") price = price.slice(0, -1);
    if (price.includes(",")) price = price.replace(",", ".");
    return price;
}

export const getImage = (name, data = readDB(imgPath)) => {
    return data.find(c => c.name === name).img;
}

export const getCases = (data = readDB()) => {
    return data.map(c => { 
        return {
            name: c.name,
            img: c.img,
        }
    });
}

export async function getSteamData(name) {
    const c = searchByName(name);
    // last update less than 10 minutes ago, return cached data
    if (c.timestamp + 600000 > Date.now()) return c;

    // old or no cached data, fetch from steam
    const url = constructSteamURL(name);
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      let db = readDB();
      db = db.filter(c => c.name !== name);
      const caseData = {
        name: name,
        img: getImage(name),
        price_gross: convertPrice(data["lowest_price"]),
        volume: data["volume"],
        timestamp: Date.now(),
      }
      db.push(caseData);
      writeFileSync(dbPath, JSON.stringify(db, null, 2), (error) => {
        if (error) {
          return;
        }
      });
      return caseData;
  } else {
    console.error(`Error fetching data for >> ${name} << from Steam Market.`);
    console.error("HTTP-Error: " + res.status);
  }
}

const constructSteamURL = (name) => {
    return "https://steamcommunity.com/market/priceoverview/?market_hash_name=" + name + "&appid=730&currency=3";
}