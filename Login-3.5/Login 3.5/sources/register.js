function guardarDatos() {
    // Obtener los valores ingresados por el usuario
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    
    // Verificar si las contraseñas coinciden
    if (password !== confirm_password) {
      alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
      return;
    }
    
    // Guardar los datos en local storage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    
    // Redirigir a la página de bienvenida
    window.location = "../paginas/login.html";
  }