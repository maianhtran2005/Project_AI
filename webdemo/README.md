🎀 Web Demo - Tóm Tắt Văn Bản Tự Động (Llama 3.1)
Dự án này là ứng dụng web demo minh họa khả năng tóm tắt văn bản (News Summarization) sử dụng mô hình ngôn ngữ lớn (LLM). Hệ thống bao gồm giao diện Frontend hiện đại kết nối với Backend chạy trên Google Colab thông qua đường hầm Ngrok.

📂 Cấu Trúc Dự Án
Bash

web_demo/
├── index.html       # Giao diện chính (HTML5)
├── style.css        # Định dạng giao diện (Theme Pastel, Glassmorphism)
├── script.js        # Logic xử lý: Gọi API và hiển thị kết quả
├── backend.ipynb    # Notebook chứa mã nguồn Backend & Model (Chạy trên Colab)
└── README.md        # Tài liệu hướng dẫn sử dụng
🚀 Công Nghệ Sử Dụng
1. Frontend (Giao diện người dùng)
HTML5 / CSS3: Thiết kế Responsive, giao diện tông màu Pastel (Hồng/Tím) với hiệu ứng kính mờ (Glassmorphism).

JavaScript (Vanilla): Xử lý gọi API bất đồng bộ (Async/Await), quản lý trạng thái loading và bắt lỗi ngoại lệ.

2. Backend (Xử lý AI & API)
Môi trường: Google Colab (Sử dụng GPU T4).

Model: Meta-Llama-3.1-8B-Instruct kết hợp với Adapter LoRA calmm-m/news-summarization.

Kỹ thuật: Quantization 4-bit (bitsandbytes) để tối ưu bộ nhớ.

Framework: FastAPI (Tạo REST API).

Tunneling: PyNgrok (Công khai localhost ra Internet).

📖 Hướng Dẫn Cài Đặt & Sử Dụng
Để chạy được demo, bạn cần thực hiện 2 bước: Khởi động Backend trên Cloud và Chạy Frontend dưới máy Local.

Bước 1: Khởi động Backend (Google Colab)
Truy cập Google Colab.

Upload file backend.ipynb lên Colab.

Cấu hình Runtime: Chọn menu Runtime > Change runtime type > Chọn T4 GPU.

Cấu hình Token:

Tìm cell chứa biến HF_TOKEN và NGROK_AUTH_TOKEN.

Điền Token Hugging Face và Ngrok của bạn vào đó.

Chạy Server: Nhấn Runtime > Run all (Chạy tất cả).

Chờ khoảng 3-5 phút để tải model. Khi thấy dòng thông báo sau, hãy copy đường dẫn:

Plaintext

✅ LINK PUBLIC URL CỦA BẠN: https://xyz-abc.ngrok-free.dev
Bước 2: Sử Dụng Frontend (Local)
Tải thư mục web_demo về máy tính của bạn.

Mở file index.html bằng trình duyệt web (Chrome, Edge, Safari...).

Kết nối API:

Dán đường dẫn Ngrok vừa copy ở Bước 1 vào ô "Dán URL Ngrok..." trên thanh Header của web.

Thực hiện tóm tắt:

Nhập văn bản tiếng Anh hoặc tiếng Việt vào ô nhập liệu bên trái.

Nhấn nút "Tóm tắt văn bản".

Chờ kết quả hiển thị ở ô bên phải.

🎨 Tính Năng Nổi Bật
Giao diện thân thiện: Theme màu hồng pastel nhẹ nhàng, tích hợp các họa tiết trang trí (Nơ, Tim, Hoa).

Trải nghiệm mượt mà: Có hiệu ứng Loading (Spinner) khi chờ model xử lý.

Xử lý lỗi: Hệ thống tự động cảnh báo nếu người dùng quên nhập Link API hoặc văn bản quá ngắn.

Đa ngôn ngữ: Hỗ trợ tốt cho cả tiếng Anh và tiếng Việt nhờ Adapter được fine-tune đặc biệt.
