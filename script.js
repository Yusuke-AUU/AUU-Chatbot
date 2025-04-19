document.getElementById("send").addEventListener("click", async () => {
  const category = document.getElementById("category").value;
  const message = document.getElementById("message").value;
  const company = document.getElementById("company").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!category || !message || !name || !email) {
    alert("すべての項目を入力してください。");
    return;
  }

  const data = {
    category,
    message,
    company,
    name,
    email,
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzoZXeSOZnyOKMYjjSaoQYx_ElLCwKyImjjfh_6JWRbpgboejld2WHdtbS9FHaRpZdT/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      document.getElementById("chat").innerHTML += `
        <div class="bot-message">
          <img src="tanaka-photo.png" class="bot-icon" />
          <div class="message">
            ありがとうございます！内容を確認し、担当よりご連絡いたします。
            私たちは、貴社の益々の発展を応援しております！引き続きよろしくお願いいたします。
          </div>
        </div>
      `;
    } else {
      alert("送信に失敗しました。再度お試しください。");
    }
  } catch (error) {
    console.error("送信エラー:", error);
    alert("エラーが発生しました。");
  }
});
