var competitieServices = angular.module('competitieServices', ['ngResource']);

competitieServices.factory('Competities', ['$resource',
  function($resource){
    return $resource('/competitie/public/competities/', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);

competitieServices.factory('Klassementen', ['$resource',
  function($resource){
    return $resource('/competitie/public/klassementen/:competitie', {}, {
      query: {method:'GET', params:{ }, isArray:true}
    });
  }]);

competitieServices.factory('Wedstrijden', ['$resource',
  function($resource){
    return $resource('/competitie/public/wedstrijden/:competitie', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);


competitieServices.factory('Opzet', ['$resource',
  function($resource){
    return $resource('/competitie/public/opzet/:competitie', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);
