using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppCarro
    {
        public int Id { get; set; }
        public string Modelo { get; set; }
        public string Marca { get; set; }
        public string Placa { get; set; }
        public string Ano { get; set; }
        public double ValorDiaria { get; set; }
        public string Cor { get; set; }

        public int GrupoId { get; set; }
        public AppGrupo Grupo { get; set; }
        
        public List<AppRegistroAluguel> RegistrosAlugueis { get; set; } = new List<AppRegistroAluguel>();
    }
}