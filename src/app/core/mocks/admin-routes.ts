import { AdminRoute } from "../interfaces/admin-route";



export const adminRoutes: AdminRoute[] = [
  {    
    title: 'Início',
    icon: 'dashboard',
    href: '/admin'
  },
  {
      title: 'Escolas',
      icon: 'insert_chart',
      href: '/admin/escolas'
  },
  {
    title: 'Meu Perfil',
    icon: 'account_circle',
    href: '/admin/perfil'
  },
  // {
  //   title: 'Configurações',
  //   icon: 'settings',
  //   href: '/admin/configuracoes'
  // }
]