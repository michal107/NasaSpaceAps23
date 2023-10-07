function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("topnav").style.top = "0";
} else {
    document.getElementById("topnav").style.top = "-50px";
}
}

function showTab(tabId) {
  const tabs = document.querySelectorAll('.content');
  tabs.forEach(tab => {
      tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';}