// Defining angularjs module
var app = angular.module('temporadaModulo', ["angular-table", "moment-picker"]);

// Defining angularjs Controller and injecting TemporadasServicio
app.controller('temporadaCtrl', function ($scope, $http, TemporadasServicio) {
    $scope.temporadasDatos = null;
    //// Fetching records from the factory created at the bottom of the script file
    //TemporadasServicio.GetTemporadas().then(function (d) {
    //    $scope.temporadasDatos = d.data; // Success
    //}, function () {
    //    alert('Error Occured !!!'); // Failed
    //});

    $scope.galponesDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    TemporadasServicio.GetGalpones().then(function (d) {
        $scope.galponesDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.config = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    $scope.Temporada = {
        IdGprTemporada: '',
        Descripcion: '',
        CantidadAves: '',
        FechaInicio: '',
        CostoInicial: '',
        FechaFin: '',
        TotalVenta: '',
        IdGprGalpon: '',
        Estado: '',
    };

    $scope.Galpon = [];

    $scope.buscarXGalpon = function () {
        //alert($scope.galpon.IdGprGalpon);
        $http({
            method: 'GET',
            url: '../Gestion/BuscarTemporadaXGalpon/' + $scope.Galpon.IdGprGalpon,
            //data: $scope.Temporada
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.temporadasDatos = response.data.Data;
            } catch (err) {
            }

            $scope.limpiar();
            $scope.Temporada.IdGprGalpon = $scope.Galpon.IdGprGalpon;
            //alert("Componente Electrónico agregado");
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    // Reset product details
    $scope.limpiar = function () {
        $scope.Temporada.IdGprTemporada = '';
        $scope.Temporada.Descripcion = '';
        $scope.Temporada.CantidadAves = '';
        $scope.Temporada.FechaInicio = '';
        $scope.Temporada.CostoInicial = '';
        $scope.Temporada.FechaFin = '';
        $scope.Temporada.TotalVenta = '';
        //$scope.Temporada.IdGprGalpon = '';
        $scope.Temporada.Estado = '';
    }

    //Add New Item
    $scope.guardar = function () {
        //$scope.estadoavesDatos[0].CantidadAves = $scope.Temporada.CantidadAves;
        if ($scope.Temporada.Descripcion != "" && $scope.Temporada.CantidadAves != "" && $scope.Temporada.FechaInicio != "" && $scope.Temporada.CostoInicial != "") {
            $http({
                method: 'POST',
                url: '../Gestion/PostTemporada',
                data: $scope.Temporada
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

                if (response.data.StatusCode != 200 && response.data.StatusCode != 201) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.temporadasDatos.push(response.data.Data);
                    $scope.limpiar();
                    alert("Temporada agregada.");
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

    // Edit product details
    $scope.editar = function (data) {
        $scope.Temporada = {
            IdGprTemporada: data.IdGprTemporada,
            Descripcion: data.Descripcion,
            CantidadAves: data.CantidadAves,
            FechaInicio: data.FechaInicio,
            CostoInicial: data.CostoInicial,
            FechaFin: data.FechaFin,
            TotalVenta: data.TotalVenta,
            IdGprGalpon: data.IdGprGalpon,
            Estado: data.Estado,
        };
        $scope.pesoXTemporada();
        $scope.estadoXTemporada();
    }

    // Cancel product details
    $scope.cancelar = function () {
        $scope.limpiar();
    }

    // Update product details
    $scope.modificar = function () {
        if ($scope.Temporada.Descripcion != "" && $scope.Temporada.CantidadAves != "" && $scope.Temporada.FechaInicio != "" && $scope.Temporada.CostoInicial != ""
            && $scope.Temporada.FechaFin != 'undefined' && $scope.Temporada.TotalVenta != null) {
            $http({
                method: 'POST',
                url: '../Gestion/PutTemporada/' + $scope.Temporada.IdGprTemporada,
                data: $scope.Temporada
            }).then(function successCallback(response) {
                //debugger;

                if (response.data.StatusCode != 200) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.temporadasDatos = response.data.Data;;
                    $scope.limpiar();
                    alert("Temporada actualizada.");
                }
            }, function errorCallback(response) {
                alert("Error : " + response.data);
            });
        }
        else {
            alert('Llene todos los campos.');
        }
    };

    $scope.pesostemporadaDatos = null;
    $scope.estadoavesDatos = null;

    $scope.tipoestadoavesDatos = null;

    TemporadasServicio.GetTipoEstadoAves().then(function (d) {
        $scope.tipoestadoavesDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    //$scope.config = {
    //    itemsPerPage: 5,
    //    fillLastPage: true
    //};

    $scope.PesoPromedio = {
        IdGprPesoPromedioAve: '',
        Peso: '',
        Fecha: '',
        IdGprTemporada: '',
        Estado: '',
    };

    $scope.limpiarPeso = function () {
        $scope.PesoPromedio.IdGprPesoPromedioAve = '';
        $scope.PesoPromedio.Peso = '';
        $scope.PesoPromedio.Fecha = '';
    }

    $scope.detalleTemporada = function () {
        if ($scope.data.detalle == "Peso") {
            $scope.pesoXTemporada();
        } else if ($scope.data.detalle == "Estado") {
        }
    }

    $scope.pesoXTemporada = function () {
        //alert($scope.galpon.IdGprGalpon);
        $http({
            method: 'GET',
            url: '../Gestion/PesoXTemporada/' + $scope.Temporada.IdGprTemporada,
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.pesostemporadaDatos = response.data.Data;
            } catch (err) {
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.estadoXTemporada = function () {
        //alert($scope.galpon.IdGprGalpon);
        $http({
            method: 'GET',
            url: '../Gestion/EstadoXTemporada/' + $scope.Temporada.IdGprTemporada,
            //data: $scope.Temporada
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.estadoavesDatos = response.data.Data;
                $scope.sumarCantidadAves();
            } catch (err) {
            }

            //$scope.limpiar();
            //$scope.Temporada.IdGprGalpon = $scope.Galpon.IdGprGalpon;
            //alert("Componente Electrónico agregado");
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.guardarPeso = function () {
        if ($scope.PesoPromedio.Peso != "" && $scope.PesoPromedio.Fecha != "") {
            $scope.PesoPromedio.IdGprTemporada = $scope.Temporada.IdGprTemporada;

            $http({
                method: 'POST',
                url: '../Gestion/PostPesoPromedioAve',
                data: $scope.PesoPromedio
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

                if (response.data.StatusCode != 200 && response.data.StatusCode != 201) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.pesostemporadaDatos.push(response.data.Data);
                    $scope.limpiarPeso();
                    alert("Peso agregado.");
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

    $scope.guardarEstadoAves = function () {
        $http({
            method: 'POST',
            url: '../Gestion/ProcesarEstadoAves',
            data: $scope.estadoavesDatos
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            //$scope.pesostemporadaDatos.push(response.data);
            //$scope.limpiarPeso();

            if (response.data.StatusCode != 200 && response.data.StatusCode != 201 && response.data.StatusCode != 202) {
                alert(response.data.Data.Message + ". Revise la consola para más información.");
                console.log(response.data.Data);
            } else {
                $scope.estadoXTemporada();
                alert("Estados de las aves modificados.");
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data);
        });
    };

    $scope.cantidadAves = 0;

    $scope.sumarCantidadAves = function () {
        $scope.cantidadAves = 0;

        for (var i = 0; i < $scope.estadoavesDatos.length; i++) {
            $scope.cantidadAves += $scope.estadoavesDatos[i].CantidadAves;
        }
    };
});

// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.

app.factory('TemporadasServicio', function ($http) {
    var fac = {};
    //fac.GetTemporadas = function () {
    //    return $http.get('../api/Gpr_Temporada');
    //};
    fac.GetGalpones = function () {
        return $http.get('../Gestion/GetGalpon');
    };
    //fac.GetTipoTemporadas = function () {
    //    return $http.get('../api/Gpr_Tipo_Temporada');
    //};
    fac.GetTipoEstadoAves = function () {
        return $http.get('../Gestion/GetTipoEstadoAve');
    };
    return fac;
});

//app.controller('ModalInstanceCtrl', function ($scope, $http, $uibModalInstance, IdTemporada, TemporadasServicio) {
//    $scope.data = {
//                detalle: null
//            };

//            $scope.pesostemporadaDatos = null;
//            $scope.estadoavesDatos = null;

//            $scope.tipoestadoavesDatos = null;

//            TemporadasServicio.GetTipoEstadoAves().then(function (d) {
//                $scope.tipoestadoavesDatos = d.data; // Success
//            }, function () {
//                alert('Error Occured !!!'); // Failed
//            });

//            $scope.config = {
//                itemsPerPage: 5,
//                fillLastPage: true
//            };

//            $scope.PesoPromedio = {
//                IdGprPesoPromedioAve: '',
//                Peso: '',
//                Fecha: '',
//                IdGprTemporada: '',
//                Estado: '',
//            };

//            $scope.limpiarPeso = function() {
//                $scope.IdGprPesoPromedioAve = '';
//                $scope.Peso = '';
//                $scope.Fecha = '';
//            }

//            $scope.cancel = function () {
//                $uibModalInstance.dismiss('cancel');
//            };

//            $scope.detalleTemporada = function(){
//                if ($scope.data.detalle == "Peso") {
//                    $scope.pesoXTemporada();
//                } else if ($scope.data.detalle == "Estado") {
//                }
//            }

//            $scope.pesoXTemporada = function () {
//                //alert($scope.galpon.IdGprGalpon);
//                $http({
//                    method: 'GET',
//                    url: '../api/Gpr_Peso_Promedio_Ave/Temporada/' + IdTemporada,
//                }).then(function successCallback(response) {
//                    // this callback will be called asynchronously
//                    // when the response is available
//                    try {
//                        $scope.pesostemporadaDatos = response.data;
//                    } catch (err) {
//                    }
//                }, function errorCallback(response) {
//                    // called asynchronously if an error occurs
//                    // or server returns response with an error status.
//                    alert("Error : " + response.data.ExceptionMessage);
//                });
//            };

//            $scope.estadoXTemporada = function () {
//                //alert($scope.galpon.IdGprGalpon);
//                $http({
//                    method: 'GET',
//                    url: '../api/Gpr_Estado_Ave/Temporada/' + IdTemporada,
//                    //data: $scope.Temporada
//                }).then(function successCallback(response) {
//                    // this callback will be called asynchronously
//                    // when the response is available
//                    try {
//                        $scope.estadoavesDatos = response.data;
//                    } catch (err) {
//                    }

//                    //$scope.limpiar();
//                    //$scope.Temporada.IdGprGalpon = $scope.Galpon.IdGprGalpon;
//                    //alert("Componente Electrónico agregado");
//                }, function errorCallback(response) {
//                    // called asynchronously if an error occurs
//                    // or server returns response with an error status.
//                    alert("Error : " + response.data.ExceptionMessage);
//                });
//            };

//            $scope.guardarPeso = function () {
//                if ($scope.PesoPromedio.Peso != "" && $scope.PesoPromedio.Fecha != "") {
//                    $scope.PesoPromedio.IdGprTemporada = IdTemporada;

//                    $http({
//                        method: 'POST',
//                        url: '../api/Gpr_Peso_Promedio_Ave',
//                        data: $scope.PesoPromedio
//                    }).then(function successCallback(response) {
//                        // this callback will be called asynchronously
//                        // when the response is available
//                        $scope.pesostemporadaDatos.push(response.data);
//                        $scope.limpiarPeso();
//                        alert("Peso agregado.");
//                    }, function errorCallback(response) {
//                        // called asynchronously if an error occurs
//                        // or server returns response with an error status.
//                        alert("Error : " + response.data);
//                    });
//                }
//                else {
//                    alert('Llene todos los campos.');
//                }
//            };
//});

//var ModalInstanceCtrl = function ($scope, $uibModalInstance, IdTemporada, TemporadasServicio) {
//    $scope.data = {
//        detalle: null
//    };

//    $scope.pesostemporadaDatos = null;
//    $scope.estadoavesDatos = null;

//    $scope.tipoestadoavesDatos = null;

//    TemporadasServicio.GetTipoEstadoAves().then(function (d) {
//        $scope.tipoestadoavesDatos = d.data; // Success
//    }, function () {
//        alert('Error Occured !!!'); // Failed
//    });

//    $scope.PesoPromedio = {
//        IdGprPesoPromedioAve: '',
//        Peso: '',
//        Fecha: '',
//        IdGprTemporada: '',
//        Estado: '',
//    };

//    $scope.cancel = function () {
//        $uibModalInstance.dismiss('cancel');
//    };

//    $scope.pesoXTemporada = function () {
//        //alert($scope.galpon.IdGprGalpon);
//        $http({
//            method: 'GET',
//            url: '../api/Gpr_Peso_Promedio_Ave/Temporada/' + IdTemporada,
//        }).then(function successCallback(response) {
//            // this callback will be called asynchronously
//            // when the response is available
//            try {
//                $scope.pesostemporadaDatos = response.data;
//            } catch (err) {
//            }
//        }, function errorCallback(response) {
//            // called asynchronously if an error occurs
//            // or server returns response with an error status.
//            alert("Error : " + response.data.ExceptionMessage);
//        });
//    };

//    $scope.estadoXTemporada = function () {
//        //alert($scope.galpon.IdGprGalpon);
//        $http({
//            method: 'GET',
//            url: '../api/Gpr_Estado_Ave/Temporada/' + IdTemporada,
//            //data: $scope.Temporada
//        }).then(function successCallback(response) {
//            // this callback will be called asynchronously
//            // when the response is available
//            try {
//                $scope.estadoavesDatos = response.data;
//            } catch (err) {
//            }

//            //$scope.limpiar();
//            //$scope.Temporada.IdGprGalpon = $scope.Galpon.IdGprGalpon;
//            //alert("Componente Electrónico agregado");
//        }, function errorCallback(response) {
//            // called asynchronously if an error occurs
//            // or server returns response with an error status.
//            alert("Error : " + response.data.ExceptionMessage);
//        });
//    };

//    $scope.guardar = function () {
//        if ($scope.PesoPromedio.Peso != "" && $scope.PesoPromedio.Fecha != "") {
//            $scope.PesoPromedio.IdGprTemporada = IdTemporada;

//            $http({
//                method: 'POST',
//                url: '../api/Gpr_Peso_Promedio_Ave',
//                data: $scope.PesoPromedio
//            }).then(function successCallback(response) {
//                // this callback will be called asynchronously
//                // when the response is available
//                $scope.pesostemporadaDatos.push(response.data);
//                $scope.limpiar();
//                alert("Temporada agregada.");
//            }, function errorCallback(response) {
//                // called asynchronously if an error occurs
//                // or server returns response with an error status.
//                alert("Error : " + response.data);
//            });
//        }
//        else {
//            alert('Llene todos los campos.');
//        }
//    };
//};