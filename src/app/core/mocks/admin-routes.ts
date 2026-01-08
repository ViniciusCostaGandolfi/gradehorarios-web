import { AdminRoute } from "../interfaces/admin-route";
import { UserDto } from "../interfaces/usuario";



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

export function getRoutes(usuario: UserDto) {
  if (usuario.role === 'ROLE_USER') {
    return adminRoutes;
  } else {
    return usuarioRoutes;
  }
}