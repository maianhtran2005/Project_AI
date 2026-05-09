# Fine-Tuning Process for This Project

# 1. Dataset
We utilize a pre-cleaned dataset hosted on Hugging Face for this project: [calmm-m/summarization](https://huggingface.co/datasets/calmm-m/summarization). This dataset is specifically curated for text summarization tasks.

# 2. Data Preparation Process
The data processing pipeline consists of the following key steps:

### Data Cleaning
Removed irrelevant information such as product codes, special characters, and extraneous fields that do not contribute to generating accurate summaries. This ensures the model focuses solely on high-quality text pairs.

### Tokenization
Utilized the standard Llama tokenizer. 
* **Enhancement:** Applied proper padding and truncation strategies with a predefined maximum sequence length (e.g., 512 or 1024 tokens) to optimize memory usage and ensure uniform batch sizes during training.

# 3. Training
The model was fine-tuned on Kaggle using a dual GPU setup (GPU T4 x 2). The resulting weights are hosted on Hugging Face: `calmm-m/news-summarization`.

### Prompt Standardization
All prompts were standardized into a consistent instruction format to help the model distinguish between context and expected output:
```text
# `prompt` (Instruction/Input): The original source text.
# `completion` (Output/Label): The target summary.
