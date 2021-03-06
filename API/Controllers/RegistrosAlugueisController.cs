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
    public class RegistrosAlugueisController : BaseApiController
    {
        private readonly DataContext _context;
        public RegistrosAlugueisController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppRegistroAluguel>>> GetRegistros()
        {
            return await _context.Registros.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppRegistroAluguel>> GetRegistro(int id)
        {
            var registroAluguel = await _context.Registros.FindAsync(id);

            if(registroAluguel == null)
            {
                return NotFound();
            }

            return registroAluguel;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegistro(int id, AppRegistroAluguel registroAluguel)
        {
            if (id != registroAluguel.Id)
            {
                return BadRequest();
            }

            _context.Entry(registroAluguel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<AppRegistroAluguel>> PostRegistro(AppRegistroAluguel registroAluguel)
        {
            registroAluguel.Carro = await _context.Carros.FindAsync(registroAluguel.CarroId);
            TimeSpan ts = registroAluguel.DataFim.Subtract(registroAluguel.DataInicio);
            registroAluguel.ValorAluguel = Convert.ToInt32(ts.TotalDays + 1) * registroAluguel.Carro.ValorDiaria;
            _context.Registros.Add(registroAluguel);
            await _context.SaveChangesAsync();

            return Ok(CreatedAtAction("GetRegistro", new { id = registroAluguel.Id }, registroAluguel));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegistro(int id)
        {
            var registro = await _context.Registros.FindAsync(id);
            if (registro == null)
            {
                return NotFound();
            }

            _context.Registros.Remove(registro);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool RegistroExists(int id)
        {
            return _context.Registros.Any(e => e.Id == id);
        }
    }
}