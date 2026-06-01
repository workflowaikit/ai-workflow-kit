const hoursInput = document.querySelector("#hours");
const rateInput = document.querySelector("#rate");
const costInput = document.querySelector("#cost");
const result = document.querySelector("#result");
const replyForm = document.querySelector("#reply-form");
const replyOutput = document.querySelector("#reply-output");
const leadForm = document.querySelector("#lead-form");
const leadMessage = document.querySelector("#lead-message");

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

if (hoursInput && rateInput && costInput && result) {
  [hoursInput, rateInput, costInput].forEach((input) => {
    input.addEventListener("input", updateResult);
  });

  updateResult();
}

function buildReply({ message, tone, business }) {
  const greeting = tone === "warm" ? "Hi there," : "Hello,";
  const closer = tone === "firm" ? "Regards," : "Kind regards,";
  const businessLine = business ? `\n\n${closer}\n${business}` : `\n\n${closer}`;

  if (tone === "firm") {
    return `${greeting}\n\nThanks for your message. I understand the issue and want to make sure we handle it clearly. Based on your note, the main concern appears to be:\n\n"${message}"\n\nPlease send any relevant order details, dates, or photos so we can review the situation and confirm the next step.`;
  }

  if (tone === "apology") {
    return `${greeting}\n\nThank you for letting us know. I am sorry this experience did not meet expectations. Based on your message, I understand the concern is:\n\n"${message}"\n\nWe will review the details and get back to you with the most helpful next step.`;
  }

  return `${greeting}\n\nThanks for reaching out. I understand your message is about:\n\n"${message}"\n\nWe will check the details and come back to you with a clear next step.`;
}

if (replyForm && replyOutput) {
  replyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(replyForm);
    const message = String(data.get("message") || "").trim();
    const tone = String(data.get("tone") || "warm");
    const business = String(data.get("business") || "").trim();

    if (!message) {
      replyOutput.value = "Paste a customer message first.";
      return;
    }

    replyOutput.value = buildReply({ message, tone, business });
  });
}

if (leadForm && leadMessage) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = String(new FormData(leadForm).get("email") || "").trim();
    if (!email.includes("@")) {
      leadMessage.textContent = "Enter a valid email address.";
      return;
    }

    localStorage.setItem("aiwk_lead_email", email);
    leadMessage.textContent = "Template request saved in this browser. Connect an email provider to collect subscribers automatically.";
  });
}
