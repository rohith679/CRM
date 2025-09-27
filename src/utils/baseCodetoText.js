function decodeBase64ToText(base64Str) {
  const htmlString = atob(base64Str); // Decode base64 to HTML
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlString;
  return tempElement.textContent || tempElement.innerText || "";
}
export default decodeBase64ToText;
