const WHATSAPP_NUMBER = "201061067966";

export function openWhatsApp(message: string) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
}

export function shareOnWhatsApp(toolName: string, toolPath: string) {
  const url = `${window.location.origin}${toolPath}`;
  const text = `🔥 جرب أداة "${toolName}" مجاناً من شركة الشبح! 👻\nهتكتشف حاجات مكنتش تعرفها عن شغلك 💪\n👇 جربها دلوقتي`;
  if (navigator.share) {
    navigator.share({ title: `${toolName} - شركة الشبح`, text, url });
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`, "_blank");
  }
}

export function shareForAccuracy(toolName: string, toolPath: string) {
  const url = `${window.location.origin}${toolPath}`;
  const text = `😳 لسه عامل تحليل لشغلي والنتيجة صدمتني!\n🔥 جرب "${toolName}" مجاناً عشان تعرف أنت كمان\n👇 ادخل هنا`;
  if (navigator.share) {
    navigator.share({ title: toolName, text, url });
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`, "_blank");
  }
}
