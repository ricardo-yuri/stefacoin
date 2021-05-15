import Aula from '../models/aula.model';
import Avaliacao from '../models/avaliacao.model';
import Entity from './entity';

export default class Curso extends Entity {
  nome: string;
  descricao: string;
  idProfessor?: number;
  avaliacoes?: Avaliacao[];
  aulas?: Aula[];

  constructor() {
    super();
  }
}
