document.querySelector(".sidebar").style.display ="none";

const toggleMenu = () => {
  let sidebar = document.querySelector('.sidebar');
  if (sidebar.style.display === "none") {
    sidebar.style.display = "block";
  } else {
    sidebar.style.display = "none"
  }
}

document.querySelector('#sidebar-btn').addEventListener('click', toggleMenu);