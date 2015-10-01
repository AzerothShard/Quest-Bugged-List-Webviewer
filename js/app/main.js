/*jslint browser: true, white: true*/
/*global angular, console, alert*/

(function () {
  'use strict';
  var app = angular.module('questbugged', ['ui.bootstrap', 'tableSort']);

  app.controller("QuestBugged", function($scope, $http) {

    $scope.quests = [];
    
    $http.get( app.api + "quest/bugged/" )
      .success(function(data, status, header, config) {
      $scope.quests = data;
      for (var i = 0; i < data.length; i++)
      {
        if (data[i].AllowableRaces == "609")
          
      }
      //690 horde  1101 Alliance
    })
      .error(function(data, status, header, config) {
      console.log("Error in QUEST $http.get");
    });

  });

}());
