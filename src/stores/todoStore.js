var mobx = require('mobx');
//var _ = require('lodash');

function todoStore() {
  var store = this;
  var todoList = mobx.observable([]);

  store.getAllTodos = function getAllTodos() {
    return todoList;
  };

  store.addTodo = function addTodo(todo) {
    var newTodo = Object.assign({}, todo, {
      completed: false,
      id: _.max(_.map(todoList, 'id')) + 1
    });

    todoList.push(newTodo);
  };

  store.deleteTodo = function deleteTodo(index) {
    todoList.splice(index, 1);
  };

  store.toggleTodo = function toggleTodo(index) {
    todoList[index].completed = !todoList[index].completed;
  };

  store.clearCompleted = function clearCompleted() {
    var filteredArray = todoList.filter(function(item) {
      return !item.completed;
    });

    todoList.replace(filteredArray);
  };

  store.sortList = function sortList() {
    var sortedArray = todoList.sort(function(a,b) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );
    todoList.replace(sortedArray);
  };

  store.populateInitialList = function populateInitialList($http) {
    if(todoList.length > 0) return; // populate only on first render of container.
    var root = 'https://jsonplaceholder.typicode.com';
      $http({
          method: 'GET',
          // We will act like always logged in from "userId = 1"
          url: root + '/todos?userId=1' // filter on serverside via routing
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available

          todoList.pushArray(response.data);
      }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log("Error in getting datasource from jsonplaceholder");
      });
  };

  Object.defineProperty(Array.prototype, 'pushArray', {
    enumerable: false,
    writable: true,
    value: function(arr) {
      this.push.apply(this, arr);
    }
  });

  // Array.prototype.pushArray = function(arr) {
  //   this.push.apply(this, arr);
  // };
}

module.exports = todoStore;
