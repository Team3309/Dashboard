let webSocket = null;
let props = null;

export function initWebSocket(appProps) {
  if (webSocket != null) {
    // already working
    return;
  }
  props = appProps;
  webSocket = new WebSocket("ws://localhost:8000");
  webSocket.onmessage = function(evt) {
    // console.log(evt.data);
    handlePayloadFromWebSocket(evt.data);
  };
  webSocket.onclose = function() {
    webSocket = null;
  };
}

function handlePayloadFromWebSocket(payloadString) {
  var payloadJson = JSON.parse(payloadString);
  addOrUpdateValue(payloadJson.table, payloadJson.key, payloadJson.value);
  console.log(props);
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
