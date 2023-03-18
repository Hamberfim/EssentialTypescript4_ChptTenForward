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

console.log("\n===Type guarding with a Type Predicate Function ===");
function isPerson(testObj: any): testObj is Person {
  return testObj.state !== undefined;
}
dataItems.forEach((item) => {
  if (isPerson(item)) {
    console.log(`${item.id} - ${item.name}, State: ${item.state}`);
  } else {
    console.log(`${item.id} - ${item.name}, city: ${item.city}`);
  }
});

// type intersections combine multiple types and allow all the features to be used
// type unions only allow the common features to be used
console.log("\n=== Type Intersections ===");
type Company = {
  id: number;
  company: string;
  dept: string;
};
let gene = { id: 3, name: "Gene", state: "Florida", company: "Acme Soap Co.", dept: "Sales" };
let tina = { id: 4, name: "Tina", state: "Texas", company: "Fan Fiction Inc.", dept: "CFO" };
// set employeeData array to the intersection type of 'Person & Company' rather than a union of 'Person | Company'
let employeeData: (Person & Company)[] = [gene, tina];
employeeData.forEach((item) => {
  // the properties from both types of the intersection can be used rather than needing to type guard/test which type is being looped on
  console.log(`Person: ${item.id}, ${item.name}, ${item.state}`);
  console.log(`Employee: ${item.id}, ${item.company}, ${item.dept}`);
});

// using intersections for data correlation
console.log("\n=== using Type intersections for data correlation ===");
type EmployedPerson = Person & Company;

// correlation function - to create objects that conform to the shape of the type intersection
function correlateData(peopleData: Person[], staff: Company[]): EmployedPerson[] {
  const defaults = { company: "None", dept: "None" };
  return peopleData.map((p) => ({ ...p, ...(staff.find((e) => e.id === p.id) || { ...defaults, id: p.id }) }));
}

// passing both arrays into the function we use the id as a shared property to produce objects that combine the properties of both the Person & Company type shapes
let people: Person[] = [
  { id: 5, name: "Tommy Bahama", state: "Florida" },
  { id: 5, name: "Kathy Bahama", state: "Florida" },
  { id: 6, name: "David Hammer", state: "Texas" },
  { id: 6, name: "Carol Hammer", state: "Texas" },
  { id: 7, name: "Ben Swanson", state: "New Hampshire" },
  { id: 7, name: "Lora Swanson", state: "New Hampshire" },
];
let employees: Company[] = [
  { id: 5, company: "Acme Surf Co.", dept: "Sales" },
  { id: 6, company: "General Misfortune Inc.", dept: "Sales" },
  { id: 7, company: "Weekend Construction Co.", dept: "Laborer" },
];
let employedData: EmployedPerson[] = correlateData(people, employees);
employedData.forEach((item) => {
  // the properties from both types of the intersection can be used rather than needing to type guard/test which type is being looped on
  console.log(`Person/Company Id: ${item.id}, ${item.name}, ${item.state}, ${item.company}, ${item.dept}`);
});

console.log("\n");
// intersection merging
function writePerson(per: Person): void {
  console.log(`Person: ${per.id}, ${per.name}, ${per.state}`);
}
function writeCompany(comp: Company): void {
  console.log(`Company: ${comp.id}, ${comp.company}, ${comp.dept} \n`);
}
employedData.forEach((item) => {
  writePerson(item);
  writeCompany(item);
});

// Properties with the same name and same type are merged. Properties with the same name but different type are inferred as never
console.log("\n=== same name/same type are merged === \n=== same name but different type are inferred as never ===");
type ContactPerson = {
  id: number;
  name: string;
  communication: number; // inferred as never in the intersection
  // solution is to use a discreet shape type instead of the primitive type
  contact: { phone: number };
};
type ContactCompany = {
  id: number;
  name: string;
  communication: string; // inferred as never in the intersection
  // solution is to use a discreet shape type instead of the primitive type
  contact: { email: string };
};

type Contact = ContactPerson & ContactCompany;

// hover over variable to see the inferred type
// an empty object {} will conform to the inferred type
let typeTestId = ({} as Contact).id;
let typeTestName = ({} as Contact).name;
let typeTestComm = ({} as Contact).communication; // inferred as never in the intersection
let typeTestContact = ({} as Contact).contact; // solution is to use a discreet shape type which is inferred as an intersection

console.log("== addition examples output ==");
// example and merging methods
type CommPerson = {
  id: number;
  name: string;
  contact: { phone: number };
  // method
  getContact(field: number): number;
};
type CommCompany = {
  id: number;
  name: string;
  contact: { email: string };
  // method
  getContact(field: string): string;
};

type Communications = CommPerson & CommCompany;
let commOfficer: Communications = {
  id: 1,
  name: "Grant Smit",
  contact: { phone: 555333111, email: "gsmith@fake.com" },
  // the method - use a union to receive arguments adn any for the methods results then use a typeof type guard to distinguish the parameter type and what the result should be
  getContact(field: number | string): any {
    return typeof field === "number" ? 555333111 : "gsmith@fake.com";
  },
};

let typeTestCommOfficer = commOfficer.getContact;
let strPramTypeTest = commOfficer.getContact("gsmith@fake.com");
console.log(`Contact: ${commOfficer.getContact("gsmith")}`);
let numPramTypeTest = commOfficer.getContact(555333111);
console.log(`Contact: ${commOfficer.getContact(555)}`);
