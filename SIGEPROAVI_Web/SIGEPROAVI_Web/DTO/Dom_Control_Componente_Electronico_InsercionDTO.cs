﻿namespace SIGEPROAVI_Web.DTO
{
    public class Dom_Control_Componente_Electronico_InsercionDTO
    {
        public string Inicio { get; set; }
        public string Fin { get; set; }
        public int IdDomTipoControlComponenteElectronico { get; set; }
        public int IdDomComponenteElectronico { get; set; }

        public string UsuarioCreador { get; set; }
    }
}