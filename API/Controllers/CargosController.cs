using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CargosController : BaseApiController
    {
        private readonly DataContext _context;
        public CargosController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppCargo>>> GetCargos(){
            return await _context.Cargos.ToListAsync();
        }
    }
}