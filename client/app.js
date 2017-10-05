angular.module('chirper', ['ngRoute'])
.controller('ChirpContainerController', ['$scope', '$http', function($scope, $http){
    $http({
        method: 'GET',
        url: `/api/users`
    }).then((response) => {
        $scope.users = response.data;
    });

    function getChirps(){
        $http({
            method: 'GET',
            url: `/api/chirps`
        }).then((response) => {
            $scope.chirps = response.data;
        });
    }
    getChirps();

    $scope.postChirp = function(){
        $http({
            method: 'POST',
            url: `/api/chirps`,
            data: {
                message: $scope.chirpMessage,
                userid: $scope.chirpUser
            }
        }).then((response) => {
            return getChirps();
        });
    }
}]).controller('SingleChirpController', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location){
    const idToGet = $routeParams.id;
    $http({
        method: 'GET',
        url: `/api/chirps/${idToGet}`
    }).then((response) => {
        $scope.chirp = response.data;
    });

    $scope.goToUpdate = function(){
        $location.path(`/chirps/${idToGet}/update`);
    }

    $scope.deleteChirp = function(){
        let answer = confirm('Are you sure you want to delete this chirp?');
        if(answer === true){
            $http({
                method: 'DELETE',
                url: `/api/chirps/${idToGet}`
            }).then((response) => {
                $location.path('/chirps');
            });
        }
    }
}]).controller('UpdateChirpController', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location){
    const idToGet = $routeParams.id;
    $http({
        method: 'GET',
        url: `/api/chirps/${idToGet}`
    }).then((response) => {
        const chirp = response.data
        $scope.message = chirp.message;
    });

    $scope.updateChirp = function(){
        $http({
            method: 'PUT',
            url: `/api/chirps/${idToGet}`,
            data: {
                message: $scope.message
            }
        })
    }
}]).config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/welcome.html'
    }).when('/chirps', {
        templateUrl: 'views/list.html',
        controller: 'ChirpContainerController'
    }).when('/chirps/:id/update', {
        templateUrl: 'views/single_update.html',
        controller: 'UpdateChirpController'
    }).when('/chirps/:id', {
        templateUrl: 'views/single_view.html',
        controller: 'SingleChirpController'
    }).otherwise({
        redirectTo: '/'
    });
}]);