using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppRegistroAluguel
    {
        public AppRegistroAluguel()
        {
            
        }
        public AppRegistroAluguel(int id, DateTime dataFim, DateTime dataInicio ,int clienteId, int funcionarioId, int carroId) 
        {
            Id = id;
            DataFim = dataFim;
            DataInicio = dataInicio;
            ClienteId = clienteId;
            FuncionarioId = funcionarioId;
            CarroId = carroId;
        }
        public int Id { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataFim { get; set; }
        public double ValorAluguel { get; set; }


        public int ClienteId { get; set; }
        public AppCliente Cliente { get; set; }
        
        public int FuncionarioId { get; set; }
        public AppFuncionario Funcionario { get; set; }

        public int CarroId { get; set; }
        public AppCarro Carro { get; set; }


        public void valorFinal()
        {
            TimeSpan ts = DataFim.Subtract(DataInicio);
            ValorAluguel = Convert.ToInt32(ts.TotalDays) * Carro.ValorDiaria;
        }
    }
}