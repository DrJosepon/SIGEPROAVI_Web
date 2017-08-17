using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using RestSharp;
using SIGEPROAVI_Web.DTO;
using System.Collections.Generic;
using System.Web.Mvc;

namespace SIGEPROAVI_Web.Controllers
{
    public class HomeController : Controller
    {
        private static string rutaAPI = System.Configuration.ConfigurationManager.AppSettings["RutaAPI"].ToString();

        private static RestClient client = new RestClient(rutaAPI);

        private static JsonSerializerSettings settings = new JsonSerializerSettings
        {
            DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc,
            DateFormatString = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fff",
        };

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            if (Session["Usuario"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        public ActionResult TiempoReal()
        {
            ViewBag.Title = "Tiempo Real";

            if (Session["Usuario"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        public ActionResult TipoEstadoAve()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Logout()
        {
            Session["Usuario"] = null;
            Session["Tipo"] = null;
            return RedirectToAction("Login");
        }

        [HttpPost]
        public string InicioSesion(Seg_Usuario_InsercionDTO seg_Usuario)
        {
            var request = new RestRequest("Seg_Usuario/Login", Method.POST);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            request.AddBody(seg_Usuario);

            IRestResponse<Seg_Usuario_InsercionDTO> response = client.Execute<Seg_Usuario_InsercionDTO>(request);

            if (response.Data != null)
            {
                Session["Usuario"] = response.Data.Usuario.ToString();
                Session["Tipo"] = response.Data.IdSegTipoUsuario.ToString();
                return "Aceptado";
            }

            return "Rechazado";
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

        [HttpGet]
        public string BuscarMedicionDiariaXTemporada(int id)
        {
            var request = new RestRequest("Gpr_Medicion_Diaria/Temporada/" + id, Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Gpr_Medicion_Diaria_ConsultaDTO>> response = client.Execute<List<Gpr_Medicion_Diaria_ConsultaDTO>>(request);

            //return Json(response.Data, JsonRequestBehavior.AllowGet);

            string testo = JsonConvert.SerializeObject(response, new IsoDateTimeConverter());

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }

        [HttpGet]
        public string BuscarMedicionHorariaXTemporada(int id, string detalle, int subdetalle)
        {
            var request = new RestRequest("Gpr_Medicion_Horaria/Temporada/" + id + "/" + detalle + "/" + subdetalle, Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Gpr_Medicion_Horaria_ConsultaDTO>> response = client.Execute<List<Gpr_Medicion_Horaria_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
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
        public string BuscarComponenteElectronicoXGalpon(int id)
        {
            var request = new RestRequest("Dom_Componente_Electronico/Galpon/" + id, Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Dom_Componente_Electronico_ConsultaDTO>> response = client.Execute<List<Dom_Componente_Electronico_ConsultaDTO>>(request);

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);  //Json(response.Data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public string BuscarGastoDiarioXTemporada(int id)
        {
            var request = new RestRequest("Gpr_Gasto_Diario/Temporada/" + id, Method.GET);
            request.RequestFormat = DataFormat.Json;

            //request.AddParameter("Seg_Usuario", request.JsonSerializer.Serialize(seg_Usuario));
            //request.AddBody(seg_Usuario);

            IRestResponse<List<Gpr_Gasto_Diario_ConsultaDTO>> response = client.Execute<List<Gpr_Gasto_Diario_ConsultaDTO>>(request);

            //return Json(response.Data, JsonRequestBehavior.AllowGet);

            string testo = JsonConvert.SerializeObject(response, new IsoDateTimeConverter());

            return JsonConvert.SerializeObject(response, Formatting.Indented, settings);
        }
    }
}