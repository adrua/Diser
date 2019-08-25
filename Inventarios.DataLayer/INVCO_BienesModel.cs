//INVCO_BienesModel.cs
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Diser.Inventarios.DataLayer.Models
{
	[Table("Bienes", Schema="INVCO")] 
    public class INVCO_Bienes : ICloneable
	{	
        [Column(TypeName="integer"), Required()]
		public int Compania {get; set;}
        [Column(TypeName="Integer"), Required()]
        public int INVCOBienId {get; set;}
        [Column(TypeName="varchar(72)"), Required(), MaxLength(72)]
        public string INVCOBienNombre {get; set;}
        [Column(TypeName="varchar(62)"), Required()]
        public string INVCOBienDescripcion {get; set;}
        [Column(TypeName="varchar(2)"), Required(), MaxLength(2)]
        public string INVCOBienTipo {get; set;}
        [Column(TypeName="varchar(18)"), Required(), MaxLength(18)]
        public string INVCOBienSerial {get; set;}
        [Column(TypeName="decimal(18, 2)"), Required()]
        public decimal INVCOBienValorCompra {get; set;}
        [Column(TypeName="DateTime"), Required()]
        public DateTime INVCOBienFechaCompra {get; set;}
        [Column(TypeName="varchar(2)"), Required(), MaxLength(2)]
        public string INVCOBienEstadoActual {get; set;}
        [Column(TypeName="Integer"), Required()]
        public int INVCOAreaId {get; set;}
        [Column(TypeName="decimal(16, 0)"), Required()]
        public decimal INVCOPersonaId {get; set;}

        public object Clone()
        {
            return this.MemberwiseClone();
        }

        public void SetKeyTo(dynamic row)
        {
            row.Compania = this.Compania;    
            row.INVCOBienId = this.INVCOBienId;
		}
	}
	
	public static class INVCO_Bienes_Extension
	{	        
        public static INVCO_Bienes Create_INVCO_Bienes(this InventariosDbContext db)
        {
        	var row = new INVCO_Bienes();
        	
			//row.INVCOBienId = 0;
			//row.INVCOBienTipo = 'MB';
			//row.INVCOBienValorCompra = 0.0;
			//row.INVCOBienEstadoActual = 'AC';

			//row.INVCOBienId = db.INVCO_Bienes.Max((p) => p.INVCOBienId) + 1;

        	return row;
        }

	    public static INVCO_Bienes Get_INVCO_Bienes(this InventariosDbContext db,
                                         int Compania,
			                             int INVCOBienId)			                             
        {
            INVCO_Bienes entity = (
            				from r in db.INVCO_Bienes
            					where r.Compania == Compania
                                   && r.INVCOBienId == INVCOBienId
					           select r).FirstOrDefault();

			return entity;
		}

        public static INVCO_Bienes Get_INVCO_Bienes(this InventariosDbContext db, 
                                                                         INVCO_Bienes row)
        {
            INVCO_Bienes entity = (
            				from r in db.INVCO_Bienes
            					where r.Compania == row.Compania
                                    && r.INVCOBienId == row.INVCOBienId
            					select r).FirstOrDefault();

			return entity;
		}

        public static ModelBuilder FluentAPI_INVCO_Bienes(this ModelBuilder modelBuilder)
        {
            var entity = modelBuilder.Entity<INVCO_Bienes>();
            
            //PrimaryKey
            entity.HasKey(c => new { c.Compania, c.INVCOBienId});
            
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
