// Defining angularjs module
var app = angular.module('galponModulo', ["angular-table"]);

// Defining angularjs Controller and injecting GalponesServicio
app.controller('galponCtrl', function ($scope, $http, GalponesServicio) {
    $scope.galponesDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    GalponesServicio.ListarGalpones().then(function (d) {
        $scope.galponesDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.config = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    $scope.Galpon = {
        IdGprGalpon: '',
        Descripcion: '',
        CantidadAves: '',
        //Estado: '',
    };

    // Reset product details
    $scope.limpiar = function () {
        $scope.Galpon.IdGprGalpon = '';
        $scope.Galpon.Descripcion = '';
        $scope.Galpon.CantidadAves = '';
        //$scope.Galpon.Estado = '';
    }

    //Add New Item
    $scope.guardar = function () {
        if ($scope.Galpon.Descripcion != "" && $scope.Galpon.CantidadAves != "") {
            $http({
                method: 'POST',
                url: '../Gestion/GuardarGalpon',
                data: $scope.Galpon
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

                if (response.data.StatusCode != 200 && response.data.StatusCode != 201) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.galponesDatos.push(response.data.Data);
                    $scope.limpiar();
                    alert("Galpon agregado");
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Llene todos los campos.');
        }
    };

    // Edit product details
    $scope.editar = function (data) {
        $scope.Galpon = {
            IdGprGalpon: data.IdGprGalpon,
            Descripcion: data.Descripcion,
            CantidadAves: data.CantidadAves,
            //Estado: data.Estado,
        };
    }

    // Cancel product details
    $scope.cancelar = function () {
        $scope.limpiar();
    }

    // Update product details
    $scope.modificar = function () {
        if ($scope.Galpon.Descripcion != "" /*&& $scope.Galpon.Estado != ""*/) {
            $http({
                method: 'POST',
                url: '../Gestion/ModificarGalpon/' + $scope.Galpon.IdGprGalpon,
                data: $scope.Galpon
            }).then(function successCallback(response) {
                debugger;

                if (response.data.StatusCode != 200) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.galponesDatos = response.data.Data;
                    $scope.limpiar();
                    alert("Galpon actualizado.");
                }
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Llene todos los campos.');
        }
    };
});

// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.

app.factory('GalponesServicio', function ($http) {
    var fac = {};
    fac.ListarGalpones = function () {
        return $http.get('../Gestion/ListarGalpon');
    };
    //fac.GetTipoGalpones = function () {
    //    return $http.get('../api/Gpr_Tipo_Galpon');
    //};
    return fac;
});