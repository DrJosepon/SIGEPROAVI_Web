// Defining angularjs module
var app = angular.module('componenteelectronicoModulo', ["angular-table", "moment-picker"]);

// Defining angularjs Controller and injecting ComponentesElectronicosServicio
app.controller('componenteelectronicoCtrl', function ($scope, $http, ComponentesElectronicosServicio) {
    $scope.componenteselectronicosDatos = null;
    //// Fetching records from the factory created at the bottom of the script file
    //ComponentesElectronicosServicio.GetComponentesElectronicos().then(function (d) {
    //    $scope.componenteselectronicosDatos = d.data.Data; // Success
    //}, function () {
    //    alert('Error Occured !!!'); // Failed
    //});

    $scope.galponesDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    ComponentesElectronicosServicio.GetGalpones().then(function (d) {
        $scope.galponesDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.serviciosDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    ComponentesElectronicosServicio.GetServicios().then(function (d) {
        $scope.serviciosDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.tipocontrolcomponenteelectronicosDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    ComponentesElectronicosServicio.GetTipoControlComponenteElectronico().then(function (d) {
        $scope.tipocontrolcomponenteelectronicosDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.tipocomponenteselectronicosDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    ComponentesElectronicosServicio.GetTipoComponentesElectronicos().then(function (d) {
        $scope.tipocomponenteselectronicosDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.config = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    $scope.ComponenteElectronico = {
        IdDomComponenteElectronico: '',
        Topic: '',
        IdDomTipoComponenteElectronico: '',
        IdGprGalpon: '',
        IdGprServicio: '',
        TipoServicio: '',
        Estado: '',
    };

    $scope.ControlComponenteElectronico = {
        IdDomControlComponenteElectronico: '',
        Inicio: '',
        Fin: '',
        HoraInicio: '',
        HoraFin: '',
        IdDomTipoControlComponenteElectronico: '',
        IdDomComponenteElectronico: '',
    };

    $scope.controlcomponenteelectronicoDatos = null;

    $scope.Galpon = [];

    $scope.buscarXGalpon = function () {
        //alert($scope.galpon.IdGprGalpon);
        $http({
            method: 'GET',
            url: '../Domotica/BuscarComponenteElectronicoXGalpon/' + $scope.Galpon.IdGprGalpon,
            //data: $scope.ComponenteElectronico
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.componenteselectronicosDatos = response.data.Data;
            } catch (err) {
            }

            $scope.limpiar();
            $scope.ComponenteElectronico.IdGprGalpon = $scope.Galpon.IdGprGalpon;
            //alert("Componente Electrónico agregado");
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    // Reset product details
    $scope.limpiar = function () {
        $scope.ComponenteElectronico.IdDomComponenteElectronico = '';
        $scope.ComponenteElectronico.Topic = '';
        $scope.ComponenteElectronico.IdDomTipoComponenteElectronico = '';
        //$scope.ComponenteElectronico.IdGprGalpon = '';
        $scope.ComponenteElectronico.IdGprServicio = '';
        $scope.ComponenteElectronico.Estado = '';
    }

    $scope.limpiarControl = function () {
        $scope.IdDomControlComponenteElectronico = '';
        $scope.Inicio = '';
        $scope.Fin = '';
        $scope.HoraInicio = '';
        $scope.HoraFin = '';
        //$scope.IdDomTipoControlComponenteElectronico = '';
        //$scope.IdDomComponenteElectronico = '';
    }

    //Add New Item
    $scope.guardar = function () {
        if ($scope.ComponenteElectronico.Topic != "" && $scope.ComponenteElectronico.IdDomTipoComponenteElectronico != ""
            && $scope.ComponenteElectronico.IdGprGalpon != "" && $scope.ComponenteElectronico.IdGprServicio != "") {
            $http({
                method: 'POST',
                url: '../Domotica/PostComponenteElectronico',
                data: $scope.ComponenteElectronico
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available  
                if (response.data.StatusCode != 200 && response.data.StatusCode != 201) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.componenteselectronicosDatos.push(response.data.Data[0]);
                    $scope.limpiar();
                    alert("Componente Electrónico agregado.");
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
        $scope.ComponenteElectronico = {
            IdDomComponenteElectronico: data.IdDomComponenteElectronico,
            Topic: data.Topic,
            IdDomTipoComponenteElectronico: data.IdDomTipoComponenteElectronico.toString(),
            IdGprGalpon: data.IdGprGalpon.toString(),
            IdGprServicio: data.IdGprServicio.toString(),
            Estado: data.Estado,
            TipoServicio: data.DescripcionTipoServicio,
        };
        $scope.controlXComponente();
    }

    // Cancel product details
    $scope.cancelar = function () {
        $scope.limpiar();
    }

    // Update product details
    $scope.modificar = function () {
        if ($scope.ComponenteElectronico.Topic != "" && $scope.ComponenteElectronico.IdDomTipoComponenteElectronico != ""
            && $scope.ComponenteElectronico.IdGprGalpon != "" && $scope.ComponenteElectronico.IdGprServicio != "") {
            $http({
                method: 'POST',
                url: '../Domotica/PutComponenteElectronico/' + $scope.ComponenteElectronico.IdDomComponenteElectronico,
                data: $scope.ComponenteElectronico
            }).then(function successCallback(response) {
                debugger;

                if (response.data.StatusCode != 200) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.componenteselectronicosDatos = response.data.Data;
                    $scope.limpiar();
                    alert("Componente Electrónico actualizado.");
                }
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Llene todos los campos.');
        }
    };

    $scope.desactivar = function (data) {
        var r = confirm("¿Esta seguro de realizar esta acción?");
        if (r == true) {
            $scope.ComponenteElectronico = {
                IdDomComponenteElectronico: data.IdDomComponenteElectronico,
                Topic: data.Topic,
                IdDomTipoComponenteElectronico: data.IdDomTipoComponenteElectronico.toString(),
                IdGprGalpon: data.IdGprGalpon.toString(),
                IdGprServicio: data.IdGprServicio.toString(),
                Estado: data.Estado,
                TipoServicio: data.DescripcionTipoServicio,
            };

            if ($scope.ComponenteElectronico.Topic != "" && $scope.ComponenteElectronico.IdDomTipoComponenteElectronico != ""
                && $scope.ComponenteElectronico.IdGprGalpon != "" && $scope.ComponenteElectronico.IdGprServicio != "") {
                $http({
                    method: 'POST',
                    url: '../Domotica/DesactivarComponenteElectronico/',
                    data: $scope.ComponenteElectronico
                }).then(function successCallback(response) {
                    debugger;

                    if (response.data.StatusCode != 200) {
                        alert(response.data.Data.Message + ". Revise la consola para más información.");
                        console.log(response.data.Data);
                    } else {
                        $scope.componenteselectronicosDatos = response.data.Data;
                        $scope.limpiar();
                        alert("Componente Electrónico desactivado.");
                    }
                }, function errorCallback(response) {
                    alert("Error : " + response.data.ExceptionMessage);
                });
            }
            else {
                alert('Llene todos los campos.');
            }
        } else {
        }
    }

    $scope.controlXComponente = function () {
        //alert($scope.galpon.IdGprGalpon);
        $http({
            method: 'GET',
            url: '../Domotica/BuscarControlComponenteElectronicoXComponenteElectronico/' + $scope.ComponenteElectronico.IdDomComponenteElectronico,
            //data: $scope.ComponenteElectronico
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.controlcomponenteelectronicoDatos = response.data.Data;
            } catch (err) {
            }

            $scope.limpiarControl();
            $scope.ControlComponenteElectronico.IdDomComponenteElectronico = $scope.ComponenteElectronico.IdDomComponenteElectronico;
            //alert("Componente Electrónico agregado");
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.guardarControl = function () {
        if ($scope.ControlComponenteElectronico.IdDomTipoControlComponenteElectronico != '' && (($scope.ControlComponenteElectronico.Inicio != '' && $scope.ControlComponenteElectronico.Fin != '')
            || ($scope.ControlComponenteElectronico.HoraInicio != '' && $scope.ControlComponenteElectronico.HoraFin != ''))) {
            if ($scope.ControlComponenteElectronico.IdDomTipoControlComponenteElectronico == 3) {
                $scope.ControlComponenteElectronico.Inicio = $scope.ControlComponenteElectronico.HoraInicio;
                $scope.ControlComponenteElectronico.Fin = $scope.ControlComponenteElectronico.HoraFin;
            }

            $http({
                method: 'POST',
                url: '../Domotica/PostControlComponenteElectronico',
                data: $scope.ControlComponenteElectronico
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

                if (response.data.StatusCode != 200) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.controlcomponenteelectronicoDatos.push(response.data.Data[0]);
                    $scope.limpiarControl();
                    alert("Control agregado");
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Error : " + response.data);
            });
        }
        else {
            alert('Llene todos los campos.');
        }
    };
});

// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.

app.factory('ComponentesElectronicosServicio', function ($http) {
    var fac = {};
    //fac.GetComponentesElectronicos = function () {
    //    return $http.get('../api/Dom_Componente_Electronico');
    //};
    fac.GetGalpones = function () {
        return $http.get('../Gestion/GetGalpon');
    };
    fac.GetServicios = function () {
        return $http.get('../Gestion/GetServicio');
    };
    fac.GetTipoComponentesElectronicos = function () {
        return $http.get('../Domotica/GetTipoComponenteElectronico');
    };
    fac.GetTipoControlComponenteElectronico = function () {
        return $http.get('../Domotica/GetDomTipoControlComponenteElectronico');
    };
    return fac;
});