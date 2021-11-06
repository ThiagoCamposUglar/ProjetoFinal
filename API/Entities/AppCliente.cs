using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppCliente
    {
        public AppCliente()
        {
        }

        public AppCliente(int id, string telefone, string email, string nomeCliente, string cpf) 
        {
            Id = id;
            Telefone = telefone;
            Email = email;
            NomeCliente = nomeCliente;
            Cpf = cpf;
        }
        public int Id { get; set; }
        public string NomeCliente { get; set; }
        public string Telefone { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        public List<AppRegistroAluguel> RegistrosAlugueis { get; set; } = new List<AppRegistroAluguel>();
    }
}