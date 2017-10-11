using Newtonsoft.Json;
using RestSharp;
using SIGEPROAVI_Web.DTO;
using System.Collections.Generic;
using System.Web.Mvc;

namespace SIGEPROAVI_Web.Controllers
{
    public class SeguridadController : Controller
    {
        private static string rutaAPI = System.Configuration.ConfigurationManager.AppSettings["RutaAPI"].ToString();

        private static RestClient client = new RestClient(rutaAPI);

        private static JsonSerializerSettings settings = new JsonSerializerSettings
        {
            DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc,
            DateFormatString = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fff",
        };

        public ActionResult TipoUsuario()
        {
            return View();
        }

        public ActionResult Usuario()
        {
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
        public string ListarUsuario()
        {
            var request = new RestRequest("Seg_Usuario", Method.GET);
            request.RequestFormat = DataFormat.Json;

            IRestResponse<List<Seg_Usuario_ConsultaDTO>> response = client.Execute<List<Seg_Usuario_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpGet]
        public string ListarTipoUsuario()
        {
            var request = new RestRequest("Seg_Tipo_Usuario", Method.GET);
            request.RequestFormat = DataFormat.Json;

            IRestResponse<List<Seg_Tipo_Usuario_ConsultaDTO>> response = client.Execute<List<Seg_Tipo_Usuario_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpPost]
        public string GuardarUsuario(Seg_Usuario_InsercionDTO data)
        {
            data.UsuarioCreador = Session["Usuario"].ToString();

            var request = new RestRequest("Seg_Usuario", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpPost]
        public string DesactivarUsuario(Seg_Usuario_ModificacionDTO data)
        {
            data.UsuarioModificador = Session["Usuario"].ToString();

            var request = new RestRequest("Seg_Usuario/Desactivar", Method.PUT);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpPost]
        public string ModificarUsuario(int id, Seg_Usuario_ModificacionDTO data)
        {
            data.UsuarioModificador = Session["Usuario"].ToString();

            var request = new RestRequest("Seg_Usuario/" + id, Method.PUT);
            request.RequestFormat = DataFormat.Json;
            request.AddHeader("Content-type", "application/json");
            request.AddJsonBody(data);

            var response = client.Execute<object>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }
    }
}