const form = document.querySelector("form");
console.log(form);



form.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookingSchema = new FormData(form);
  const reqBody = Object.fromEntries(bookingSchema);
  console.log(reqBody);

  fetch("/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    if(response.ok){
    window.location.href = "/thankYou";
  }else{
    window.location.href="/contact.html";
  }
  }).catch((error)=> console.error(error));
});
