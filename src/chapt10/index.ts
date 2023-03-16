// console.log("Chapter 10 - Working with object");  // are we watching the right folder?
// Chapter 10 - Working with object
let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = { name: "Umbrella", price: 42 };
let products = [hat, gloves, umbrella];

products.forEach((prod) => console.log(`${prod.name}: ${prod.price}`));
