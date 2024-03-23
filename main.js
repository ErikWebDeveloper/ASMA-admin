/*document.addEventListener("DOMContentLoaded", function () {
  const userContainer = document.getElementById("userContainer");

  // Función para renderizar los datos de usuario en tarjetas
  function renderUserData(data) {
    userContainer.innerHTML = ""; // Limpiar el contenedor

    data.forEach((user) => {
      const dataList = document.getElementById("correus_subscripcions");
      dataList.innerHTML += `<option value=${user.subscripcio.correu}>`;
      var enabled = user.subscripcio.operatiu ? "🟢" : "🔴";
      const card = `
                <div class="card mb-3" id=${user.subscripcio.correu}>
                    <div class="card-body">
                        <h5 class="card-title">${user._id.$oid}</h5>
                        <p class="card-text">${user.subscripcio.correu}</p>
                        <p class="card-text">${enabled} ${user.subscripcio.tarifa}</p>
                    </div>
                </div>`;
      userContainer.innerHTML += card;
    });
  }

  // Función para obtener los datos de usuario mediante Fetch
  function getUsers() {
    // Mostrar efecto de esqueleto de carga mientras se carga la data
    userContainer.innerHTML = `
                <div class="card-skeleton"></div>
                <div class="card-skeleton"></div>
                <div class="card-skeleton"></div>`;

    // Realizar la petición Fetch
    fetch("/api.php?method=getAllUsers&params=")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Renderizar los datos recibidos
        //renderUserData(data);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }

  // Llamar a la función para obtener los usuarios al cargar la página
  getUsers();
});*/

class ApiInterface {
  constructor() {
    this.userContainer = document.getElementById("userContainer");
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
                <div class="card mb-3" id=${user.subscripcio.correu}>
                    <div class="card-body">
                        <h5 class="card-title">${user._id.$oid}</h5>
                        <p class="card-text">${user.subscripcio.correu}</p>
                        <p class="card-text">${enabled} ${user.subscripcio.tarifa}</p>
                    </div>
                </div>`;
            this.userContainer.innerHTML += card;
        });
    }
}