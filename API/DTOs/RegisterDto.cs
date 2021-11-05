using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string NomeFuncionario { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        public string Senha { get; set; }
        [Required]
        public int CargoId { get; set; }
    }
}