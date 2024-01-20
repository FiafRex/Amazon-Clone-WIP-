import { cart } from "../../data/cart.js";
import { getMatchingId } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurreny } from "../utils/money.js";

export function renderPaymentSummary() {
  let quantity = 0;
  let productPriceCents = 0;
  let shippingPriceCents = 0;


  cart.forEach((cartItem)=>{
    const product = getMatchingId(cartItem.productId);
    productPriceCents+= product.priceCents * cartItem.quantity;
    quantity+=cartItem.quantity;


  const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
  shippingPriceCents += deliveryOption.priceCents;

  });

  const totalBeforeTaxCents = productPriceCents+shippingPriceCents;
  const taxCents = totalBeforeTaxCents*0.1;
  console.log(taxCents);
  const total = totalBeforeTaxCents+taxCents;
  const headHTML = 
  `
  <div class = "js-checkout-header">
          Checkout (<a class="return-to-home-link"
            href="amazon.html">${quantity} items</a>)
          </div>
  `;
  document.querySelector('.checkout-header-middle-section').innerHTML= headHTML;
  const priceSummaryHTML =
  ` 
    <div class="payment-summary">
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${quantity}):</div>
      <div class="payment-summary-money ">$${formatCurreny(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
      $${formatCurreny(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      $${formatCurreny(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurreny(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurreny(total)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  </div>
  `

  document.querySelector('.js-payment-summary').innerHTML = priceSummaryHTML;




  
}



