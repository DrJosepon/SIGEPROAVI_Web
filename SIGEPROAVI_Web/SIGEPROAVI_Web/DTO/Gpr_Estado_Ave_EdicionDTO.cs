﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SIGEPROAVI_Web.DTO
{
    public class Gpr_Estado_Ave_EdicionDTO
    {
        public int? IdGprEstadoAve { get; set; }

        public int? CantidadAves { get; set; }

        public string DescripcionEstadoAve { get; set; }

        public int? IdGprTipoEstadoAve { get; set; }

        public int IdGprTemporada { get; set; }

        public string UsuarioCreador { get; set; }
        public string UsuarioModificador { get; set; }
    }
}