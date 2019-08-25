//INVCO_AreasModel.cs
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Diser.Inventarios.DataLayer.Models
{
    [Table("Areas", Schema = "INVCO")]
    public class INVCO_Areas : ICloneable
    {
        [Column(TypeName = "integer"), Required()]
        public int Compania { get; set; }
        [Column(TypeName = "Integer"), Required()]
        public int INVCOAreaId { get; set; }
        [Column(TypeName = "varchar(33)"), Required(), MaxLength(33)]
        public string INVCOAreaDescripcion { get; set; }
        [Column(TypeName = "varchar(2)"), Required(), MaxLength(2)]
        public string INVCOAreaEstado { get; set; }

        public object Clone()
        {
            return this.MemberwiseClone();
        }

        public void SetKeyTo(dynamic row)
        {
            row.Compania = this.Compania;
            row.INVCOAreaId = this.INVCOAreaId;
        }
    }

    public static class INVCO_Areas_Extension
    {
        public static INVCO_Areas Create_INVCO_Areas(this InventariosDbContext db)
        {
            var row = new INVCO_Areas();

            row.INVCOAreaId = 0;
            row.INVCOAreaEstado = "AC";

            row.INVCOAreaId = db.INVCO_Areas.Max((p) => p.INVCOAreaId) + 1;

            return row;
        }

        public static INVCO_Areas Get_INVCO_Areas(this InventariosDbContext db,
                                         int Compania,
                                         int INVCOAreaId)
        {
            INVCO_Areas entity = (
                            from r in db.INVCO_Areas
                            where r.Compania == Compania
                               && r.INVCOAreaId == INVCOAreaId
                            select r).FirstOrDefault();

            return entity;
        }

        public static INVCO_Areas Get_INVCO_Areas(this InventariosDbContext db,
                                                                         INVCO_Areas row)
        {
            INVCO_Areas entity = (
                            from r in db.INVCO_Areas
                            where r.Compania == row.Compania
                                && r.INVCOAreaId == row.INVCOAreaId
                            select r).FirstOrDefault();

            return entity;
        }

        public static ModelBuilder FluentAPI_INVCO_Areas(this ModelBuilder modelBuilder)
        {
            var entity = modelBuilder.Entity<INVCO_Areas>();

            //PrimaryKey
            entity.HasKey(c => new { c.Compania, c.INVCOAreaId });

            //Shadow Properties
            entity.Property<string>("Fuente");
            entity.Property<string>("FuenteImport");
            entity.Property<int?>("Proceso");
            entity.Property<DateTime?>("Fecha_Computador");
            entity.Property<string>("Usuario");
            entity.Property<DateTime?>("Fecha_Impresion");
            entity.Property<DateTime?>("Fecha_Reimpresion");

            return modelBuilder;
        }
    }

}
