var RouteContext = React.createContext(null)

function useNav(){
  return React.useContext(RouteContext)
}

function getRoute(){
  var p = window.location.pathname
  if(p == '/') return '/dashboard'
  return p
}

function App(){
  var s = React.useState(getRoute())
  var route = s[0]
  var setRoute = s[1]

  React.useEffect(function(){
    function pop(){
      setRoute(getRoute())
    }
    window.addEventListener('popstate',pop)
    return function(){
      window.removeEventListener('popstate',pop)
    }
  },[])

  function go(p){
    if(window.location.pathname != p){
      window.history.pushState(null,'',p)
    }
    setRoute(p)
  }

  function page(){
    if(route == '/login') return e(Login,null)

    var child = null
    if(route == '/dashboard' || route == '/') child = e(Dashboard,null)
    if(route == '/users') child = e(Users,null)
    if(route == '/products') child = e(Products,null)
    if(child == null) child = e(Dashboard,null)

    return e(ProtectedRoute,null,
      e(Layout,{route:route,go:go}, child)
    )
  }

  return e(RouteContext.Provider,{value:{go:go,route:route}},
    e(AuthProvider,null,
      e(DataProvider,null,page())
    )
  )
}
