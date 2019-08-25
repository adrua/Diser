//INVCO_PersonasModel.cs
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Diser.Inventarios.DataLayer.Models
{
	[Table("Personas", Schema="INVCO")] 
    public class INVCO_Personas : ICloneable
	{	
        [Column(TypeName="integer"), Required()]
		public int Compania {get; set;}
        [Column(TypeName="decimal(16, 0)"), Required()]
        public decimal INVCOPersonaId {get; set;}
        [Column(TypeName="varchar(33)"), Required(), MaxLength(33)]
        public string INVCOPersonaApellidos {get; set;}
        [Column(TypeName="varchar(36)"), Required(), MaxLength(36)]
        public string INVCOPersonaNombre {get; set;}
        [Display(Name = "Nombre Completo:"), Required(), StringLength(90)]
        public string INVCOPersonaNombreCompleto { get; set; }

        [Column(TypeName="varchar(250)"), Required(), MaxLength(250)]
        public string INVCOPersonaDireccion {get; set;}
        [Column(TypeName="varchar(4)"), Required(), MaxLength(4)]
        public string GOVCOPaisId {get; set;}
        [Column(TypeName="varchar(3)"), Required(), MaxLength(3)]
        public string GOVCODepartamentoId {get; set;}
        [Column(TypeName="varchar(6)"), Required(), MaxLength(6)]
        public string GOVCOCiudadId {get; set;}
        [NotMapped ]
        public string GOVCO_Ciudades_Comp  
        {
        	get { return (GOVCOPaisId+ "/" + GOVCODepartamentoId+ "/" + GOVCOCiudadId); } 
        	private set {}
        }
        [Column(TypeName="varchar(20)"), Required(), MaxLength(20)]
        public string INVCOPersonaTelefono {get; set;}
        [Column(TypeName="varchar(150)"), Required(), MaxLength(150)]
        public string INVCOPersonaEMail {get; set;}
        [Column(TypeName="Integer"), Required()]
        public int INVCOAreaId {get; set;}
        [Column(TypeName="varchar(2)"), Required(), MaxLength(2)]
        public string INVCOPersonaEstado {get; set;}

        public object Clone()
        {
            return this.MemberwiseClone();
        }

        public void SetKeyTo(dynamic row)
        {
            row.Compania = this.Compania;    
            row.INVCOPersonaId = this.INVCOPersonaId;
		}
	}
	
	public static class INVCO_Personas_Extension
	{	        
        public static INVCO_Personas Create_INVCO_Personas(this InventariosDbContext db)
        {
        	var row = new INVCO_Personas();
        	
			//row.INVCOPersonaEstado = 'AC';


        	return row;
        }

	    public static INVCO_Personas Get_INVCO_Personas(this InventariosDbContext db,
                                         int Compania,
			                             decimal INVCOPersonaId)			                             
        {
            INVCO_Personas entity = (
            				from r in db.INVCO_Personas
            					where r.Compania == Compania
                                   && r.INVCOPersonaId == INVCOPersonaId
					           select r).FirstOrDefault();

			return entity;
		}

        public static INVCO_Personas Get_INVCO_Personas(this InventariosDbContext db, 
                                                                         INVCO_Personas row)
        {
            INVCO_Personas entity = (
            				from r in db.INVCO_Personas
            					where r.Compania == row.Compania
                                    && r.INVCOPersonaId == row.INVCOPersonaId
            					select r).FirstOrDefault();

			return entity;
		}

        public static ModelBuilder FluentAPI_INVCO_Personas(this ModelBuilder modelBuilder)
        {
            var entity = modelBuilder.Entity<INVCO_Personas>();
            
            //PrimaryKey
            entity.HasKey(c => new { c.Compania, c.INVCOPersonaId});
            
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
