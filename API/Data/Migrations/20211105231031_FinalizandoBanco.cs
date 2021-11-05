using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class FinalizandoBanco : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CarroId",
                table: "Registros",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ClienteId",
                table: "Registros",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataFim",
                table: "Registros",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DataInicio",
                table: "Registros",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "FuncionarioId",
                table: "Registros",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "valorAluguel",
                table: "Registros",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "CargoId",
                table: "Funcionarios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GrupoId",
                table: "Carros",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Registros_CarroId",
                table: "Registros",
                column: "CarroId");

            migrationBuilder.CreateIndex(
                name: "IX_Registros_ClienteId",
                table: "Registros",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Registros_FuncionarioId",
                table: "Registros",
                column: "FuncionarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Funcionarios_CargoId",
                table: "Funcionarios",
                column: "CargoId");

            migrationBuilder.CreateIndex(
                name: "IX_Carros_GrupoId",
                table: "Carros",
                column: "GrupoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Carros_Grupos_GrupoId",
                table: "Carros",
                column: "GrupoId",
                principalTable: "Grupos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Funcionarios_Cargos_CargoId",
                table: "Funcionarios",
                column: "CargoId",
                principalTable: "Cargos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Registros_Carros_CarroId",
                table: "Registros",
                column: "CarroId",
                principalTable: "Carros",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Registros_Clientes_ClienteId",
                table: "Registros",
                column: "ClienteId",
                principalTable: "Clientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Registros_Funcionarios_FuncionarioId",
                table: "Registros",
                column: "FuncionarioId",
                principalTable: "Funcionarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carros_Grupos_GrupoId",
                table: "Carros");

            migrationBuilder.DropForeignKey(
                name: "FK_Funcionarios_Cargos_CargoId",
                table: "Funcionarios");

            migrationBuilder.DropForeignKey(
                name: "FK_Registros_Carros_CarroId",
                table: "Registros");

            migrationBuilder.DropForeignKey(
                name: "FK_Registros_Clientes_ClienteId",
                table: "Registros");

            migrationBuilder.DropForeignKey(
                name: "FK_Registros_Funcionarios_FuncionarioId",
                table: "Registros");

            migrationBuilder.DropIndex(
                name: "IX_Registros_CarroId",
                table: "Registros");

            migrationBuilder.DropIndex(
                name: "IX_Registros_ClienteId",
                table: "Registros");

            migrationBuilder.DropIndex(
                name: "IX_Registros_FuncionarioId",
                table: "Registros");

            migrationBuilder.DropIndex(
                name: "IX_Funcionarios_CargoId",
                table: "Funcionarios");

            migrationBuilder.DropIndex(
                name: "IX_Carros_GrupoId",
                table: "Carros");

            migrationBuilder.DropColumn(
                name: "CarroId",
                table: "Registros");

            migrationBuilder.DropColumn(
                name: "ClienteId",
                table: "Registros");

            migrationBuilder.DropColumn(
                name: "DataFim",
                table: "Registros");

            migrationBuilder.DropColumn(
                name: "DataInicio",
                table: "Registros");

            migrationBuilder.DropColumn(
                name: "FuncionarioId",
                table: "Registros");

            migrationBuilder.DropColumn(
                name: "valorAluguel",
                table: "Registros");

            migrationBuilder.DropColumn(
                name: "CargoId",
                table: "Funcionarios");

            migrationBuilder.DropColumn(
                name: "GrupoId",
                table: "Carros");
        }
    }
}
