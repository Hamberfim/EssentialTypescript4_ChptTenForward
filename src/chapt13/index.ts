import { City, Person, Product, Employee } from "./dataTypes";

let products = [
  new Product("Running Shoes", 100),
  new Product("Hat", 100),
  new Product("Boots", 100),
  new Product("Gloves", 25),
  new Product("Umbrella", 75),
  new Product("Heavy Coat", 155),
];

type shapeType = { name: string };

class Collection<T extends shapeType> {
  private items: Map<string, T>;

  constructor(initialItems: T[] = []) {
    this.items = new Map<string, T>();
    this.add(...initialItems);
  }

  add(...newItems: T[]): void {
    newItems.forEach((newItem) => this.items.set(newItem.name, newItem));
  }

  get(name: string): T {
    return this.items.get(name);
  }

  get count(): number {
    return this.items.size;
  }

  values(): Iterator<T> {
    return this.items.values();
  }
}

let productCollection: Collection<Product> = new Collection(products);
console.log(`There are ${productCollection.count} products`);

let iterator: Iterator<Product> = productCollection.values();
let result: IteratorResult<Product> = iterator.next();
while (!result.done) {
  console.log(`Product: ${result.value.name}, ${result.value.price}`);
  result = iterator.next(); // without this call infinity loop
}
