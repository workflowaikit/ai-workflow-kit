const hoursInput = document.querySelector("#hours");
const rateInput = document.querySelector("#rate");
const costInput = document.querySelector("#cost");
const result = document.querySelector("#result");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function updateResult() {
  const hours = Number(hoursInput.value || 0);
  const rate = Number(rateInput.value || 0);
  const cost = Number(costInput.value || 0);
  const monthlyNetValue = hours * rate * 4 - cost;
  result.value = `${formatCurrency(monthlyNetValue)} estimated monthly net value`;
}

[hoursInput, rateInput, costInput].forEach((input) => {
  input.addEventListener("input", updateResult);
});

updateResult();
