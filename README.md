# POBLACIONAL-APP

**Poblacional-APP** es una aplicación web que muestra información sobre la población de los países, organizada por continentes. Utiliza la API de [RestCountries](https://restcountries.com/v3.1/all) para obtener los datos de los países y presenta gráficos interactivos utilizando React.

## Índice

1. [Características](#Características)
2. [Tecnologías utilizadas](#Tecnologías-utilizadas)
3. [Requisitos](#Requisitos)
4. [Instalación](#Instalación)
5. [Estructura del proyecto](#Estructura-del-proyecto)
6. [Funcionalidad](#Funcionalidad)
   - [Página Principal (Home)](#Página-principal-home)
   - [Vista de Continente (ContinentView)](#Vista-de-continente-continentview)
7. [Manejo de Errores](#Manejo-de-errores)
8. [Autoría](#Autoría)
9. [Licencia](#Licencia)

## Características

- Visualiza la población total por continente.
- Filtra los continentes por un valor mínimo de población.
- Navega entre las vistas de los continentes.
- Filtra por la población de los paises de un mismo continente.
- Interfaz interactiva con gráficos de barras.

## Tecnologías utilizadas

- **React**: Librería para construir interfaces de usuario interactivas.
- **React Router**: Para la navegación entre las diferentes vistas de la aplicación.
- **Axios**: Para realizar las solicitudes HTTP a la API de RestCountries.
- **Tailwind CSS**: Utilizado para la estilización de la interfaz de usuario de forma rápida y eficiente.
- **Chart.js**: Usado para mostrar gráficos interactivos.

## Requisitos

Para poder correr este proyecto, necesitas tener lo siguiente instalado en tu máquina:

- **Node.js** (Recomendado: versión 14 o superior)
- **npm** o **yarn** (gestor de paquetes de Node.js)

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/DiMaPaGa/POBLASCIONAL-APP.git
cd POBLASCIONAL-APP
```

### 2. Instala las dependencias

Si usas npm:

```bash
npm install
```

### 3. Ejecuta la aplicación en desarrollo 

Este proyecto puede ser construído por si se requiere realizar alguna modificación o actualización con 

```bash
npm run build
```

Y seguidamente ejecutarlo con:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo y podrás ver la aplicación en http://localhost:5173.

## Estructura del proyecto

```bash
src/
│
├── components/            # Componentes reutilizables de la aplicación
│   ├── Header.jsx         # Componente de encabezado con menú de navegación
│   ├── Home.jsx           # Vista principal con la población por continente
│   ├── ContinentView.jsx  # Vista detallada de un continente
│   ├── Chart.jsx          # Componente para mostrar los gráficos
│
├── routes/                # Directorio con las rutas de la aplicación
│   ├── AppRoutes.jsx      # Archivo que define las rutas de la aplicación            
│   
├── styles/                # Directorio de estilos
│   ├── index.css          # Estilos globales de la aplicación
│
├── App.jsx                # Componente principal de la aplicación que gestione las rutas definidas en AppRoutes
├── main.jsx               # Punto de entrada de la aplicación (renderiza el componente App)
└── index.html             # Página HTML de inicio de la aplicación
    
```

## Funcionalidad

### Página Principal (Home)

La página principal muestra un gráfico de barras que representa la población total por continente. Los usuarios pueden filtrar los continentes introduciendo un valor mínimo de población.

- **Filtro**: Permite a los usuarios ingresar un valor numérico para filtrar los continentes cuya población sea mayor o igual al valor indicado.
- **Gráfico de barras**: Muestra la población total por continente.


### Vista de Continente (ContinentView)

Cuando un usuario hace clic en un continente desde la página principal, se les redirige a una vista más detallada que muestra la población de los países de ese continente.

- **Filtro**: Los usuarios pueden filtrar los países por población.
- **Lista de países**: Muestra los países del continente seleccionado junto con su población.


## Manejo de Errores

La aplicación maneja errores de la siguiente manera:

- **Error en la solicitud a la API**: Si ocurre un error al obtener los datos de la API de RestCountries, se muestra un mensaje de error en la interfaz.
- **Sin resultados**: Si no hay continentes con una población igual o superior al valor del filtro, se muestra un mensaje indicando que no hay resultados.

## Autoría

Proyecto realizado por **Diana Mª Pascual** como actividad de segundo trimestre de la asignatura de Cliente, del 2º DAW.

## Licencia

Este proyecto está bajo la licencia GNU General Public License v3.0. Consulta el archivo `LICENSE` para más detalles.






