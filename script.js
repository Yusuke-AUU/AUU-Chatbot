let selectedCategory = "";

function selectCategory(category) {
  selectedCategory = category;
  document.getElementById("categoryButtons").style.display = "none";
  document.getElementById("consultationForm").style.display = "block";

  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<div class='bot-message'>承知しました！お役に立てるかもしれません！具体的なご相談内容の入力をお願いします！</div>`;
}

document.getElementById("consultationForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = {
    category: selectedCategory,
    message: document.getElementById("message").value,
    company: document.getElementById("company").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value
  };

  fetch("https://script.google.com/macros/s/AKfycbwA1m7cGG7Y95GkgVWIqpS6aF5PAwTKkut3_T5va5oS0O4sjYuzafBOmBH09Nu_prEI/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<div class='bot-message'>ありがとうございます！内容を確認し、担当よりご連絡いたします。私たちは、貴社の益々の発展を応援しております！引き続きよろしくお願いいたします。</div>`;
    document.getElementById("consultationForm").reset();
    document.getElementById("consultationForm").style.display = "none";
  })
  .catch(error => console.error("送信エラー:", error));
});
