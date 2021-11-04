using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppFuncionario
    {
        public int Id { get; set; }
        public string NomeFuncionario { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
    }
}