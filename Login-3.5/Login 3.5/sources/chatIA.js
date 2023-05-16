function sendMessage() {
    var messageInput = document.getElementById("message");
    var message = messageInput.value.trim(); // Eliminar espacios en blanco al inicio y al final
  
    if (message !== "") {
      var chatbox = document.getElementById("chatbox");
      var userMessage = '<div class="user-message">' + message + '</div>';
      chatbox.innerHTML += userMessage;
  
      var botResponse = getBotResponse(message);
      var botMessage = '<div class="bot-message">' + botResponse + '</div>';
      chatbox.innerHTML += botMessage;
  
      messageInput.value = "";
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }
  
  function getBotResponse(message) {
    message = message.toLowerCase();
  
    if (message.includes('hola') && message.includes('como estas?')) {
      return '¡Hola! Estoy bien, ¡gracias por preguntar! ¿Y tú?';
    } else if (message.includes('que metodos de pago utilizas')) {
      return 'Aceptamos pagos a través de Daviplata y Nequi. ¿Necesitas más información sobre los pagos?';
    } else {
      return 'Hola, soy el ChatBot. ¿En qué puedo ayudarte?';
    }
  }
  