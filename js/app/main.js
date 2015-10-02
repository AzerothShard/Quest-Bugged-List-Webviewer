/*jslint browser: true, white: true*/
/*global angular, console, alert*/

(function () {
  'use strict';
  var app = angular.module('questbugged', ['ui.bootstrap', 'tableSort']);

  app.controller("QuestBugged", function($scope, $http, $sce) {

    $scope.quests = [];

    $http.get( app.api + "quest/bugged/" )
      .success(function(data, status, header, config) {
      for (var i = 0; i < data.length; i++)
      {
        if (data[i].AllowableRaces == "0")
          data[i].AllowableRaces = $sce.trustAsHtml('<img src="img/alliance.png"><img src="img/horde.png">');
        else if (data[i].AllowableRaces == "690")
          data[i].AllowableRaces = $sce.trustAsHtml('<img src="img/horde.png">');
        else if (data[i].AllowableRaces == "1101")
          data[i].AllowableRaces = $sce.trustAsHtml('<img src="img/alliance.png">');
        else
        {
          var allowableRace = "", race = 0;

          data[i].AllowableRaces = String(parseInt(data[i].AllowableRaces, 10).toString(2));
          data[i].AllowableRaces = data[i].AllowableRaces.split("").reverse().join("");

          for (var j = 0; j < String(data[i].AllowableRaces).length; j++)
          {
            race = parseInt(data[i].AllowableRaces[j], 10);
            if (race == 1)
              allowableRace += '<img src="img/'+(j+1)+'.gif">';
          }
          data[i].AllowableRaces = $sce.trustAsHtml(allowableRace);
        }
      }
      $scope.quests = data;
    })
      .error(function(data, status, header, config) {
      console.log("Error in QUEST $http.get");
    });

  });

}());

