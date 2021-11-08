using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppFuncionario
    {
        public int Id { get; set; }
        public string NomeFuncionario { get; set; }
        public string Login { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public int CargoId { get; set; }
        public AppCargo Cargo { get; set; }
        
        public List<AppRegistroAluguel> RegistrosAlugueis { get; set; }
    }
}