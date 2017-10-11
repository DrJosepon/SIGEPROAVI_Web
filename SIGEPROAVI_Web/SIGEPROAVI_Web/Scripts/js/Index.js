// Defining angularjs module
var app = angular.module('indexModulo', ["angular-table", "moment-picker", "chart.js"]);

// Defining angularjs Controller and injecting TemporadasServicio
app.controller('indexCtrl', function ($scope, $http, $filter, TemporadasServicio) {
    $scope.temporadasDatos = null;

    $scope.galponesDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    TemporadasServicio.GetGalpones().then(function (d) {
        $scope.galponesDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.mediciondiariaDatos = null;
    $scope.gastodiarioDatos = {};

    $scope.medicionhorariaTemperaturaDatos = null;
    $scope.medicionhorariaHumedadDatos = null;
    $scope.medicionhorariaCorrienteDatos = null;
    $scope.medicionhorariaAlimentoDatos = null;
    $scope.medicionhorariaAguaDatos = null;

    $scope.fechaMedicionHorariaTemperatura = "";
    $scope.fechaMedicionHorariaHumedad = "";
    $scope.fechaMedicionHorariaCorriente = "";
    $scope.fechaMedicionHorariaAlimento = "";
    $scope.fechaMedicionHorariaAgua = "";

    $scope.configTemperatura = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    $scope.configHumedad = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    $scope.configCorriente = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    $scope.configAlimento = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    $scope.configAgua = {
        itemsPerPage: 5,
        fillLastPage: true
    };

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
            //$scope.Temporada.IdGprGalpon = $scope.Galpon.IdGprGalpon;
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
                $scope.parsearMedicionCorrienteDiaria();
                $scope.parsearMedicionAlimentoDiaria();
                $scope.parsearMedicionAguaDiaria();

                $scope.pesoXTemporada();
                $scope.estadoXTemporada();
                // $scope.buscarMedicionHorariaXTemporada();
            } catch (err) {
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.buscarGastoDiarioXTemporada = function () {
        //alert($scope.galpon.IdGprGalpon);
        $http({
            method: 'GET',
            url: '../Home/BuscarGastoDiarioXTemporada/' + $scope.Temporada.IdGprTemporada,
            //data: $scope.Temporada
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.gastodiarioDatos = response.data.Data;

                $scope.parsearMedicionGastoCorrienteDiaria();
                $scope.parsearMedicionGastoAlimentoDiaria();
                $scope.parsearMedicionGastoAguaDiaria();
                // $scope.buscarMedicionHorariaXTemporada();
            } catch (err) {
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.buscarMedicionHorariaTemperaturaXTemporada = function (data) {
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

    $scope.buscarMedicionHorariaCorrienteXTemporada = function (data) {
        var fecha = moment(data.Fecha).format('DD-MM-YYYY');

        $scope.fechaMedicionHorariaCorriente = fecha;

        $http({
            method: 'GET',
            url: '../Home/BuscarMedicionHorariaXTemporada/' + $scope.Galpon.IdGprGalpon + '/' + fecha + '/6',
            //data: $scope.Temporada
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.medicionhorariaCorrienteDatos = response.data.Data;

                $scope.parsearMedicionCorrienteHoraria();
            } catch (err) {
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.buscarMedicionHorariaAlimentoXTemporada = function (data) {
        var fecha = moment(data.Fecha).format('DD-MM-YYYY');

        $scope.fechaMedicionHorariaAlimento = fecha;

        $http({
            method: 'GET',
            url: '../Home/BuscarMedicionHorariaXTemporada/' + $scope.Galpon.IdGprGalpon + '/' + fecha + '/7',
            //data: $scope.Temporada
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.medicionhorariaAlimentoDatos = response.data.Data;

                $scope.parsearMedicionAlimentoHoraria();
            } catch (err) {
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.buscarMedicionHorariaAguaXTemporada = function (data) {
        var fecha = moment(data.Fecha).format('DD-MM-YYYY');

        $scope.fechaMedicionHorariaAgua = fecha;

        $http({
            method: 'GET',
            url: '../Home/BuscarMedicionHorariaXTemporada/' + $scope.Galpon.IdGprGalpon + '/' + fecha + '/8',
            //data: $scope.Temporada
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.medicionhorariaAguaDatos = response.data.Data;

                $scope.parsearMedicionAguaHoraria();
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
    //TEMPERATURA
    $scope.mediciondiariaTemperaturaDatos = [];

    $scope.labelsTemperaturaDiaria = [];
    $scope.dataTemperaturaDiaria = [];

    $scope.optionsTemperaturaDiario = {
        scales: {
            yAxes: [
              {
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

    //CORRIENTE
    $scope.mediciondiariaCorrienteDatos = [];

    $scope.labelsCorrienteDiaria = [];
    $scope.dataCorrienteDiaria = [];

    $scope.labelsCorrienteHoraria = [];
    $scope.dataCorrienteHoraria = [];

    $scope.optionsCorrienteDiaria = {
        scales: {
            yAxes: [
              {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 2,
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

    $scope.optionsCorrienteHoraria = {
        scales: {
            yAxes: [
              {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 2,
                  },
              }
            ],
            xAxes: [{
                position: 'bottom',
            }],
        }
    };

    $scope.parsearMedicionCorrienteDiaria = function () {
        $scope.labelsCorrienteDiaria = [];
        $scope.dataCorrienteDiaria = [];
        $scope.mediciondiariaCorrienteDatos = [];

        for (var i = 0; i < $scope.mediciondiariaDatos.length; i++) {
            if ($scope.mediciondiariaDatos[i].IdGprServicio == 6) {
                $scope.labelsCorrienteDiaria.push($scope.mediciondiariaDatos[i].Fecha);
                $scope.dataCorrienteDiaria.push($scope.mediciondiariaDatos[i].Medicion);

                $scope.mediciondiariaCorrienteDatos.push($scope.mediciondiariaDatos[i]);
            }
        }
    }

    $scope.parsearMedicionCorrienteHoraria = function () {
        $scope.labelsCorrienteHoraria = [];
        $scope.dataCorrienteHoraria = [];

        for (var i = 0; i < $scope.medicionhorariaCorrienteDatos.length; i++) {
            $scope.labelsCorrienteHoraria.push($scope.medicionhorariaCorrienteDatos[i].Hora);
            $scope.dataCorrienteHoraria.push($scope.medicionhorariaCorrienteDatos[i].Medicion);
        }
    }

    //CORRIENTE GASTO

    $scope.gastodiarioCorrienteDatos = [];
    $scope.labelsGastoCorrienteDiario = [];
    $scope.dataGastoCorrienteDiaria = [];

    $scope.optionsGastoCorrienteDiaria = {
        scales: {
            yAxes: [
              {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 2,
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

    $scope.parsearMedicionGastoCorrienteDiaria = function () {
        $scope.labelsGastoCorrienteDiario = [];
        $scope.dataGastoCorrienteDiaria = [];
        $scope.gastodiarioCorrienteDatos = [];

        for (var i = 0; i < $scope.gastodiarioDatos.length; i++) {
            if ($scope.gastodiarioDatos[i].IdGprServicio == 6) {
                $scope.labelsGastoCorrienteDiario.push($scope.gastodiarioDatos[i].Fecha);
                $scope.dataGastoCorrienteDiaria.push($scope.gastodiarioDatos[i].Gasto);

                $scope.gastodiarioCorrienteDatos.push($scope.gastodiarioDatos[i]);
            }
        }
    }

    //ALIMENTO
    $scope.mediciondiariaAlimentoDatos = [];

    $scope.labelsAlimentoDiaria = [];
    $scope.dataAlimentoDiaria = [];

    $scope.labelsAlimentoHoraria = [];
    $scope.dataAlimentoHoraria = [];

    $scope.optionsAlimentoDiaria = {
        scales: {
            yAxes: [
              {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 20,
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

    $scope.optionsAlimentoHoraria = {
        scales: {
            yAxes: [
              {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 20,
                  },
              }
            ],
            xAxes: [{
                position: 'bottom',
            }],
        }
    };

    $scope.parsearMedicionAlimentoDiaria = function () {
        $scope.labelsAlimentoDiaria = [];
        $scope.dataAlimentoDiaria = [];
        $scope.mediciondiariaAlimentoDatos = [];

        for (var i = 0; i < $scope.mediciondiariaDatos.length; i++) {
            if ($scope.mediciondiariaDatos[i].IdGprServicio == 7) {
                $scope.labelsAlimentoDiaria.push($scope.mediciondiariaDatos[i].Fecha);
                $scope.dataAlimentoDiaria.push($scope.mediciondiariaDatos[i].Medicion);

                $scope.mediciondiariaAlimentoDatos.push($scope.mediciondiariaDatos[i]);
            }
        }
    }

    $scope.parsearMedicionAlimentoHoraria = function () {
        $scope.labelsAlimentoHoraria = [];
        $scope.dataAlimentoHoraria = [];

        for (var i = 0; i < $scope.medicionhorariaAlimentoDatos.length; i++) {
            $scope.labelsAlimentoHoraria.push($scope.medicionhorariaAlimentoDatos[i].Hora);
            $scope.dataAlimentoHoraria.push($scope.medicionhorariaAlimentoDatos[i].Medicion);
        }
    }

    //ALIMENTO GASTO

    $scope.gastodiarioAlimentoDatos = [];
    $scope.labelsGastoAlimentoDiario = [];
    $scope.dataGastoAlimentoDiaria = [];

    $scope.optionsGastoAlimentoDiaria = {
        scales: {
            yAxes: [
              {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 10,
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

    $scope.parsearMedicionGastoAlimentoDiaria = function () {
        $scope.labelsGastoAlimentoDiario = [];
        $scope.dataGastoAlimentoDiaria = [];
        $scope.gastodiarioAlimentoDatos = [];

        for (var i = 0; i < $scope.gastodiarioDatos.length; i++) {
            if ($scope.gastodiarioDatos[i].IdGprServicio == 7) {
                $scope.labelsGastoAlimentoDiario.push($scope.gastodiarioDatos[i].Fecha);
                $scope.dataGastoAlimentoDiaria.push($scope.gastodiarioDatos[i].Gasto);

                $scope.gastodiarioAlimentoDatos.push($scope.gastodiarioDatos[i]);
            }
        }
    }

    //AGUA
    $scope.mediciondiariaAguaDatos = [];

    $scope.labelsAguaDiaria = [];
    $scope.dataAguaDiaria = [];

    $scope.labelsAguaHoraria = [];
    $scope.dataAguaHoraria = [];

    $scope.optionsAguaDiaria = {
        scales: {
            yAxes: [
              {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 20,
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

    $scope.optionsAguaHoraria = {
        scales: {
            yAxes: [
              {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 20,
                  },
              }
            ],
            xAxes: [{
                position: 'bottom',
            }],
        }
    };

    $scope.parsearMedicionAguaDiaria = function () {
        $scope.labelsAguaDiaria = [];
        $scope.dataAguaDiaria = [];
        $scope.mediciondiariaAguaDatos = [];

        for (var i = 0; i < $scope.mediciondiariaDatos.length; i++) {
            if ($scope.mediciondiariaDatos[i].IdGprServicio == 8) {
                $scope.labelsAguaDiaria.push($scope.mediciondiariaDatos[i].Fecha);
                $scope.dataAguaDiaria.push($scope.mediciondiariaDatos[i].Medicion);

                $scope.mediciondiariaAguaDatos.push($scope.mediciondiariaDatos[i]);
            }
        }
    }

    $scope.parsearMedicionAguaHoraria = function () {
        $scope.labelsAguaHoraria = [];
        $scope.dataAguaHoraria = [];

        for (var i = 0; i < $scope.medicionhorariaAguaDatos.length; i++) {
            $scope.labelsAguaHoraria.push($scope.medicionhorariaAguaDatos[i].Hora);
            $scope.dataAguaHoraria.push($scope.medicionhorariaAguaDatos[i].Medicion);
        }
    }

    //AGUA GASTO

    $scope.gastodiarioAguaDatos = [];
    $scope.labelsGastoAguaDiario = [];
    $scope.dataGastoAguaDiaria = [];

    $scope.optionsGastoAguaDiaria = {
        scales: {
            yAxes: [
              {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 1,
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

    $scope.parsearMedicionGastoAguaDiaria = function () {
        $scope.labelsGastoAguaDiario = [];
        $scope.dataGastoAguaDiaria = [];
        $scope.gastodiarioAguaDatos = [];

        for (var i = 0; i < $scope.gastodiarioDatos.length; i++) {
            if ($scope.gastodiarioDatos[i].IdGprServicio == 8) {
                $scope.labelsGastoAguaDiario.push($scope.gastodiarioDatos[i].Fecha);
                $scope.dataGastoAguaDiaria.push($scope.gastodiarioDatos[i].Gasto);

                $scope.gastodiarioAguaDatos.push($scope.gastodiarioDatos[i]);
            }
        }
    }

    //EVOLUCION DEL PESO
    $scope.pesostemporadaDatos = [];

    $scope.labelsPesoDiaria = [];
    $scope.dataPesoDiaria = [];

    $scope.optionsPesoDiaria = {
        scales: {
            yAxes: [
              {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 2,
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
                $scope.parsearMedicionPesoDiaria();
            } catch (err) {
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.parsearMedicionPesoDiaria = function () {
        $scope.labelsPesoDiaria = [];
        $scope.dataPesoDiaria = [];
        $scope.mediciondiariaPesoDatos = [];

        for (var i = 0; i < $scope.pesostemporadaDatos.length; i++) {
            $scope.labelsPesoDiaria.push($scope.pesostemporadaDatos[i].Fecha);
            $scope.dataPesoDiaria.push($scope.pesostemporadaDatos[i].Peso);

            $scope.mediciondiariaPesoDatos.push($scope.pesostemporadaDatos[i]);
        }
    }

    //EVOLUCION DEL ESTADO
    $scope.estadostemporadaDatos = [];

    $scope.labelsEstadoDiaria = [];
    $scope.dataEstadoDiaria = [];

    $scope.fechaEstado = [];
    $scope.fechasEstado = [];

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
                $scope.estadostemporadaDatos = response.data.Data;
            } catch (err) {
            }

            $scope.llenarFechas();
            //$scope.parsearEstadoDiaria();
            //$scope.limpiar();
            //$scope.Temporada.IdGprGalpon = $scope.Galpon.IdGprGalpon;
            //alert("Componente Electrónico agregado");
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

    $scope.llenarFechas = function () {
        $scope.fechasEstado = [];

        for (var i = 0; i < $scope.estadostemporadaDatos.length; i++) {
            if ($scope.estadostemporadaDatos[i].IdGprTipoEstadoAve == 1)
                $scope.fechasEstado.push(moment($scope.estadostemporadaDatos[i].Fecha).format("YYYY-MM-DD"));
        }
    }

    $scope.parsearEstadoDiaria = function () {
        $scope.labelsEstadoDiaria = [];
        $scope.dataEstadoDiaria = [];
        $scope.mediciondiariaEstadoDatos = [];

        for (var i = 0; i < $scope.estadostemporadaDatos.length; i++) {
            if ($scope.fechaEstado == moment($scope.estadostemporadaDatos[i].Fecha).format("YYYY-MM-DD")) {
                $scope.labelsEstadoDiaria.push($scope.estadostemporadaDatos[i].DescripcionEstadoAve);
                $scope.dataEstadoDiaria.push($scope.estadostemporadaDatos[i].CantidadAves);

                $scope.mediciondiariaEstadoDatos.push($scope.estadostemporadaDatos[i]);
            }
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