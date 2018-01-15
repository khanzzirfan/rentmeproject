import * as func from "../common/functions";

export default class Category {
  constructor() {
    this.$key = "";
    this.name = "";
    this.active = false;
    this.updated = func.getDateTime();
  }
}
