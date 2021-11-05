using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppCliente> Clientes { get; set; }
        public DbSet<AppFuncionario> Funcionarios { get; set; }
        public DbSet<AppCarro> Carros { get; set; }
        public DbSet<AppCargo> Cargos { get; set; }
        public DbSet<AppGrupo> Grupos { get; set; }
        public DbSet<AppRegistroAluguel> Registros { get; set; }   
    }
}