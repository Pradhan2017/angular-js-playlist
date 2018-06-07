var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

// myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
myNinjaApp.config(['$routeProvider', function($routeProvider){

    // $locationProvider.html5Mode(true);

    $routeProvider
      .when('/home', {
          templateUrl: 'views/home.html',
          controller: 'NinjaController'
      })
      .when('/contact-success', {
          templateUrl: 'views/contact-success.html',
          controller: 'ContactController'
      })
      .when('/contact', {
          templateUrl: 'views/contact.html',
          controller: 'ContactController'
      })
      .when('/directory', {
          templateUrl: 'views/directory.html',
          controller: 'NinjaController'
      }).otherwise({
          redirectTo: '/home'
      });
 }]);

 myNinjaApp.directive('randomNinja', [function(){

     return {
         restrict: 'E',
         scope: {
             ninjas: '=',
             title: '='
         },
         // template: '<img ng-src="{{ninjas[random].thumb}}">',
         templateUrl: 'views/random.html',
         transclude: true,
         replace: true,
         controller: function($scope){
            $scope.random = Math.floor(Math.random() * 5)
         }
     };
 }]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http){

    $scope.removeNinja = function(ninja){
        var removedNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removedNinja, 1);
    };

    $scope.addNinja = function(){
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: $scope.newninja.rate,
            available: true
        });

        $scope.newninja.name = "";
        $scope.newninja.belt = "";
        $scope.newninja.rate = "";
    };

    $scope.removeAll = function(){
        $scope.ninjas = [];
    }

    $http({
        method: 'get',
        url: 'data/ninjas.json'
    }).then(function (response) {
        console.log(response, 'res');
        data = response.data;
        $scope.ninjas = data;
    },function (error){
        console.log(error, 'can not get data.');
    });


 //    $scope.ninjas = [
 //        {
 //           name: "Meet",
 //           belt: "black",
 //           rate: 1500,
 //           available: true,
 //           thumb: "content/img/team-1.jpg"
 //       },
 //       {
 //          name: "Yoshi",
 //          belt: "violet",
 //          rate: 2700,
 //          available: true,
 //          thumb: "content/img/team-2.jpg"
 //      },
 //      {
 //         name: "Jay",
 //         belt: "blue",
 //         rate: 1100,
 //         available: false,
 //         thumb: "content/img/team-1.jpg"
 //     },
 //     {
 //        name: "Shaun",
 //        belt: "orange",
 //        rate: 1900,
 //        available: true,
 //        thumb: "content/img/team-3.jpg"
 //    },
 //    {
 //       name: "Ansu",
 //       belt: "brown",
 //       rate: 1700,
 //       available: true,
 //       thumb: "content/img/team-4.jpg"
 //   },
 //   {
 //      name: "Ryu",
 //      belt: "purple",
 //      rate: 2300,
 //      available: true,
 //      thumb: "content/img/team-5.jpg"
 //  }
 // ];
 //
 // console.log(angular.toJson($scope.ninjas));

}]);

myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location){

    $scope.sendMessage = function(){
        $location.path('/contact-success');
    };

}]);
