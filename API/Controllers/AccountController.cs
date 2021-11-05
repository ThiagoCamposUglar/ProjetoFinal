using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<FuncionarioDto>> Register(RegisterDto registerDto)
        {
            if (await FuncionarioExiste(registerDto.Login)) return BadRequest("Usuário já existe");

            using var hmac = new HMACSHA512();
            var funcionario = new AppFuncionario
            {
                NomeFuncionario = registerDto.NomeFuncionario,
                Login = registerDto.Login.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Senha)),
                PasswordSalt = hmac.Key,
                CargoId = registerDto.CargoId
            };

            _context.Funcionarios.Add(funcionario);
            await _context.SaveChangesAsync();

            return new FuncionarioDto
            {
                Username = funcionario.Login,
                Token = _tokenService.CreateToken(funcionario)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<FuncionarioDto>> Login(LoginDto loginDto)
        {
            var funcionario = await _context.Funcionarios.SingleOrDefaultAsync(x => x.Login == loginDto.UserName);

            if(funcionario == null) return Unauthorized("Usuário inválido");

            using var hmac = new HMACSHA512(funcionario.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Senha));

            for(int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != funcionario.PasswordHash[i]) return Unauthorized("Senha inválida");
            }

            return new FuncionarioDto
            {
                Username = funcionario.Login,
                NomeFuncionario = funcionario.NomeFuncionario,
                CargoId = funcionario.CargoId,
                Token = _tokenService.CreateToken(funcionario)
            };;
        }

        private async Task<bool> FuncionarioExiste(string login)
        {
            return await _context.Funcionarios.AnyAsync(x => x.Login == login.ToLower());
        }
    }
}