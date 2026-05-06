function Dashboard(){
  var d = useData()
  var active = 0
  var i = 0
  while(i < d.users.length){
    if(d.users[i].status == 'active') active = active + 1
    i = i + 1
  }
  var last = d.users.slice(0,5)
  var rows = []
  i = 0
  while(i < last.length){
    rows.push(e('tr',{key:last[i].id},
      e('td',null,last[i].name),
      e('td',null,last[i].email),
      e('td',null,last[i].status)
    ))
    i = i + 1
  }

  return e('div',{className:'dash'},
    e('div',{className:'stats'},
      e('div',{className:'stat'},e('span',null,'Users'),e('b',null,d.users.length)),
      e('div',{className:'stat'},e('span',null,'Products'),e('b',null,d.products.length)),
      e('div',{className:'stat'},e('span',null,'Active users'),e('b',null,active))
    ),
    e('div',{className:'table-box'},
      e('h3',null,'Last users'),
      e('table',null,
        e('thead',null,e('tr',null,e('th',null,'Name'),e('th',null,'Email'),e('th',null,'Status'))),
        e('tbody',null,rows)
      )
    )
  )
}
