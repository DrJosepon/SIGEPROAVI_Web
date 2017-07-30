﻿// Defining angularjs module
var app = angular.module('tiemporealModulo', ['angularPaho']);

// Defining angularjs Controller and injecting TiempoRealServicio
app.controller('tiemporealCtrl', function ($scope, $http, $filter, TiempoRealServicio, MqttClient, $interval) {
    $scope.componenteDatos = null;
    //// Fetching records from the factory created at the bottom of the script file
    //TiempoRealServicio.GetTiempoReal().then(function (d) {
    //    $scope.temporadasDatos = d.data.Data; // Success
    //}, function () {
    //    alert('Error Occured !!!'); // Failed
    //});

    $scope.galponesDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    TiempoRealServicio.GetGalpones().then(function (d) {
        $scope.galponesDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.config = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    /*Configuracion de MQTT*/
    //var ip = "192.168.1.36";
    var ip = "sigeproavitest.pagekite.me";
    //var port = "1884";
    var port = "80";
    var id = (Math.random() * 100000).toString(); //"tesuto";
    /***/

    MqttClient.init(ip, port, id);
    MqttClient.connect({ onSuccess: successCallback });

    $scope.buscarComponentesXGalpon = function () {
        $scope.rechazarTopics();

        //alert($scope.galpon.IdGprGalpon);
        $http({
            method: 'GET',
            url: '../Home/BuscarComponenteElectronicoXGalpon/' + $scope.Galpon.IdGprGalpon,
            //data: $scope.Temporada
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            try {
                $scope.componenteDatos = response.data.Data;

                $scope.suscribirTopics();
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

    $scope.rechazarTopics = function () {
        //MqttClient.unsubscribe();
        try {
            for (var i = 0; i < $scope.componenteDatos.length; i++) {
                MqttClient.unsubscribe($scope.componenteDatos[i].Topic);
            }
        }
        catch (ex) {
        }
    }

    $scope.suscribirTopics = function () {
        //MqttClient.unsubscribe();
        for (var i = 0; i < $scope.componenteDatos.length; i++) {
            MqttClient.subscribe($scope.componenteDatos[i].Topic);
        }
    }

    function successCallback() {
        //MqttClient.subscribe('temp');
        //MqttClient.subscribe('hum');
        //message = new Paho.MQTT.Message("Hello");
        //message.destinationName = "temp";
        //MqttClient.send(message);
        console.log("Conexión al servidor MQTT completada");
    }

    $scope.Payload = {};
    $scope.ArregloPayload = [];

    $scope.Temperatura = "";
    $scope.Humedad = "";
    $scope.Corriente = "";

    $interval(function () {
        $scope.Payload = MqttClient.respuesta;
        $scope.ArregloPayload = MqttClient.arregloRespuesta;

        //console.log($scope.Payload);

        try {
            for (var i = 0; i < $scope.componenteDatos.length; i++) {
                // $scope.cantidadAves += $scope.componenteDatos[i].CantidadAves;

                if ($scope.componenteDatos[i].IdGprServicio == "9") {
                    //if ($scope.Payload.Topic == $scope.componenteDatos[i].Topic) {
                    //    //$scope.Temperatura = $scope.Payload.Mensaje;
                    //}

                    for (var o = 0; o < $scope.ArregloPayload.length; o++) {
                        if ($scope.ArregloPayload[o].Topic == $scope.componenteDatos[i].Topic) {
                            $scope.Temperatura = $scope.ArregloPayload[o].Mensaje;
                        }
                    }
                }

                if ($scope.componenteDatos[i].IdGprServicio == "10") {
                    //if ($scope.Payload.Topic == $scope.componenteDatos[i].Topic) {
                    //    //$scope.Humedad = $scope.Payload.Mensaje;

                    //    for (var i = 0; i < $scope.ArregloPayload.length; i++) {
                    //        if ($scope.ArregloPayload[i].Topic == $scope.componenteDatos[i].Topic) {
                    //            $scope.Humedad = $scope.ArregloPayload[i].Mensaje;
                    //        }
                    //    }
                    //}

                    for (var o = 0; o < $scope.ArregloPayload.length; o++) {
                        if ($scope.ArregloPayload[o].Topic == $scope.componenteDatos[i].Topic) {
                            $scope.Humedad = $scope.ArregloPayload[o].Mensaje;
                        }
                    }
                }

                if ($scope.componenteDatos[i].IdGprServicio == "6") {
                    for (var o = 0; o < $scope.ArregloPayload.length; o++) {
                        if ($scope.ArregloPayload[o].Topic == $scope.componenteDatos[i].Topic) {
                            $scope.Corriente = $scope.ArregloPayload[o].Mensaje;
                        }
                    }
                }
            }
        }
        catch (ex) {
        }

        //if ($scope.Payload.Topic == 'temp') {
        //    $scope.Temperatura = $scope.Payload.Mensaje;
        //}

        //if ($scope.Payload.Topic == 'hum') {
        //    $scope.Humedad = $scope.Payload.Mensaje;
        //}
    }, 1);;
});

// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.

app.factory('TiempoRealServicio', function ($http) {
    var fac = {};
    //fac.GetTiempoReal = function () {
    //    return $http.get('../api/Gpr_Temporada');
    //};
    fac.GetGalpones = function () {
        return $http.get('../Home/GetGalpon');
    };
    //fac.GetTipoTiempoReal = function () {
    //    return $http.get('../api/Gpr_Tipo_Temporada');
    //};
    fac.GetTipoEstadoAves = function () {
        return $http.get('../Home/GetTipoEstadoAve');
    };
    return fac;
});