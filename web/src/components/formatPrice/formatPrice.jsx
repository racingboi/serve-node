export default function formatPrice(price) {
  const formattedNumber = new Intl.NumberFormat('vi-VN').format(price);
  return `${formattedNumber} VND`;
}
