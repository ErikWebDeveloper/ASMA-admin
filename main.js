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
        this.url = 'https://musicsandorra.com/AppData/img/usuaris/';
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
        console.log(data);
        console.log(data.usuaris.length > 1);
        console.log(data.grup.foto);
        console.log(data.usuaris[0].foto);
        let imgSrc = null;
        if(data.usuaris.length > 1) imgSrc = `${data.grup.foto}`;
        else imgSrc = `${data.usuaris[0].foto}`;
        this.img.src = this.url + imgSrc;
        this.id.innerText = `${data._id.$oid}`;
        this.email.innerText = `${data.subscripcio.correu}`;
        this.tarifa.innerText = `${data.subscripcio.tarifa}`;
        this.num.innerText = `${data.subscripcio.telefon}`;
        this.pago.innerText = `${data.subscripcio.operatiu}`;
        this.up.innerText = `${data.subscripcio.data_alta}`;
    }
    
}

