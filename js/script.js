var app = angular.module('aquaParadise', ['ngRoute', 'ngAnimate','pchiwan.directives'])

.config(function ($routeProvider, $locationProvider) {
	
	$locationProvider.hashPrefix('');
	
    $routeProvider
     .when('/fish', {
         templateUrl: 'fishdata.html',
         controller: 'ListCtrl'
     })
    .when('/products', {
         templateUrl: 'productdata.html',
         controller: 'ProdCtrl'
     })
	.when('/detail', {
         templateUrl: 'detail.html',
         controller: 'DetailCtrl'
     })
     .otherwise({
         redirectTo: '/fish'
     });
	
})

.controller('ListCtrl', function ($scope, $http, $timeout) {
    //console.log('hi');
	$http.get('json/fishdata.json')
    .then(function successCallback(response) {
        $scope.fishpond = response.data;
		$scope.filteredfishpond = $scope.fishpond;
    }, function errorCallback(response) {
        
    });
})
.controller('ProdCtrl', function ($scope, $http) {
	
	$http.get('json/productdata.json')
    .then(function successCallback(response) {
        $scope.products = response.data;
		$scope.filteredproducts = $scope.products;
    }, function errorCallback(response) {
        
    });
	
});
