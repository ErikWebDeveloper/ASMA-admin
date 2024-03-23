document.addEventListener("DOMContentLoaded", function () {
    var api = new ApiInterface();
    let request = {method : "get", params : ""}
    api.send(request);
});

class ApiInterface {
    constructor() {
      this.userContainer = document.getElementById("userContainer");
      this.details = new DetailsInterface();
    }

    send(request) {
      let params = new URLSearchParams(request).toString();
      // Realizar la petición Fetch
      fetch(`/api.php?${params}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Renderizar los datos recibidos
          this.renderUserData(data);
        })
        .catch((error) => {
          console.error("Error al obtener los usuarios:", error);
        });
    }

     // Función para renderizar los datos de usuario en tarjetas
    renderUserData(data) {
        this.userContainer.innerHTML = ""; // Limpiar el contenedor 
        data.forEach((user) => {
            const dataList = document.getElementById("correus_subscripcions");
            dataList.innerHTML += `<option value=${user.subscripcio.correu}>`;
            var enabled = user.subscripcio.operatiu ? "🟢" : "🔴";
            const card = `
                <div class="card mb-3" id=${user.subscripcio.correu} data-bs-toggle="modal" data-bs-target="#detailsModal">
                    <div class="card-body">
                        <h5 class="card-title">${user._id.$oid}</h5>
                        <p class="card-text">${user.subscripcio.correu}</p>
                        <p class="card-text">${enabled} ${user.subscripcio.tarifa}</p>
                    </div>
                </div>`;
            this.userContainer.innerHTML += card;
            this.listener(user.subscripcio.correu);
        });
    }

    renderDetails(data){
        this.details.render(data);
    }

    listener(elemntId){
        document.getElementById(elemntId).addEventListener('click', (e) => this.renderDetails(e))
    }
}

class DetailsInterface{
    constructor(){
        this.img = document.getElementById("d-img");
        this.id = document.getElementById("d-id");
        this.email = document.getElementById("d-email");
        this.tarifa = document.getElementById("d-tarifa");
        this.num = document.getElementById("d-num");
        this.pago = document.getElementById("d-pago");
        this.up = document.getElementById("d-up");
        this.inner = document.getElementById("d-inner");

    }
    render(data){
        console.log(data)
    }
    
}

