// Importaciones necesarias
import { useEffect, useState } from 'react'; // Para manejar el ciclo de vida del componente y el estado
import { useParams } from 'react-router-dom'; // Para obtener parámetros de la URL (en este caso, el nombre del continente)
import axios from 'axios'; // Para hacer solicitudes HTTP
import Chart from './Chart'; // Componente para renderizar el gráfico

// Componente principal que muestra los datos de un continente
function ContinentView() {
    // Extraemos el nombre del continente de la URL usando useParams
    const { continentName } = useParams();
    
    // Estados para manejar los datos de los países, el filtro y los datos filtrados
    const [data, setData] = useState([]); // Estado para almacenar los datos de los países
    const [filteredData, setFilteredData] = useState([]); // Estado para almacenar los datos después de aplicar el filtro
    const [filterValue, setFilterValue] = useState(''); // Estado para almacenar el valor del filtro (población mínima)
    const [loading, setLoading] = useState(true); // Estado para saber si los datos se están cargando
    const [error, setError] = useState(null); // Estado para almacenar errores de la API
    const [isChartVisible, setIsChartVisible] = useState(true); // Estado para controlar la visibilidad del gráfico


    // useEffect para cargar los países al inicializar el componente y cuando cambia el nombre del continente
    useEffect(() => {
        setLoading(true); // Activamos el indicador de carga al iniciar la solicitud
        setError(null); // Restablecemos cualquier error previo

        // Hacemos una solicitud a la API para obtener todos los países
        axios.get('https://restcountries.com/v3.1/all')
            .then((response) => {
                // Filtramos los países por la región que corresponde al continente en la URL (ejemplo: "region": "Antarctic",)
                const countriesInContinent = response.data
                    .filter((country) => country.region === continentName) // Filtramos por continente
                    .map((country) => ({
                        name: country.name.common, // Extraemos el nombre común del país
                        population: country.population, // Extraemos la población del país
                    }));
                
                // Actualizamos los estados con los datos de los países del continente
                setData(countriesInContinent);
                setFilteredData(countriesInContinent);
                setLoading(false); // Desactivamos el indicador de carga
                
                 // Si no hay países en el continente, no mostramos el gráfico
                 if (countriesInContinent.length === 0) {
                    setIsChartVisible(false); // Ocultamos el gráfico si no hay países
                }
            })
            .catch((err) => {
                // Si hay un error, lo almacenamos en el estado `error`
                setError('Error al obtener los datos del continente. Intenta nuevamente más tarde.');
                setLoading(false); // Desactivamos el indicador de carga incluso si hay un error
                setIsChartVisible(false); // Ocultamos el gráfico en caso de error
                console.error('Error al obtener los países:', err); // Imprimimos el error en consola
            });

    }, [continentName]); // Este useEffect se ejecuta cuando cambia el nombre del continente en la URL

    // useEffect para aplicar el filtro de población a los datos
    useEffect(() => {
        // Intentamos convertir el valor del filtro a un número entero
        const filterValueInt = parseInt(filterValue, 10);
        
        // Si el valor del filtro es un número válido, filtramos los países por población
        if (!isNaN(filterValueInt)) {
            const newFilteredData = data.filter((d) => d.population >= filterValueInt);
            setFilteredData(newFilteredData);
            // Si el filtro no devuelve ningún país, ocultamos el gráfico
            if (newFilteredData.length === 0) {
                setIsChartVisible(false);
            } else {
                setIsChartVisible(true); // Si hay resultados, mostramos el gráfico
            }
        } else {
            setFilteredData(data); // Si no hay filtro, mostramos todos los países
            setIsChartVisible(true); // Si hay datos, mostramos el gráfico
        }
    }, [filterValue, data]); // Este useEffect se ejecuta cuando cambia el valor del filtro o los datos


    // JSX que define la estructura de la vista del continente
    return (
        <div className="h-screen overflow-hidden flex flex-col"> {/* Contenedor principal, con altura completa de la pantalla */}
            <div className="h-full bg-gray-100 flex flex-col items-center pt-20 p-6"> {/* Fondo gris claro y espaciado */}
                {/* Título del continente */}
                <h1 className="text-3xl font-bold text-blue-600 mb-6">
                    Population by Countries in {continentName} {/* Nombre del continente dinámico */}
                </h1>
                
                {/* Indicador de carga: si loading es true, mostramos un mensaje o spinner */}
                {loading && <div className="text-lg text-blue-600">Cargando datos...</div>}

                {/* Si hay un error, lo mostramos */}
                {error && <div className="text-lg text-red-600">{error}</div>}

                {/* Campo de entrada para aplicar el filtro de población */}
                {!loading && !error && (
                    <div className="w-full max-w-md">
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 mb-6"
                        placeholder="Filter by Population" // Texto del placeholder
                        value={filterValue} // Valor del filtro
                        onChange={(e) => setFilterValue(e.target.value)} // Actualiza el valor del filtro al cambiar el input
                    />
                </div>
                )}

                 {/* Mensaje si no hay países que coincidan con el filtro */}
                 {filteredData.length === 0 && !loading && !error && (
                    <div className="text-lg text-red-600 mb-6">No se encuentran países que coincidan con el filtro.</div>
                )}

                 {/* Contenedor del gráfico, solo se muestra si `isChartVisible` es true */}
                 {isChartVisible && !loading && !error && (
                    <div className="w-full max-w-4xl border-gray-50 shadow-lg rounded-lg p-6 h-full overflow-auto">
                        <Chart data={filteredData} labelKey="name" valueKey="population" />
                    </div>
                )}

            </div>
        </div>
    );
}

export default ContinentView; // Exporta el componente ContinentView para que pueda ser utilizado en otros archivos.

