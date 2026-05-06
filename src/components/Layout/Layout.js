function Layout(props){
  var a = useAuth()
  var title = 'Dashboard'
  if(props.route == '/users') title = 'Users'
  if(props.route == '/products') title = 'Products'

  function out(){
    a.logout()
    props.go('/login')
  }

  return e('div',{className:'layout'},
    e(Sidebar,{route:props.route,go:props.go,onLogout:out}),
    e('div',{className:'main'},
      e(Header,{title:title,name:a.user ? a.user.name : ''}),
      e('div',{className:'page'},props.children)
    )
  )
}
