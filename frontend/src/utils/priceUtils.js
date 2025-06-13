export function formatPriceInINR(amount, withSymbol = true) {
  if (isNaN(amount)) return "'₹0.00'";

  return new Intl.NumberFormat("en-IN", {
    style: withSymbol ? "currency" : "decimal",
    currency: "INR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
}
