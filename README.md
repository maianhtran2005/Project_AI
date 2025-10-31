# Quá trình Fine-tuning cho dự án này

# 1. Dataset
   Chúng ta sử dụng bộ dữ liệu từ Hugging Face: đây là dữ liệu đã được làm sạch (https://huggingface.co/datasets/calmm-m/summarization)

# 2. Data Preparation Process
   Quy trình xử lý dữ liệu gồm 4 bước:

### Data Cleaning

   Loại bỏ các thông tin không liên quan như mã sản phẩm, ký tự đặc biệt và các trường thông tin không giúp ích cho việc dự đoán giá.

### Tokenization

   Sử dụng tokenizer của mô hình Llama


### Prompt Standardization

   Chuẩn hóa tất cả các prompt theo cấu trúc:
   
    # `prompt` (yêu cầu) là văn bản gốc
    # `completion` (đáp án) là tóm tắt

# 4. Fine-tuning Techniques

   LoRA (Low-Rank Adaptation):
   Tài liệu: [LoRA Guide - Huggingface](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora)
   
   QLoRA (Quantized LoRA):
   Tài liệu: [QLoRA Guide - Huggingface](https://huggingface.co/docs/peft/main/en/developer_guides/quantization)
   
   Paper tham khảo:
   📄 [QLoRA Paper (2023)](https://arxiv.org/pdf/2305.14314)

# 5. Important Hyperparameters

### 5.1 R (Rank)

   Ý nghĩa: Xác định kích thước không gian con trong LoRA (số lượng tham số thấp hơn được huấn luyện).
   
   Giá trị càng nhỏ → ít tham số cần cập nhật → nhanh hơn, nhưng có thể giảm hiệu quả fine-tuning.
   
   Docs: [PEFT LoRA Parameters](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora)

### 5.2 Alpha

   Ý nghĩa: Hệ số scale khuếch đại ảnh hưởng của các tham số LoRA lên trọng số ban đầu.
   
   Alpha càng lớn → ảnh hưởng LoRA càng mạnh mẽ.
   
   Docs: [LoRA Alpha Scaling (gốc LoRA paper).](https://arxiv.org/pdf/2106.09685.pdf)

### 5.3 Target Modules

   Ý nghĩa: Các module trong mô hình mà LoRA sẽ áp dụng.
   
   Ví dụ: "q_proj", "k_proj", "v_proj", "o_proj" (các lớp attention projection).
   
   Docs: [Choosing Target Modules](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora#how-lora-works)

# 6. LLMs Training Process

### 6.1 Forward Pass

   Đưa dữ liệu đầu vào qua mô hình để mô hình dự đoán token tiếp theo.

### 6.2 Loss Calculation

   So sánh đầu ra của mô hình với nhãn thực tế để tính toán loss.

### 6.3 Backward Pass

   Tính toán gradient của loss với respect tới các tham số mô hình.

### 6.4 Optimization

   Cập nhật trọng số theo công thức:

**new_weight = old_weight - learning_rate * gradient**

📚 Docs: [Deep Learning Book - Optimization](https://www.deeplearningbook.org/contents/numerical.html)

# 7. Training Configuration

### 7.1 SFTTrainer Configuration

   Epochs: Số lần duyệt toàn bộ tập dữ liệu huấn luyện (có thể tăng lên 4+).
   
   Batch size: 1 (per device) × 8 (gradient accumulation) = 8 mẫu/lần update.

### 7.2 Optimizer

   paged_adamw_32bit:
   
   Phiên bản AdamW tối ưu bộ nhớ khi fine-tune mô hình lớn.
   
   Tài liệu: [PagedAdamW Optimizer](https://huggingface.co/docs/bitsandbytes/main/en/reference/optim/adamw)

### 7.3 Learning Rate

   Tham số quyết định tốc độ cập nhật trọng số.
   
   Nếu quá cao → có thể nhảy khỏi điểm tối ưu.
   
   Nếu quá thấp → mô hình học rất chậm hoặc kẹt local minimum.

### 7.4 Scheduler

   Cosine scheduler:
   
   Learning rate giảm theo hình dạng sóng cosine.
   
   Bắt đầu giảm nhẹ → giảm mạnh → ổn định dần.
   
   Docs: [Cosine LR Scheduler](https://discuss.huggingface.co/t/using-cosine-lr-scheduler-via-trainingarguments-in-trainer/14783/6)



https://nvdam.widen.net/s/wlbgbqr7cj/nvidia-learning-training-course-catalog

Tai lieu tham khao trong video:
[Llm course](https://www.udemy.com/course/llm-engineering-master-ai-and-large-language-models/?srsltid=AfmBOorXXQrsRbJli2ye4GP3ICQCN5g5wUtofSmIx3ef6H6XqdbrC59P&couponCode=KEEPLEARNING)

**Lưu ý: Toàn bộ những gì mình chia sẽ đều là những gì mình học và tổng hợp được. No COMMERCIAL intent!!**
