function a(obj: number | string) {
  if (typeof obj === "number") {
  } else if (typeof obj === "string") {
  } else {
    // never
    console.log(obj);
  }
}

function throwError(): never {
  throw new Error("函数返回值是never");
}

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

type unknownS = unknown & string;
type stringNumber = string & never;

interface Person {
  name: string;
  age: number;
}
interface Hero {
  skill: string;
}

type Heroperson = Person & Hero;

type HeroOrPerson = Person | Hero;
let hp: Heroperson = {
  name: "yellres",
  age: 13,
  skill: "chatting",
};

let hop: HeroOrPerson = {
  skill: "team",
};

interface color {
  name: string;
}

interface colorSub extends color {
  name: number;
}

type colorSubInteraction = color & {
  name: number;
};

const color: colorSubInteraction = {
  name: "string",
};

let str: string = "1";
let unknownVal: unknown = str;

interface Button {
  type: string;
  text: string;
}

type ButtonKeys = keyof Button;
let buttonKey: ButtonKeys = "text";
let buttonKey2: ButtonKeys = "type";

const person = { name: "kevin", age: 18 };
type Kevin = typeof person;

function identity<T>(arg: T): T {
  return arg;
}

type result = typeof identity;

// keyof
// keyof 后面只能跟上一个 类型变量
const numberObject = {
  [1]: "abc-1",
  [2]: "abc-2",
  [3]: "abc-3",
};

type resultNumberObject = keyof typeof numberObject;

function getProperty<T, key extends keyof T>(obj: T, key: key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3 };
getProperty(x, "c");

// typeof 后面只能使用一个值 返回该值的类型
// 类型上下文中使用
{
  let s = "hello";
  let n: typeof s;

  const f = () => {
    return {
      x: 10,
      y: 3,
    };
  };

  type p = ReturnType<typeof f>;
}

// 索引访问类型
{
  type Person = { age: number; name: string; alive: boolean };
  type Age = Person["age"];

  type I1 = Person["age" | "name"];
  type I2 = Person[keyof Person];

  const myArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
  ];

  type Person = (typeof myArray)[number];
  type Age = (typeof myArray)[number]["age"];
  type Age2 = Person["age"];

  const APP = ["TaoBao", "Tmall", "Alipay"] as const;

  type app = (typeof APP)[number];
}

// 条件判断
{
  interface IdLabel {
    id: number;
  }

  interface NameLabel {
    name: string;
  }

  function createLabel(id: number): IdLabel;
  function createLabel(id: string): NameLabel;
  function createLabel(id: string | number): IdLabel | NameLabel;
  function createLabel(id: string | number): IdLabel | NameLabel {
    throw "unimplemented";
  }
}

// 映射类型
{
  type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
  };

  type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
  };

  type FeatureOptions = OptionsFlags<FeatureFlags>;

  // 删除属性的修饰符
  type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
  };

  type LockedAccount = {
    readonly id: string;
    readonly name: string;
  };

  type UnlockedAccount = CreateMutable<LockedAccount>;

  //
}

let dogName = "korha";
// 将该文件变为一个模块
export {};
