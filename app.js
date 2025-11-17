const processes=[
 {id:1,name:"Calcinación",area:"Producción",documents:[{name:"Procedimiento",type:"PDF",description:"Secuencia del proceso"}]},
 {id:2,name:"Mezclado",area:"Producción",documents:[{name:"Instructivo",type:"PDF",description:"Instructivo técnico"}]}
];

const list=document.getElementById("processList");
function render(){
 list.innerHTML="";
 processes.forEach(p=>{
   const c=document.createElement("div");
   c.className="process-card";
   c.innerHTML=`<h3>${p.name}</h3><p>${p.area}</p>`;
   list.appendChild(c);
 });
}
render();
