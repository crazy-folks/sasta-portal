app.controller('RecoveryController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage',
	function($http,$window,$scope,$rootScope,notify,$location,$state,storage){
       
	    var counter = 0;
        $scope.questionelemnt = [{
            id: counter,
              check:'',             
              actualAmount: '',
              payAmount: '',
              description: '',
              ammountSetteled: '',
          
        }];

         $scope.addFormField = function ($event) {
            counter++;
            $scope.questionelemnt.push({
                id: counter, 
                   check:'',        
                 actualAmount: '',
                 payPayment: '',
                 description: '', 
                 ammountSetteled:'',      
                 inline: true
            });
            $event.preventDefault();
        }
        $scope.showitems = function () {       	

              alert(angular.toJson($scope.questionelemnt));
        }
		 

		
	}]);
