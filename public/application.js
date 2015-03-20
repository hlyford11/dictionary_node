/*
var app = angular.module("wordManager", []);

app.controller("wineController", function($scope, $http) {
	
    	$scope.getWord = function() {
		console.log($scope.userText);		
	}



	$http.get("http://daretodiscover.herokuapp.com/users")
		.success(function(users) {
     	$scope.users=users;	
     })
    .error(function() { 
      alert("broken");
     });

   $http.get("http://daretodiscover.herokuapp.com/wines")
		.success(function(wines) {
     	$scope.wines=wines;	
     })
    .error(function() { 
      alert("broken");
     });
*/



$(document).ready(function() {

    // $('body').on('click', 'submit-button', hitAPI);
/*
    $('#submit-button').click(function() {        
        var word = $('#the-word').val();
        console.log(word);      
        hitAPI(word);                       
    });    
*/

    $('#submit-button-two').click(function() {        
        var word = $('#the-word').val();
        console.log(word);      
        hitAPI(word);                       
    });   
    
});

var hitAPI = function(word){
    console.log('get here?');
    $.ajax({
        type: 'GET',
        url: 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + word + '?key=99bb6d8c-33b2-42be-845c-5a08ff2d8e33',
        success: function(word) {
            doTheStuff(word);               
        },
        error: function() {
            alert("Something went wrong")
        }
    });
}    

var doTheStuff = function(word) {    
    var xml2json = function(xml) {
        try {
            var obj = {};
            if (xml.children.length > 0) {
              for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                  obj[nodeName] = xml2json(item);
                } else {
                  if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];

                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xml2json(item));
                }
              }
            } else {
              obj = xml.textContent;
            }
            return obj;
          } catch (e) {
              // console.log(e.message);
          }
        }
    var bringItOut = xml2json(word);
    console.log(bringItOut);

    var checkIfArray = function(obj, itemArr, itemObj) {        
        if ($.isArray(obj)) {
            variable = itemArr;   
            console.log(itemArr);         
        } else {
            variable = itemObj;
        }
        return variable;
    }  

    var theEntry = checkIfArray(bringItOut.entry_list.entry, bringItOut.entry_list.entry[0].ew, bringItOut.entry_list.entry.ew); 
    var partOfSpeech = checkIfArray(bringItOut.entry_list.entry, bringItOut.entry_list.entry[0].fl, bringItOut.entry_list.entry.fl); 
    
    if ($.isArray(bringItOut.entry_list.entry)) {
        var definition = bringItOut.entry_list.entry[0].def.dt[0];   
    } else {
        var defintion = bringItOut.entry_list.entry.def.dt[0];
    }


    console.log("the word is: " + theEntry);

    // var partOfSpeech = (bringItOut.entry_list.entry[0].fl);
    console.log('part of speech is: ' + partOfSpeech);

   // var definition =(bringItOut.entry_list.entry[0].def.dt[0]);
    console.log("the definition is :" + definition);

    $("#entry-one").text(theEntry);
    $("#POS-one").text(partOfSpeech);
    $("#def-one").text(definition);

    $("#response").show();










/*          var xml = $(word);
          var firstNode = xml.find('entry_list');
          console.log(firstNode);
          var entry = firstNode[0];  
          console.log("test is: " + entry);
          //var content = entry.text();
          //console.log(content);
*/
    var firstGuy = word.firstChild;
    // console.log(firstGuy);
    // var selected = firstGuy.getElementById(word);
    // console.log(selected);
    // firstGuy.SelectSingleNode()
    var secondGuy = firstGuy.childNodes[0];
    // console.log(secondGuy);
}
