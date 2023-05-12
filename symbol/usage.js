const AGE = Symbol("age");
const GET_AGE = symbol("getAge");
class User {
  constructor(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this[AGE] = age;
    this[GET_AGE] = function () {
      return this[AGE];
    };
  }

  printAge() {
    console.log(this[GET_AGE]());
  }
}
