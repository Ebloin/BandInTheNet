$(document).ready(function() {
    $(".instrument_choose_text").on({
        mouseenter: function() {
            $(this).slideDown()
        },
        mouseleave: function() {
            $(this).slideUp()
        }
    });
});

document.getElementById("logout").addEventListener('click', logout);

function logout() {
    localStorage.utenteCorrente = "";
    var out = document.getElementById("login");
    out.classList.replace("nonVisibile", "visibile");
    userIndex = undefined;
    alert("Arrivederci");
}