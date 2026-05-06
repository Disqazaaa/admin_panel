function Toast(props){
  if(!props.text) return null
  var cl = 'toast'
  if(props.type == 'error') cl = 'toast err'
  return e('div',{className:cl},props.text)
}
