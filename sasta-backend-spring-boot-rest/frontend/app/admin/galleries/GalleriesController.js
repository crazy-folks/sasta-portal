app.controller('GalleriesController',['$http','$window','$scope','$rootScope','notify','$location','$state','storage','galleriesFactory',
    function($http,$window,$scope,$rootScope,notify,$location,$state,storage,galleriesFactory){

        $scope.crudServiceBaseUrl = $rootScope.appConfig.baseUrl;
        /* show  Context menu*/
        $scope.showContextMenu = Util.showContextMenu;

        $scope.pageTitle = "Galleries";

        $scope.defaultOptions =         {
            "id": null,
            "description": null,
            "uploadedDate": null,
            "deletedDate": null,
            "auditId": null,
            "modifiedBy": $rootScope.sessionConfig.userId,
            "createdBy": $rootScope.sessionConfig.userId,
            "userId": $rootScope.sessionConfig.userId,
            "imageWidth": 0,
            "imageName": "",
            "imageSize": 0,
            "typeId": 8,
            "createdByName": "",
            "modifiedByName": null,
            "isDeleted": false,
            "imageHeight": 0,
            "thumbnailHeight": 0,
            "thumbnailImageName": "",
            "imageNiceName": null,
            "thumbnailWidth": 0
        };

        $scope.dfOptions = angular.copy($scope.defaultOptions);
        $scope.mode = 1; // 1 - Add & 2 - Edit
        $scope.file = null; // file upload
        function parseOptions(o){
            var option = angular.copy(o);
            delete option.uid;
            delete option._handlers;
            delete option._events;
            delete option.parent;
            return option;
        }

        $scope.model = {};
        $scope.EditData = function(dataItem){
            $scope.defaultOptions = parseOptions(dataItem);
            $scope.mode = 2;
        }

        $scope.OnDelete = function(dataItem){
            var response = galleriesFactory.DeleteGalleries(dataItem.id);
            response.success(function(result){
                if(result.status){
                    notify({
                        messageTemplate: '<span>'+result.data+'!</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                    $scope.grid.dataSource.read();
                }
                else{
                    notify({
                        messageTemplate: '<span>Unable to delete Galleries!</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                }

            }).error(function(error,status){
                notify({
                    messageTemplate: '<span>Unable to delete Galleries!</span>',
                    position: $rootScope.appConfig.notifyConfig.position,
                    scope:$scope
                });
            });
        }

        $scope.addGalleries = function(){
            $scope.defaultOptions.description = ($scope.defaultOptions.description||'').replace(/<(?:.|\n)*?>/gm, '')
            var galleries = galleriesFactory.UploadImage(
                $scope.file,
                $scope.defaultOptions.typeId,
                parseInt($location.search().aid,10),
                $rootScope.sessionConfig.userId,
                $scope.defaultOptions.description,
                $scope.defaultOptions.id
            );
            galleries.success(function(result){
                if(result.status){
                    notify({
                        messageTemplate: '<span>'+result.data+'</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                    $scope.grid.dataSource.read();
                }
            }).error(function(error,status){
                notify({
                    messageTemplate: '<span>'+error+'</span>',
                    position: $rootScope.appConfig.notifyConfig.position,
                    scope:$scope
                });
            }).finally(function(){
                $scope.doReset();
            });
        }

        $scope.UpdateGalleries = function(){
            if(angular.isObject($scope.file)){
                $scope.defaultOptions.description = ($scope.defaultOptions.description||'').replace(/<(?:.|\n)*?>/gm, '')
                var galleries = galleriesFactory.UploadImage(
                    $scope.file,
                    $scope.defaultOptions.typeId,
                    parseInt($location.search().aid,10),
                    $rootScope.sessionConfig.userId,
                    $scope.defaultOptions.description,
                    $scope.defaultOptions.id
                );
                galleries.success(function(result){
                    if(result.status){
                        notify({
                            messageTemplate: '<span>'+result.data+'</span>',
                            position: $rootScope.appConfig.notifyConfig.position,
                            scope:$scope
                        });
                        $scope.grid.dataSource.read();
                    }
                }).error(function(error,status){
                    notify({
                        messageTemplate: '<span>'+error+'</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                }).finally(function(){
                    $scope.doReset();
                });
            }else{
                $scope.defaultOptions.modifiedBy = $rootScope.sessionConfig.userId;
                $scope.defaultOptions.createdBy = $rootScope.sessionConfig.userId;
                $scope.defaultOptions.userId = $rootScope.sessionConfig.userId;
                $scope.defaultOptions.deletedDate = new Date();
                $scope.defaultOptions.description = ($scope.defaultOptions.description||'').replace(/<(?:.|\n)*?>/gm, '')
                var response = galleriesFactory.UpdateGalleries($scope.defaultOptions);
                response.success(function(result){
                    if(result.status){
                        notify({
                            messageTemplate: '<span>'+result.data+'</span>',
                            position: $rootScope.appConfig.notifyConfig.position,
                            scope:$scope
                        });
                        $scope.grid.dataSource.read();
                    }
                    else
                        notify({
                            messageTemplate: '<span>Unable to update Gallaries!</span>',
                            position: $rootScope.appConfig.notifyConfig.position,
                            scope:$scope
                        });
                }).error(function(error,status){
                    notify({
                        messageTemplate: '<span>Unable to update Gallaries!</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                }).finally(function(){
                    $scope.doReset();
                });
            }

        }

        $scope.doReset = function(){
            $scope.defaultOptions = $scope.dfOptions;
            $scope.mode = 1;
            $scope.file = null;
        }

        $scope.uploadFile = function(fileObject){
            if(fileObject.files.length>0){
                $scope.file = fileObject.files[0];
                $scope.defaultOptions.imageName = $scope.file.name;
                var ext = $(fileObject).val().split('.').pop().toLowerCase();
                if($.inArray(ext, ['gif','png','jpg','jpeg']) > 0){
                    $scope.$apply();
                }else{
                    notify({
                        messageTemplate: '<span>Image formats should be JPG, JPEG, PNG or GIF!</span>',
                        position: $rootScope.appConfig.notifyConfig.position,
                        scope:$scope
                    });
                    $scope.defaultOptions.imageName = "";
                }
            }
        }

        $scope.gridOptions = {
            columns: [
                { field: "id", title:'Audit ID', menu:false, hidden: true, editable : false },
                { field : "imageName", width:"20px", title :"Name", template: "<img class='galleries-photo' src='#:imageName#'></div>"},
                { field : "description", width:"100px", title : "Description"},
                { field : "uploadedDate", width:"100px", title : "Uploaded Date", template :"#=kendo.toString(uploadedDate,'yyyy-MM-dd')#"},
                { field : "deletedDate", width:"100px", title : "Deleted Date", template :"#=kendo.toString(deletedDate,'yyyy-MM-dd')#"},
                { field : "imageSize", width:"100px", title : "Image Size"},
                {
                    title : "&nbsp;",
                    width: '60px',
                    template: kendo.template($("#toggle-template").html())
                }
            ],
            pageable: true,
            filterable :true,
            groupable : true,
            pageSize: 30,
            pageable: {
                refresh: true,
                pageSizes: [5, 10, 20, 30],
                messages: {
                    refresh: "Refresh Gallaries"
                }
            },
            dataSource: {
                pageSize: 30,
                transport: {
                    read: function (e) {
                        var baseUrl = $scope.crudServiceBaseUrl +
                            '/gallaries/gallarieslist?auditid='+encodeURIComponent($location.search().aid);
                        $http({
                            method: 'GET',
                            url: baseUrl,
                            cache : false
                        }).
                        success(function(data, status, headers, config) {
                                var ds = [];
                                if(data.status)
                                    ds = data.data||[];
                                angular.forEach(ds,function(o,k){
                                    o.uploadedDate &&(o.uploadedDate = new Date(o.uploadedDate));
                                    o.deletedDate &&(o.deletedDate = new Date(o.deletedDate));
                                    !o.uploadedDate && ( o.uploadedDate = "");
                                    !o.deletedDate && ( o.deletedDate = "");
                                });
                                e.success(ds);
                        }).
                        error(function(data, status, headers, config) {
                        });
                    }
                }
            }
        }

}]);


app.factory('galleriesFactory',function($http,$q,$rootScope){

    var service = {};
    var crudServiceBaseUrl = $rootScope.appConfig.baseUrl;

    service.UploadImage = function( image, type, auditid, createdby, description, uniqueId){
        var fd = new FormData();
        fd.append('file', image);
        fd.append('type', type);
        fd.append('auditid', auditid);
        fd.append('createdby', createdby);
        fd.append('description', description);
        fd.append('uniqueId', uniqueId||'');

        return $http.post(crudServiceBaseUrl+"/gallaries/uploadFile", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    }

    service.UpdateGalleries = function(model){
        return $http({
            method : 'POST',
            url : crudServiceBaseUrl + '/gallaries/updategalleries',
            data : JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    service.DeleteGalleries = function(id){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/gallaries/deletegallaries?id='+(id||''),
            cache : false
        });
    }

    service.GetGalleriesById = function(id){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/gallaries/gallarieslist?id='+(id||''),
            cache : false
        });
    }

    service.GetGalleriesList = function(){
        return $http({
            method : 'GET',
            url : crudServiceBaseUrl + '/gallaries/gallarieslist',
            cache : false
        });
    }

    return service;

});