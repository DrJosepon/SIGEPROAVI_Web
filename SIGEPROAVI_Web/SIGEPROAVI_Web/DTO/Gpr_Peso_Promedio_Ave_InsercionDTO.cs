﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SIGEPROAVI_Web.DTO
{
    public class Gpr_Peso_Promedio_Ave_InsercionDTO
    {
        public decimal Peso { get; set; }
        public DateTime Fecha { get; set; }
        public int IdGprTemporada { get; set; }

        public string UsuarioCreador { get; set; }
    }
}