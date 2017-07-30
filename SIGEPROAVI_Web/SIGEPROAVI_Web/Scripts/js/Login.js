// Defining angularjs module
var app = angular.module('demoModule', []);

// Defining angularjs Controller and injecting Usuarios
app.controller('demoCtrl', function ($scope, $http, Usuarios) {
    //$scope.productsData = null;
    //// Fetching records from the factory created at the bottom of the script file
    //Usuarios.GetAllRecords().then(function (d) {
    //    $scope.productsData = d.data; // Success
    //}, function () {
    //    alert('Error Occured !!!'); // Failed
    //});

    $scope.Seg_Usuario = {
        IdSegUsuario: '',
        Nombres: '',
        ApellidoMaterno: '',
        ApellidoPaterno: '',
        Usuario: '',
        Clave: '',
    };

    // Reset product details
    $scope.clear = function () {
        $scope.Seg_Usuario.Usuario = '';
        $scope.Seg_Usuario.Clave = '';
    }

    //Add New Item
    $scope.login = function () {
        if ($scope.Seg_Usuario.Usuario != "" &&
       $scope.Seg_Usuario.Clave != "") {
            $http({
                method: 'POST',
                url: '../Home/InicioSesion',
                //url: '../api/Seg_Usuario/Login',
                data: $scope.Seg_Usuario,
                headers: { 'Content-Type': 'application/json' },
                dataType: "json"
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                //debugger;
                if (response.data == "Aceptado") {
                    window.location.href = "/Home/Index";
                }
                else {
                    alert("Usuario o contraseña equivocados.")
                }

                $scope.clear();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Error : " + response.data.ExceptionMessage);
            });
            //$.ajax({
            //    type: 'POST',
            //    contentType: 'application/json; charset=utf-8',
            //    data: JSON.stringify($scope.Usuario),
            //    data: JSON.stringify($scope.Usuario),
            //    url: '../Home/InicioSesion',
            //    success: function (data, status) {
            //        $scope.$apply(function () {
            //            $scope.productsData.push(data);
            //            alert("Product Added Successfully !!!");
            //            $scope.clear();
            //        });
            //    },
            //    error: function (status) { }
            //});
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };

    // Cancel product details
    $scope.cancel = function () {
        $scope.clear();
    }
});

// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.

app.factory('Usuarios', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('../Home/Seg_Usuario');
    }
    return fac;
});