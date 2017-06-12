var mobx = require('mobx');

var todoContainer = {
  controller: todoContainerController,
  template: require('./todo.html'),
  bindings: {
    filter: '<'
  }
};

function todoContainerController(todoStore, $http) {
  var self = this;

  var dispose = mobx.autorun(function () {
    var todoList = todoStore.getAllTodos();
    self.todoList = getListBasedOnFilter(todoList, self.filter);
    self.incompletedItems = getListBasedOnFilter(todoList, 'active').length;
    console.log('%cNEW STATE:', 'font-weight: bold');
    console.log(angular.toJson(mobx.toJS(todoList), null, 2));
  });

  self.$onInit = function $onInit() {
    populateInitialList();
  };

  self.$onDestroy = function $onDestroy() {
    dispose();
  };

  self.addTodo = function addTodo(event) {
    todoStore.addTodo(event.todo);
  };

  self.deleteTodo = function deleteTodo(event) {
    todoStore.deleteTodo(event.index);
  };

  self.updateTodo = function updateTodo(event) {
    todoStore.updateTodo(event.index, event.todo);
  };

  self.toggleTodo = function toggleTodo(event) {
    todoStore.toggleTodo(event.index);
  };

  self.toggleAllTodos = function toggleAllTodos() {
    todoStore.toggleAllTodos();
  };

  self.clearCompleted = function clearCompleted() {
    todoStore.clearCompleted();
  };

  self.sortList = function sortList() {
    todoStore.sortList();
  };

  function populateInitialList() {
    todoStore.populateInitialList($http);
  };

  function getListBasedOnFilter(list, filter) {
    if (!filter) return list;

    var filterMap = {
      active: function (item) { return !item.completed },
      completed: function (item) { return item.completed }
    };

    return list.filter(filterMap[filter]);
  }
}

module.exports = todoContainer;
