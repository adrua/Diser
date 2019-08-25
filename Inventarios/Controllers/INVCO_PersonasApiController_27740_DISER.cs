using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Diser.Inventarios.DataLayer.Models;

namespace Diser.Inventarios.Controllers
{
    //[AllowAnonymous]
    [Produces("application/json")]
    [Route("api/INVCO_PersonasDataServices_27740_DISER")]
    [ApiController]
    public class INVCO_PersonasDataServices_27740_DISERController : Controller
    {
        private readonly ILogger _logger;
        private readonly InventariosDbContext db;
        //private readonly UserManager<ApplicationUser> _userManager;

        public INVCO_PersonasDataServices_27740_DISERController(ILogger<INVCO_PersonasDataServices_27740_DISERController> logger,
                                        InventariosDbContext dbContext /*,
                                        UserManager<ApplicationUser> userManager*/)
        {
            _logger = logger;
            db = dbContext;
            //_userManager = userManager;
        }

    	[HttpGet("Gets")]
        public JsonResult Gets(int pageIndex = 0, int pageSize = 10)
    	{

            //Esta solo aplica para MS Sql Server 2005 o Superior
            if (db.Database.ProviderName == "Microsoft.EntityFrameworkCore.SqlServer")
            {
                db.Database.ExecuteSqlRaw("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
            }

            var q = from INVCO_Personas in db.INVCO_Personas
                    join GOVCO_Ciudades in db.GOVCO_Ciudades.AsNoTracking()
                      on new { INVCO_Personas.Compania, GOVCOPaisId = INVCO_Personas.GOVCOPaisId, GOVCODepartamentoId = INVCO_Personas.GOVCODepartamentoId, GOVCOCiudadId = INVCO_Personas.GOVCOCiudadId }
                      equals new { GOVCO_Ciudades.Compania, GOVCO_Ciudades.GOVCOPaisId, GOVCO_Ciudades.GOVCODepartamentoId, GOVCO_Ciudades.GOVCOCiudadId }
                    join INVCO_Areas in db.INVCO_Areas.AsNoTracking()
                      on new { INVCO_Personas.Compania, INVCOAreaId = INVCO_Personas.INVCOAreaId }
                      equals new { INVCO_Areas.Compania, INVCO_Areas.INVCOAreaId }
                    select new { INVCO_Personas, GOVCO_Ciudades, INVCO_Areas }
                      ;

            // create json data

            q = q.Skip(pageIndex * pageSize).Take(pageSize);

            var jsonData = new
            {
                rows = from c in q
                       select new
                       {
                           c.INVCO_Personas.Compania,
                           c.INVCO_Personas.INVCOPersonaId,
                           c.INVCO_Personas.INVCOPersonaApellidos,
                           c.INVCO_Personas.INVCOPersonaNombre,
                           c.INVCO_Personas.INVCOPersonaDireccion,
                           c.INVCO_Personas.GOVCOPaisId,
                           c.INVCO_Personas.GOVCODepartamentoId,
                           c.INVCO_Personas.GOVCOCiudadId,
                           c.INVCO_Personas.INVCOPersonaTelefono,
                           c.INVCO_Personas.INVCOPersonaEMail,
                           c.INVCO_Personas.INVCOAreaId,
                           c.INVCO_Personas.INVCOPersonaEstado,
                           Estado = 'C',
                           relaciones = new
                           {
                               GOVCOCiudadNombre = c.GOVCO_Ciudades.GOVCOCiudadNombre
                           }
                       },
                rowsCount = db.INVCO_Personas.Count()
            };

            return Json(jsonData);
        }

        [HttpGet("Search")]
        public JsonResult Search(string term, string column = "INVCO_Personas.INVCOPersonaApellidos", int pageIndex = 0, int pageSize = 10, string sort = "INVCO_Personas.INVCOPersonaApellidos ASC")
        {
            //Esta solo aplica para MS Sql Server 2005 o Superior
            if(db.Database.ProviderName == "System.Data.SqlClient.SqlConnection")
            {
                db.Database.ExecuteSqlRaw("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
            }

            var q = from INVCO_Personas in db.INVCO_Personas
                    join GOVCO_Ciudades in db.GOVCO_Ciudades.AsNoTracking()
                      on new { INVCO_Personas.Compania, GOVCOPaisId = INVCO_Personas.GOVCOPaisId, GOVCODepartamentoId = INVCO_Personas.GOVCODepartamentoId, GOVCOCiudadId = INVCO_Personas.GOVCOCiudadId }
                      equals new { GOVCO_Ciudades.Compania, GOVCO_Ciudades.GOVCOPaisId, GOVCO_Ciudades.GOVCODepartamentoId, GOVCO_Ciudades.GOVCOCiudadId }
                    join INVCO_Areas in db.INVCO_Areas.AsNoTracking()
                      on new { INVCO_Personas.Compania, INVCOAreaId = INVCO_Personas.INVCOAreaId }
                      equals new { INVCO_Areas.Compania, INVCO_Areas.INVCOAreaId }
                    select new { INVCO_Personas, GOVCO_Ciudades, INVCO_Areas }
          ;


            q = q.OrderBy(sort);

            if (!string.IsNullOrEmpty(term))
            {
                q = q.Where($"{column}.Contains(\"{term}\")");
            }

            // create json data

            q = q.Skip(pageIndex * pageSize).Take(pageSize);

            var jsonData = new
            {
                rows = from c in q
                       select new
                       {
                           c.INVCO_Personas.Compania,
                           c.INVCO_Personas.INVCOPersonaId,
                           c.INVCO_Personas.INVCOPersonaApellidos,
                           c.INVCO_Personas.INVCOPersonaNombre,
                           c.INVCO_Personas.INVCOPersonaDireccion,
                           c.INVCO_Personas.GOVCOPaisId,
                           c.INVCO_Personas.GOVCODepartamentoId,
                           c.INVCO_Personas.GOVCOCiudadId,
                           c.INVCO_Personas.INVCOPersonaTelefono,
                           c.INVCO_Personas.INVCOPersonaEMail,
                           c.INVCO_Personas.INVCOAreaId,
                           c.INVCO_Personas.INVCOPersonaEstado,
                           Estado = 'C',
                           relaciones = new
                           {
                               GOVCOCiudadNombre = c.GOVCO_Ciudades.GOVCOCiudadNombre,
                               INVCOAreaDescripcion = c.INVCO_Areas.INVCOAreaDescripcion
                           }
                       },
                rowsCount = db.INVCO_Personas.Count()
            };

            return Json(jsonData);

        }

        private dynamic GetJsonData(IQueryable<INVCO_Personas> q)
        {
            var jsonData = new
            {
                rows = from c in q
	                select new
	                {
                        c.Compania,
	                    c.INVCOPersonaId,
	                    c.INVCOPersonaApellidos,
	                    c.INVCOPersonaNombre,
	                    c.INVCOPersonaDireccion,
	                    c.GOVCOPaisId,
	                    c.GOVCODepartamentoId,
	                    c.GOVCOCiudadId,
	                    c.INVCOPersonaTelefono,
	                    c.INVCOPersonaEMail,
	                    c.INVCOAreaId,
	                    c.INVCOPersonaEstado,
                        Estado = 'C'
                    },
                rowsCount = db.INVCO_Personas.Count()
            };

	        return jsonData;
        }

        //Esto es para resolver un problema del CORS
        [ApiExplorerSettings(IgnoreApi = true)]
        public JsonResult Add()
        {
            return Json(new {error = "NO Llego nada"});
        }

        [HttpPost]
        public JsonResult Add([FromBody] INVCO_Personas row)
        {
            row.Compania = 1;
            db.Entry(row).Property("Fuente").CurrentValue = "CP27740";
            db.Entry(row).Property("Fecha_Computador").CurrentValue = DateTime.Now;
            db.Entry(row).Property("Usuario").CurrentValue = HttpContext.User.Identity.Name;

			db.INVCO_Personas.Add(row);
			
			if(IsValid(row)){
    		    db.SaveChanges();
    		} else {
    		    var errMsg = "<br>" + string.Join("<br>", ModelState.Values
                                        .SelectMany(x => x.Errors)
                                        .Select(x => x.ErrorMessage));
    		    throw new Exception(errMsg);
    		}
            return Json(row);
        }

        //Esto es para resolver un problema del CORS
        [ApiExplorerSettings(IgnoreApi = true)]
        public JsonResult Update()
        {
            return Json(new {error = "NO Llego nada"});
        }

        [HttpPut]
        public JsonResult Update([FromBody] INVCO_Personas urow)
        {
            var row = db.Get_INVCO_Personas(urow);
            
            row.INVCOPersonaApellidos = urow.INVCOPersonaApellidos;
            row.INVCOPersonaNombre = urow.INVCOPersonaNombre;
            row.INVCOPersonaDireccion = urow.INVCOPersonaDireccion;
            row.GOVCOPaisId = urow.GOVCOPaisId;
            row.GOVCODepartamentoId = urow.GOVCODepartamentoId;
            row.GOVCOCiudadId = urow.GOVCOCiudadId;
            row.INVCOPersonaTelefono = urow.INVCOPersonaTelefono;
            row.INVCOPersonaEMail = urow.INVCOPersonaEMail;
            row.INVCOAreaId = urow.INVCOAreaId;
            row.INVCOPersonaEstado = urow.INVCOPersonaEstado;
            
            db.Entry(row).Property("Fuente").CurrentValue = "CP27740";
            db.Entry(row).Property("Fecha_Computador").CurrentValue = DateTime.Now;
            db.Entry(row).Property("Usuario").CurrentValue = HttpContext.User.Identity.Name;

			if(IsValid(row)){
    		    db.SaveChanges();
    		} else {
    		    var errMsg = "<br>" + string.Join("<br>", ModelState.Values
                                        .SelectMany(x => x.Errors)
                                        .Select(x => x.ErrorMessage));
    		    throw new Exception(errMsg);
    		}
            return Json(row);
        }

        //Esto es para resolver un problema del CORS
        [ApiExplorerSettings(IgnoreApi = true)]
        public JsonResult Delete()
        {
            return Json(new {error = "NO Llego nada"});
        }

        [HttpDelete("{Compania}/{INVCOPersonaId}")]
        public JsonResult Delete(int Compania, decimal INVCOPersonaId)
        {
            var row = db.Get_INVCO_Personas(Compania, INVCOPersonaId);

            db.INVCO_Personas.Remove(row);

		    db.SaveChanges();

            return Json(true);
        }

        private bool IsValid(INVCO_Personas row)
        {

            return ModelState.IsValid;
        }

        //Autocomplete
        //  GET: /INVCO_Personas/GOVCO_Ciudades
        [AllowAnonymous]
        [HttpGet("GOVCO_Ciudades")]
        public JsonResult GOVCO_Ciudades(string term, string column = "GOVCOCIUDADNOMBRE", int pageSize = 10)
        {
            IQueryable< GOVCO_Ciudades> q = null;
            switch (column.ToUpper())
            {
                case "GOVCOCIUDADNOMBRE":
                    //Esta solo aplica para MS Sql Server 2005 o Superior
                    if (db.Database.ProviderName == "Microsoft.EntityFrameworkCore.SqlServer")
                    {
                        db.Database.ExecuteSqlRaw("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    }
                    
                    q = from c in db.GOVCO_Ciudades
                        orderby c.GOVCOCiudadNombre
                        select c;

                    if (term != null)
                    {
                        q = q.Where((c) => c.GOVCOCiudadNombre.Contains(term));
                    }
                    break;
            }

            // create json data

            List< GOVCO_Ciudades> _qq = q.Take(pageSize).ToList();

            dynamic jsonData = (from c in _qq
                                select new { label = c.GOVCOCiudadNombre,
                                             value = c.GOVCO_Ciudades_Comp.ToString(),
					                         GOVCOPaisId = c.GOVCOPaisId,
					                         GOVCODepartamentoId = c.GOVCODepartamentoId,
					                         GOVCOCiudadId = c.GOVCOCiudadId
                                            }
                               ).ToArray()
            ;
            return Json(jsonData);

        }
        
        private string GetGOVCO_Ciudades(int Compania, string GOVCOPaisId, string GOVCODepartamentoId, string GOVCOCiudadId, string GOVCOCiudadNombre)
        {
        	string sDesc = ( from c in db.GOVCO_Ciudades
                        where c.Compania == Compania
                           && c.GOVCOPaisId == GOVCOPaisId 
                           && c.GOVCODepartamentoId == GOVCODepartamentoId 
                           && c.GOVCOCiudadId == GOVCOCiudadId 
                           && c.GOVCOCiudadNombre == GOVCOCiudadNombre 
                       select c.GOVCOCiudadNombre).FirstOrDefault();
        	
        	return sDesc;
        }
        //Autocomplete
        //  GET: /INVCO_Personas/INVCO_Areas
        [AllowAnonymous]
        [HttpGet("INVCO_Areas")]
        public JsonResult INVCO_Areas(string term, string column = "INVCOAREADESCRIPCION", int pageSize = 10)
        {
            IQueryable< INVCO_Areas> q = null;
            switch (column.ToUpper())
            {
                case "INVCOAREADESCRIPCION":
                    //Esta solo aplica para MS Sql Server 2005 o Superior
                    if (db.Database.ProviderName == "Microsoft.EntityFrameworkCore.SqlServer")
                    {
                        db.Database.ExecuteSqlRaw("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    }
                    
                    q = from c in db.INVCO_Areas
                        orderby c.INVCOAreaDescripcion
                        select c;

                    if (term != null)
                    {
                        q = q.Where((c) => c.INVCOAreaDescripcion.Contains(term));
                    }
                    break;
            }

            // create json data

            List< INVCO_Areas> _qq = q.Take(pageSize).ToList();

            dynamic jsonData = (from c in _qq
                                select new { label = c.INVCOAreaDescripcion,
                                             value = c.INVCOAreaId.ToString(),
					                         INVCOAreaId = c.INVCOAreaId
                                            }
                               ).ToArray()
            ;
            return Json(jsonData);

        }
        
        private string GetINVCO_Areas(int Compania, int INVCOAreaId, string INVCOAreaDescripcion)
        {
        	string sDesc = ( from c in db.INVCO_Areas
                        where c.Compania == Compania
                           && c.INVCOAreaId == INVCOAreaId 
                           && c.INVCOAreaDescripcion == INVCOAreaDescripcion 
                       select c.INVCOAreaDescripcion).FirstOrDefault();
        	
        	return sDesc;
        }

        protected override void Dispose(bool disposing )
        {
            base.Dispose(disposing);
        }
    }
}    