using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SIGEPROAVI_Web.DTO
{
    public class Gpr_Costo_Servicio_EdicionDTO
    {
        public decimal Costo { get; set; }

        public int IdGprServicio { get; set; }
        public string UsuarioCreador { get; set; }
    }
}