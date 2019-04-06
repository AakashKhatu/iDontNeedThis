var today=new Date();
document.innerHTML.getElementById("year").setAttribute("min",String(today.getFullYear())) !important;
document.innerHTML.getElementById("month").setAttribute("min",String(today.getMonth()+1).padStart(2,'0')) !important;
