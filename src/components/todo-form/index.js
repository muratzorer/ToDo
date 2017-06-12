var todoForm = {
  controller: todoFormController,
  template: require('./todo-form.html'),
  bindings: {
    mylist: '<',
    onSubmit: '&',
    onSort: '&'
  }
};

function todoFormController() {
  var self = this;

  self.returnTodoStore = function returnTodoStore() {
    return _.map(this.mylist, function(n){return n});
  };

  self.$onInit = function $onInit() {
    self.newTodo = {};
    resetTodo();
  };

  self.submitForm = function submitForm() {
    // Call parent
    self.onSubmit({
      $event: {
        todo: self.newTodo
      }
    });

    resetTodo();
  };

  self.sortList = function sortList() {
      // Call parent
      self.onSort();
  };

  function resetTodo() {
    self.newTodo = {};
  }
}

module.exports = todoForm;
