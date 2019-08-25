using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Diser.Inventarios.DataLayer.Models
{
    public class InventariosDbContext : DbContext 
    {
        public DbSet<INVCO_Areas> INVCO_Areas { get; set; }
        public DbSet<INVCO_Personas> INVCO_Personas { get; set; }
        public DbSet<GOVCO_Ciudades> GOVCO_Ciudades { get; set; }
        public DbSet<INVCO_Bienes> INVCO_Bienes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.FluentAPI_INVCO_Areas();
            modelBuilder.FluentAPI_INVCO_Personas();
            modelBuilder.FluentAPI_GOVCO_Ciudades();
            modelBuilder.FluentAPI_INVCO_Bienes();
        }
        public InventariosDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
