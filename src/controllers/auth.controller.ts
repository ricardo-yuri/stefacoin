import { TipoUsuario } from './../utils/tipo-usuario.enum';
import { getTime } from 'date-fns';
import jwt from 'jsonwebtoken';
import Usuario from '../entities/usuario.entity';
import Login from '../models/login.model';
import UsuarioRepository from '../repositories/usuario.repository';
import config from '../utils/config/config';
import UnauthorizedException from '../utils/exceptions/unauthorized.exception';
import { Validador } from '../utils/utils';
import AlunoController from './aluno.controller';
import ProfessorController from './professor.controller';
import Mensagem from '../utils/mensagem';

export default class AuthController {
  async login(crendeciais: Usuario): Promise<Login> {
    const { email, senha } = crendeciais;

    Validador.validarParametros([{ email }, { senha }]);
    const usuario = await UsuarioRepository.obter({ email });

    Validador.validarUserNull(crendeciais);

    await Validador.validarSenha(senha, usuario.senha);

    const accessToken = jwt.sign({ email: usuario.email, tipo: usuario.tipo }, config.auth.secret, {
      expiresIn: config.auth.expiresIn,
    });

    return {
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tipo,
      },
      token: accessToken,
      expires: getTime(Date.now() / 1000) + 604800,
    };
  }

  async criarNovaConta(crendeciais: Usuario) {
    const { email, senha, tipo } = crendeciais;

    Validador.validarParametros([{ email }, { senha }, { tipo }]);

    if (crendeciais.tipo == TipoUsuario.ALUNO) {
      new AlunoController().incluir(crendeciais);
    } else {
      new ProfessorController().incluir(crendeciais);
    }
    return {
      message: 'deu good'
    };

  }
}
