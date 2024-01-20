import {cart, loadFromStorage, removeFromCart,updateDeliveryOption} from '../../data/cart.js';
import {products,getMatchingId} from '../../data/products.js';
import { formatCurreny } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions,getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './priceSummary.js';


export function renderOrderSummary() {

   loadFromStorage();

  let cartHTMLSummary='';
    cart.forEach((cartItem)=>{
      const productId = cartItem.productId;

      const matchingItem = getMatchingId(productId);

      const deliveryOptionId = cartItem.deliveryOptionId;

      const deliveryOption = getDeliveryOption(deliveryOptionId);

      const today = dayjs();
          
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

    cartHTMLSummary +=
      `<div class="cart-item-container 
      js-cart-item-container
      js-item-container-${matchingItem.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingItem.image}">

          <div class="cart-item-details">
            <div class="product-name">
            ${matchingItem.name}
            </div>
            <div class="product-price">
              $${formatCurreny(matchingItem.priceCents)}
            </div>
            <div class="product-quantity js-product-quantity-${matchingItem.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link
                js-delete-link-${matchingItem.id}"
                data-product-id="${matchingItem.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingItem, cartItem)}
          </div>
        </div>
      </div>
      `;
    });

      function deliveryOptionHTML(matchingItem, cartItem){
        let html='';

        deliveryOptions.forEach((deliveryOption)=>{
          const today = dayjs();
          
          const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
          );
          const dateString = deliveryDate.format(
            'dddd, MMMM D'
          );
          

          const priceString = deliveryOption.priceCents === 0 
          ? 'FREE'
          : `$${formatCurreny(deliveryOption.priceCents)}-`;

          const isChecked = deliveryOption.id ===  cartItem.deliveryOptionId;
          html+=
          `
          <div class="delivery-option js-delivery-option"
          data-product-id ="${matchingItem.id}"
          data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}

                  class="delivery-option-input"
                  name="delivery-option-${matchingItem.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} - Shipping
                  </div>
                </div>
            </div>
          `

        });
        return html;

        
      

      }
      
    document.querySelector('.js-order-summary').innerHTML=cartHTMLSummary;

    document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click', ()=>{
      let productid = link.dataset.productId;
      removeFromCart(productid);
      document.querySelector(`.js-item-container-${productid}`).remove();
      
      });
    });

    document.querySelectorAll('.js-delivery-option')
    .forEach((element) =>{
      element.addEventListener('click', ()=>{
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    }); 
   
  }
  
 