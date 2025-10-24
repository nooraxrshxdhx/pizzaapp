import React from 'react';
import ReactDOM from 'react-dom/client';

function Header() {
  return <h1> My Pizza Store </h1>;
}

function Pizza(props) {
  return (
    <div>
      <img 
        src={process.env.PUBLIC_URL + '/pizzas/' + props.image} 
        alt={props.name} 
        width="200"
      />
      <h2>{props.name}</h2>
    </div>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Pizza name="Margherita" image="margherita.jpg" />
      <Pizza name="Prosciutto" image="prosciutto.jpg" />
      <Pizza name="Funghi" image="funghi.jpg" />
      <Pizza name="Focaccia" image="focaccia.jpg" />
      <Pizza name="Spinaci" image="spinaci.jpg" />
      <Pizza name="Salamino" image="salamino.jpg" />
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

