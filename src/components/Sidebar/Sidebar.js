function Sidebar(props){
  function item(p,t){
    var cl = 'side-btn'
    if(props.route == p) cl = 'side-btn active'
    return e('button',{className:cl,onClick:function(){props.go(p)}},t)
  }

  return e('div',{className:'sidebar'},
    e('div',{className:'logo'},'Admin'),
    e('div',{className:'side-list'},
      item('/dashboard','Dashboard'),
      item('/users','Users'),
      item('/products','Products')
    ),
    e('button',{className:'logout',onClick:props.onLogout},'Logout')
  )
}
