import { observable, action, makeObservable } from "mobx";

class Store {
  count = [
    { id: "test1", value: 1 },
    { id: "test2", value: 2 }
  ];

  constructor() {
    makeObservable(this, {
      count: observable,
      decrease: action,
      increase: action,
      change: action
    });
  }

  change = (index) => {
    console.log("CHANGE", index, this.count[index]);
    this.count[index].value = this.count[index].value + 1;
  };
  decrease = () => {
    this.count = this.count - 1;
  };

  increase = () => {
    this.count = this.count + 1;
  };
}

const store = new Store();
export default store;
