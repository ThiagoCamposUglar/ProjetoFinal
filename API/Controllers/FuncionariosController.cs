using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class FuncionariosController : BaseApiController
    {
        private readonly DataContext _context;
        public FuncionariosController(DataContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppFuncionario>>> GetFuncionarios()
        {
            return await _context.Funcionarios.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<AppFuncionario> GetFuncionario(int id)
        {
            return _context.Funcionarios.Find(id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFuncionario(int id)
        {
            var funcionario = await _context.Funcionarios.FindAsync(id);
            if (funcionario == null)
            {
                return NotFound();
            }

            _context.Funcionarios.Remove(funcionario);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}