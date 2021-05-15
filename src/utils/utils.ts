import { Usuario } from './../../../stefacoin-front/src/app/models/usuario';
import bcrypt from 'bcryptjs';
import BusinessException from '../utils/exceptions/business.exception';
import UnauthorizedException from '../utils/exceptions/unauthorized.exception';

export const Validador = {
  validarParametros: (parametros: any[]) => {
    if (!parametros) return true;

    const parametrosInvalidos = parametros
      .filter((p) => {
        const attr = Object.keys(p)[0];
        return (
          p[attr] === null ||
          p[attr] === undefined ||
          (typeof p[attr] === 'number' && isNaN(p[attr])) ||
          (typeof p[attr] === 'string' && p[attr] === '')
        );
      })
      .map((p) => Object.keys(p)[0]);

    if (parametrosInvalidos.length) {
      throw new BusinessException(`Os seguintes parametros são obrigatórios: ${parametrosInvalidos.join(', ')}`);
    }
    return true;
  },

  validarSenha: (senha: string, senhaAtual: string) => {
    const isValid = bcrypt.compareSync(senha, senhaAtual);

    if (!isValid) {
      throw new UnauthorizedException('Usuário ou senha inválida.');
    }
  },

  validarUserNull: (usuario: Usuario) => {
    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha inválida.');
    }
  },

  validarTrocaEmail: (email: string, emailAtual: string) => {
    console.log('true or false', email === emailAtual)
    if (email != emailAtual) {
      throw new BusinessException('Não é possível alterar o e-mail.');
    }
    console.log('email', email);
    console.log('emailAtual', emailAtual)

  },

  criptografarSenha: (senha: string): string => {
    return bcrypt.hashSync(senha, 8);
  },
};
