'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('CtrlLogin', ['$scope','$http','$location', function($scope,$http,$location) {

  	$scope.user = "";
  	$scope.pass = "";

  	$scope.login = function(){
  		$http({
			url: 'http://www.takeyournight.com/api/disco/control/login',
			method: 'POST',
			data: {
				'username': $scope.user,
				'password': $scope.pass
			}
		})
		.success(function(data, status, headers, config) {
			console.log("Logged in");
			$location.path( "/eventlist");
		}).
		error(function(data, status, headers, config) {
			// failed
			console.log("KO:"+JSON.stringify(data));
		});
  	};

  }])
  .controller('CtrlEventList', ['$scope','$http','$location', function($scope,$http,$location) {

  	$scope.loadeventlist = function(){
  		$http({
			url: 'http://www.takeyournight.com/api/disco/control/eventList',
			method: 'GET'
		})
		.success(function(data, status, headers, config) {
			console.log("Logged in");
            $scope.eventi = data.risposta.oggetto;
		}).
		error(function(data, status, headers, config) {
			// failed
			console.log("KO:"+JSON.stringify(data));
                
			var risposta =  {"risposta":{"tipo":"risposta","messaggio":"Lista degli eventi.","oggetto":[{"url_immagine":"https://s3-eu-west-1.amazonaws.com/tynhttps://scontent-a.xx.fbcdn.net/hphotos-prn2/t31/1780142_781391315223020_1536814147_o.jpg","id_evento":1,"nome":"Nobody's perfection III","data":"2014-12-01 00:00:00","timestamp_inizio_vendita":"2014-03-20 00:00:00","timestamp_fine_vendita":"2014-12-01 00:00:00"},{"url_immagine":"https://s3-eu-west-1.amazonaws.com/tynhttps://scontent-a.xx.fbcdn.net/hphotos-prn2/t31/1780142_781391315223020_1536814147_o.jpg","id_evento":2,"nome":"Under pop","data":"2014-12-01 00:00:00","timestamp_inizio_vendita":"2014-03-20 00:00:00","timestamp_fine_vendita":"2014-12-01 00:00:00"},{"url_immagine":"https://s3-eu-west-1.amazonaws.com/tynhttps://scontent-a.xx.fbcdn.net/hphotos-prn2/t31/1780142_781391315223020_1536814147_o.jpg","id_evento":3,"nome":"festa del popolo perfection","data":"2014-12-01 00:00:00","timestamp_inizio_vendita":"2014-03-20 00:00:00","timestamp_fine_vendita":"2014-12-01 00:00:00"},{"url_immagine":"https://s3-eu-west-1.amazonaws.com/tynhttps://scontent-a.xx.fbcdn.net/hphotos-prn2/t31/1780142_781391315223020_1536814147_o.jpg","id_evento":4,"nome":"Under pop","data":"2014-12-01 00:00:00","timestamp_inizio_vendita":"2014-03-20 00:00:00","timestamp_fine_vendita":"2014-12-01 00:00:00"},{"url_immagine":"https://s3-eu-west-1.amazonaws.com/tynhttps://scontent-a.xx.fbcdn.net/hphotos-prn2/t31/1780142_781391315223020_1536814147_o.jpg","id_evento":6,"nome":"Under pop di prova","data":"2014-12-01 00:00:00","timestamp_inizio_vendita":"2014-03-20 00:00:00","timestamp_fine_vendita":"2014-12-01 00:00:00"},{"url_immagine":"https://s3-eu-west-1.amazonaws.com/tynhttps://scontent-a.xx.fbcdn.net/hphotos-prn2/t31/1780142_781391315223020_1536814147_o.jpg","id_evento":7,"nome":"Under pop","data":"2014-12-01 00:00:00","timestamp_inizio_vendita":"2014-03-20 00:00:00","timestamp_fine_vendita":"2014-12-01 00:00:00"},{"url_immagine":"https://s3-eu-west-1.amazonaws.com/tynhttps://scontent-a.xx.fbcdn.net/hphotos-prn2/t31/1780142_781391315223020_1536814147_o.jpg","id_evento":8,"nome":"Under pop finito","data":"2014-12-01 00:00:00","timestamp_inizio_vendita":"2014-03-20 00:00:00","timestamp_fine_vendita":"2014-12-01 00:00:00"},{"url_immagine":"https://s3-eu-west-1.amazonaws.com/tynhttps://scontent-a.xx.fbcdn.net/hphotos-prn2/t31/1780142_781391315223020_1536814147_o.jpg","id_evento":31,"nome":"Test4","data":"2014-12-01 00:00:00","timestamp_inizio_vendita":"2014-03-20 00:00:00","timestamp_fine_vendita":"2014-12-01 00:00:00"},{"url_immagine":"https://s3-eu-west-1.amazonaws.com/tyn/disco/1/event/ProvaAmm@2014-06-06/flayer.png","id_evento":32,"nome":"ProvaAmm","data":"2014-12-01 00:00:00","timestamp_inizio_vendita":"2014-03-20 00:00:00","timestamp_fine_vendita":"2014-12-01 00:00:00"},{"url_immagine":"https://s3-eu-west-1.amazonaws.com/tynhttps://s3-eu-west-1.amazonaws.com/tyn/disco/1/event/popo_2014-05-30/flayer.jpg","id_evento":37,"nome":"popo","data":"2014-12-01 00:00:00","timestamp_inizio_vendita":"2014-04-30 15:30:00","timestamp_fine_vendita":"2014-12-30 00:00:00"}],"timestamp":"2014-08-13T08:32:21.326Z"}};
			$scope.eventi = risposta.risposta.oggetto;
			console.log($scope.eventi);
		});
  	};

  	$scope.caricaEvento = function(id_evento){
  		console.log("IDevento:"+id_evento);
  		$location.path("/dettaglievento/"+id_evento);
  	};

  	$scope.loadeventlist();
  }])
  .controller('CtrlEventDetail', ['$scope','$http','$location','$routeParams','$cordovaBarcodeScanner', function($scope,$http,$location,$routeParams,$cordovaBarcodeScanner) {
  	$scope.loadeventdetail = function(){
  		$http({
			url: 'http://www.takeyournight.com/api/disco/control/eventDetail',
			method: 'POST',
			data: {
				'id_evento': $routeParams.idevento
			}
		})
		.success(function(data, status, headers, config) {
			console.log("Logged in");
            $scope.evento = data.risposta.oggetto[0];
		}).
		error(function(data, status, headers, config) {
			// failed
			console.log("KO:"+JSON.stringify(data));
		});
  	};

  	$scope.getValueQRCode = function(){
  		$cordovaBarcodeScanner.scan().then(
  			function(imageData) {
	      
	          //alert("We got a barcode\n" +
	        //        "Result: " + result.text + "\n" +
	        //        "Format: " + result.format + "\n" +
	        //        "Cancelled: " + result.cancelled);
	          console.log(imageData);
	          
	          //funzione di controllo
	          //se il controllo è positivo ti faccio vedere "INGRESSO CONSENTITO X PERSONE" di verde
	          //se il controllo rende esito negativo ti faccio vedere "VAFFANCULO" di rosso
	          //il tutto viene fatto in un popup con bottone OK o ANNULLA
	          $http({
					url: 'http://www.takeyournight.com/api/disco/control/checkticket',
					method: 'POST',
					data: {
						'codice': imageData.text
					}
				})
	          .success(function(data_ok, status, headers, config) {
	            console.log(data_ok);
	            //console.log(data_ok);
	            //var data_ok2=data_ok.risposta;
	            //console.log(data_ok2);
	            console.log(data_ok.risposta.oggetto[0].utilizzato);
	            if(data_ok.risposta.oggetto[0].utilizzato == 0){
	                //allora il ticket va bene
	                //alert("OK, numero ingressi:"+data_ok.risposta.oggetto[0].numero_ingressi_acquistati);
	                $("#idacquisto_nascosto").val(parseInt(result.text.substr(0,11)));
	                
	                 navigator.notification.confirm(
	                    'Number of ingress:'+data_ok.risposta.oggetto[0].numero_ingressi_acquistati+"\nDrink:"+data_ok.risposta.oggetto[0].drink+"\nShot:"+data_ok.risposta.oggetto[0].shot, // message
	                     verificaTicket,            // callback to invoke with index of button pressed
	                    'Confirm Verification',           // title
	                    ['Confirm','Cancel']         // buttonLabels
	                );
	                
	                
	            }else{
	                //allora il ticket è già stato timbrato
	                //alert("Error Ticket already utilized");
	                navigator.notification.alert(
	                    'Error Ticket already utilized',  // message
	                    alertDismissed,         // callback
	                    'Error',            // title
	                    'Close'                  // buttonName
	                );
	            }
	            
	        }).
	        error(function(data, status, headers, config) {
	            //alert("QRCode not valid!");
	            navigator.notification.alert(
	                'QRCode not valid!',  // message
	                alertDismissed,         // callback
	                'Error',            // title
	                'Close'                  // buttonName
	            );
	        });
	          
	      }, 
	      function (error) {
	          //alert("Scanning failed: " + error);
	          navigator.notification.alert(
	            'Scanning failed: ' + error,  // message
	            alertDismissed,         // callback
	            'Error',            // title
	            'Close'                  // buttonName
	        );
	      }
	   );
  	};


  	$scope.loadeventdetail();
  }]);