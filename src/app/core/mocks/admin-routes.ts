import { AdminRoute } from "../interfaces/admin-route";
import { UsuarioDto } from "../interfaces/usuario";



export const usuarioRoutes: AdminRoute[] = [
  {
    title: 'Início',
    icon: 'dashboard',
    href: '/admin'
  },
  {
      title: 'Instituição',
      icon: 'insert_chart',
      href: '/admin/instituicoes'
  },
  {
    title: 'Meu Perfil',
    icon: 'account_circle',
    href: '/admin/perfil'
  }
]


const adminRoutes: AdminRoute[] = [
    {
    title: 'Início',
    icon: 'dashboard',
    href: '/admin'
  },
  {
      title: 'Instituições',
      icon: 'insert_chart',
      href: '/admin/instituicoes'
  },
  {
      title: 'Usuários',
      icon: 'group',
      href: '/admin/usuarios'
  },
  {
    title: 'Meu Perfil',
    icon: 'account_circle',
    href: '/admin/perfil'
  },
  {
    title: 'Configurações',
    icon: 'settings',
    href: '/admin/configuracoes'
  },

]

export function getRoutes(usuario: UsuarioDto) {
  if (usuario.tipo === 'CONSULTOR') {
    return adminRoutes;
  } else {
    return usuarioRoutes;
  }
}