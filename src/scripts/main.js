var app = angular.module('GitHubPageApp', ['ngMaterial', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', '$http', '$mdDialog', '$timeout', function ($scope, $mdSidenav, $http, $mdDialog, $timeout) {

    //Your GitHub username
    const GitHubUsername = "IvanSostarko";

    //Check if GitHub username exists
    if (GitHubUsername == "") {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Error')
                .textContent('GitHub username has not been defined.')
                .ok('Ok')
        );
    }


    //API
    const API_USER = "https://api.github.com/users/" + GitHubUsername;
    const API_REPOS = "https://api.github.com/users/" + GitHubUsername + "/repos";

    //User info
    $scope.userData = function () {

        $http({
            method: "GET",
            url: API_USER
        }).then(function mySucces(response) {
            $scope.user = response.data;
        }, function myError(response) {

            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Error')
                    .textContent('Service unavailable.')
                    .ok('Ok')
            );
        });
    };
    $timeout($scope.userData);

    //Repositories info
    $scope.repositoriesData = function () {
        $http.get(API_REPOS).then(function (response) {
            $scope.repositories = response.data;
        });
    };
    $timeout($scope.repositoriesData);

    // Sidenav toggle
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };


}]);


app.config(function ($mdThemingProvider) {
    var customBlueMap = $mdThemingProvider.extendPalette('blue-grey', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        })
        .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});

