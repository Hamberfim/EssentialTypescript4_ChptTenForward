// console.log("Chapter 10 - Working with object");  // are we watching the right folder?
// Chapter 10 - Working with object  - typescript focus on an objects shape
let hat = { name: "Hat", price: 100 };
let gloves = { name: "Gloves", price: 75 };
let umbrella = { name: "Umbrella", price: 42 };
// the typescript compiler will still match an object to the defined shape if it has additional properties
let boots = { name: "Boots", price: 100, waterproof: true };

// object shape type annotation
let products: { name: string; price: number }[] = [hat, gloves, umbrella, boots];

products.forEach((prod) => console.log(`${prod.name}: ${prod.price}`));
