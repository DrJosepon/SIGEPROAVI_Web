﻿namespace SIGEPROAVI_Web.DTO
{
    public class Gpr_Servicio_ModificacionDTO
    {
        public int IdGprServicio { get; set; }
        public string Descripcion { get; set; }
        public int? IdGprUnidadMedida { get; set; }
        public int IdGprTipoServicio { get; set; }
        public string UsuarioModificador { get; set; }
    }
}