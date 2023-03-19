/** Class, Interface and the shape of Objects
 * Chapter 11
 */

// class defining Object shape
class Employee {
  id: string;
  name: string;
  dept: string;
  city: string;

  constructor(id: string, name: string, dept: string, city: string) {
    this.id = id;
    this.name = name;
    this.dept = dept;
    this.city = city;
  }

  writeDept() {
    console.log(`${this.name} works in ${this.dept}`);
  }
}

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
