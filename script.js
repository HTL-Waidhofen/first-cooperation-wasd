function toggleMode() {
  var body = document.body;
  var header = document.querySelector('header');

  body.classList.toggle("dark-mode");
  header.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  header.classList.toggle("light-mode");
}