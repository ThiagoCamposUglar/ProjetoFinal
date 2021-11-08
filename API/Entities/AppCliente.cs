using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppCliente
    {

        public int Id { get; set; }
        public string NomeCliente { get; set; }
        public string Telefone { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public List<AppRegistroAluguel> RegistrosAlugueis { get; set; }

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
    }
}