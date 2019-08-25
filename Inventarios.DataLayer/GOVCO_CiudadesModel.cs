//GOVCO_CiudadesModel.cs
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Diser.Inventarios.DataLayer.Models
{
	[Table("Ciudades", Schema="GOVCO")] 
    public class GOVCO_Ciudades : ICloneable
	{	
        [Column(TypeName="integer"), Required()]
		public int Compania {get; set;}
        [Column(TypeName="varchar(4)"), Required(), MaxLength(4)]
        public string GOVCOPaisId {get; set;}
        [Column(TypeName="varchar(3)"), Required(), MaxLength(3)]
        public string GOVCODepartamentoId {get; set;}
        [Column(TypeName="varchar(6)"), Required(), MaxLength(6)]
        public string GOVCOCiudadId {get; set;}
        [NotMapped]
        public string GOVCO_Ciudades_Comp  
        {
        	get { return (GOVCOPaisId + "/" + GOVCODepartamentoId + "/" + GOVCOCiudadId ); } 
        	private set {}
        }
        [Column(TypeName="varchar(32)"), Required(), MaxLength(32)]
        public string GOVCOCiudadNombre {get; set;}
        [Column(TypeName="varchar(2)"), Required(), MaxLength(2)]
        public string GOVCOCiudadEstado {get; set;}

        public object Clone()
        {
            return this.MemberwiseClone();
        }

        public void SetKeyTo(dynamic row)
        {
            row.Compania = this.Compania;    
            row.GOVCOPaisId = this.GOVCOPaisId;
            row.GOVCODepartamentoId = this.GOVCODepartamentoId;
            row.GOVCOCiudadId = this.GOVCOCiudadId;
		}
	}
	
	public static class GOVCO_Ciudades_Extension
	{	        
        public static GOVCO_Ciudades Create_GOVCO_Ciudades(this InventariosDbContext db)
        {
        	var row = new GOVCO_Ciudades();
        	
			//row.GOVCOCiudadEstado = 'AC';


        	return row;
        }

	    public static GOVCO_Ciudades Get_GOVCO_Ciudades(this InventariosDbContext db,
                                         int Compania,
			                             string GOVCOPaisId,
			                             string GOVCODepartamentoId,
			                             string GOVCOCiudadId)			                             
        {
            GOVCO_Ciudades entity = (
            				from r in db.GOVCO_Ciudades
            					where r.Compania == Compania
                                   && r.GOVCOPaisId == GOVCOPaisId
                                   && r.GOVCODepartamentoId == GOVCODepartamentoId
                                   && r.GOVCOCiudadId == GOVCOCiudadId
					           select r).FirstOrDefault();

			return entity;
		}

        public static GOVCO_Ciudades Get_GOVCO_Ciudades(this InventariosDbContext db, 
                                                                         GOVCO_Ciudades row)
        {
            GOVCO_Ciudades entity = (
            				from r in db.GOVCO_Ciudades
            					where r.Compania == row.Compania
                                    && r.GOVCOPaisId == row.GOVCOPaisId
                                    && r.GOVCODepartamentoId == row.GOVCODepartamentoId
                                    && r.GOVCOCiudadId == row.GOVCOCiudadId
            					select r).FirstOrDefault();

			return entity;
		}

        public static ModelBuilder FluentAPI_GOVCO_Ciudades(this ModelBuilder modelBuilder)
        {
            var entity = modelBuilder.Entity<GOVCO_Ciudades>();
            
            //PrimaryKey
            entity.HasKey(c => new { c.Compania, c.GOVCOPaisId, c.GOVCODepartamentoId, c.GOVCOCiudadId});
            
            //Shadow Properties
            entity.Property<string>("Fuente");
            entity.Property<string>("FuenteImport");
            entity.Property<int?>("Proceso");
            entity.Property<DateTime?>("Fecha_Computador");
            entity.Property<string>("Usuario");

			return modelBuilder;
		}
    }

}
