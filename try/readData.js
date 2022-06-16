const data = require('./data.json');
// const parsedData = JSON.parse(data);
console.log(data.data[0].images[0].url);
console.log(data.data[0].images[1].url);


// fetch("./employees.json")
//     .then(response => {
//         return response.json();
//     })
//     .then(data => console.log(data));