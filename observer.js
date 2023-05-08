class Subject {
  constructor() {
    this.observerList = [];
  }

  add(observer) {
    this.observerList.push(observer);
  }

  remove(observer) {
    const removeIndex = this.observerList.findIndex(
      (item) => item.name === observer.name
    );

    if (removeIndex !== -1) {
      this.observerList.splice(removeIndex, 1);
    }
  }

  notify(context) {
    this.observerList.forEach((observer) => {
      observer.update(context);
    });
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(context) {
    console.log(context, `${this.name} has updated`);
  }
}

const ob1 = new Observer("ob1");
const ob2 = new Observer("ob2");

const sub = new Subject();
sub.add(ob1);
sub.add(ob2);
sub.notify("that man");

sub.remove(ob1);
sub.notify("that girl");
