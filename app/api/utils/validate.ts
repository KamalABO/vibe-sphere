// utils/validate.ts

// ----------------------------
// ✅ Validate Email
// ----------------------------
export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ----------------------------
// ✅ Validate Password
// ----------------------------
export function validatePassword(password: string) {
  return password.length >= 6; // ممكن نزود شروط قوة أكثر
}

// ----------------------------
// ✅ Validate Content
// ----------------------------
export function validateContent(content: string) {
  return content && content.trim().length > 0;
}

// ----------------------------
// ✅ Validate File (image/video)
// ----------------------------
export function validateFile(file: File | null, type: "image" | "video") {
  if (!file) return false;

  const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
  const validVideoTypes = ["video/mp4", "video/webm", "video/quicktime"];

  const maxSizeMB = 10; // أقصى حجم 10 ميجا
  const maxSize = maxSizeMB * 1024 * 1024;

  if (type === "image" && !validImageTypes.includes(file.type)) return false;
  if (type === "video" && !validVideoTypes.includes(file.type)) return false;

  if (file.size > maxSize) return false;

  return true;
}
