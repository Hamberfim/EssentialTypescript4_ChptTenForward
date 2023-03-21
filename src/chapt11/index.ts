/** Class, Interface and the shape of Objects
 * Chapter 11
 */

console.log("=== Class Objects ==="); // space in output
// class defining Object shape
class Employee {
  public readonly id: string; // the value assigned by the constructor can not be changed
  public name: string;
  #dept: string; // private field alternative: #dept: string; as apposed to private dept: string;
  public city: string;

  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
    this.name = name;
    this.#dept = dept; // private field alternative: this.#dept = dept; as apposed to private this.dept = dept;
    this.city = city;
  }

  writeDept() {
    console.log(`${this.name} works in ${this.#dept}`); // private field alternative: ${this.#dept} as apposed to ${this.dept}
  }
}

// test private access control is only accessible from within the class i.e., writeDept()
let salesEmployee = new Employee("kenglish", "Keven English", "Sales", "Chicago");
// console.log(`Dept Value: ${salesEmployee.dept}`);  // Property 'dept' is private and only accessible within class 'Employee'.ts(2341)
salesEmployee.writeDept();

// let smithEmp: Employee = new Employee("bsmith", "Bob Smith", "Sales", "London");
// let petersEmp: Employee = new Employee("dpeters", "Dora Peters", "Sales", "New York");
// let jonesEmp: Employee = new Employee("ajones", "Alice Jones", "Sales", "Paris");
// let vegaEmp: Employee = new Employee("fvega", "Fidel Vega", "Sales", "Paris");

let employeeData: Employee[] = [
  new Employee("fvega", "Fidel Vega", "Sales", "Paris"),
  new Employee("ajones", "Alice Jones", "Sales", "Paris"),
  new Employee("dpeters", "Dora Peters", "Sales", "New York"),
  new Employee("bsmith", "Bob Smith", "Sales", "London"),
];

// class defining Object shape
class Person {
  id: string;
  name: string;
  city: string;

  constructor(id: string, name: string, city: string) {
    this.id = id;
    this.name = name;
    this.city = city;
  }
}

let data: Person[] = [
  { id: "bsmith", name: "Bob Smith", city: "London" },
  { id: "ajones", name: "Alice Jones", city: "Paris" },
  { id: "dpeters", name: "Dora Peters", city: "New York" },
  { id: "fvega", name: "Fidel Vega", city: "Paris" },
  { id: "jsamson", name: "Jim Samson", city: "London" },
  { id: "pbrown", name: "Paul Brown", city: "Paris" },
  // smithEmp,
  // petersEmp,
  // jonesEmp,
  // vegaEmp,
  ...employeeData,
];

data.forEach((item) => {
  if (item instanceof Employee) {
    item.writeDept();
  } else {
    console.log(`${item.id}: ${item.name}, ${item.city}`);
  }
});

console.log("\n=== Abstract & Class Inheritance ===");

abstract class Animal {
  public readonly id: string;
  public animalType: string;
  public numberOfLegs: number;
  public readonly canFly: boolean;

  constructor(id: string, animalType: string, numberOfLegs: number, canFly: boolean) {
    (this.id = id), (this.animalType = animalType), (this.numberOfLegs = numberOfLegs), (this.canFly = canFly);
  }
  abstract getDetails(): string; // must be implemented in subclass
  abstract writeAnimal(): void; // must be implemented in subclass
}

class Cat extends Animal {
  public name: string;
  public sound: string;
  private isRescue: boolean;

  constructor(id: string, animalType: string, numberOfLegs: number, canFly: boolean, name: string, sound: string, isRescue: boolean) {
    super(id, animalType, numberOfLegs, canFly);
    this.name = name;
    this.sound = sound;
    this.isRescue = isRescue;
  }

  getDetails() {
    return `Is the animal from a rescue shelter: ${this.isRescue}`;
  }

  writeAnimal() {
    console.log(`A ${this.animalType} named ${this.name} has ${this.numberOfLegs} legs and make the sound ${this.sound}.`);
  }
}

let cats = [
  new Cat("brownCat", "cat", 4, false, "Mr. Fluffy", "Meow", false),
  new Cat("tabbyCat", "cat", 4, false, "Bill", "Meow, Meow", false),
  new Cat("blackCat", "cat", 3, false, "Old 3-legs", "Grrr-Meow", true),
];

cats.forEach((cat) => {
  console.log(`Animal type: ${cat.animalType}. Can it fly? ${cat.canFly}`);
  if (cat instanceof Cat) {
    cat.writeAnimal();
    console.log(cat.getDetails());
  }
});
