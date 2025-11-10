import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './index.css';

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function Header() {
  return (
    <header className="header">
      <h1>My Pizza Store</h1>
    </header>
  );
}

function Pizza({ name, ingredients, price, photoName, soldOut, isFavorite, onToggleFavorite }) {
  return (
    <li className={`pizza ${soldOut ? 'sold-out' : ''}`}>
      <div className="pizza-img-wrapper" onClick={onToggleFavorite}>
        <img src={process.env.PUBLIC_URL + '/' + photoName} alt={name} />
        <span className="heart-overlay">
          {isFavorite ? <FaHeart color="#edc84b" size={24} /> : <FaRegHeart color="#fff" size={24} />}
        </span>
      </div>
      <div className="pizza-content">
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? 'SOLD OUT' : `$${price}`}</span>
      </div>
    </li>
  );
}
function Menu({ searchTerm, favorites, toggleFavorite }) {
  const filteredPizzas = pizzaData.filter(pizza =>
    pizza.ingredients.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {filteredPizzas.map((pizza) => (
          <Pizza
            key={pizza.name}
            name={pizza.name}
            ingredients={pizza.ingredients}
            price={pizza.price}
            photoName={pizza.photoName}
            soldOut={pizza.soldOut}
            isFavorite={favorites.includes(pizza.name)}
            onToggleFavorite={() => toggleFavorite(pizza.name)}
          />
        ))}
      </ul>
    </div>
  );
}

function Order() {
  return (
    <div className="order">
      <p>We’re currently open</p>
      <button className="btn">Order</button>
    </div>
  );
}

function Footer({ isOpen }) {
  return (
    <footer className="footer">
      {isOpen ? <Order /> : <p>Sorry we’re closed</p>}
    </footer>
  );
}

function App() {
  const currentHour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = currentHour >= openHour && currentHour < closeHour;

  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(name) {
    setFavorites(prev =>
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  }

  return (
    <div className="content">
      <div className="container">
        <Header />
        {isOpen && <p className="tagline">Authentic Italian cuisine, all from our stone oven</p>}
        <input
          type="text"
          placeholder="Search by topping..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="search-bar"
        />
        <Menu
          searchTerm={searchTerm}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
        <Footer isOpen={isOpen} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);