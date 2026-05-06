function Products(){
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
  var s6 = React.useState({name:'',category:'tech',price:'',status:'available'})
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
    while(i < d.products.length){
      var p = d.products[i]
      var ok = true
      if(search && p.name.toLowerCase().indexOf(search.toLowerCase()) == -1) ok = false
      if(status != 'all' && p.status != status) ok = false
      if(ok) a.push(p)
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
    setForm({name:'',category:'tech',price:'',status:'available'})
    setOpen(true)
  }

  function change(k,v){
    var x = {id:form.id,name:form.name,category:form.category,price:form.price,status:form.status}
    x[k] = v
    setForm(x)
  }

  function save(ev){
    ev.preventDefault()
    if(form.name == '' || form.price == ''){
      show('Заполни данные','error')
      return
    }
    if(edit){
      d.editProduct(edit.id,{id:edit.id,name:form.name,category:form.category,price:Number(form.price),status:form.status})
      show('Product edited')
    }else{
      d.addProduct({name:form.name,category:form.category,price:Number(form.price),status:form.status})
      show('Product added')
    }
    setOpen(false)
  }

  function doEdit(p){
    setEdit(p)
    setForm({id:p.id,name:p.name,category:p.category,price:p.price,status:p.status})
    setOpen(true)
  }

  function del(id){
    var ok = confirm('Delete product?')
    if(ok){
      d.delProduct(id)
      show('Product deleted')
    }
  }

  var rows = []
  var i = 0
  while(i < part.length){
    var p = part[i]
    rows.push(e('tr',{key:p.id},
      e('td',null,p.name),
      e('td',null,p.category),
      e('td',null,p.price),
      e('td',null,e('span',{className:'badge '+p.status},p.status)),
      e('td',null,
        e('button',{className:'small',onClick:(function(x){return function(){doEdit(x)}})(p)},'Edit'),
        e('button',{className:'small del',onClick:(function(id){return function(){del(id)}})(p.id)},'Delete')
      )
    ))
    i = i + 1
  }

  return e('div',{className:'products'},
    e(Toast,{text:toast,type:ttype}),
    e('div',{className:'tools'},
      e('input',{placeholder:'Search product',value:search,onChange:function(ev){setSearch(ev.target.value);setPage(1)}}),
      e('select',{value:status,onChange:function(ev){setStatus(ev.target.value);setPage(1)}},
        e('option',{value:'all'},'All'),
        e('option',{value:'available'},'Available'),
        e('option',{value:'out'},'Out')
      ),
      e('button',{onClick:add},'Add product')
    ),
    e('div',{className:'table-box'},
      e('table',null,
        e('thead',null,e('tr',null,e('th',null,'Name'),e('th',null,'Category'),e('th',null,'Price'),e('th',null,'Status'),e('th',null,'Actions'))),
        e('tbody',null,rows.length ? rows : e('tr',null,e('td',{colSpan:5},'No data')))
      )
    ),
    e(Pagination,{page:nowPage,pages:pages,setPage:setPage}),
    e(Modal,{open:open,title:edit ? 'Edit product' : 'Add product',onClose:function(){setOpen(false)}},
      e('form',{className:'form',onSubmit:save},
        e('input',{placeholder:'Name',value:form.name,onChange:function(ev){change('name',ev.target.value)}}),
        e('select',{value:form.category,onChange:function(ev){change('category',ev.target.value)}},
          e('option',{value:'tech'},'tech'),
          e('option',{value:'office'},'office'),
          e('option',{value:'furniture'},'furniture')
        ),
        e('input',{placeholder:'Price',type:'number',value:form.price,onChange:function(ev){change('price',ev.target.value)}}),
        e('select',{value:form.status,onChange:function(ev){change('status',ev.target.value)}},
          e('option',{value:'available'},'available'),
          e('option',{value:'out'},'out')
        ),
        e('button',null,'Save')
      )
    )
  )
}
