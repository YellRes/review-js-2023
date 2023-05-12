class EventEmitter {
  constructor() {
    this.subscription = {};
  }

  subscribe(key, func) {
    if (!Array.isArray(this.subscription[key])) {
      this.subscription[key] = [];
    }

    this.subscription[key].push(func);
  }

  publish(key) {
    const events = this.subscription[key] || [];
    events.forEach((event) => {
      event.call(this);
    });
  }
}

const e = new EventEmitter();
e.subscribe("info", () => {
  console.log("pig");
});

e.subscribe("info", () => console.log("dog"));
e.publish("info");

// 发布订阅 多了一个调度中心  调度中心维护了订阅者和发布者的关系
const info = new Info();
