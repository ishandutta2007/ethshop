var app = angular.module("myApp", ["ngRoute"]);
app.run(function ($rootScope, $http, $location) {
    $rootScope.site_title = "LUXURY WATCHES";
    $rootScope.shopping_cart = {
        total_price: 0,
        cart_items: []
    };

    $rootScope.keyword = "";
    $rootScope.products = [];

    $rootScope.userAddress = '';
    $rootScope.ownerAddress = '';

    App.init(function () {
        $rootScope.userAddress = App.account;
        $rootScope.ownerAddress = App.owner;
        console.log("Contract Owner: " + App.owner);
    });

    $rootScope.getProducts = function () {
        $http.get("/api/products?q=" + $rootScope.keyword).then(function (response) {
            if (response.data.status == 200) {
                $rootScope.products = response.data.data;
            }
            else {
                console.log(response.data);
            }
        });
    }

    $rootScope.searchProducts = function ($event) {
        $event.preventDefault();
        $rootScope.keyword = $("#keyword").val();
        if ($location.absUrl().split('/').length < 6) {
            $rootScope.getProducts();
        }
        else {
            $location.path("/");
        }
    }

    $rootScope.emptyCart = function ($event) {
        $event.preventDefault();
        $rootScope.shopping_cart = {
            total_price: 0,
            cart_items: []
        };
    }

}).config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "templates/index.html"
        })
        .when("/details/:id", {
            templateUrl: "templates/details.html"
        })
        .when("/checkout", {
            templateUrl: "templates/checkout.html"
        })
        .when("/orders", {
            templateUrl: "templates/orders.html"
        })
        .when("/contact", {
            templateUrl: "templates/contact.html"
        });
});