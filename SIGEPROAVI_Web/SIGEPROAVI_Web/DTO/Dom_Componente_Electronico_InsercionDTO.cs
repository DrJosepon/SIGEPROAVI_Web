﻿namespace SIGEPROAVI_Web.DTO
{
    public class Dom_Componente_Electronico_InsercionDTO
    {
        public string Topic { get; set; }
        public int IdDomTipoComponenteElectronico { get; set; }
        public int IdGprGalpon { get; set; }
        public int IdGprServicio { get; set; }

        public string UsuarioCreador { get; set; }
    }
}