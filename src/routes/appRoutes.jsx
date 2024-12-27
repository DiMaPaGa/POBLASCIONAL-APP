// Importación de componentes y funciones necesarias de React Router
import { Routes, Route } from 'react-router-dom'; // Se importan Routes y Route para la definición de rutas
import Home from '../pages/Home'; // Se importa el componente Home para la ruta principal
import ContinentView from '../pages/ContinentView'; // Se importa el componente ContinentView para la ruta de continentes específicos

// Componente que define las rutas de la aplicación
const AppRoutes = () => {
  return (
    <Routes> {/* Contenedor principal de las rutas en la aplicación */}
      {/* Ruta para la página de inicio */}
      <Route path="/" element={<Home />} /> {/* Cuando la URL sea '/', se renderiza el componente Home */}

      {/* Ruta para la vista de un continente específico */}
      <Route path="/continent/:name" element={<ContinentView />} /> {/* Cuando la URL sea '/continent/:name', se renderiza el componente ContinentView */}
    </Routes>
  );
};

// Exportación de las rutas para que puedan ser utilizadas en otras partes de la aplicación
export default AppRoutes;

