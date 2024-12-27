// Importación de los componentes necesarios de React Router y otros componentes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter, Routes y Route son componentes de React Router para la navegación y enrutamiento
import Home from './components/Home'; // Componente que representa la página principal de la aplicación
import ContinentView from './components/ContinentView'; // Componente para mostrar detalles de un continente específico
import Header from './components/Header'; // Componente para mostrar la barra de navegación
import './styles/index.css'; // Importación de los estilos globales de la aplicación

// Componente principal de la aplicación
function App() {
    return (
        <Router> {/* Router: Proveedor de rutas, permite el enrutamiento en la aplicación */}
            <Header /> {/* Barra de navegación que se muestra en todas las páginas */}

            <Routes> {/* Contenedor que agrupa las rutas */}
                {/* Ruta para la página principal: '/' */}
                <Route path="/" element={<Home />} /> {/* Cuando la URL sea '/', se renderiza el componente Home */}

                {/* Ruta para la vista de un continente específico: '/continent/:continentName' */}
                <Route path="/continent/:continentName" element={<ContinentView />} /> {/* Cuando la URL coincida con '/continent/:continentName', se renderiza ContinentView */}
            </Routes> {/* Aquí van las rutas específicas que se activan según la URL */}
        </Router>
    );
}

// Exportación del componente para que sea utilizado en otros archivos
export default App;
