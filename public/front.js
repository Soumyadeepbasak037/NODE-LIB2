const view_books=()=>{
    fetch("/view-books")
    .then(response=>response.json())
    .then(data=>console.log(typeof(data)))
   
}