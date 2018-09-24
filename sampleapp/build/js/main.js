$(function(){
    console.log("%c 52PROJECT ready to go!", "background-color:#444; text-shadow:0 1px 0 #000; color:#fff; line-height:55px; padding:15px 300px; font-size:25px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;letter-spacing: 2px; margin-bottom: 10px;");
});


// Declare app level module which depends on views, and components
let app = angular.module('FiftyTwoApp', ['firebase']);

app.controller('MyController', function ($scope, $rootScope, $firebaseObject, $firebaseArray) {
    let ref = firebase.database().ref('test');
    $scope.entries = $firebaseArray(ref);
    console.log("--'", $scope.entries);
    // console.log('test',$scope.entries);
    // $scope.entries.$watch(function(test){
    //     console.log("Sdasda",test);
    // });
    // $scope.addEntry = function() {
    //     $scope.entries.$add({
    //         text: "TEST"
    //     });
    // };
    // $scope.addEntry();
    $scope.myVar = '52project love';
    $scope.tellMe = function(){
        setTimeout(function(){
            $scope.myVar = "52project love ...";
        },1000);
    };
});


