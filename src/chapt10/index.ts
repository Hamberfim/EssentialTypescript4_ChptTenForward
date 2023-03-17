// console.log("Chapter 10 - Working with object");  // are we watching the right folder?
// Chapter 10 - Working with object  - typescript focus on an objects shape
let hat = { name: "Hat", price: 100 };
let ballCap = { name: "Ball Cap" };
let gloves = { name: "Gloves" };
let umbrella = { name: "Umbrella", price: 42 };
// the typescript compiler will still match an object to the defined shape if it has additional properties
let boots = { name: "Boots", price: 100, waterproof: false };

// object shape type annotation
let products: { name: string; price?: number; waterproof?: boolean }[] = [hat, gloves, umbrella, boots];

products.forEach((prod) => console.log(`${prod.name}: ${prod.price}`));

// method in a shape type
// console.log("\n=== method in a shape type ===");
enum Feature {
  Waterproof,
  Insulated,
}

let rainCoat = { name: "Rain Coat", price: 125, hasFeature: (feature: Feature) => feature === Feature.Waterproof };
let heavyCoat = { name: "Heavy Coat", price: 195, hasFeature: (feature: Feature) => feature === Feature.Insulated };
let rainBoots = { name: "Rain Boots", price: 175, hasFeature: (feature: Feature) => feature === Feature.Waterproof };

// let coldWetProds: { name: string; price?: number; hasFeature?(feature: Feature): boolean }[] = [rainCoat, heavyCoat, rainBoots];
// return only those that have the waterproof feature
// coldWetProds.forEach((prod) => console.log(`${prod.name}: ${prod.price} Waterproof: ${prod.hasFeature!(Feature.Waterproof)}`));
// coldWetProds.forEach((prod) => console.log(`${prod.name}: ${prod.price} ${prod.hasFeature ? prod.hasFeature(Feature.Waterproof) : false}`));

console.log("\n===Type Alias for Type shape ===");
// type alias for objects
type AllProducts = {
  id?: string;
  name: string;
  price?: number;
  hasFeature?(feature: Feature): boolean;
};

let allProducts: AllProducts[] = [hat, ballCap, gloves, umbrella, boots, rainCoat, heavyCoat, rainBoots];
allProducts.forEach((prod) =>
  console.log(
    `Product: ${prod.name}, Price: ${prod.price ? "$" + prod.price.toFixed(2) : "Not Listed"}, ` +
      `Waterproof: ${prod.hasFeature ? prod.hasFeature(Feature.Waterproof) : false}`
  )
);

// excess properties are ignored
let mirrorShades = { name: "Mirror Sunglasses", price: 54, finish: "mirrored" };
let darkShades = { name: "Dark Sunglasses", price: 54, finish: "flat" };

let mixedProducts: AllProducts[] = [hat, ballCap, gloves, umbrella, boots, rainCoat, heavyCoat, rainBoots, mirrorShades, darkShades];
mixedProducts.forEach((prod) =>
  console.log(
    `Product: ${prod.name}, Price: ${prod.price ? "$" + prod.price.toFixed(2) : "Not Listed"}, ` +
      `Waterproof: ${prod.hasFeature ? prod.hasFeature(Feature.Waterproof) : false}`
  )
);

console.log("\n===Type shape unions ===");
// type shape unions
type Person = {
  id: number;
  name: string;
  state: string;
};

type AirportCode = { id: string; name: string; city: string };

let bob: Person = { id: 1, name: "Bob", state: "Iowa" };
let linda: Person = { id: 2, name: "Linda", state: "Arizona" };
let london: AirportCode = { id: "EGLC", name: "London City Airport", city: "London" };
let chicago: AirportCode = { id: "ORD", name: "O'Hare International Airport", city: "Chicago" };

type TypeUnion = Person | AirportCode;

// let dataItems: (Person | AirportCode)[] = [bob, linda, london, chicago];
let dataItems: TypeUnion[] = [bob, linda, london, chicago];
dataItems.forEach((item) => console.log(`${item.id} - ${item.name}`));

console.log("\n===Type guarding shape unions ===");
// to differentiate between shape types for type guarding you'll need to use the 'in' keyword
// don't type guard test for optional properties
dataItems.forEach((item) => {
  if ("city" in item) {
    console.log(`${item.id} - ${item.name}, city: ${item.city}`);
  } else {
    console.log(`${item.id} - ${item.name}, State: ${item.state}`);
  }
});
