const classify = (bmi) => {
  if (bmi < 18.5) return { category: '偏瘦', tip: '建议保持均衡饮食与适量运动。' };
  if (bmi < 24) return { category: '正常', tip: '继续保持健康的生活习惯。' };
  if (bmi < 28) return { category: '超重', tip: '建议关注饮食结构与日常活动量。' };
  return { category: '肥胖', tip: '建议结合腰围等指标评估健康状况，必要时咨询医生。' };
};

Page({
  data: { height: '', weight: '', bmi: '', category: '', tip: '', error: '', hasResult: false },
  onHeightInput(e) { this.setData({ height: e.detail.value, error: '', hasResult: false }); },
  onWeightInput(e) { this.setData({ weight: e.detail.value, error: '', hasResult: false }); },
  calculate() {
    const heightText = this.data.height.trim();
    const weightText = this.data.weight.trim();
    const numberPattern = /^(?:\d+(?:\.\d+)?|\.\d+)$/;
    if (!numberPattern.test(heightText) || !numberPattern.test(weightText)) {
      this.setData({ error: '请输入有效的身高和体重数字', hasResult: false });
      return;
    }
    const height = Number(heightText);
    const weight = Number(weightText);
    if (!Number.isFinite(height) || !Number.isFinite(weight) || height < 50 || height > 250 || weight < 10 || weight > 500) {
      this.setData({ error: '身高须为 50–250 cm，体重须为 10–500 kg', hasResult: false });
      return;
    }
    const bmi = weight / Math.pow(height / 100, 2);
    const result = classify(bmi);
    this.setData({ bmi: bmi.toFixed(1), category: result.category, tip: result.tip, error: '', hasResult: true });
  },
  reset() {
    this.setData({ height: '', weight: '', bmi: '', category: '', tip: '', error: '', hasResult: false });
  }
});
