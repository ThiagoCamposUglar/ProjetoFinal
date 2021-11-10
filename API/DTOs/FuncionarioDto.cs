using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class FuncionarioDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string NomeFuncionario { get; set; }
        public int CargoId { get; set; }
        public string Token { get; set; }
    }
}