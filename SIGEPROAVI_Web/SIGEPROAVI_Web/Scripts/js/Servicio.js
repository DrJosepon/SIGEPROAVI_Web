﻿// Defining angularjs module
var app = angular.module('servicioModulo', ["angular-table"]);

// Defining angularjs Controller and injecting ServiciosServicio
app.controller('servicioCtrl', function ($scope, $http, ServiciosServicio) {
    $scope.serviciosDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    ServiciosServicio.ListarServicios().then(function (d) {
        $scope.serviciosDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.tiposervicioDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    ServiciosServicio.ListarTipoServicios().then(function (d) {
        $scope.tiposervicioDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.unidadmedidaDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    ServiciosServicio.GetUnidadesMedida().then(function (d) {
        $scope.unidadmedidaDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.config = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    $scope.configCosto = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    $scope.Servicio = {
        IdGprServicio: '',
        Descripcion: '',
        IdGprUnidadMedida: '',
        IdGprTipoServicio: '',
        Estado: '',
    };

    // Reset product details
    $scope.limpiar = function () {
        $scope.Servicio.IdGprServicio = '';
        $scope.Servicio.Descripcion = '';
        $scope.Servicio.IdGprUnidadMedida = '';
        $scope.Servicio.IdGprTipoServicio = '';
        $scope.Servicio.Estado = '';
    }

    //Add New Item
    $scope.guardar = function () {
        if ($scope.Servicio.Descripcion != "" && $scope.Servicio.IdGprTipoServicio != "") {
            $http({
                method: 'POST',
                url: '../Gestion/GuardarServicio',
                data: $scope.Servicio
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                //$scope.serviciosDatos.push(response.data);

                if (response.data.StatusCode != 200 && response.data.StatusCode != 201) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.serviciosDatos.push(response.data.Data);
                    $scope.limpiar();
                    alert("Servicio agregado");
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
        $scope.Servicio = {
            IdGprServicio: data.IdGprServicio,
            Descripcion: data.Descripcion,
            IdGprUnidadMedida: data.IdGprUnidadMedida.toString(),
            IdGprTipoServicio: data.IdGprTipoServicio.toString(),
            Estado: data.Descripcion,
        };

        $scope.CostoServicio.IdGprServicio = data.IdGprServicio;
        $scope.costoXServicio();
    }

    // Cancel product details
    $scope.cancelar = function () {
        $scope.limpiar();
    }

    // Update product details
    $scope.modificar = function () {
        if ($scope.Servicio.Descripcion != "" && $scope.Servicio.Estado != "") {
            $http({
                method: 'POST',
                url: '../Gestion/ModificarServicio/' + $scope.Servicio.IdGprServicio,
                data: $scope.Servicio
            }).then(function successCallback(response) {
                debugger;

                if (response.data.StatusCode != 200) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.serviciosDatos = response.data.Data;
                    $scope.limpiar();
                    alert("Servicio actualizado.");
                }
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Llene todos los campos.');
        }
    };

    $scope.costoservicioDatos = {};

    $scope.CostoServicio = {
        IdGprServicio: '',
        Costo: ''
    };

    $scope.limpiarCosto = function () {
        //$scope.CostoServicio.IdGprServicio = '';
        $scope.CostoServicio.Costo = '';
    }

    $scope.costoXServicio = function () {
        //alert($scope.galpon.IdGprGalpon);
        $http({
            method: 'GET',
            url: '../Gestion/BuscarCostoServicioXServicio/' + $scope.Servicio.IdGprServicio,
            //data: $scope.ComponenteElectronico
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.costoservicioDatos = response.data.Data;
            } catch (err) {
            }

            //$scope.limpiarControl();
            //$scope.ControlComponenteElectronico.IdDomComponenteElectronico = $scope.Servicio.IdGprTipoServicio;
            //alert("Componente Electrónico agregado");
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.guardarCosto = function () {
        if ($scope.CostoServicio.Costo != "") {
            $http({
                method: 'POST',
                url: '../Gestion/ProcesarCostoServicio',
                data: $scope.CostoServicio
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                //$scope.serviciosDatos.push(response.data);

                if (response.data.StatusCode != 200 && response.data.StatusCode != 201) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.costoservicioDatos = response.data.Data;
                    $scope.limpiarCosto();
                    alert("Costo agregado");
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
});

// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.

app.factory('ServiciosServicio', function ($http) {
    var fac = {};
    fac.ListarServicios = function () {
        return $http.get('../Gestion/ListarServicio');
    };
    fac.ListarTipoServicios = function () {
        return $http.get('../Gestion/ListarTipoServicio');
    };
    fac.GetUnidadesMedida = function () {
        return $http.get('../Gestion/ListarUnidadMedida');
    };
    return fac;
});