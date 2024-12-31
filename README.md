# Frontend for Product and Payment Management System

Este proyecto es el frontend del sistema de gestión de productos y pagos. Ha sido desarrollado con **Next.js**, **Redux Toolkit**, y **TypeScript**. Permite a los usuarios explorar productos, realizar pagos mediante una pasarela de pagos y revisar el estado de las transacciones.

## Tecnologías Principales

- [Next.js](https://nextjs.org/) - Framework de React para aplicaciones web.
- [Redux Toolkit](https://redux-toolkit.js.org/) - Librería para la gestión del estado global.
- [TypeScript](https://www.typescriptlang.org/) - Superconjunto tipado de JavaScript.
- [Ant Design](https://ant.design/) - Librería de componentes UI.
- [Axios](https://axios-http.com/) - Cliente HTTP para manejar solicitudes API.

## Estructura del Proyecto

### Carpeta `app`

Contiene las páginas principales del flujo de la aplicación:

- **`checkout`**: Maneja la información de pago y envío.
- **`summary`**: Muestra el resumen de la transacción después del pago.
- **`components`**: Componentes reutilizables, como la lista de productos y el formulario de pago.
- **`styles`**: Estilos globales y específicos de la aplicación.

### Carpeta `lib`

Contiene toda la lógica relacionada con Redux y las llamadas API:

- **`features/products`**: Manejo del estado global de los productos.
  - `productApiSlice.ts`: Endpoints API para productos.
  - `productSlice.ts`: Reducer para la gestión del estado.
- **`features/quotes`**: Ejemplo de uso de Redux Toolkit con otro dominio de estado.
- **`store.ts`**: Configuración del store de Redux.

## Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Asegúrate de cambiar la URL cuando despliegues el backend en un entorno de producción.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Por defecto, la aplicación se ejecutará en `http://localhost:3000`.

## Funcionalidades

### Gestión de Productos

- Lista de productos disponibles en `/products`.
- Visualización del detalle de un producto al seleccionarlo.
- Estado global de productos manejado con Redux Toolkit.

### Flujo de Pagos

1. **Selección de Producto**: Selecciona un producto desde la página principal.
2. **Formulario de Pago**: Completa los detalles de la tarjeta y la dirección de entrega.
3. **Resumen de Transacción**: Revisa los detalles de la transacción aprobada.

### Pasarela de Pagos

- Se utiliza una API para manejar la tokenización de tarjetas y la creación de transacciones.
- Incluye autenticación 3DS para tarjetas compatibles.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run start`: Sirve la aplicación construida.

## Deploy

Puedes desplegar esta aplicación en cualquier servicio que soporte aplicaciones Node.js. Por ejemplo, [Vercel](https://vercel.com/):

1. Instala la CLI de Vercel:

   ```bash
   npm i -g vercel
   ```

2. Ejecuta el comando:

   ```bash
   vercel
   ```

3. Sigue las instrucciones para configurar y desplegar tu proyecto.

## Mejoras Futuras

- Agregar autenticación para usuarios.
- Implementar la cancelación de transacciones.
- Mejorar la experiencia de usuario en el flujo de pago.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras un problema o deseas agregar una nueva funcionalidad, abre un [issue](https://github.com/) o crea un pull request.

## Licencia

Este proyecto está bajo la licencia **MIT**.

