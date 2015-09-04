var competitieControllers = angular.module('competitieControllers', []);

competitieControllers.controller('CompetitiesCtrl', ['$scope', '$http', '$location', 'Competities', function ($scope, $http, $location, Competities) {
    $scope.competities = Competities.query({ type: 'C' });
    $scope.bekers = Competities.query({ type: 'K' });

    
    $scope.geslachtDropdownText = '';
    $scope.terreinDropdownText = '';

    $scope.showCompetitie = function (client) {
        $location.path('uitslagen/' + client);
    };
    
    $scope.$watch('selectieType', function(newvalue) {
       search = $location.search();
       search.type = newvalue;
       $location.search(search);
    });

    $scope.selectTerrein = function (value, text) {
        $scope.selectieTerrein = value;
        $scope.dropdownMenu = '';
        $scope.terreinDropdownText = text;

        search = $location.search();
        search.indooroutdoor = value;
        $location.search(search).replace();
    };

    $scope.selectGeslacht = function (value, text) {
        $scope.selectieGeslacht = value;
        $scope.dropdownMenu = '';
        $scope.geslachtDropdownText = text;

        search = $location.search();
        search.opendamesmixed = value;
        $location.search(search).replace();
    };

    // Take default values from search
    search = $location.search();

    $scope.selectieType = (search.type == 'K') ? 'K' : 'C';  

    $scope.selectGeslacht((search.opendamesmixed == 'open') ? 'open' :   
                          (search.opendamesmixed == 'dames') ? 'dames' :  
                          (search.opendamesmixed == 'mixed') ? 'mixed' :
                          'e',
                          (search.opendamesmixed == 'open') ? 'Open' :   
                          (search.opendamesmixed == 'dames') ? 'Dames' :  
                          (search.opendamesmixed == 'mixed') ? 'Mixed' :
                          'Open/Dames/Mixed');  
    
    $scope.selectTerrein((search.indooroutdoor == 'indoor') ? 'indoor' :   
                         (search.indooroutdoor == 'outdoor') ? 'outdoor' :
                         'o',
                         (search.indooroutdoor == 'indoor') ? 'Indoor' :   
                         (search.indooroutdoor == 'outdoor') ? 'Outdoor' :
                         'Indoor/Outdoor');  
}]);

competitieControllers.controller('UitslagenCtrl', ['$scope', '$routeParams', '$http', '$location', 'Klassementen', 'Wedstrijden', 'Opzet',
  function ($scope, $routeParams, $http, $location, Klassementen, Wedstrijden, Opzet) {
      $scope.competitie = $routeParams.competitie;
      $scope.divisies = [];
      $scope.speeldagen = [];
      $scope.selectieSpeeldag = '';
      $scope.selectieDivisie = '';

      $scope.updateSpeeldagen = function (selectedDivisie) {
          if (!$scope.opzet.some(function (value) { return (value.divisie == selectedDivisie && value.speeldag == $scope.selectieSpeeldag); })) {
              $scope.opzet.some(function (value) {
                  if (value.divisie == selectedDivisie) {
                      $scope.selectSpeeldag(value.speeldag);
                      return true;
                  }
                  return false;
              });
          }
      }

      $scope.updateDivisies = function (selectedSpeeldag) {
          if (!$scope.opzet.some(function (value) { return (value.speeldag == selectedSpeeldag && value.divisie == $scope.selectieDivisie); })) {
              $scope.opzet.some(function (value) {
                  if (value.speeldag == selectedSpeeldag) {
                      $scope.selectDivisie(value.divisie);
                      return true;
                  }
                  return false;
              });
          }
      }

      $scope.selectDivisie = function (divisie) {
          $scope.selectieDivisie = divisie;
          $scope.dropdownMenu = '';
          $scope.divisieDropdownText = divisie == '' ? 'Alle divisies' : 'Divisie ' + divisie;

          search = $location.search();
          search.divisie = divisie;
          $location.search(search).replace();
      };

      $scope.selectSpeeldag = function (speeldag) {
          $scope.selectieSpeeldag = speeldag;
          $scope.dropdownMenu = '';
          $scope.speeldagDropdownText = speeldag == '' ? 'Eindstand' : 'Speeldag ' + speeldag;

          search = $location.search();
          search.speeldag = speeldag;
          $location.search(search).replace();
      };

      $scope.naarCompetities = function () {
          
         
          $location.path('competities/');        
      };

      $scope.klassementen = Klassementen.query({ competitie: $routeParams.competitie });
      $scope.wedstrijden = Wedstrijden.query({ competitie: $routeParams.competitie });

      $scope.opzet = Opzet.query({ competitie: $routeParams.competitie }, function (opzet) {
          angular.forEach(opzet, function (value, key) {
              if ($.inArray(value.divisie, $scope.divisies) == -1) {
                  $scope.divisies.push(value.divisie);
              }

              if ($.inArray(value.speeldag, $scope.speeldagen) == -1) {
                  $scope.speeldagen.push(value.speeldag);
              }
          });


          search = $location.search();
          $scope.selectieType = (search.type == 'K') ? 'K' : 'C';
          $scope.selectSpeeldag($scope.speeldagen.indexOf(search.speeldag) >= 0 ? search.speeldag : $scope.speeldagen[0]);
          $scope.selectDivisie($scope.divisies.indexOf(search.divisie) >= 0 ? search.divisie : $scope.divisies[0]);
          $scope.updateSpeeldagen($scope.selectieDivisie);
      });
  } ]);
  