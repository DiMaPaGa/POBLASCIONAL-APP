import PropTypes from 'prop-types'; // Importa PropTypes para la validación de tipos de las propiedades.
import { Bar } from 'react-chartjs-2'; // Importa el componente `Bar` de `react-chartjs-2`, que es un gráfico de barras.
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Importa los módulos de Chart.js necesarios para el gráfico.

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend); // Registra los componentes de Chart.js necesarios para el gráfico de barras.

function Chart({ data, labelKey, valueKey }) {
    // `data`: es un array de objetos con los datos a mostrar.
    // `labelKey`: es la clave de los objetos para la etiqueta del gráfico (por ejemplo, nombre del continente).
    // `valueKey`: es la clave de los objetos para el valor (por ejemplo, población).

    // Se crea un objeto con los datos del gráfico, usando las claves proporcionadas por las propiedades
    const chartData = {
        labels: data.map((d) => d[labelKey]), // Extrae las etiquetas de cada elemento de `data` usando `labelKey`.
        datasets: [
            {
                label: 'Population', // Etiqueta que aparecerá en la leyenda del gráfico.
                data: data.map((d) => d[valueKey]), // Extrae los valores de cada elemento de `data` usando `valueKey`.
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de fondo de las barras del gráfico.
            },
        ],
    };

    // Opciones del gráfico
    const options = {
        plugins: {
            legend: {
                position: 'bottom', // Coloca la leyenda del gráfico en la parte inferior.
            },
        },
    };

    // Devuelve el componente de gráfico de barras, pasando los datos y las opciones definidas.
    return <Bar data={chartData} options={options} />;
}

// Validación de las propiedades que recibe el componente Chart
Chart.propTypes = {
    // `data` debe ser un array de objetos donde cada objeto puede tener cualquier clave con valores de cualquier tipo.
    data: PropTypes.arrayOf(
        PropTypes.shape({
            [PropTypes.string]: PropTypes.any, // Cualquier clave con cualquier tipo de valor
        })
    ).isRequired, // La propiedad es obligatoria.
    
    // `labelKey` debe ser una cadena (string) que se usará para acceder a las etiquetas de los datos.
    labelKey: PropTypes.string.isRequired, // La propiedad es obligatoria.

    // `valueKey` debe ser una cadena (string) que se usará para acceder a los valores de los datos.
    valueKey: PropTypes.string.isRequired, // La propiedad es obligatoria.
};

export default Chart; // Exporta el componente Chart para que pueda ser utilizado en otros archivos.
