function Header(props){
  return e('div',{className:'header'},
    e('div',null,e('h2',null,props.title)),
    e('div',{className:'user-mini'},props.name)
  )
}
