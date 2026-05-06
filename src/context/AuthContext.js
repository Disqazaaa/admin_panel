var AuthContext = React.createContext(null)

function readUser(){
  var t = localStorage.getItem('adm_user')
  if(t){
    try{
      return JSON.parse(t)
    }catch(err){
      return null
    }
  }
  return null
}

function AuthProvider(props){
  var s = React.useState(readUser())
  var user = s[0]
  var setUser = s[1]

  function login(email,pass){
    if(email == 'admin@admin.com' && pass == 'admin123'){
      var u = {name:'Admin',email:email}
      localStorage.setItem('adm_user',JSON.stringify(u))
      setUser(u)
      return true
    }
    return false
  }

  function logout(){
    localStorage.removeItem('adm_user')
    setUser(null)
  }

  return e(AuthContext.Provider,{value:{user:user,login:login,logout:logout}},props.children)
}

function useAuth(){
  return React.useContext(AuthContext)
}
