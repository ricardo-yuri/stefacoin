import Curso from '../entities/curso.entity';

export class AlunoDto {
  id?: number;
  nome?: string;
  email?: string;
  formacao?: string;
  idade?: string
  cursos?: Curso[];

}
