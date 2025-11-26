async function summarizeText() {
  const inputText = document.getElementById("inputText").value;
  const apiUrl = document.getElementById("apiUrl").value.replace(/\/$/, "");
  const outputBox = document.getElementById("outputText");
  const btn = document.getElementById("submitBtn");
  const spinner = document.getElementById("loadingSpinner");
  const btnText = document.getElementById("btnText");

  // Validate
  if (!apiUrl) {
    alert("Vui lòng dán link Ngrok từ Google Colab vào ô trên cùng!");
    return;
  }
  if (!inputText.trim() || inputText.trim().length < 50) {
    alert("Vui lòng nhập văn bản đủ dài (tối thiểu 50 ký tự) để tóm tắt!");
    return;
  }

  // UI Loading State
  btn.disabled = true;
  spinner.style.display = "block";
  btnText.textContent = "Đang xử lý...";
  outputBox.innerHTML =
    '<div class="placeholder">Đang kết nối model Llama 3.1...</div>';

  try {
    // Xóa placeholder cũ
    outputBox.textContent = "";

    const response = await fetch(`${apiUrl}/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        text: inputText,
        max_length: 512,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Lỗi Server: ${response.status} - ${errorText.substring(0, 100)}...`
      );
    }

    const data = await response.json();

    // Hiển thị kết quả
    if (data.summary) {
      outputBox.textContent = data.summary;
    } else {
      outputBox.textContent =
        "Không nhận được kết quả (Lỗi format dữ liệu trả về).";
    }
  } catch (error) {
    console.error(error);
    outputBox.innerHTML = `<div style="color: red; padding: 10px;">⚠️ Lỗi: ${error.message}<br>Hãy kiểm tra lại Link Ngrok và đảm bảo server Python đang chạy.</div>`;
  } finally {
    // Reset UI
    btn.disabled = false;
    spinner.style.display = "none";
    btnText.textContent = "Tóm tắt văn bản";
  }
}
