const form = document.getElementById("chat-form");
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const category = document.getElementById("category").value;
  const subcategory = document.getElementById("subcategory").value;
  const message = document.getElementById("message").value;
  const company = document.getElementById("company").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const payload = {
    category,
    subcategory,
    message,
    company,
    name,
    email,
  };

  await fetch("https://script.google.com/macros/s/AKfycbzFpGfrUcR8rP6LGGjqU9lE6yZC--Kay6mHwwoA3bu6qB2HCCMEthkYfS-1e_9qRgim/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `data=${encodeURIComponent(JSON.stringify(payload))}`
  });

  document.getElementById("chat-form").reset();
  document.getElementById("chat-area").innerHTML += `
    <div class="bot-message">
      <img src="tanaka-photo.png" alt="Bot" class="bot-icon" />
      ありがとうございます！内容を確認し、担当よりご連絡いたします。<br>
      私たちは、貴社の益々の発展を応援しております！引き続きよろしくお願いいたします。
    </div>
  `;
});
