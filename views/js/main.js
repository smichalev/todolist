function del(index){
  if (confirm("Are you sure you want to cross out this task?")) {
      location.href='/delete/'+index;
  }
}
