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
        // Debug
        console.log(data);
        // Guardar datos
        this.data = data;
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
    let count = 0;
    data.forEach((user) => {
      const dataList = document.getElementById("correus_subscripcions");
      dataList.innerHTML += `<option value=${user.subscripcio.correu}>`;
      var enabled = user.subscripcio.operatiu ? "🟢" : "🔴";
      const card = `
                <div class="card mb-3" id="item-${count}" data-bs-toggle="modal" data-bs-target="#detailsModal">
                    <div class="card-body">
                        <h5 class="card-title">${user._id.$oid}</h5>
                        <p class="card-text">${user.subscripcio.correu}</p>
                        <p class="card-text">${enabled} ${user.subscripcio.tarifa}</p>
                    </div>
                </div>`;
      this.userContainer.innerHTML += card;
      count++;
    });
    this.addListeners(data);
  }

  renderDetails(data) {
    this.details.render(data);
  }

  addListeners(data) {
    let count = 0;
    data.forEach((user) => {
        const elemntId = user.subscripcio.correu;
        document.getElementById(`item-${count}`).addEventListener("click", (e) => {
            this.renderDetails(user);
        });
        count++;
    });
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
        //console.log(data);
        if (typeof data === "object" && data !== null) {
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              const user = data[key];
              this.id.innerText = `${user._id.$oid}`;
              this.email = `${user.subscripcio.correu}`;
              this.tarifa = `${user.subscripcio.tarifa}`;
              this.num = `${user.subscripcio.telefon}`;
              this.pago = `${user.subscripcio.operatiu}`;
              this.up = `${user.subscripcio.data_alta}`;
            }
          }
        } else {
          console.error('El parámetro "data" no es un objeto válido.');
        }
    }
    
}

