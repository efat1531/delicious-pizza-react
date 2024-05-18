import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";

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

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

const Header = () => {
  return (
    <header className="header">
      <h1>Delicious Pizza</h1>
    </header>
  );
};

const Menu = () => {
  const numPizzas = pizzaData.filter((pizza) => !pizza.soldOut).length || 0;
  return (
    <main className="menu">
      <h2>Menu</h2>
      {numPizzas === "0" ? (
        <p>Sorry, we are sold out for today. Please come back later.</p>
      ) : (
        <>
          <p>
            Authentic Italian cuisine. {numPizzas} creative dishes to choose
            from. All from our stone oven, all organic, all delicious.
          </p>
          <h2>Pizzas</h2>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} />
            ))}
          </ul>
        </>
      )}
    </main>
  );
};

const Pizza = ({ pizzaObj }) => {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <p>{pizzaObj.soldOut ? "Sold Out" : `Price: $${pizzaObj.price}`}</p>
      </div>
    </li>
  );
};

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const hour = new Date().getHours();
  const open = hour >= 9 && hour < 20;
  const newDay = hour >= 20;
  const message = open
    ? `We are open untill 22.00. Come visit us or order Online.`
    : `We are closed ${newDay ? "for today" : "now"}. You can visit us ${
        newDay ? "tommorow" : "today"
      } between 9.00 and 22.00 or order online.`;
  return (
    <footer className="footer">
      <div className="order">
        <p>{message}</p>
        <p>Current time: {currentTime}</p>
        <Order open={open} />
      </div>
    </footer>
  );
};

const Order = ({ open }) => {
  if (!open) {
    return null;
  }
  return <button className="btn">Order</button>;
};

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
