//render 
const { remote } = require("electron");
//fx para comuniar el render con el proceso principal
const main = remote.require("./main");

const clientForm = document.querySelector("#clientForm");
const clientName = document.querySelector("#nombre");
const clientLastName= document.querySelector("#apellido");
const clientIdClient= document.querySelector("#idCliente");
const search = document.querySelector('#buscador')
const find = document.querySelector('#resultado')
const customerFound = document.querySelector('#clients')
const renovation = document.querySelector('#renovacion')

const deleteClient = async (id) => {
  const response = confirm("Are you sure you want to delete it?");
  if (response) {
    await main.deleteClient(id);
    return;
}
};

clientForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const client = {
     nombre: clientName.value,
        apellido: clientLastName.value,
            clienteId: clientIdClient.value
    
    };
const result = await main.createClient(client)
return(result)

   
  } catch (error) {
    console.log(error);
  }
});


const reInscription = async (id) =>{
    const res= await main.getClients();
    const client =  res.find(client =>  id == client.id)
     const insertAgainclient = {
     nombre: client.nombre,
        apellido: client.apellido,
            clienteId: client.clienteId
    
    };
    
    const result = await main.createClient(insertAgainclient )
    //const res = await main.insertAgain()
return(result)
    
}

const renovateClient = async (id)=> {
    console.log(id)
      const res= await main.getClients();
      const client =  res.find(client =>  id == client.id)
      console.log(client)
renovation.innerHTML+=`

<div class="form-floating mb-3">
  <input type="text" class="form-control"  placeholder="Nombre">
  <label for="floatingInput">${client.nombre}</label>
</div>
<div class="form-floating">
  <input type="text" class="form-control"  placeholder="Apellido">
  <label for="floatingPassword">${client.apellido}</label>
</div>
<div class="form-floating ">
<input type="number" class="form-control"  placeholder='Numero de cliente'>
<label for="floatingInput">${client.clienteId}</label>
</div>
   <button  type='submit' class="btn btn-primary" onclick="reInscription(${id})">
            Renovar
          </button>
 
    `
    
}

search.onsubmit = async (e) => {

     e.preventDefault();
     let idClient = find.value 
     //console.log(idClient)
    const res= await main.getClients();
     const response =  res.map(r =>  r.clienteId ===  idClient  ? customerFound.innerHTML+= `<div class="card card-body my-2 ">
        <h4>${r.nombre}</h4>
        <h4>${r.apellido}</h4>
        <button class="btn btn-danger btn-sm" onclick="deleteClient(${r.id})">
         Delete
        </button>
         <button   class="btn btn-success btn-sm" onclick="renovateClient(${r.id})">
         Renovate
        </button>
         </div>`:"" )
   
    return(response)
}

