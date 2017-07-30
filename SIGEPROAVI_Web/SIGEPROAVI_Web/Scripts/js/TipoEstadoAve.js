// Defining angularjs module
var app = angular.module('demoModule', []);

// Defining angularjs Controller and injecting ProductsService
app.controller('demoCtrl', function ($scope, $http, ProductsService) {
    $scope.productsData = null;
    // Fetching records from the factory created at the bottom of the script file
    ProductsService.GetAllRecords().then(function (d) {
        $scope.productsData = d.data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.Product = {
        IdGprTipoEstadoAve: '',
        Descripcion: '',
        Estado: ''
    };

    // Reset product details
    $scope.clear = function () {
        $scope.Product.IdGprTipoEstadoAve = '';
        $scope.Product.Descripcion = '';
        $scope.Product.Estado = '';
    }

    //Add New Item
    $scope.save = function () {
        if ($scope.Product.Descripcion != "" &&
       $scope.Product.Estado != "") {
            // Call Http request using $.ajax

            //$.ajax({
            //    type: 'POST',
            //    contentType: 'application/json; charset=utf-8',
            //    data: JSON.stringify($scope.Product),
            //    url: '../api/Product/PostProduct',
            //    success: function (data, status) {
            //        $scope.$apply(function () {
            //            $scope.productsData.push(data);
            //            alert("Product Added Successfully !!!");
            //            $scope.clear();
            //        });
            //    },
            //    error: function (status) { }
            //});

            // or you can call Http request using $http
            $http({
                method: 'POST',
                url: '../api/Gpr_Tipo_Estado_Ave',
                data: $scope.Product
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.productsData.push(response.data);
                $scope.clear();
                alert("Product Added Successfully !!!");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };

    // Edit product details
    $scope.edit = function (data) {
        $scope.Product = { IdGprTipoEstadoAve: data.IdGprTipoEstadoAve, Descripcion: data.Descripcion, Estado: data.Estado };
    }

    // Cancel product details
    $scope.cancel = function () {
        $scope.clear();
    }

    // Update product details
    $scope.update = function () {
        if ($scope.Product.Descripcion != "" && $scope.Product.Estado != "") {
            $http({
                method: 'PUT',
                url: '../api/Gpr_Tipo_Estado_Ave/' + $scope.Product.IdGprTipoEstadoAve,
                data: $scope.Product
            }).then(function successCallback(response) {
                debugger;
                $scope.productsData = response.data;
                $scope.clear();
                alert("Product Updated Successfully !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };

    // Delete product details
    $scope.delete = function (index) {
        $http({
            method: 'DELETE',
            url: '../api/Gpr_Tipo_Estado_Ave/' + $scope.productsData[index].IdGprTipoEstadoAve,
        }).then(function successCallback(response) {
            $scope.productsData.splice(index, 1);
            alert("Product Deleted Successfully !!!");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    };
});

// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.

app.factory('ProductsService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('../api/Gpr_Tipo_Estado_Ave');
    }
    return fac;
});