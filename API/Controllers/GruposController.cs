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
    public class GruposController : BaseApiController
    {
        private readonly DataContext _context;
        public GruposController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppGrupo>>> GetGrupos()
        {
            return await _context.Grupos.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<AppGrupo> GetGrupos(int id)
        {
            return _context.Grupos.Find(id);
        }
    }
}