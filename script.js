"use strict";

const meals = [
  {
    id: "m1",
    name: "venkat",
    description: "Delicious food in your Hand",
    price: 22.6,
  },
  {
    id: "m2",
    name: "sarathi",
    description: "Good foods are in your way",
    price: 24.6,
  },
  {
    id: "m3",
    name: "sundar",
    description: "Above your expectation",
    price: 29.6,
  },
  {
    id: "m4",
    name: "mari",
    description: "Amazing menuList waitin for you",
    price: 32.6,
  },
];

let items;
let totalCarts;
let layOut;

const listItems = document.querySelector(".lists");
const header = document.querySelector(".header");
const layOuts = document.querySelector(".overlay");
const backdrop = document.querySelector(".backdrop");
const cartItems = document.querySelector(".carted-items");
const closeBtn = document.querySelector(".close-btn");

class CartItems {
  data = meals;
  items;
  // totalCarts = 0;

  constructor(items, totalCarts = 10, layOut = false) {
    // this.data = data;
    this.items = items;
    this.totalCarts = totalCarts;
    this.layOut = layOut;
    // this.num = num;
    this.renderLists();
    this.renderButton();
  }

  //////RENDERLIST/////

  renderLists() {
    // console.log(arr3, arr);
    this.data.map((item) => {
      const li = document.createElement("li");
      li.classList.add("list-items");

      li.innerHTML = `
        <div class='cartitem-container'>
          <div class='cartitem-details'>
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <span>$${item.price}</span>
          </div>
          <div class='cartadd-details'>
            <form class='form-submit>          
              <label for='inputcon'>Amount</label>
              <input id='inputcon' type='number' min='1' max='5' step='1'/>
              <button type='submit' class='button'>Add+</button>
            </form>
          </div>
        </div>

      `;

      listItems.appendChild(li);
    });

    document.querySelectorAll("li").forEach(this.addDatas.bind(this));
  }

  ////ADDDATA/////

  addDatas(li) {
    const btn = li.querySelector("button");
    const formSubmit = li.querySelector("form");
    formSubmit.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = li.querySelector("h2").textContent;
      const description = li.querySelector("p").textContent;
      const price = li.querySelector("span").textContent;
      const input = li.querySelector("input").value;

      // console.log(name, description, price, input);

      const cartObj = {
        name: name,
        description: description,
        price: price,
        totalCart: +input,
      };

      const existingItemIndex = items.findIndex(
        (item) => item.name === cartObj.name
      );

      const existingItem = items[existingItemIndex];
      // let items;
      if (existingItem) {
        const updatedItem = {
          ...cartObj,
          totalCart: existingItem.totalCart + cartObj.totalCart,
        };
        console.log(updatedItem);
        // items = [...items];
        items[existingItemIndex] = updatedItem;
        // items.push(cartObj);
      } else {
        items.push(cartObj);
      }

      console.log(items);

      // this.totalCarts = items.reduce(
      //   (curNum, item) => curNum + item.totalCart,
      //   0
      // );
      // console.log(this.totalCarts);

      // return this.totalCarts;
    });
  }

  /////RENDER BUTTON/////

  renderButton() {
    console.log(this.totalCarts);
    const button = document.createElement("button");
    button.classList.add("cart-btn");

    button.innerHTML = `
      
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={classes.cart}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      <p>AddCart</p>
      
    
    `;

    header.appendChild(button);

    const cartBtn = document.querySelector(".cart-btn");
    cartBtn.addEventListener("click", this.renderCartLayout.bind(this));
  }

  renderCartLayout() {
    // const arr = [];
    // const arr1 = items.concat(arr);
    cartItems.innerHTML = "";
    items.forEach((item) => {
      // console.log(item);

      const cartContainer = document.createElement("li");
      cartContainer.classList.add("cart-items");

      cartContainer.innerHTML = `            
          <div class='left-container'>
            <p>${item.name}</p>
            <span class='price'>${item.price}</span>
            <span class='total-cart'>${item.totalCart}</span>
          </div>
          <div class='right-container'>
            <button>+</button>
            <button>-</button>
          </div>
           
        
        `;
      backdrop.classList.remove("hidden");
      cartItems.appendChild(cartContainer);
    });

    closeBtn.addEventListener("click", function () {
      backdrop.classList.add("hidden");
    });

    backdrop.addEventListener("click", function () {
      backdrop.classList.add("hidden");
    });
  }
}

const cartItem = new CartItems((items = []), (totalCarts = 0));
console.log(cartItem);
