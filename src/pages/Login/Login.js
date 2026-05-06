function Login(){
  var a = useAuth()
  var nav = useNav()
  var em = React.useState('')
  var email = em[0]
  var setEmail = em[1]
  var ps = React.useState('')
  var pass = ps[0]
  var setPass = ps[1]
  var er = React.useState('')
  var err = er[0]
  var setErr = er[1]

  React.useEffect(function(){
    if(a.user) nav.go('/dashboard')
  },[a.user])

  function sub(ev){
    ev.preventDefault()
    if(email == '' || pass == ''){
      setErr('Заполни поля')
      return
    }
    var ok = a.login(email,pass)
    if(ok){
      nav.go('/dashboard')
    }else{
      setErr('Неверный логин или пароль')
    }
  }

  return e('div',{className:'login-page'},
    e('form',{className:'login-box',onSubmit:sub},
      e('h1',null,'Admin panel'),
      e('p',null,'admin@admin.com / admin123'),
      e('input',{value:email,onChange:function(ev){setEmail(ev.target.value)},placeholder:'email'}),
      e('input',{value:pass,onChange:function(ev){setPass(ev.target.value)},placeholder:'password',type:'password'}),
      err ? e('div',{className:'login-err'},err) : null,
      e('button',null,'Login')
    )
  )
}
