//  función iniciarSesion()
function iniciarSesion() {
      // Obtener los valores ingresados por el usuario
      var inputUsername = document.getElementById("username").value;
      var inputPassword = document.getElementById("password").value;
      
      // Obtener los valores guardados en local storage
      var storedUsername = localStorage.getItem("username");
      var storedPassword = localStorage.getItem("password");
      
      // Verificar si los valores ingresados por el usuario son correctos
      if (inputUsername === storedUsername && inputPassword === storedPassword) {   
      // Iniciar sesión exitosamente
      window.location = "../paginas/indexTienda.html";
      }
}