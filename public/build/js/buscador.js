function iniciarApp(){buscarPorFecha()}function buscarPorFecha(){document.querySelector("#fecha").addEventListener("change",e=>{const n=e.target.value;window.location="?fecha="+n})}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));