// lib/stripe.ts

export const initiateStripeCheckout = async (email: string) => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const { url } = await res.json();
  if (url) {
    window.location.href = url;
  } else {
    alert("결제 페이지를 여는 데 실패했습니다.");
  }
};
