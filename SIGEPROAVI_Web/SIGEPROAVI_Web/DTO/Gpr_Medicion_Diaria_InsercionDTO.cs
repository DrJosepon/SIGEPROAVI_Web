﻿namespace SIGEPROAVI_Web.DTO
{
    public class Gpr_Medicion_Diaria_InsercionDTO
    {
        public int IdGprMedicionDiaria { get; set; }
        public decimal Medicion { get; set; }
        public string Fecha { get; set; }
        public int IdGprServicio { get; set; }
        public int IdGprGalpon { get; set; }
    }
}