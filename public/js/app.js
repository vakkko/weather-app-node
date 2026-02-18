const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading ...";
  messageTwo.textContent = "";

  const searchValue = search.value;

  fetch(
    `https://weather-app-node-lso4.onrender.com/weather?address=${searchValue}`,
  )
    .then((response) => {
      if (!response.ok) throw new Error("Something went wrong");
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error.message);
      }

      messageOne.textContent = data.forecast;
      messageTwo.textContent = data.location;
    })
    .catch((err) => {
      console.log(err);
    });
});
