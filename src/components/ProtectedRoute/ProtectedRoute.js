function ProtectedRoute(props){
  var a = useAuth()
  var nav = useNav()

  React.useEffect(function(){
    if(!a.user){
      nav.go('/login')
    }
  },[a.user])

  if(!a.user) return e('div',{className:'loading'},'loading...')
  return props.children
}
