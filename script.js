window.onload = function() {

  var socket;

  document.getElementById("connect-button").onclick = function() {
      ﻿socket = new WebSocket("ws://localhost:1234");

      socket.onopen = whenOpen;
      socket.onclose = whenClose;
      socket.onmessage = whenMessage;
      socket.onerror = whenError;
  };

  function whenOpen() {
    addline("connection has been established");
    document.getElementById("hider").style.zIndex = '1';
    document.getElementById("hider").style.backgroundColor = "white";
    socket.send(document.getElementById("username").value);
  }

  function whenClose(event) {
    if (event.wasClean) {
      addline("the onnection was closed, event code: " + "<b>" + event.code + "</b>");
    } else {
      // the server process's been killed or something
      addline("the connection was aborted, event code: " + "<b>" + event.code + "</b>");
    }
  }

  function whenMessage() {
    console.log("data");
    appendMessageFromServer("Server", event.data);
    addline("received data: " + "<b>" + event.data + "</b>");
  }

  function whenError() {
    addline("an error occured: " + "<b>" + event.message + "</b>");
  }

  function addline(str) {
    // move the outputed lines and place the new one
    document.getElementById('console-5').innerHTML = document.getElementById('console-4').innerHTML;
    document.getElementById('console-4').innerHTML = document.getElementById('console-3').innerHTML;
    document.getElementById('console-3').innerHTML = document.getElementById('console-2').innerHTML;
    document.getElementById('console-2').innerHTML = document.getElementById('console-1').innerHTML;
    document.getElementById('console-1').innerHTML = str;
  }

  document.getElementById("submit").onclick = function() {
    addline("sending data: " + "<b>" + document.getElementById("text-input").value + "</b>");
    appendMessageFromClient("You", document.getElementById("text-input").value);
    socket.send(document.getElementById("text-input").value);
  }

  function appendMessageFromServer(name, text) {

    let wrap = document.createElement("div");
    wrap.className = 'message';

    let client_name = document.createElement("div");
    client_name.className = 'client-name-from-server';
    client_name.textContent = name;

    wrap.appendChild(client_name);

    let messageBox = document.createElement('div');
    messageBox.className = 'message-box-server';
    messageBox.textContent = text;

    wrap.appendChild(messageBox);

    document.getElementById('dialog-box').appendChild(wrap);

  }

  function appendMessageFromClient(name, text) {

    let wrap = document.createElement("div");
    wrap.className = 'message';

    let client_name = document.createElement("div");
    client_name.className = 'client-name-from-client';
    client_name.textContent = name;

    wrap.appendChild(client_name);

    let messageBox = document.createElement('div');
    messageBox.className = 'message-box-client';
    messageBox.textContent = text;

    wrap.appendChild(messageBox);

    document.getElementById('dialog-box').appendChild(wrap);

  }

}
