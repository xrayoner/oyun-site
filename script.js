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

    // Yorum eklemek
    const submitCommentButton = document.getElementById('submit-comment');
    const usernameInput = document.getElementById('username');
    const commentInput = document.getElementById('comment');
    const ratingInput = document.getElementById('rating');
    const commentsList = document.getElementById('comments-list');

    submitCommentButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const commentText = commentInput.value.trim();
        const rating = ratingInput.value.trim();

        if (username && commentText && rating >= 1 && rating <= 10) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <strong>${username} - Puan: ${rating}/10</strong>
                <p>${commentText}</p>
                <button class="agree-btn">Katılıyorum</button>
                <button class="disagree-btn">Katılmıyorum</button>
                <div class="response-section"></div>
            `;
            commentsList.appendChild(commentElement);

            // Yanıt ekleme
            const agreeButton = commentElement.querySelector('.agree-btn');
            const disagreeButton = commentElement.querySelector('.disagree-btn');
            const responseSection = commentElement.querySelector('.response-section');

            agreeButton.addEventListener('click', () => {
                const responseInput = prompt("Yanıtınızı girin:");
                if (responseInput) {
                    const responseElement = document.createElement('div');
                    responseElement.classList.add('response');
                    responseElement.innerHTML = `
                        <strong>Yanıt: </strong><p>${responseInput}</p>
                    `;
                    responseSection.appendChild(responseElement);
                }
            });

            disagreeButton.addEventListener('click', () => {
                const responseInput = prompt("Yanıtınızı girin:");
                if (responseInput) {
                    const responseElement = document.createElement('div');
                    responseElement.classList.add('response');
                    responseElement.innerHTML = `
                        <strong>Yanıt: </strong><p>${responseInput}</p>
                    `;
                    responseSection.appendChild(responseElement);
                }
            });

            // Yorum gönderildikten sonra alanları temizle
            usernameInput.value = '';
            commentInput.value = '';
            ratingInput.value = '';
        } else {
            alert("Adınızı, yorumunuzu ve puanınızı eksiksiz girin.");
        }
    });

    // Fare üzerine gelince el işareti çıkacak
    valorantOption.style.cursor = "pointer";
});
document.addEventListener("DOMContentLoaded", function () {
    let agreeButtons = document.querySelectorAll(".agree-btn");
    let disagreeButtons = document.querySelectorAll(".disagree-btn");
    let agreeCount = 0;
    let disagreeCount = 0;

    // Her buton için katılma ve katılmama işlemleri
    agreeButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (!button.classList.contains("clicked")) {
                agreeCount++;
                button.classList.add("clicked");
                updateResponseInfo(button);
            }
        });
    });

    disagreeButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (!button.classList.contains("clicked")) {
                disagreeCount++;
                button.classList.add("clicked");
                updateResponseInfo(button);
            }
        });
    });

    // Yorumdaki sayıları güncelle
    function updateResponseInfo(button) {
        let responseInfo = button.closest(".comment").querySelector(".response-info");
        responseInfo.innerHTML = `
            <p><small><em>(${agreeCount} kişi bu yorumu destekliyor)</em></small></p>
            <p><small><em>(${disagreeCount} kişi bu yorumu desteklemiyor)</em></small></p>
        `;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let agreeBtns = document.querySelectorAll(".agree-btn");
    let disagreeBtns = document.querySelectorAll(".disagree-btn");
    let replyBtns = document.querySelectorAll(".reply-btn");
    let submitReplies = document.querySelectorAll(".submit-reply");

    agreeBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            let responseInfo = btn.closest('.comment').querySelector('.response-info');
            let supportCount = responseInfo.querySelector('p:nth-of-type(1)');
            let currentCount = parseInt(supportCount.textContent.match(/\d+/)[0]);
            currentCount++;
            supportCount.innerHTML = `<small><em>(${currentCount} kişi bu yorumu destekliyor)</em></small>`;
            btn.disabled = true;
            disagreeBtns[agreeBtns.indexOf(btn)].disabled = true;
        });
    });

    disagreeBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            let responseInfo = btn.closest('.comment').querySelector('.response-info');
            let opposeCount = responseInfo.querySelector('p:nth-of-type(2)');
            let currentCount = parseInt(opposeCount.textContent.match(/\d+/)[0]);
            currentCount++;
            opposeCount.innerHTML = `<small><em>(${currentCount} kişi bu yorumu desteklemiyor)</em></small>`;
            btn.disabled = true;
            agreeBtns[disagreeBtns.indexOf(btn)].disabled = true;
        });
    });

    replyBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            let replyArea = btn.closest('.comment').querySelector('.reply-area');
            replyArea.style.display = replyArea.style.display === "none" ? "block" : "none";
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let submitCommentBtn = document.getElementById("submit-comment");
    let commentsList = document.getElementById("comments-list");

    submitCommentBtn.addEventListener("click", function () {
        let username = document.getElementById("username").value;
        let comment = document.getElementById("comment").value;
        let rating = document.getElementById("rating").value;

        if (username && comment && rating) {
            let commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");

            let userP = document.createElement("p");
            userP.innerHTML = `<strong>${username}</strong> - Puan: ${rating}`;
            commentDiv.appendChild(userP);

            let commentP = document.createElement("p");
            commentP.innerText = comment;
            commentDiv.appendChild(commentP);

            let supportCount = 0;
            let opposeCount = 0;

            let agreeBtn = document.createElement("button");
            agreeBtn.textContent = "Katılıyorum";
            agreeBtn.addEventListener("click", function () {
                supportCount++;
                updateResponseInfo();
                agreeBtn.disabled = true;
                opposeBtn.disabled = true;
            });

            let opposeBtn = document.createElement("button");
            opposeBtn.textContent = "Katılmıyorum";
            opposeBtn.addEventListener("click", function () {
                opposeCount++;
                updateResponseInfo();
                agreeBtn.disabled = true;
                opposeBtn.disabled = true;
            });

            let replyBtn = document.createElement("button");
            replyBtn.textContent = "Yanıtla";
            replyBtn.addEventListener("click", function () {
                let replyArea = document.createElement("div");
                replyArea.classList.add("reply-area");

                let replyTextarea = document.createElement("textarea");
                replyTextarea.placeholder = "Yanıtınızı yazın...";
                replyArea.appendChild(replyTextarea);

                let submitReplyBtn = document.createElement("button");
                submitReplyBtn.textContent = "Yanıtı Gönder";
                submitReplyBtn.addEventListener("click", function () {
                    let replyText = replyTextarea.value;
                    if (replyText) {
                        let replyDiv = document.createElement("div");
                        replyDiv.textContent = `${username}: ${replyText}`;
                        replyArea.appendChild(replyDiv);
                        replyTextarea.value = "";
                    }
                });

                replyArea.appendChild(submitReplyBtn);
                commentDiv.appendChild(replyArea);
            });

            function updateResponseInfo() {
                let responseInfoDiv = commentDiv.querySelector(".response-info");
                if (!responseInfoDiv) {
                    responseInfoDiv = document.createElement("div");
                    responseInfoDiv.classList.add("response-info");
                    commentDiv.appendChild(responseInfoDiv);
                }
                responseInfoDiv.innerHTML = `<small><em>(${supportCount} kişi bu yorumu destekliyor)</em></small><br>
                <small><em>(${opposeCount} kişi bu yorumu desteklemiyor)</em></small>`;
            }

            commentDiv.appendChild(agreeBtn);
            commentDiv.appendChild(opposeBtn);
            commentDiv.appendChild(replyBtn);
            commentsList.appendChild(commentDiv);

            document.getElementById("username").value = "";
            document.getElementById("comment").value = "";
            document.getElementById("rating").value = "";
        }
    });
});
document.querySelectorAll('.agent-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Sayfa yenilenmesini engelle
        
        const target = document.querySelector(this.getAttribute('data-target'));

        // Ajan bilgilerini gizle veya göster
        if (target.style.display === 'none' || target.style.display === '') {
            target.style.display = 'block';
        } else {
            target.style.display = 'none';
        }

        // Sayfayı aşağı kaydırma
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
function toggleAgentInfo(agentId) {
    var agentInfo = document.getElementById(agentId);
    if (agentInfo.style.display === "none" || agentInfo.style.display === "") {
        agentInfo.style.display = "block";  // Göster
    } else {
        agentInfo.style.display = "none";   // Gizle
    }
}
// Ajan başlıklarına tıklandığında ilgili açıklamayı göster/gizle
document.querySelectorAll('.agent-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Sayfa yeniden yüklenmesin
        const targetId = this.getAttribute('data-target');
        const agentInfo = document.querySelector(targetId);

        // Eğer agent-info zaten görünüyorsa, gizle
        if (agentInfo.style.display === 'block') {
            agentInfo.style.display = 'none';
        } else {
            // Tüm ajan açıklamalarını gizle
            document.querySelectorAll('.agent-info').forEach(info => {
                info.style.display = 'none';
            });
            // Seçilen ajanın açıklamasını göster
            agentInfo.style.display = 'block';
        }
    });
});

