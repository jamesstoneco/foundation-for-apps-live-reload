var app = angular.module('application', [
    'ui.router',
    'ngAnimate',
    'markdown',
    'foundation.init',
    'foundation.init.state',
    'foundation.common.services',
    'foundation.common.directives',
    'foundation.common.animations',
    'foundation.accordion',
    'foundation.actionsheet',
    'foundation.interchange',
    'foundation.modal',
    'foundation.notification',
    'foundation.offcanvas',
    'foundation.panel',
    'foundation.popup',
    'foundation.tabs',
    'foundation.iconic',
    'firebase'
  ])
    .config(['$FoundationStateProvider', '$urlRouterProvider', '$locationProvider', function(FoundationStateProvider, $urlProvider, $locationProvider) {

    $urlProvider.otherwise('/');

    FoundationStateProvider.registerDynamicRoutes();

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
}])
  .run(['FoundationInit', '$rootScope', '$state', '$stateParams', function(foundationInit, $rootScope, $state, $stateParams) {
    foundationInit.init();

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);




/* --- controllers --- */

// var app = angular.module("fireApp", ["firebase"]);

app.controller("FireCtrl", function($scope, $firebase) {
  var ref = new Firebase("https://f4a-firebase.firebaseio.com/data");
  var sync = $firebase(ref);

  // download the data into a local object
  var syncObject = sync.$asObject();

  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  // syncObject.$bindTo($scope, "data");
  $scope.messages = sync.$asArray();
  $scope.addMessage = function(text) {
    $scope.messages.$add({text: text});
  }


});