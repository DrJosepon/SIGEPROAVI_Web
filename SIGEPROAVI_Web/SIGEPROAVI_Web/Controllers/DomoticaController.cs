﻿using Newtonsoft.Json;
using RestSharp;
using SIGEPROAVI_Web.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SIGEPROAVI_Web.Controllers
{
    public class DomoticaController : Controller
    {
        private static string rutaAPI = System.Configuration.ConfigurationManager.AppSettings["RutaAPI"].ToString();

        private static RestClient client = new RestClient(rutaAPI);

        private static JsonSerializerSettings settings = new JsonSerializerSettings
        {
            DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc,
            DateFormatString = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fff",
        };

        // GET: Domotica
        public ActionResult ComponenteElectronico()
        {
            //return View();
            if (Session["Usuario"] != null && Session["Tipo"].ToString() == "1")
            {
                return View();
            }
            else if (Session["Usuario"] != null)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
        }

        [HttpGet]
        public string GetTipoComponenteElectronico()
        {
            var request = new RestRequest("Dom_Tipo_Componente_Electronico", Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Dom_Tipo_Componente_Electronico_ConsultaDTO>> response = client.Execute<List<Dom_Tipo_Componente_Electronico_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpGet]
        public string GetDomTipoControlComponenteElectronico()
        {
            var request = new RestRequest("Dom_Tipo_Control_Componente_Electronico", Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Dom_Tipo_Control_Componente_Electronico_ConsultaDTO>> response = client.Execute<List<Dom_Tipo_Control_Componente_Electronico_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpGet]
        public string BuscarComponenteElectronicoXGalpon(int id)
        {
            var request = new RestRequest("Dom_Componente_Electronico/Galpon/" + id, Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Dom_Componente_Electronico_ConsultaDTO>> response = client.Execute<List<Dom_Componente_Electronico_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);  //Json(response.Data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public string PostComponenteElectronico(Dom_Componente_Electronico_InsercionDTO data)
        {
            data.UsuarioCreador = Session["Usuario"].ToString();

            var request = new RestRequest("Dom_Componente_Electronico", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpPost]
        public string PutComponenteElectronico(int id, Dom_Componente_Electronico_ModificacionDTO data)
        {
            data.UsuarioModificador = Session["Usuario"].ToString();

            var request = new RestRequest("Dom_Componente_Electronico/" + id, Method.PUT);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpGet]
        public string BuscarControlComponenteElectronicoXComponenteElectronico(int id)
        {
            var request = new RestRequest("Dom_Control_Componente_Electronico_ConsultaDTO/ComponenteElectronico/" + id, Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Dom_Control_Componente_Electronico_ConsultaDTO>> response = client.Execute<List<Dom_Control_Componente_Electronico_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);  //Json(response.Data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public string PostControlComponenteElectronico(Dom_Control_Componente_Electronico_InsercionDTO data)
        {
            data.UsuarioCreador = Session["Usuario"].ToString();

            var request = new RestRequest("Dom_Control_Componente_Electronico", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }
    }
}