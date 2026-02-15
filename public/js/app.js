const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = search.value;
  try {
    fetch(`http://localhost:5000/weather?address=${searchValue}`)
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong");
        return response.json();
      })
      .then((data) => console.log(data.message));
  } catch (err) {
    console.log(err);
  }
});
