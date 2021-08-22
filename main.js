const nav = document.querySelector('.nav');
const root = document.querySelector('#root');

const meals = [
    {
        picture: './images/salad-pngrepo-com.png',
        title: 'Ceaser salad',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, error.',
        price: 6,
    },
    {
        picture: 'images/soup-pngrepo-com.png',
        title: 'Tomato soup',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, error.',
        price: 5,
    },
    {
        picture: './images/steak-pngrepo-com.png',
        title: 'Steak',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, error.',
        price: 12,
    },
    {
        picture: './images/orange-juice-juice-pngrepo-com.png',
        title: 'Orange juice',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, error.',
        price: 3,
    },
];

const cartItems = {};

renderHome();

nav.onclick = function (event) {
    event.preventDefault();
    if (event.target.getAttribute('href') === 'home') renderHome();
    if (event.target.getAttribute('href') === 'cart') renderCart();
}

function renderHome() {
    document.querySelector('#homeBtn').classList.add('active');
    document.querySelector('#cartBtn').classList.remove('active');

    root.className = 'products';
    root.innerHTML = '';
    meals.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        const addButton = document.createElement('input');
        addButton.type = 'button';
        addButton.setAttribute('id', index);
        addButton.value = 'Add to cart';

        addButton.addEventListener('click', (evt) => {
            const id = evt.target.getAttribute('id');

            if (cartItems[id]) {
                cartItems[id].quantity += 1;
            } else {
                cartItems[id] = {
                    title: meals[id].title,
                    price: meals[id].price,
                    quantity: 1
                };
            };
        });

        card.innerHTML = `
            <img src=${item.picture} alt=${item.title}>
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <h3>Price: € ${item.price}</h3>
        `;
        card.appendChild(addButton);
        root.append(card);
    })
};

function renderCart() {
    document.querySelector('#homeBtn').classList.remove('active');
    document.querySelector('#cartBtn').classList.add('active');

    root.className = 'cart';
    root.innerHTML = `<table>
    <thead>
    <th class="title">title</th>
    <th class="price">price</th>
    <th class="count">count</th>
    <th class="total">total</th>
    <th class="total">actions</th>
    </thead> </table>`
    const tbody = document.createElement('tbody');

    const entries = Object.entries(cartItems);

    entries.forEach(entry => {
        const tr = document.createElement('tr');
        const actions = document.createElement('td');

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'delete';
        deleteBtn.setAttribute('data-id', entry[0]);
        deleteBtn.addEventListener('click', (evt) => {
            const id = evt.target.dataset.id;
            if (cartItems[id].quantity > 1) {
                cartItems[id].quantity -= 1;
            } else {
                delete cartItems[id];
            }
            renderCart();
        });

        actions.append(deleteBtn);

        tr.innerHTML = `<td>${entry[1].title}</td>
        <td>€ ${entry[1].price}</td>
        <td>${entry[1].quantity}</td>
        <td>€ ${entry[1].price * entry[1].quantity}</td>`;

        tr.append(actions);
        tbody.append(tr);
    });
    
    const total = document.createElement('div');
    total.className = "totalPrice";
    total.innerHTML = `Total: € ${entries.reduce((total, entry) => total += entry[1].price * entry[1].quantity, 0)}`;
    root.querySelector('table').append(tbody);
    root.append(total);
}
