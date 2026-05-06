function Modal(props){
  if(!props.open) return null
  return e('div',{className:'modal-bg'},
    e('div',{className:'modal'},
      e('div',{className:'modal-top'},
        e('h3',null,props.title),
        e('button',{className:'xbtn',onClick:props.onClose},'x')
      ),
      e('div',{className:'modal-body'},props.children)
    )
  )
}
