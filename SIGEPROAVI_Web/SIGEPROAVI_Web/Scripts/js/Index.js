// Defining angularjs module
var app = angular.module('indexModulo', ["angular-table", "moment-picker", "chart.js"]);

// Defining angularjs Controller and injecting TemporadasServicio
app.controller('indexCtrl', function ($scope, $http, $filter, TemporadasServicio) {
    $scope.temporadasDatos = null;
    //// Fetching records from the factory created at the bottom of the script file
    //TemporadasServicio.GetTemporadas().then(function (d) {
    //    $scope.temporadasDatos = d.data.Data; // Success
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

    $scope.mediciondiariaDatos = null;
    $scope.medicionhorariaTemperaturaDatos = null;
    $scope.medicionhorariaHumedadDatos = null;

    $scope.fechaMedicionHorariaTemperatura = "";
    $scope.fechaMedicionHorariaHumedad = "";

    $scope.mediciondiariaTemperaturaDatos = null;

    //$scope.MedcicionDiaria = {
    //    Fecha: '',
    //};

    $scope.config = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    //$scope.Temporada = {
    //    IdGprTemporada: '',
    //    Descripcion: '',
    //    CantidadAves: '',
    //    FechaInicio: '',
    //    CostoInicial: '',
    //    FechaFin: '',
    //    TotalVenta: '',
    //    IdGprGalpon: '',
    //    Estado: '',
    //};

    $scope.Galpon = [];

    $scope.buscarTemporadaXGalpon = function () {
        //alert($scope.galpon.IdGprGalpon);
        $http({
            method: 'GET',
            url: '../Home/BuscarTemporadaXGalpon/' + $scope.Galpon.IdGprGalpon,
            //data: $scope.Temporada
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.temporadasDatos = response.data.Data;

                // $scope.buscarMedicionDiariaXTemporada();
            } catch (err) {
            }

            //$scope.limpiar();
            $scope.Temporada.IdGprGalpon = $scope.Galpon.IdGprGalpon;
            //alert("Componente Electrónico agregado");
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.buscarMedicionDiariaXTemporada = function () {
        //alert($scope.galpon.IdGprGalpon);
        $http({
            method: 'GET',
            url: '../Home/BuscarMedicionDiariaXTemporada/' + $scope.Temporada.IdGprTemporada,
            //data: $scope.Temporada
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.mediciondiariaDatos = response.data.Data;

                $scope.parsearMedicionTemperaturaDiaria();
                $scope.parsearMedicionHumedadDiaria();
                // $scope.buscarMedicionHorariaXTemporada();
            } catch (err) {
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.buscarMedicionHorariaXTemporada = function (data) {
        var fecha = moment(data.Fecha).format('DD-MM-YYYY');

        $scope.fechaMedicionHorariaTemperatura = fecha;

        $http({
            method: 'GET',
            url: '../Home/BuscarMedicionHorariaXTemporada/' + $scope.Galpon.IdGprGalpon + '/' + fecha + '/9',
            //data: $scope.Temporada
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.medicionhorariaTemperaturaDatos = response.data.Data;

                $scope.parsearMedicionTemperaturaHoraria();
            } catch (err) {
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.buscarMedicionHorariaHumedadXTemporada = function (data) {
        var fecha = moment(data.Fecha).format('DD-MM-YYYY');

        $scope.fechaMedicionHorariaHumedad = fecha;

        $http({
            method: 'GET',
            url: '../Home/BuscarMedicionHorariaXTemporada/' + $scope.Galpon.IdGprGalpon + '/' + fecha + '/10',
            //data: $scope.Temporada
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.medicionhorariaHumedadDatos = response.data.Data;

                $scope.parsearMedicionHumedadHoraria();
            } catch (err) {
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.parsearMedicionTemperaturaDiaria = function () {
        $scope.labelsTemperaturaDiaria = [];
        $scope.dataTemperaturaDiaria = [];
        $scope.mediciondiariaTemperaturaDatos = [];

        for (var i = 0; i < $scope.mediciondiariaDatos.length; i++) {
            if ($scope.mediciondiariaDatos[i].IdGprServicio == 9) {
                $scope.labelsTemperaturaDiaria.push($scope.mediciondiariaDatos[i].Fecha);
                $scope.dataTemperaturaDiaria.push($scope.mediciondiariaDatos[i].Medicion);

                $scope.mediciondiariaTemperaturaDatos.push($scope.mediciondiariaDatos[i]);
            }
        }
    }

    $scope.parsearMedicionTemperaturaHoraria = function () {
        $scope.labelsTemperaturaHoraria = [];
        $scope.dataTemperaturaHoraria = [];

        for (var i = 0; i < $scope.medicionhorariaTemperaturaDatos.length; i++) {
            $scope.labelsTemperaturaHoraria.push($scope.medicionhorariaTemperaturaDatos[i].Hora);
            $scope.dataTemperaturaHoraria.push($scope.medicionhorariaTemperaturaDatos[i].Medicion);
        }
    }

    /*Prueba ng-chart*/
    $scope.labelsTemperaturaDiaria = [];
    //$scope.series = ['Series A'];
    $scope.dataTemperaturaDiaria = [];
    //$scope.onClick = function (points, evt) {
    //    console.log(points, evt);
    //};
    //$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.optionsTemperaturaDiario = {
        scales: {
            yAxes: [
              {
                  //id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 17,
                      suggestedMax: 27,
                  },
              }
            ],
            xAxes: [{
                type: 'time',
                position: 'bottom',
                time: {
                    tooltipFormat: "DD-MM-YYYY",
                    displayFormats: {
                        'millisecond': 'MMM DD',
                        'second': 'MMM DD',
                        'minute': 'MMM DD',
                        'hour': 'MMM DD',
                        'day': 'MMM DD',
                        'week': 'MMM DD',
                        'month': 'MMM DD',
                        'quarter': 'MMM DD',
                        'year': 'MMM DD',
                    },
                    unit: 'day',
                },
            }],
        }
    };

    $scope.optionsTemperaturaHorario = {
        scales: {
            yAxes: [
              {
                  //id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 17,
                      suggestedMax: 27,
                  },
              }
            ],
            xAxes: [{
                //type: 'linear',
                position: 'bottom',
            }],
        }
    };

    $scope.labelsTemperaturaHoraria = [];
    $scope.dataTemperaturaHoraria = [];

    //HUMEDAD
    $scope.mediciondiariaHumedadDatos = [];

    $scope.labelsHumedadDiaria = [];
    $scope.dataHumedadHoraria = [];

    $scope.labelsHumedadHoraria = [];
    $scope.dataHumedadHoraria = [];

    $scope.optionsHumedadDiaria = {
        scales: {
            yAxes: [
              {
                  //id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 50,
                      suggestedMax: 60,
                  },
              }
            ],
            xAxes: [{
                type: 'time',
                position: 'bottom',
                time: {
                    tooltipFormat: "DD-MM-YYYY",
                    displayFormats: {
                        'millisecond': 'MMM DD',
                        'second': 'MMM DD',
                        'minute': 'MMM DD',
                        'hour': 'MMM DD',
                        'day': 'MMM DD',
                        'week': 'MMM DD',
                        'month': 'MMM DD',
                        'quarter': 'MMM DD',
                        'year': 'MMM DD',
                    },
                    unit: 'day',
                },
            }],
        }
    };

    $scope.optionsHumedadHoraria = {
        scales: {
            yAxes: [
              {
                  //id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 50,
                      suggestedMax: 60,
                  },
              }
            ],
            xAxes: [{
                //type: 'linear',
                position: 'bottom',
            }],
        }
    };

    $scope.parsearMedicionHumedadDiaria = function () {
        $scope.labelsHumedadDiaria = [];
        $scope.dataHumedadDiaria = [];
        $scope.mediciondiariaHumedadDatos = [];

        for (var i = 0; i < $scope.mediciondiariaDatos.length; i++) {
            if ($scope.mediciondiariaDatos[i].IdGprServicio == 10) {
                $scope.labelsHumedadDiaria.push($scope.mediciondiariaDatos[i].Fecha);
                $scope.dataHumedadDiaria.push($scope.mediciondiariaDatos[i].Medicion);

                $scope.mediciondiariaHumedadDatos.push($scope.mediciondiariaDatos[i]);
            }
        }
    }

    $scope.parsearMedicionHumedadHoraria = function () {
        $scope.labelsHumedadHoraria = [];
        $scope.dataHumedadHoraria = [];

        for (var i = 0; i < $scope.medicionhorariaHumedadDatos.length; i++) {
            $scope.labelsHumedadHoraria.push($scope.medicionhorariaHumedadDatos[i].Hora);
            $scope.dataHumedadHoraria.push($scope.medicionhorariaHumedadDatos[i].Medicion);
        }
    }
});

// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.

app.factory('TemporadasServicio', function ($http) {
    var fac = {};
    //fac.GetTemporadas = function () {
    //    return $http.get('../api/Gpr_Temporada');
    //};
    fac.GetGalpones = function () {
        return $http.get('../Home/GetGalpon');
    };
    //fac.GetTipoTemporadas = function () {
    //    return $http.get('../api/Gpr_Tipo_Temporada');
    //};
    fac.GetTipoEstadoAves = function () {
        return $http.get('../Home/GetTipoEstadoAve');
    };
    return fac;
});