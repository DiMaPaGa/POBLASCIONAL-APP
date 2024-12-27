import { useState, useEffect } from 'react'; // useState y useEffect para manejar el estado y efectos secundarios
import { Link, useLocation } from 'react-router-dom'; // Link para la navegación y useLocation para conocer la ruta actual
import axios from 'axios'; // Axios para hacer solicitudes HTTP a la API

function Header() {
    // Estados para manejar los continentes y el estado del menú móvil
    const [continents, setContinents] = useState([]); // Estado para almacenar la lista de continentes
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú móvil está abierto o cerrado
    const location = useLocation(); // hook useLocation para obtener la ruta actual

    // useEffect para cargar los continentes cuando el componente se monta
    useEffect(() => {
        // Hacemos una solicitud a la API para obtener todos los países
        axios.get('https://restcountries.com/v3.1/all')
            .then((response) => {
                // Extraemos los continentes únicos de los países recibidos
                const uniqueContinents = [...new Set(response.data.map((country) => country.region))];
                
                // Filtramos los valores vacíos y actualizamos el estado de los continentes
                setContinents(uniqueContinents.filter((continent) => continent));
            })
            .catch((err) => console.error('Error al obtener los países:', err)); // En caso de error, mostramos un mensaje en consola
    }, []); // Solo se ejecuta una vez cuando el componente se monta (ya que el array de dependencias está vacío)

    // Función para cerrar el menú móvil cuando se hace clic en un enlace
    const handleLinkClick = () => setIsMenuOpen(false);

    return (
        // Barra de navegación
        <nav className="bg-blue-600 shadow-md fixed top-0 left-0 right-0 z-50 h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
                {/* Título */}
                <Link to="/" className="text-gray-50 text-xl font-bold">
                    Global View
                </Link>

                {/* Menú para pantallas grandes */}
                <div className="hidden md:flex space-x-6">
                    {/* Mapeamos los continentes y generamos un enlace por cada uno */}
                    {continents.map((continent) => (
                        <Link
                            key={continent} // Cada enlace necesita una key única
                            to={`/continent/${continent}`} // Ruta hacia la vista del continente
                            className={`text-gray-50 hover:text-blue-300 ${
                                location.pathname.includes(continent) ? 'font-semibold underline' : '' // Agrega estilo si la ruta incluye el continente
                            }`}
                        >
                            {continent} {/* Nombre del continente */}
                        </Link>
                    ))}
                </div>

                {/* Botón para menú móvil (aparece solo en pantallas pequeñas) */}
                <button
                    className="text-gray-50 md:hidden" // Solo se muestra en pantallas pequeñas
                    onClick={() => setIsMenuOpen(!isMenuOpen)} // Cambia el estado del menú móvil
                    aria-label="Alternar Menu" // Accesibilidad: Etiqueta descriptiva para un elemento de la interfaz que no tiene texto visible. Indica que el botón o control es para alternar (activar o desactivar) la visibilidad del menú.
                >
                    {/* Ícono de menú hamburguesa (3 líneas) */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Menú desplegable para móviles (solo visible cuando el estado `isMenuOpen` es verdadero) */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-600 px-4 py-2 space-y-2 max-h-96 overflow-y-auto">
                    {/* Mapeamos los continentes y generamos un enlace por cada uno */}
                    {continents.map((continent) => (
                        <Link
                            key={continent} // Cada enlace necesita una key única
                            to={`/continent/${continent}`} // Ruta hacia la vista del continente
                            onClick={handleLinkClick} // Cierra el menú móvil al hacer clic en un enlace
                            className={`block text-white hover:text-blue-300 ${
                                location.pathname.includes(continent) ? 'font-semibold underline' : '' // Agrega estilo si la ruta incluye el continente
                            }`}
                        >
                            {continent} {/* Nombre del continente */}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Header; // Exporta el componente Header para que pueda ser utilizado en otros archivos.

