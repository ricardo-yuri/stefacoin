import Professor from '../entities/professor.entity';
import ProfessorRepository from '../repositories/professor.repository';
import { FilterQuery } from '../utils/database/database';
import Mensagem from '../utils/mensagem';
import { Validador } from '../utils/utils';
import { TipoUsuario } from '../utils/tipo-usuario.enum';
import ProfessorDto from '../models/professorDto.model';

export default class ProfessorController {
  async obterPorId(id: number): Promise<ProfessorDto> {
    Validador.validarParametros([{ id }]);
    let professorDto: ProfessorDto;
    await ProfessorRepository.obterPorId(id).then((professor) => {
      professorDto = {
        email: professor.email,
        id: professor.id,
        nome: professor.nome,
        tipo: professor.tipo
      }
    })
    return await professorDto;
  }

  async obter(filtro: FilterQuery<Professor> = {}): Promise<ProfessorDto> {
    let professorDto: ProfessorDto;
    await ProfessorRepository.obter(filtro).then((professor) => {
      professorDto = {
        email: professor.email,
        id: professor.id,
        nome: professor.nome,
        tipo: professor.tipo
      }
    })
    return professorDto;
  }

  // #pegabandeira
  async listar(filtro: FilterQuery<Professor> = {}): Promise<ProfessorDto[]> {
    filtro.tipo = TipoUsuario.PROFESSOR;
    const professoresDto: ProfessorDto[] = [];
    await ProfessorRepository.listar(filtro).then((professor) => {
      professor.forEach((p) => {
        professoresDto.push({
          email: p.email,
          id: p.id,
          nome: p.nome,
          tipo: p.tipo
        })
      })
    })
    return await professoresDto;
  }

  // #pegabandeira
  async incluir(professor: Professor) {
    const { nome, email, senha } = professor;

    Validador.validarParametros([{ nome }, { email }, { senha }]);

    professor.tipo = 1;

    const id = await ProfessorRepository.incluir(professor);

    return new Mensagem('Professor incluido com sucesso!', {
      id,
    });
  }

  async alterar(id: number, professor: Professor) {
    const { nome, email, senha } = professor;
    let professorId: Professor;
    Validador.validarParametros([{ id }, { nome }, { email }, { senha }]);

    await ProfessorRepository.obterPorId(id).then((professorR) => {
      professorId = professorR;
    }).catch(err => console.log(err));
    
    Validador.validarTrocaEmail(professor.email, professorId.email);

    await ProfessorRepository.alterar({ id }, professor);

    return new Mensagem('Professor alterado com sucesso!', {
      id,
    });
  }

  async excluir(id: number) {
    Validador.validarParametros([{ id }]);

    await ProfessorRepository.excluir({ id });

    return new Mensagem('Professor excluido com sucesso!', {
      id,
    });
  }
}
