import { AlunoDto } from './../models/alunoDto.model';
import Aluno from '../entities/aluno.entity';
import AlunoRepository from '../repositories/aluno.repository';
import { FilterQuery } from '../utils/database/database';
import Mensagem from '../utils/mensagem';
import { Validador } from '../utils/utils';
import { TipoUsuario } from '../utils/tipo-usuario.enum';


export default class AlunoController {
  async obterPorId(id: number): Promise<AlunoDto> {
    Validador.validarParametros([{ id }]);
    let alunoDto: AlunoDto;
    await AlunoRepository.obterPorId(id).then((a) => {
      alunoDto = {
        cursos: a.cursos,
        email: a.email,
        formacao: a.email,
        id: a.id,
        idade: a.idade,
        nome: a.nome
      }
    });
    return alunoDto;
  }

  async obter(filtro: FilterQuery<Aluno> = {}): Promise<AlunoDto> {
    let alunoDto: AlunoDto;
    await AlunoRepository.obter(filtro).then((a) => {
      alunoDto = {
        cursos: a.cursos,
        email: a.email,
        formacao: a.formacao,
        id: a.id,
        idade: a.idade,
        nome: a.nome
      }
    })
    return alunoDto;
  }

  async listar(filtro: FilterQuery<Aluno> = {}): Promise<AlunoDto[]> {
    filtro.tipo = TipoUsuario.ALUNO;
    const alunosDto: AlunoDto[] = [];
    await AlunoRepository.listar(filtro).then((a) => {
      a.forEach((aluno) => {
        alunosDto.push({
          cursos: aluno.cursos,
          email: aluno.email,
          formacao: aluno.formacao,
          id: aluno.id,
          idade: aluno.idade,
          nome: aluno.nome
        });
      })
    })
    return await AlunoRepository.listar(filtro);
  }

  // #pegabandeira
  async incluir(aluno: Aluno) {
    const { nome, formacao, idade, email, senha } = aluno;
    Validador.validarParametros([{ nome }, { formacao }, { idade }, { email }, { senha }]);
    const id = await AlunoRepository.incluir(aluno);
    return new Mensagem('Aluno incluido com sucesso!', {
      id,
    });
  }

  async alterar(id: number, aluno: Aluno) {
    Validador.validarParametros([{ id }]);
    await AlunoRepository.alterar({ id }, aluno);
    return new Mensagem('Aluno alterado com sucesso!', {
      id,
    });
  }

  async excluir(id: number) {
    Validador.validarParametros([{ id }]);
    await AlunoRepository.excluir({ id });
    return new Mensagem('Aluno excluido com sucesso!', {
      id,
    });
  }
}
