import { useEffect, useState } from 'react'; // useState y useEffect para manejar el estado y efectos secundarios
import axios from 'axios'; // Axios para realizar la solicitud HTTP
import Chart from './Chart'; // Importación del componente Chart para renderizar los gráficos

function Home() {
    // Estados para almacenar los datos, los datos filtrados y el valor del filtro
    const [data, setData] = useState([]); // Datos de población por continente
    const [filteredData, setFilteredData] = useState([]); // Datos filtrados por población
    const [filterValue, setFilterValue] = useState(''); // Valor ingresado en el filtro
    const [loading, setLoading] = useState(false);  // Estado de carga
    const [error, setError] = useState(null);  // Estado para manejar errores
    const [noResults, setNoResults] = useState(false);  // Estado para mostrar mensaje si no hay resultados

    // Efecto que se ejecuta al cargar el componente para obtener los datos de la API
    useEffect(() => {
        setLoading(true); // Activar el estado de carga al hacer la solicitud
        setError(null);  // Resetear cualquier error anterior
        // Solicitud HTTP para obtener los datos de los países
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                // Crear un objeto para acumular la población por continente
                const populationByContinent = {};
                response.data.forEach(country => {
                    const continent = country.region || 'Unknown'; // Asignamos "Unknown" si no se tiene región
                    populationByContinent[continent] = (populationByContinent[continent] || 0) + country.population;
                });

                // Convertir el objeto de poblaciones por continente a un array
                const formattedData = Object.entries(populationByContinent).map(([continent, population]) => ({
                    continent, // Nombre del continente
                    population, // Población total del continente
                }));

                // Establecer los datos para su uso en el componente
                setData(formattedData);
                setFilteredData(formattedData); // Inicialmente los datos filtrados son los mismos que los datos completos
            })
            .catch(err => {
                console.error('Error al obtener los países:', err);
                setError('Ocurrió un error al obtener los datos. Por favor, inténtalo más tarde.');  // Mostrar mensaje de error
            })
            .finally(() => {
                setLoading(false);  // Desactivar el estado de carga una vez que termine la solicitud
            });
    }, []);

    // Efecto para filtrar los datos según el valor ingresado en el filtro
    useEffect(() => {
        // Convertir el valor del filtro a un número
        const filterValueInt = parseInt(filterValue, 10);

        // Si el valor es un número válido, filtrar los datos por población
        if (!isNaN(filterValueInt)) {
            const filtered = data.filter(d => d.population >= filterValueInt);
            setFilteredData(filtered);
            setNoResults(filtered.length === 0);  // Verificamos si no hay resultados después de aplicar el filtro
        } else {
            setFilteredData(data);
            setNoResults(false);  // Si no hay filtro, no mostramos el mensaje de "sin resultados"
        }
    }, [filterValue, data]);

    return (
        <div className="h-screen flex flex-col overflow-hidden pt-16">
            {/* Contenedor principal que toma el 100% de la altura */}
            <div className="h-full bg-gray-100 flex flex-col items-center justify-center p-6">
                {/* Título principal */}
                <h1 className="text-3xl font-bold text-blue-600 mb-6">
                    Global Population by Continent
                </h1>

                {/* Indicador de carga */}
                {loading && <p className="text-lg text-blue-600 mb-4">Cargando datos...</p>}

                {/* Mostrar mensaje de error si ocurre un error */}
                {error && <p className="text-lg text-red-600 mb-4">{error}</p>}

                {/* Mostrar mensaje si no hay resultados */}
                {noResults && <p className="text-lg text-red-600 mb-4">No hay continentes con una población igual o superior al valor indicado.</p>}
                
                {/* Filtro para la población */}
                <div className="w-full max-w-md">
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 mb-6"
                        placeholder="Filter by Population"
                        value={filterValue} // El valor del filtro es controlado por el estado
                        onChange={(e) => setFilterValue(e.target.value)} // Actualiza el estado del filtro cuando cambia
                    />
                </div>

                {/* Mostrar el contenedor del gráfico solo si no hay error, no está en carga, y hay datos disponibles */}
                {!loading && !error && !noResults && (
                    <div className="w-full max-w-4xl border-gray-50 shadow-lg rounded-lg p-6 h-full overflow-auto">
                        <Chart data={filteredData} labelKey="continent" valueKey="population" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home; // Exporta el componente Home para que pueda ser utilizado en otros archivos.
