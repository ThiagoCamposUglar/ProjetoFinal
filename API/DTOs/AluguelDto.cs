using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AluguelDto
    {
        [Required]
        public DateTime DataInicio { get; set; }
        [Required]
        public DateTime DataFim { get; set; }
        [Required]
        public int ClienteId { get; set; }
        [Required]
        public int FuncionarioId { get; set; }
        [Required]
        public int CarroId { get; set; }
    }
}