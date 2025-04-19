function sendMessage() {
  const category = document.getElementById("category").value;
  const message = document.getElementById("message").value;
  if (!category || !message) return alert("カテゴリとメッセージを入力してください");

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `
    <div class="user-message">
      <div class="message">[${category}] ${message}</div>
    </div>
  `;
  chatBox.scrollTop = chatBox.scrollHeight;

  fetch("https://script.google.com/macros/s/AKfycbzf9XsoQEHH3eI8tANCvdJoPzynzXwJCyeXMLwih5Teh96s_3oIQGJyeriYmhJIJalR/exec", {
    method: "POST",
    body: JSON.stringify({ category, message })
  });

  document.getElementById("message").value = "";
}