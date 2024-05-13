// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const searchButton = document.getElementById('searchButton');
const searchInput=document.getElementById('searchInput');


let items = [
  {
    id: 1,
    name: 'White Shoes',
    price: 121.01,
    link:"./pics/nike1.png",
  },
  {
    id: 2,
    name: 'Green Shoes',
    price: 99.99,
    link:"./pics/nike2.png",
  },
  {
    id: 3,
    name: 'Gray Shoes',
    price: 102.54,
    link:"./pics/nike3.png",
  },
  {
    id: 4,
    name: 'Purple Shirt',
    price: 34.99,
    link:"./pics/shirt1.png"
  },
  {
    id: 5,
    name: 'White Shirt',
    price: 54.02,
    link:"./pics/shirt2.png",
  },
  {
    id: 6,
    name: 'Red Trousers',
    price: 79.99,
    link:"./pics/trousers2.png"
  },
  {
    id: 7,
    name: 'Gray Trousers',
    price: 79.99,
    link:"./pics/troussers1.png"
  },
];

let cart = [];


function viewCart() {
  cartItemsList.innerHTML = '';

  const countOfItems = {};

  for(const item of cart){
    if(countOfItems[item.name]){
      countOfItems[item.name]++;
    }
    else {
      countOfItems[item.name] = 1;
    }
  }

  for (const item of Object.keys(countOfItems)) {
    let cartItem= document.createElement('li');
    const itemCount = countOfItems[item];
    const totalPriceForItem = itemCount * items.find(i => i.name === item).price;
    cartItem.textContent = `${item} (${itemCount}) - $${totalPriceForItem.toFixed(2)}`;
    cartItem.appendChild(createRemove(item)); 
    cartItemsList.appendChild(cartItem);
  }

  const totalP = cart.reduce((total, item) => total + item.price, 0);
  cartTotal.textContent = `$${totalP.toFixed(2)}`;

  toggleModal();
}

function fillItemsGrid() {
  for (const item of items) {
    let itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemElement.innerHTML = `
      <img src="${item.link}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p>$${item.price}</p>
      <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
    `;
    itemsGrid.appendChild(itemElement);

    const addToCartButton = itemElement.querySelector('.add-to-cart-btn');
    addToCartButton.addEventListener('click', function () {
      const itemId = parseInt(addToCartButton.dataset.id);
      const itemToAdd = items.find(item => item.id === itemId);

      if (itemToAdd) {
        cart.push(itemToAdd);
        updateCart();
      }
    });
  }
}



function createRemove(itemName) {
  const removeBtn = document.createElement('button');

  removeBtn.textContent = 'Remove item';
  removeBtn.classList.add('remove-from-cart-btn');
  removeBtn.addEventListener('click', () => removeFromTheCart(itemName));
  return removeBtn;
}


function removeFromTheCart(itemName) {
    const index = cart.findIndex(item => item.name === itemName);
    
    if (index !== -1) {
      cart.splice(index, 1); 
      updateCart(); 
      viewCart(); 
    }
}
  

  function updateCart() {
    cartBadge.textContent = cart.length; 
    if (cart.length === 0) {
      cartBadge.style.display = '0'; 
    } else {
    }
  }



function BuyFromCart(){
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return; 
    }
      alert('Purchase successful!');
      cart = [];
  updateCart();
  viewCart(); 
}



function searchItems(){
    const searchItem = searchInput.value.toLowerCase(); 
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchItem));
  

    itemsGrid.innerHTML = ''; 
  
    if (filteredItems.length === 0) {
      itemsGrid.innerHTML = '<p>No items found.</p>'; 
    }
    else {
      for (const item of filteredItems) {

        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
          <img src="${item.link}" alt="${item.name}">
          <h2>${item.name}</h2>
          <p>$${item.price}</p>
          <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);
  
        const addToCartButton = itemElement.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', function () {
          const itemId = parseInt(addToCartButton.dataset.id);
          const itemToAdd = items.find(item => item.id === itemId);
  
          if (itemToAdd) {
            cart.push(itemToAdd);
            updateCart();
          }
        });
      }
    }
  }
  


function toggleModal() {
  modal.classList.toggle('show-modal');
}

fillItemsGrid();

cartButton.addEventListener('click', viewCart);
modalClose.addEventListener('click', toggleModal);
buyButton.addEventListener('click', BuyFromCart);
searchButton.addEventListener('click', searchItems);