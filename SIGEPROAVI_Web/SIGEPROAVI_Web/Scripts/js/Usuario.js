// Defining angularjs module
var app = angular.module('usuarioModulo', ["angular-table"]);

// Defining angularjs Controller and injecting UsuariosServicio
app.controller('usuarioCtrl', function ($scope, $http, UsuariosServicio) {
    $scope.usuariosDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    UsuariosServicio.GetUsuarios().then(function (d) {
        $scope.usuariosDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.tipousuarioDatos = null;
    // Fetching records from the factory created at the bottom of the script file
    UsuariosServicio.GetTipoUsuarios().then(function (d) {
        $scope.tipousuarioDatos = d.data.Data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.config = {
        itemsPerPage: 5,
        fillLastPage: true
    };

    $scope.Usuario = {
        IdSegUsuario: '',
        Nombres: '',
        ApellidoPaterno: '',
        ApellidoMaterno: '',
        Usuario: '',
        Clave: '',
        IdSegTipoUsuario: '',
    };

    // Reset product details
    $scope.limpiar = function () {
        $scope.Usuario.IdSegUsuario = '';
        $scope.Usuario.Nombres = '';
        $scope.Usuario.ApellidoPaterno = '';
        $scope.Usuario.ApellidoMaterno = '';
        $scope.Usuario.Usuario = '';
        $scope.Usuario.Clave = '';
        $scope.Usuario.IdSegTipoUsuario = ''
    }

    //Add New Item
    $scope.guardar = function () {
        if ($scope.Usuario.Nombres != "" &&
       $scope.Usuario.ApellidoPaterno != "" && $scope.Usuario.ApellidoMaterno != "" && $scope.Usuario.Usuario != "" && $scope.Usuario.IdSegTipoUsuario != "") {
            $http({
                method: 'POST',
                url: '../Seguridad/PostUsuario',
                data: $scope.Usuario
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

                if (response.data.StatusCode != 200 && response.data.StatusCode != 201) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.usuariosDatos.push(response.data.Data[0]);
                    $scope.limpiar();
                    alert("Usuario agregado.");
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
        $scope.Usuario = {
            IdSegUsuario: data.IdSegUsuario,
            Nombres: data.Nombres,
            ApellidoPaterno: data.ApellidoPaterno,
            ApellidoMaterno: data.ApellidoMaterno,
            Usuario: data.Usuario,
            Clave: data.Clave,
            IdSegTipoUsuario: data.IdSegTipoUsuario.toString(),
        };
    }

    // Cancel product details
    $scope.cancelar = function () {
        $scope.limpiar();
    }

    // Update product details
    $scope.modificar = function () {
        if ($scope.Usuario.Descripcion != "" && $scope.Usuario.Estado != "") {
            $http({
                method: 'POST',
                url: '../Seguridad/PutUsuario/' + $scope.Usuario.IdSegUsuario,
                data: $scope.Usuario
            }).then(function successCallback(response) {
                debugger;

                if (response.data.StatusCode != 200) {
                    alert(response.data.Data.Message + ". Revise la consola para más información.");
                    console.log(response.data.Data);
                } else {
                    $scope.usuariosDatos = response.data.Data;
                    $scope.limpiar();
                    alert("Usuario actualizado.");
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

app.factory('UsuariosServicio', function ($http) {
    var fac = {};
    fac.GetUsuarios = function () {
        return $http.get('../Seguridad/GetUsuario');
    };
    fac.GetTipoUsuarios = function () {
        return $http.get('../Seguridad/GetTipoUsuario');
    };
    return fac;
});