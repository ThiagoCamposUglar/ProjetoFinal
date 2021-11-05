using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppGrupo
    {
        public int Id { get; set; }
        public string NomeGrupo { get; set; }
        public List<AppCarro> Carros { get; set; } = new List<AppCarro>();
    }
}