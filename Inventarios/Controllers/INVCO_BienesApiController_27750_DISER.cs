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
    [Route("api/INVCO_BienesDataServices_27750_DISER")]
    [ApiController]
    public class INVCO_BienesDataServices_27750_DISERController : Controller
    {
        private readonly ILogger _logger;
        private readonly InventariosDbContext db;
        //private readonly UserManager<ApplicationUser> _userManager;

        public INVCO_BienesDataServices_27750_DISERController(ILogger<INVCO_BienesDataServices_27750_DISERController> logger,
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

            var q = from INVCO_Bienes in db.INVCO_Bienes
                    join INVCO_Areas in db.INVCO_Areas.AsNoTracking()
                      on new { INVCO_Bienes.Compania, INVCOAreaId = INVCO_Bienes.INVCOAreaId }
                      equals new { INVCO_Areas.Compania, INVCO_Areas.INVCOAreaId }
                    join INVCO_Personas in db.INVCO_Personas.AsNoTracking()
                      on new { INVCO_Bienes.Compania, INVCOPersonaId = INVCO_Bienes.INVCOPersonaId }
                      equals new { INVCO_Personas.Compania, INVCO_Personas.INVCOPersonaId }
                    select new { INVCO_Bienes, INVCO_Areas, INVCO_Personas }
                      ;
            // create json data

            q = q.Skip(pageIndex * pageSize).Take(pageSize);

            var jsonData = new
            {
                rows = from c in q
                       select new
                       {
                           c.INVCO_Bienes.Compania,
                           c.INVCO_Bienes.INVCOBienId,
                           c.INVCO_Bienes.INVCOBienNombre,
                           c.INVCO_Bienes.INVCOBienDescripcion,
                           c.INVCO_Bienes.INVCOBienTipo,
                           c.INVCO_Bienes.INVCOBienSerial,
                           c.INVCO_Bienes.INVCOBienValorCompra,
                           c.INVCO_Bienes.INVCOBienFechaCompra,
                           c.INVCO_Bienes.INVCOBienEstadoActual,
                           c.INVCO_Bienes.INVCOAreaId,
                           c.INVCO_Bienes.INVCOPersonaId,
                           Estado = 'C',
                           relaciones = new
                           {
                               c.INVCO_Personas.INVCOPersonaNombreCompleto,
                               c.INVCO_Areas.INVCOAreaDescripcion
                           }
                       },
                rowsCount = db.INVCO_Bienes.Count()
            };

            return Json(jsonData);
  		}

        [HttpGet("Search")]
        public JsonResult Search(string term, string column = "INVCO_Bienes.INVCOBienNombre", int pageIndex = 0, int pageSize = 10, string sort = "INVCO_Bienes.INVCOBienNombre ASC")
        {
            //Esta solo aplica para MS Sql Server 2005 o Superior
            if(db.Database.ProviderName == "System.Data.SqlClient.SqlConnection")
            {
                db.Database.ExecuteSqlRaw("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
            }

            var q = from INVCO_Bienes in db.INVCO_Bienes
                    join INVCO_Areas in db.INVCO_Areas.AsNoTracking()
                      on new { INVCO_Bienes.Compania, INVCOAreaId = INVCO_Bienes.INVCOAreaId }
                      equals new { INVCO_Areas.Compania, INVCO_Areas.INVCOAreaId }
                    join INVCO_Personas in db.INVCO_Personas.AsNoTracking()
                      on new { INVCO_Bienes.Compania, INVCOPersonaId = INVCO_Bienes.INVCOPersonaId }
                      equals new { INVCO_Personas.Compania, INVCO_Personas.INVCOPersonaId }
                    select new { INVCO_Bienes, INVCO_Areas, INVCO_Personas }
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
                           c.INVCO_Bienes.Compania,
                           c.INVCO_Bienes.INVCOBienId,
                           c.INVCO_Bienes.INVCOBienNombre,
                           c.INVCO_Bienes.INVCOBienDescripcion,
                           c.INVCO_Bienes.INVCOBienTipo,
                           c.INVCO_Bienes.INVCOBienSerial,
                           c.INVCO_Bienes.INVCOBienValorCompra,
                           c.INVCO_Bienes.INVCOBienFechaCompra,
                           c.INVCO_Bienes.INVCOBienEstadoActual,
                           c.INVCO_Bienes.INVCOAreaId,
                           c.INVCO_Bienes.INVCOPersonaId,
                           Estado = 'C',
                           relaciones = new
                           {
                               c.INVCO_Personas.INVCOPersonaNombreCompleto,
                               c.INVCO_Areas.INVCOAreaDescripcion
                           }
                       },
                rowsCount = db.INVCO_Bienes.Count()
            };

            return Json(jsonData);

        }
        
        private dynamic GetJsonData(IQueryable<INVCO_Bienes> q)
        {
            var jsonData = new
            {
                rows = from c in q
	                select new
	                {
                        c.Compania,
	                    c.INVCOBienId,
	                    c.INVCOBienNombre,
	                    c.INVCOBienDescripcion,
	                    c.INVCOBienTipo,
	                    c.INVCOBienSerial,
	                    c.INVCOBienValorCompra,
	                    c.INVCOBienFechaCompra,
	                    c.INVCOBienEstadoActual,
	                    c.INVCOAreaId,
	                    c.INVCOPersonaId,
                        Estado = 'C'
                    },
                rowsCount = db.INVCO_Bienes.Count()
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
        public JsonResult Add([FromBody] INVCO_Bienes row)
        {
            row.Compania = 1;
            row.INVCOBienId = ( db.INVCO_Bienes.Max((p) => (int?)p.INVCOBienId) ?? 0 ) + 1;
            db.Entry(row).Property("Fuente").CurrentValue = "CP27750";
            db.Entry(row).Property("Fecha_Computador").CurrentValue = DateTime.Now;
            db.Entry(row).Property("Usuario").CurrentValue = HttpContext.User.Identity.Name;

			db.INVCO_Bienes.Add(row);
			
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
        public JsonResult Update([FromBody] INVCO_Bienes urow)
        {
            var row = db.Get_INVCO_Bienes(urow);
            
            row.INVCOBienNombre = urow.INVCOBienNombre;
            row.INVCOBienDescripcion = urow.INVCOBienDescripcion;
            row.INVCOBienTipo = urow.INVCOBienTipo;
            row.INVCOBienSerial = urow.INVCOBienSerial;
            row.INVCOBienValorCompra = urow.INVCOBienValorCompra;
            row.INVCOBienFechaCompra = urow.INVCOBienFechaCompra;
            row.INVCOBienEstadoActual = urow.INVCOBienEstadoActual;
            row.INVCOAreaId = urow.INVCOAreaId;
            row.INVCOPersonaId = urow.INVCOPersonaId;
            
            db.Entry(row).Property("Fuente").CurrentValue = "CP27750";
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

        [HttpDelete("{Compania}/{INVCOBienId}")]
        public JsonResult Delete(int Compania, int INVCOBienId)
        {
            var row = db.Get_INVCO_Bienes(Compania, INVCOBienId);

            db.INVCO_Bienes.Remove(row);

		    db.SaveChanges();

            return Json(true);
        }

        private bool IsValid(INVCO_Bienes row)
        {

            return ModelState.IsValid;
        }

        //Autocomplete
        //  GET: /INVCO_Bienes/INVCO_Areas
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
        //Autocomplete
        //  GET: /INVCO_Bienes/INVCO_Personas
        [AllowAnonymous]
        [HttpGet("INVCO_Personas")]
        public JsonResult INVCO_Personas(string term, string column = "INVCOPERSONANOMBRECOMPLETO", int pageSize = 10)
        {
            IQueryable< INVCO_Personas> q = null;
            switch (column.ToUpper())
            {
                case "INVCOPERSONANOMBRECOMPLETO":
                    //Esta solo aplica para MS Sql Server 2005 o Superior
                    if (db.Database.ProviderName == "Microsoft.EntityFrameworkCore.SqlServer")
                    {
                        db.Database.ExecuteSqlRaw("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
                    }
                    
                    q = from c in db.INVCO_Personas
                        orderby c.INVCOPersonaNombreCompleto
                        select c;

                    if (term != null)
                    {
                        q = q.Where((c) => c.INVCOPersonaNombreCompleto.Contains(term));
                    }
                    break;
            }

            // create json data

            List< INVCO_Personas> _qq = q.Take(pageSize).ToList();

            dynamic jsonData = (from c in _qq
                                select new { label = c.INVCOPersonaNombreCompleto,
                                             value = c.INVCOPersonaId.ToString(),
					                         INVCOPersonaId = c.INVCOPersonaId
                                            }
                               ).ToArray()
            ;
            return Json(jsonData);

        }
        
        private string GetINVCO_Personas(int Compania, decimal INVCOPersonaId, string INVCOPersonaNombreCompleto)
        {
        	string sDesc = ( from c in db.INVCO_Personas
                        where c.Compania == Compania
                           && c.INVCOPersonaId == INVCOPersonaId 
                           && c.INVCOPersonaNombreCompleto == INVCOPersonaNombreCompleto 
                       select c.INVCOPersonaNombreCompleto).FirstOrDefault();
        	
        	return sDesc;
        }

        protected override void Dispose(bool disposing )
        {
            base.Dispose(disposing);
        }
    }
}    