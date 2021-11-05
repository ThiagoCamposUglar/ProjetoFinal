using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppRegistroAluguel
    {
        public int Id { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public double valorAluguel { get; set; }


        public int ClienteId { get; set; }
        public AppCliente Cliente { get; set; }
        
        public int FuncionarioId { get; set; }
        public AppFuncionario Funcionario { get; set; }

        public int CarroId { get; set; }
        public AppCarro Carro { get; set; }
    }
}