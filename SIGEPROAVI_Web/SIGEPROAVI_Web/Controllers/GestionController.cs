using Newtonsoft.Json;
using RestSharp;
using SIGEPROAVI_Web.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SIGEPROAVI_Web.Controllers
{
    public class GestionController : Controller
    {
        private static string rutaAPI = System.Configuration.ConfigurationManager.AppSettings["RutaAPI"].ToString();

        private static RestClient client = new RestClient(rutaAPI);

        private static JsonSerializerSettings settings = new JsonSerializerSettings
        {
            DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc,
            DateFormatString = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fff",
        };

        // GET: Gestion
        public ActionResult Galpon()
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

        public ActionResult Servicio()
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

        public ActionResult Temporada()
        {
            // return View();
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
        public string GetGalpon()
        {
            var request = new RestRequest("Gpr_Galpon", Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Gpr_Galpon_ConsultaDTO>> response = client.Execute<List<Gpr_Galpon_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpPost]
        public string PutGalpon(int id, Gpr_Galpon_ModificacionDTO data)
        {
            data.UsuarioModificador = Session["Usuario"].ToString();

            var request = new RestRequest("Gpr_Galpon/" + id, Method.PUT);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpPost]
        public string PostGalpon(Gpr_Galpon_InsercionDTO data)
        {
            data.UsuarioCreador = Session["Usuario"].ToString();

            var request = new RestRequest("Gpr_Galpon", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpGet]
        public string GetServicio()
        {
            var request = new RestRequest("Gpr_Servicio", Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Gpr_Servicio_ConsultaDTO>> response = client.Execute<List<Gpr_Servicio_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpGet]
        public string GetUnidadMedida()
        {
            var request = new RestRequest("Gpr_Unidad_Medida", Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Gpr_Unidad_Medida_ConsultaDTO>> response = client.Execute<List<Gpr_Unidad_Medida_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpGet]
        public string GetTipoServicio()
        {
            var request = new RestRequest("Gpr_Tipo_Servicio", Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Gpr_Tipo_Servicio_ConsultaDTO>> response = client.Execute<List<Gpr_Tipo_Servicio_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpPost]
        public string PutServicio(int id, Gpr_Servicio_ModificacionDTO data)
        {
            data.UsuarioModificador = Session["Usuario"].ToString();

            var request = new RestRequest("Gpr_Servicio/" + id, Method.PUT);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpPost]
        public string PostServicio(Gpr_Servicio_InsercionDTO data)
        {
            data.UsuarioCreador = Session["Usuario"].ToString();

            var request = new RestRequest("Gpr_Servicio", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpGet]
        public string GetTipoEstadoAve()
        {
            var request = new RestRequest("Gpr_Tipo_Estado_Ave", Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Gpr_Tipo_Estado_Ave_ConsultaDTO>> response = client.Execute<List<Gpr_Tipo_Estado_Ave_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpGet]
        public string BuscarTemporadaXGalpon(int id)
        {
            var request = new RestRequest("Gpr_Temporada/Galpon/" + id, Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Gpr_Temporada_ConsultaDTO>> response = client.Execute<List<Gpr_Temporada_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);  //Json(response.Data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public string PostTemporada(Gpr_Temporada_InsercionDTO data)
        {
            data.UsuarioCreador = Session["Usuario"].ToString();

            var request = new RestRequest("Gpr_Temporada", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpPost]
        public string PutTemporada(int id, Gpr_Temporada_ModificacionDTO data)
        {
            data.UsuarioModificador = Session["Usuario"].ToString();

            var request = new RestRequest("Gpr_Temporada/" + id, Method.PUT);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpGet]
        public string PesoXTemporada(int id)
        {
            var request = new RestRequest("Gpr_Peso_Promedio_Ave/Temporada/" + id, Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Gpr_Peso_Promedio_Ave_ConsultaDTO>> response = client.Execute<List<Gpr_Peso_Promedio_Ave_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);  //Json(response.Data,
        }

        [HttpGet]
        public string EstadoXTemporada(int id)
        {
            var request = new RestRequest("Gpr_Estado_Ave/Temporada/" + id, Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Gpr_Estado_Ave_ConsultaDTO>> response = client.Execute<List<Gpr_Estado_Ave_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);  //Json(response.Data,
        }

        [HttpPost]
        public string PostPesoPromedioAve(Gpr_Peso_Promedio_Ave_InsercionDTO data)
        {
            data.UsuarioCreador = Session["Usuario"].ToString();

            var request = new RestRequest("Gpr_Peso_Promedio_Ave", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpPost]
        public string ProcesarEstadoAves(List<Gpr_Estado_Ave_EdicionDTO> data)
        {
            foreach (Gpr_Estado_Ave_EdicionDTO estado in data)
            {
                estado.UsuarioCreador = Session["Usuario"].ToString();
                estado.UsuarioModificador = Session["Usuario"].ToString();
            }

            var request = new RestRequest("Gpr_Estado_Ave/Procesar", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }
    }
}