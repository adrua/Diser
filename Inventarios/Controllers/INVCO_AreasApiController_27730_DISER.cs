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
    [Route("api/INVCO_AreasDataServices_27730_DISER")]
    [ApiController]
    public class INVCO_AreasDataServices_27730_DISERController : Controller
    {
        private readonly ILogger _logger;
        private readonly InventariosDbContext db;
        //private readonly UserManager<ApplicationUser> _userManager;

        public INVCO_AreasDataServices_27730_DISERController(ILogger<INVCO_AreasDataServices_27730_DISERController> logger,
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

            var q = (from INVCO_Areas in db.INVCO_Areas
                     select INVCO_Areas)
                      ;
            // create json data

            q = q.Skip(pageIndex * pageSize).Take(pageSize);

            return Json(GetJsonData(q));
        }

        [HttpGet("Search")]
        public JsonResult Search(string term, string column = "INVCOAreaDescripcion", int pageIndex = 0, int pageSize = 10, string sort = "INVCOAreaDescripcion ASC")
        {
            IQueryable<INVCO_Areas> q = null;
            //Esta solo aplica para MS Sql Server 2005 o Superior
            if (db.Database.ProviderName == "System.Data.SqlClient.SqlConnection")
            {
                db.Database.ExecuteSqlRaw("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");
            }

            q = db.INVCO_Areas.OrderBy(sort);

            if (!string.IsNullOrEmpty(term))
            {
                q = q.Where($"{column}.Contains(\"{term}\")");
            }

            // create json data

            q = q.Skip(pageIndex * pageSize).Take(pageSize);

            return Json(GetJsonData(q));

        }

        private dynamic GetJsonData(IQueryable<INVCO_Areas> q)
        {
            var jsonData = new
            {
                rows = from c in q
                       select new
                       {
                           c.Compania,
                           c.INVCOAreaId,
                           c.INVCOAreaDescripcion,
                           c.INVCOAreaEstado,
                           Estado = 'C'
                       },
                rowsCount = db.INVCO_Areas.Count()
            };

            return jsonData;
        }

        //Esto es para resolver un problema del CORS
        [ApiExplorerSettings(IgnoreApi = true)]
        public JsonResult Add()
        {
            return Json(new { error = "NO Llego nada" });
        }

        [HttpPost]
        public JsonResult Add([FromBody] INVCO_Areas row)
        {
            row.Compania = 1;
            row.INVCOAreaId = (db.INVCO_Areas.Max((p) => (int?)p.INVCOAreaId) ?? 0) + 1;
            db.Entry(row).Property("Fuente").CurrentValue = "CP27730";
            db.Entry(row).Property("Fecha_Computador").CurrentValue = DateTime.Now;
            db.Entry(row).Property("Usuario").CurrentValue = HttpContext.User.Identity.Name;

            db.INVCO_Areas.Add(row);

            if (IsValid(row))
            {
                db.SaveChanges();
            }
            else
            {
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
            return Json(new { error = "NO Llego nada" });
        }

        [HttpPut]
        public JsonResult Update([FromBody] INVCO_Areas urow)
        {
            var row = db.Get_INVCO_Areas(urow);

            row.INVCOAreaDescripcion = urow.INVCOAreaDescripcion;
            row.INVCOAreaEstado = urow.INVCOAreaEstado;

            db.Entry(row).Property("Fuente").CurrentValue = "CP27730";
            db.Entry(row).Property("Fecha_Computador").CurrentValue = DateTime.Now;
            db.Entry(row).Property("Usuario").CurrentValue = HttpContext.User.Identity.Name;

            if (IsValid(row))
            {
                db.SaveChanges();
            }
            else
            {
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
            return Json(new { error = "NO Llego nada" });
        }

        [HttpDelete("{Compania}/{INVCOAreaId}")]
        public JsonResult Delete(int Compania, int INVCOAreaId)
        {
            var row = db.Get_INVCO_Areas(Compania, INVCOAreaId);

            db.INVCO_Areas.Remove(row);

            db.SaveChanges();

            return Json(true);
        }

        private bool IsValid(INVCO_Areas row)
        {

            return ModelState.IsValid;
        }


        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}