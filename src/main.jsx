// Importación de React y ReactDOM para poder renderizar la aplicación
import React from 'react'; // Importa la biblioteca React para que el código JSX funcione correctamente
import ReactDOM from 'react-dom/client'; // Importa el objeto ReactDOM para interactuar con el DOM del navegador y renderizar la aplicación
import App from './App'; // Importa el componente App, que contiene la estructura de la aplicación
import './styles/index.css'; // Importa los estilos globales de la aplicación

// Renderiza la aplicación dentro del elemento con id 'root' en el DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* React.StrictMode se utiliza para ayudar a identificar problemas potenciales en la aplicación */}
    <App /> {/* El componente App es el punto de entrada de la aplicación */}
  </React.StrictMode>
);

