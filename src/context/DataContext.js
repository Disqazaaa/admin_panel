var DataContext = React.createContext(null)

function loadArr(name,arr){
  var t = localStorage.getItem(name)
  if(t){
    try{
      return JSON.parse(t)
    }catch(err){
      return arr
    }
  }
  return arr
}

function DataProvider(props){
  var u = React.useState(loadArr('adm_users',mockUsers))
  var users = u[0]
  var setUsers = u[1]
  var p = React.useState(loadArr('adm_products',mockProducts))
  var products = p[0]
  var setProducts = p[1]

  React.useEffect(function(){
    localStorage.setItem('adm_users',JSON.stringify(users))
  },[users])

  React.useEffect(function(){
    localStorage.setItem('adm_products',JSON.stringify(products))
  },[products])

  function addUser(x){
    var a = users.slice()
    x.id = Date.now()
    a.unshift(x)
    setUsers(a)
  }

  function editUser(id,x){
    var a = []
    var i = 0
    while(i < users.length){
      if(users[i].id == id){
        a.push(x)
      }else{
        a.push(users[i])
      }
      i = i + 1
    }
    setUsers(a)
  }

  function delUser(id){
    var a = []
    var i = 0
    while(i < users.length){
      if(users[i].id != id) a.push(users[i])
      i = i + 1
    }
    setUsers(a)
  }

  function addProduct(x){
    var a = products.slice()
    x.id = Date.now()
    a.unshift(x)
    setProducts(a)
  }

  function editProduct(id,x){
    var a = []
    var i = 0
    while(i < products.length){
      if(products[i].id == id){
        a.push(x)
      }else{
        a.push(products[i])
      }
      i = i + 1
    }
    setProducts(a)
  }

  function delProduct(id){
    var a = []
    var i = 0
    while(i < products.length){
      if(products[i].id != id) a.push(products[i])
      i = i + 1
    }
    setProducts(a)
  }

  return e(DataContext.Provider,{value:{
    users:users, products:products,
    addUser:addUser, editUser:editUser, delUser:delUser,
    addProduct:addProduct, editProduct:editProduct, delProduct:delProduct
  }},props.children)
}

function useData(){
  return React.useContext(DataContext)
}
