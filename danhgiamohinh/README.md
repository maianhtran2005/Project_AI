# 📊 Đánh Giá Hiệu Năng Mô Hình Tóm Tắt Văn Bản (LLM Summarization Evaluation)

Dự án này thực hiện quy trình **Inference (Suy luận)** và **Đánh giá (Evaluation)** để so sánh hiệu quả giữa mô hình ngôn ngữ gốc (Base Model) và mô hình đã được tinh chỉnh (Fine-tuned Model) cho tác vụ tóm tắt văn bản tin tức (hỗ trợ tiếng Việt và tiếng Anh).

## 🚀 Tính Năng Chính
* **Mô hình:** Sử dụng Llama-3 (8B parameters).
* **Tối ưu hóa:** Áp dụng kỹ thuật lượng tử hóa 4-bit (QLoRA) để chạy mượt mà trên GPU tầm trung (như Tesla T4).
* **Đánh giá:** Sử dụng các bộ metric chuẩn trong NLP:
    * **ROUGE Score:** Đánh giá độ trùng khớp từ ngữ.
    * **BERTScore:** Đánh giá độ tương đồng về mặt ngữ nghĩa (Semantic similarity).
* **Xử lý dữ liệu:** Hỗ trợ đọc dữ liệu linh hoạt (JSON/JSONL) và xử lý lỗi tự động.

## 🛠️ Yêu Cầu Hệ Thống & Cài Đặt

### 1. Phần cứng
* **GPU:** Bắt buộc (Khuyến nghị NVIDIA T4 16GB VRAM hoặc cao hơn).
* **RAM:** Tối thiểu 12GB.

### 2. Thư viện phụ thuộc
Cài đặt các thư viện cần thiết bằng lệnh sau:

```bash
pip install -q -U transformers peft bitsandbytes accelerate
pip install -q -U evaluate rouge_score bert_score matplotlib seaborn

📂 Cấu Trúc Dữ Liệu Đầu Vào
Script mong đợi file dữ liệu đầu vào (ví dụ: train_data.jsonl) có định dạng JSON Lines hoặc JSON List với các trường sau:

completion: Văn bản gốc cần tóm tắt.

prompt: Văn bản tóm tắt mẫu (Ground Truth) để đối chiếu.

📝 Hướng Dẫn Sử Dụng
Cấu hình Token:

Mở file notebook.

Thay thế biến MY_TOKEN bằng Hugging Face Access Token của bạn (cần quyền truy cập Llama-3).

Lưu ý bảo mật: Không commit token trực tiếp lên GitHub.

Cấu hình Đường dẫn:

Sửa biến INPUT_FILE trỏ đến file dữ liệu của bạn.

Chạy Notebook:

Notebook sẽ tự động tải model, chạy thử nghiệm trên 100 mẫu dữ liệu đầu tiên và xuất kết quả ra file ket_qua_tho.csv.
