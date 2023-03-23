// Generic types are a placeholder for a type that is specified and resolved when a class or function is used.
import { City, Person, Product, Employee } from "./dataTypes";

let people = [
  new Person("Bob Smith", "London"),
  new Person("Dora Peters", "New York"),
  new Person("Tom Greene", "Chicago"),
  new Person("Sam Bowen", "Sante Fe"),
  new Person("Tina Belcher", "Boston"),
  new Person("Rich Varn", "Des Moines"),
];
let products = [
  new Product("Running Shoes", 100),
  new Product("Hat", 100),
  new Product("Boots", 100),
  new Product("Gloves", 25),
  new Product("Umbrella", 75),
  new Product("Heavy Coat", 155),
];

let cities = [
  new City("London", 8136000),
  new City("Paris", 2141000),
  new City("Chicago", 2697000),
  new City("Sante Fe", 88193),
  new City("Boston", 654776),
  new City("Des Moines", 212031),
];

let employees = [new Employee("Bob Smith", "Sales"), new Employee("Sam Bowen", "Sales")];

// [...people, ...products].forEach((item) => console.log(`Item: ${item.name}`));

//type dataType = Person | Product;
// class PeopleCollection {
//   private items: dataType[] = [];

//   constructor(initialItems: dataType[]) {
//     this.items.push(...initialItems);
//   }

//   add(newItem: dataType) {
//     this.items.push(newItem);
//   }

//   getNames(): string[] {
//     return this.items.map((item) => item.name);
//   }

//   getItem(index: number): dataType {
//     return this.items[index];
//   }
// }

// generic type parameters allow classes to be written that operate on a specific type without knowing what that type will be in advance
// class DataCollection<T> {
//   private items: T[] = [];

//   constructor(initialItems: T[]) {
//     this.items.push(...initialItems);
//   }

//   add(newItem: T) {
//     this.items.push(newItem);
//   }

//   //   getNames(): string[] {
//   //     return this.items.map((item) => item.name);
//   //   }

//   getItem(index: number): T {
//     return this.items[index];
//   }
// }

// constrain the Generic Type
// class DataCollection<T extends Person | Product> {
class DataCollection<T extends { name: string }> {
  private items: T[] = [];

  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }

  add(newItem: T) {
    this.items.push(newItem);
  }

  getNames(): string[] {
    return this.items.map((item) => item.name);
  }

  getItem(index: number): T {
    return this.items[index];
  }
}

//let peopleData = new PeopleCollection(people);
export let peopleData = new DataCollection<Person>(people);

export let firstPerson = peopleData.getItem(0);
// if (firstPerson instanceof Person) {
//   console.log(`First Person: ${firstPerson.name}, ${firstPerson.city}`);
// }
console.log(`\nFirst Person: ${firstPerson.name}, ${firstPerson.city}`);
console.log(`Names: ${peopleData.getNames().join(", ")}`);

export let productData = new DataCollection<Product>(products);
export let firstProduct = productData.getItem(0);
console.log(`First Product: ${firstProduct.name}, ${firstProduct.price}`);
console.log(`Product Names: ${productData.getNames().join(", ")}`);

export let cityData = new DataCollection<City>(cities);
console.log(`City Names: ${cityData.getNames().join(", ")}`);

// multiple generic type parameters
class MultiDataCollection<T extends { name: string }, U> {
  protected items: T[] = [];

  constructor(initialItems: T[]) {
    this.items.push(...initialItems);
  }

  // Method Type parameter
  collate<U>(targetData: U[], itemProp: string, targetProp: string): (T & U)[] {
    let results = [];
    this.items.forEach((item) => {
      let match = targetData.find((d) => d[targetProp] === item[itemProp]);
      if (match !== undefined) {
        results.push({ ...match, ...item });
      }
    });
    return results;
  }

  // filter with type guard predicate
  filter<V extends T>(predicate: (target) => target is V): V[] {
    return this.items.filter((item) => predicate(item)) as V[];
  }

  // static method
  static reverse<ArrayType>(items: ArrayType[]): ArrayType[] {
    return items.reverse();
  }
}
export let peopleCityData = new MultiDataCollection<Person, City>(people);
export let collateData = peopleCityData.collate<City>(cities, "city", "name");
collateData.forEach((c) => console.log(`${c.name}, ${c.city}, pop.${c.population}`));

export let empData = peopleCityData.collate<Employee>(employees, "name", "name");
empData.forEach((c) => console.log(`${c.name}, ${c.city}, ${c.role}`));

function isProduct(target): target is Product {
  return target instanceof Product;
}

let mixedData = new MultiDataCollection<Person | Product, unknown>([...people, ...products]);

let filteredProducts = mixedData.filter<Product>(isProduct);
filteredProducts.forEach((p) => console.log(`Product: ${p.name}, price: ${p.price}`));

let reversedCities: City[] = MultiDataCollection.reverse<City>(cities);
reversedCities.forEach((c) => console.log(`City: ${c.name}, pop.${c.population}`));

// generic interface - generic type parameter
type shapeType = { name: string };
// specific types will be defined by the implementation/use of the interface
interface GenericCollection<T extends shapeType> {
  add(...newItems: T[]): void;
  get(name: string): T;
  count: number;
}

// extending Generic Interfaces
interface SearchableCollection<T extends shapeType> extends GenericCollection<T> {
  find(name: string): T | undefined;
}

interface ProductCollection extends GenericCollection<Product> {
  sumPrices(): number;
}
interface PeopleCollection<T extends Product | Employee> extends GenericCollection<T> {
  getNames(): string[];
}

// implementing generic interfaces - passing the generic type parameter
class ArrayCollection<DataType extends shapeType> implements GenericCollection<DataType> {
  private items: DataType[] = [];

  add(...newItems): void {
    this.items.push(...newItems);
  }

  get(name: string): DataType {
    return this.items.find((item) => item.name === name);
  }

  get count(): number {
    return this.items.length;
  }
}

let PeopleCollection: GenericCollection<Person> = new ArrayCollection<Person>();
PeopleCollection.add(new Person("Cameran Wilkerson", "New York"), new Person("Paulo SanMicah", "Bushwick"));
console.log(`Collection size: ${PeopleCollection.count}`);
