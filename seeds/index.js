const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
// const nps = require('../try/data.json');
const nps = require('../try/1.json');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 1; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '6282dc7bbe118c652fe45fd7',
            location: nps.data[i].addresses[0].city + ', ' + nps.data[i].addresses[0].stateCode,
            title: nps.data[i].fullName,
            description: nps.data[i].description,
            price: nps.data[i].entranceFees[0].cost,
            geometry: {
                type: "Point",
                coordinates: [
                    nps.data[i].longitude,
                    nps.data[i].latitude,
                ]
            },
            images: [
                {
                    url: nps.data[i].images[0].url,
                    filename: nps.data[i].images[0].title
                },
                // {
                //     url: nps.data[i].images[1].url,
                //     filename: nps.data[i].images[1].title
                // }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})