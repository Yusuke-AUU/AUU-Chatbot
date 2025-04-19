
document.addEventListener("DOMContentLoaded", () => {
  window.chatBox = document.getElementById("chatBox");
  window.chatBody = document.getElementById("chatBody");
});

window.startChat = function () {
  if (!chatBox || !chatBody) return;

  chatBox.style.display = "block";
  chatBox.innerHTML = `
    <div class="chat-header">課題解決サポートBot</div>
    <div id="chatBody" class="chat-body"></div>
  `;
  window.chatBody = document.getElementById("chatBody");
  showCategoryOptions();
};

function typeMessage(text, callback) {
  const msg = document.createElement("div");
  msg.className = "bot-message";
  let i = 0;
  const typing = setInterval(() => {
    msg.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typing);
      if (callback) callback();
    }
  }, 20);
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

let selectedCategory = "";
let selectedSubcategory = "";

function showCategoryOptions() {
  chatBody.innerHTML = "";
  typeMessage("ご相談のカテゴリをお選びください：", () => {
    ["M&A・事業承継", "資金調達", "事業成長", "人材採用", "その他"].forEach((cat) => {
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.onclick = () => {
        selectedCategory = cat;
        showSubcategoryOptions();
      };
      chatBody.appendChild(btn);
    });
  });
}

function showSubcategoryOptions() {
  chatBody.innerHTML = "";
  typeMessage("さらに詳しい内容をお選びください：", () => {
    const options = {
      "M&A・事業承継": ["後継者不在", "企業売却", "企業買収"],
      "資金調達": ["融資", "出資", "補助金"],
      "事業成長": ["マーケティング", "業務改善", "IT導入"],
      "人材採用": ["中途採用", "新卒採用", "業務委託"],
      "その他": ["その他の相談"]
    };
    options[selectedCategory].forEach((sub) => {
      const btn = document.createElement("button");
      btn.textContent = sub;
      btn.onclick = () => {
        selectedSubcategory = sub;
        showInputForm();
      };
      chatBody.appendChild(btn);
    });
  });
}

function showInputForm() {
  chatBody.innerHTML = "";
  typeMessage("承知しました！お役に立てるかもしれません！具体的なご相談内容の入力をお願いします！", () => {
    const form = document.createElement("div");
    form.innerHTML = `
      <textarea id="message" placeholder="ご相談内容を入力..." rows="3"></textarea>
      <input id="company" placeholder="会社名（任意）">
      <input id="name" placeholder="お名前">
      <input id="email" placeholder="メールアドレス">
      <button onclick="submitForm()">送信する</button>
    `;
    chatBody.appendChild(form);
    chatBody.scrollTop = chatBody.scrollHeight;
  });
}

function submitForm() {
  const payload = {
    category: selectedCategory,
    subcategory: selectedSubcategory,
    message: document.getElementById("message").value,
    company: document.getElementById("company").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value
  };

  const formData = new URLSearchParams();
  for (const key in payload) {
    formData.append(key, payload[key]);
  }

  fetch("https://script.google.com/macros/s/AKfycbzJOLwUDFkXSyrTzGbmcHAkoDr_UgtYIwtaDqwdQSrKdcmEbp6QLd4msbSAbhFGidIi/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData.toString()
  });

  typeMessage("ありがとうございます！内容を確認し、担当よりご連絡いたします。\n私たちは、貴社の益々の発展を応援しております！\n引き続きよろしくお願いいたします。", () => {
    const restart = document.createElement("button");
    restart.textContent = "🔁 もう一度相談する";
    restart.className = "restart-button";
    restart.onclick = startChat;
    chatBody.appendChild(restart);
  });
}
