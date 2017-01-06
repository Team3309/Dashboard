let webSocket = null;

export function initWebSocket(updateState, handleOpen, handleClose) {
  console.log("init");
  if (webSocket != null) {
    // already working
    return;
  }
  webSocket = new WebSocket("ws://localhost:8000");
  webSocket.onmessage = function(evt) {
    handlePayloadFromWebSocket(updateState, evt.data);
  };
  webSocket.onopen = function() {
    handleOpen();
  };
  webSocket.onclose = function() {
    webSocket = null;
    handleClose();
    setTimeout(initWebSocket(handleOpen, handleClose), 1000);
  };
}

function sendValueUpdate(tableName, key, value, type) {
  if (webSocket == null || webSocket.readyState != WebSocket.OPEN) {
    console.error("Can't send update to " + tableName + ", " + key);
    return;
  }
  webSocket.send(JSON.stringify({"table": tableName, "key": key, "value": value, type: type}));
}

function handlePayloadFromWebSocket(updateState, payloadString) {
  var payloadJson = JSON.parse(payloadString);
  updateState(payloadJson.table, payloadJson.key, payloadJson.value);
}
