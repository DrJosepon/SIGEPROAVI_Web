﻿using System.Web.Mvc;
using System.Web.Routing;

namespace SIGEPROAVI_Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}/{detalle}/{subdetalle}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional, detalle = UrlParameter.Optional, subdetalle = UrlParameter.Optional }
            );
        }
    }
}