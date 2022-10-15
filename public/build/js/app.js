let paso=1;const pasoInicial=1,pasoFinal=3,cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paginaSiguiente(),paginaAnterior(),consultarAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");const t="#paso-"+paso;document.querySelector(t).classList.add("mostrar");const o=document.querySelector(".actual");o&&o.classList.remove("actual");const a=`[data-paso="${paso}"]`;document.querySelector(a).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function botonesPaginador(){const e=document.querySelector("#anterior"),t=document.querySelector("#siguiente");1===paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):3===paso?(e.classList.remove("ocultar"),t.classList.add("ocultar"),mostrarResumen()):(e.classList.remove("ocultar"),t.classList.remove("ocultar"))}function paginaAnterior(){document.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador(),mostrarSeccion())}))}function paginaSiguiente(){document.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,botonesPaginador(),mostrarSeccion())}))}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){const t=document.querySelector("#servicios");e.forEach(e=>{const{id:o,nombre:a,precio:n}=e,c=document.createElement("P");c.classList.add("nombre-servicio"),c.textContent=a;const r=document.createElement("P");r.classList.add("precio-servicio"),r.textContent="$"+n;const i=document.createElement("DIV");i.classList.add("servicio"),i.dataset.idServicio=o,i.onclick=function(){seleccionarServicio(e)},i.appendChild(c),i.appendChild(r),t.appendChild(i)})}function seleccionarServicio(e){const{id:t}=e,{servicios:o}=cita,a=document.querySelector(`[data-id-servicio="${t}"]`);o.some(e=>e.id===t)?(cita.servicios=o.filter(e=>e.id!==t),a.classList.remove("seleccionado")):(cita.servicios=[...o,e],a.classList.add("seleccionado"))}function nombreCliente(){const e=document.querySelector("#nombre").value;cita.nombre=e}function idCliente(){const e=document.querySelector("#usuarioId").value;cita.id=e}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();0===t||6===t?(e.target.value="",mostrarAlerta("Fines de semana no permitidos","error",".formulario")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<10||t>18?(e.target.value="",mostrarAlerta("Hora No Válida","error",".formulario")):(cita.hora=e.target.value,console.log(cita))}))}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("Faltan datos de servicios, fecha o Hora","error",".contenido-resumen",!1);const{nombre:t,fecha:o,hora:a,servicios:n}=cita,c=document.createElement("H3");c.textContent="Resumen de Servicios",e.appendChild(c),n.forEach(t=>{const{id:o,precio:a,nombre:n}=t,c=document.createElement("DIV");c.classList.add("contenedor-servicio");const r=document.createElement("P");r.textContent=n;const i=document.createElement("p");i.innerHTML="<span>Precio:</span> "+a,c.appendChild(r),c.appendChild(i),e.appendChild(c)});const r=document.createElement("H3");r.textContent="Resumen de la Cita",e.appendChild(r);const i=document.createElement("P");i.innerHTML="<span>Nombre:</span> "+t;const s=formatearFecha(o),d=formatearHora12Horas(a),l=document.createElement("P");l.innerHTML="<span>Fecha:</span> "+s;const u=document.createElement("P");u.innerHTML="<span>Hora:</span> "+d;const m=document.createElement("BUTTON");m.classList.add("boton"),m.textContent="Reservar Cita",m.onclick=reservarCita,e.appendChild(i),e.appendChild(l),e.appendChild(u),e.appendChild(m),console.log(cita)}async function reservarCita(){const{id:e,fecha:t,hora:o,servicios:a}=cita,n=a.map(e=>e.id),c=new FormData;c.append("usuarioId",e),c.append("fecha",t),c.append("hora",o),c.append("servicios",JSON.stringify(n));const r=await fetch("http://localhost:3000/api/citas",{method:"POST",body:c});try{const e=await r.json();e.resultado&&Swal.fire({icon:"success",title:"Cita Creada",text:"Tu cita fue creada correctamente",button:"OK"}).then(()=>{window.location.reload()}),console.log(e)}catch(e){Swal.fire({icon:"error",title:"Error",text:"Hubo en un error al guardar la cita"})}}function formatearFecha(e){const t=new Date(e),o=t.getMonth()+2,a=t.getDate()+2,n=t.getFullYear();return new Date(Date.UTC(n,o,a)).toLocaleDateString("es-MX",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function formatearHora12Horas(e){const t=e.split(":"),[o,a]=t;let n="";return 0==o?(n=`12:${a} AM`,n):12==o?(n=`${o}:${a} PM`,n):o>12?(n=`${o%12}:${a} PM`,n):(n=`${o}:${a} AM`,n)}function mostrarAlerta(e,t,o,a=!0){const n=document.querySelector(".alerta");n&&n.remove();const c=document.createElement("DIV");c.textContent=e,c.classList.add("alerta"),c.classList.add(t);document.querySelector(o).appendChild(c),a&&setTimeout((function(){c.remove()}),3e3)}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));