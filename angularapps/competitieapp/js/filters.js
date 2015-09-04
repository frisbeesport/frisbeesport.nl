var competitieFilters = angular.module('competitieFilters', []);

competitieFilters.filter('geslacht', function () {
    return function (inputs, selectie) {
        var result = [];
        angular.forEach(inputs, function(value) {
            if (value.geslacht.toLowerCase().indexOf(selectie.toLowerCase()) >= 0) 
            {
                result.push(value);
            }
        });
        return result;
    };
});

competitieFilters.filter('terrein', function() {
  return function(inputs, selectie) {
    var result = [];
        angular.forEach(inputs, function(value) {
            if (value.terrein.toLowerCase().indexOf(selectie.toLowerCase()) >= 0) 
            {
                result.push(value);
            }
        });
        return result;
  };
});


competitieFilters.filter('divisie', function () {
    return function (inputs, selectie) {
        var result = [];

        if (selectie == '') {
            angular.forEach(inputs, function (value) {
                if (value.divisie == '') {
                    result.push(value);
                }
            });
        } else {
            angular.forEach(inputs, function (value) {
                if (value.divisie.toLowerCase().indexOf(selectie.toLowerCase()) >= 0) {
                    result.push(value);
                }
            });
        }
        return result;
    };
});


competitieFilters.filter('speeldag', function () {
    return function (inputs, selectie) {
        var result = [];

        if (selectie == '') {
            angular.forEach(inputs, function (value) {
                if (value.speeldag == '') {
                    result.push(value);
                }
            });
        } else {
            angular.forEach(inputs, function (value) {
                if (value.speeldag.toLowerCase().indexOf(selectie.toLowerCase()) >= 0) {
                    result.push(value);
                }
            });
        }
        return result;
    };
});