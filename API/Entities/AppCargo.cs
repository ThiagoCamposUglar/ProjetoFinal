using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppCargo
    {
        public int Id { get; set; }
        public string NomeCargo { get; set; }
        public List<AppFuncionario> Funcionarios { get; set; }
    }
}