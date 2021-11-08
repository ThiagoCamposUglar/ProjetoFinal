using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppCargo
    {
        public int Id { get; set; }
        public string NomeCargo { get; set; }
        
        [JsonIgnore]
        public List<AppFuncionario> Funcionarios { get; set; }
    }
}