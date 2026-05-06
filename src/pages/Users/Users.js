function Users(){
  var d = useData()
  var s1 = React.useState('')
  var search = s1[0]
  var setSearch = s1[1]
  var s2 = React.useState('all')
  var status = s2[0]
  var setStatus = s2[1]
  var s3 = React.useState(1)
  var page = s3[0]
  var setPage = s3[1]
  var s4 = React.useState(false)
  var open = s4[0]
  var setOpen = s4[1]
  var s5 = React.useState(null)
  var edit = s5[0]
  var setEdit = s5[1]
  var s6 = React.useState({name:'',email:'',status:'active'})
  var form = s6[0]
  var setForm = s6[1]
  var s7 = React.useState('')
  var toast = s7[0]
  var setToast = s7[1]
  var s8 = React.useState('success')
  var ttype = s8[0]
  var setTtype = s8[1]

  function show(t,tp){
    setToast(t)
    setTtype(tp || 'success')
    setTimeout(function(){setToast('')},1800)
  }

  function filt(){
    var a = []
    var i = 0
    while(i < d.users.length){
      var u = d.users[i]
      var ok = true
      if(search && u.name.toLowerCase().indexOf(search.toLowerCase()) == -1) ok = false
      if(status != 'all' && u.status != status) ok = false
      if(ok) a.push(u)
      i = i + 1
    }
    return a
  }

  var all = filt()
  var pages = Math.ceil(all.length / 10)
  if(pages == 0) pages = 1
  var nowPage = page
  if(nowPage > pages) nowPage = pages
  var start = (nowPage - 1) * 10
  var part = all.slice(start,start+10)

  function add(){
    setEdit(null)
    setForm({name:'',email:'',status:'active'})
    setOpen(true)
  }

  function change(k,v){
    var x = {id:form.id,name:form.name,email:form.email,status:form.status}
    x[k] = v
    setForm(x)
  }

  function save(ev){
    ev.preventDefault()
    if(form.name == '' || form.email == ''){
      show('Заполни данные','error')
      return
    }
    if(edit){
      d.editUser(edit.id,{id:edit.id,name:form.name,email:form.email,status:form.status})
      show('User edited')
    }else{
      d.addUser({name:form.name,email:form.email,status:form.status})
      show('User added')
    }
    setOpen(false)
  }

  function doEdit(u){
    setEdit(u)
    setForm({id:u.id,name:u.name,email:u.email,status:u.status})
    setOpen(true)
  }

  function del(id){
    var ok = confirm('Delete user?')
    if(ok){
      d.delUser(id)
      show('User deleted')
    }
  }

  var rows = []
  var i = 0
  while(i < part.length){
    var u = part[i]
    rows.push(e('tr',{key:u.id},
      e('td',null,u.name),
      e('td',null,u.email),
      e('td',null,e('span',{className:'badge '+u.status},u.status)),
      e('td',null,
        e('button',{className:'small',onClick:(function(x){return function(){doEdit(x)}})(u)},'Edit'),
        e('button',{className:'small del',onClick:(function(id){return function(){del(id)}})(u.id)},'Delete')
      )
    ))
    i = i + 1
  }

  return e('div',{className:'users'},
    e(Toast,{text:toast,type:ttype}),
    e('div',{className:'tools'},
      e('input',{placeholder:'Search name',value:search,onChange:function(ev){setSearch(ev.target.value);setPage(1)}}),
      e('select',{value:status,onChange:function(ev){setStatus(ev.target.value);setPage(1)}},
        e('option',{value:'all'},'All'),
        e('option',{value:'active'},'Active'),
        e('option',{value:'blocked'},'Blocked')
      ),
      e('button',{onClick:add},'Add user')
    ),
    e('div',{className:'table-box'},
      e('table',null,
        e('thead',null,e('tr',null,e('th',null,'Name'),e('th',null,'Email'),e('th',null,'Status'),e('th',null,'Actions'))),
        e('tbody',null,rows.length ? rows : e('tr',null,e('td',{colSpan:4},'No data')))
      )
    ),
    e(Pagination,{page:nowPage,pages:pages,setPage:setPage}),
    e(Modal,{open:open,title:edit ? 'Edit user' : 'Add user',onClose:function(){setOpen(false)}},
      e('form',{className:'form',onSubmit:save},
        e('input',{placeholder:'Name',value:form.name,onChange:function(ev){change('name',ev.target.value)}}),
        e('input',{placeholder:'Email',value:form.email,onChange:function(ev){change('email',ev.target.value)}}),
        e('select',{value:form.status,onChange:function(ev){change('status',ev.target.value)}},
          e('option',{value:'active'},'active'),
          e('option',{value:'blocked'},'blocked')
        ),
        e('button',null,'Save')
      )
    )
  )
}
