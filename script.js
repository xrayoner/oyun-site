document.addEventListener("DOMContentLoaded", function () {
    let valorantOption = document.getElementById("valorant-option");
    let valorantDetails = document.getElementById("valorant-details");
    let detailsButton = document.getElementById("details-button");

    valorantOption.addEventListener("click", function () {
        valorantDetails.style.display = "block";
    });

    detailsButton.addEventListener("click", function () {
        window.location.href = "valorant.html";
    });

    // Fare üzerine gelince el işareti çıkacak
    valorantOption.style.cursor = "pointer";
});
