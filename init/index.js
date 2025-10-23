const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main().then(() => console.log("Connected to Database"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"68efbe1787e7f5546a3acf2f"}))
    await Listing.insertMany(initData.data);
    console.log("Database Initialized with sample data");
}

initDB();