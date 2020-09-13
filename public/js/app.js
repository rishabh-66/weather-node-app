const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageO = document.querySelector("#message1")
const messageS = document.querySelector("#message2")
//message.textContent = "from javascript"
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageO.textContent = "Loading..."
  messageS.textContent = ""

  fetch("/weather?address="+location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageO.textContent=data.error
      } else {
        messageO.textContent=data.location
        messageS.textContent=data.forecast
      }
    });
  });
});
