import Vue from 'vue';

export default class BusUtil {
  static getInstance() {
    return BusUtil.instance;
  }

  static instance = new BusUtil();

  bus = new Vue();
}
