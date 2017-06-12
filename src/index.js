var todoStore = require('./stores/todoStore');

require('./index.less');

angular.module('todoApp', ['ui.router', require('angular-sanitize'), 'ngCsv'])
  .service('todoStore', todoStore)
  .config(config);

function config($stateProvider, $httpProvider,
  $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(false);

  $stateProvider
    .state('todo', {
      component: 'todo',
      url: '/'
    });
}

require('./components');
