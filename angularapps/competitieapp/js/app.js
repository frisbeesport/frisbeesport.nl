var competitieApp = angular.module('competitieApp', [
  'ngRoute',
  'competitieControllers', 
  'competitieServices',
  'competitieFilters'
]);

competitieApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/competities', {
        templateUrl: '../angularapps/competitieapp/partials/competities.html',
        controller: 'CompetitiesCtrl',
        reloadOnSearch: false
      }).
      when('/uitslagen/:competitie', {
        templateUrl: '../angularapps/competitieapp/partials/uitslagen.html',
        controller: 'UitslagenCtrl',
        reloadOnSearch: false
      }).
      otherwise({
        redirectTo: '/competities'
      });
  }]);