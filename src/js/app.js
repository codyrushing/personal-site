export default {
  init: function(){
    document.addEventListener("DOMContentLoaded", this.DOMReady.bind(this));
  },
  DOMReady: () => {
    console.log('hello');
  }
};
