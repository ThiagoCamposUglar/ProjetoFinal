using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppGrupo
    {
        public int Id { get; set; }
        public string NomeGrupo { get; set; }

        [JsonIgnore]
        public List<AppCarro> Carros { get; set; }
    }
}