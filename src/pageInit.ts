import { sendMessage } from "./lib";

function init() {
  if (!document.getElementById("AISOC")) {
    const newDiv = document.createElement("div");
    newDiv.id = "AISOC";
    document.body.appendChild(newDiv);
  } else {
    // sendMessage(
    //   JSON.stringify({ url: window.location.href, title: document.title }),
    //   "FROM_CONTENT_WEBINFO"
    // );
  }
  sendMessage(
    JSON.stringify({ url: window.location.href, title: document.title }),
    "FROM_CONTENT_WEBINFO"
  );
}
init();
