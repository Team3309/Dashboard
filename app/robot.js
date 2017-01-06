let webSocket = null;
let props = null;

export function initWebSocket(handleOpen, handleClose) {
  console.log("init");
  if (webSocket != null) {
    // already working
    return;
  }
  webSocket = new WebSocket("ws://localhost:8000");
  webSocket.onmessage = function(evt) {
    handlePayloadFromWebSocket(evt.data);
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

function handlePayloadFromWebSocket(payloadString) {
  var payloadJson = JSON.parse(payloadString);
  addOrUpdateValue(payloadJson.table, payloadJson.key, payloadJson.value);
  console.log(props.tables);
}

function addOrUpdateValue(tableName, key, value) {
  var table = getOrCreateTable(tableName);
  setOrCreateElement(table, key, value);
}

function getOrCreateTable(tableName) {
  var table = props.tables[tableName];
  if (table != null) {
    return table;
  }
  props.tables[tableName] = [];
  return props.tables[tableName];
}

function setOrCreateElement(table, key, value) {
  table[key] = value;
}
