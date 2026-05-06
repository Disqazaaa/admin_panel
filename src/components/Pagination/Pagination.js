function Pagination(props){
  var arr = []
  var i = 1
  while(i <= props.pages){
    var cl = 'pg'
    if(i == props.page) cl = 'pg on'
    arr.push(e('button',{key:i,className:cl,onClick:(function(n){
      return function(){ props.setPage(n) }
    })(i)},i))
    i = i + 1
  }
  if(props.pages < 2) return null
  return e('div',{className:'pages'},arr)
}
