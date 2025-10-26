
# 🚀 Notion API

API RESTful construida en Node.js y TypeScript para exponer datos de Notion y otros servicios (YouTube) mediante endpoints personalizados.

## ✨ Características
- 📄 Acceso a bases de datos de Notion (stack tecnológico, proyectos, experiencia, cheatsheets, food, etc.)
- 📝 Conversión de páginas de Notion a Markdown usando `notion-to-md`
- 📺 Endpoints para videos de YouTube
- 🌐 Middleware CORS configurable
- 🗂️ Estructura modular (controllers, client, routes)

## ⚙️ Instalación
```bash
git clone https://github.com/Nanotrejo/notion-api.git
cd notion-api
npm install
```

## 🧑‍💻 Uso en desarrollo
```bash
npm run dev
```
El servidor se inicia por defecto en el puerto 3000 o el definido en la variable de entorno `PORT`.

## 📜 Scripts
- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon
- `npm start`: Ejecuta el servidor compilado

## 🔗 Endpoints principales
| ⚡ Método | 🛣️ Ruta              | 📝 Descripción                        |
|:--------:|:-------------------:|:--------------------------------------|
| `GET`    | `/joker`            | 🎲 Consulta base de datos Notion      |
| `GET`    | `/food`             | 🍔 Opciones de comida desde Notion    |
| `GET`    | `/stack`            | 🧑‍💻 Stack tecnológico desde Notion     |
| `GET`    | `/project`          | 🚧 Proyectos desde Notion             |
| `GET`    | `/experience`       | 💼 Experiencia laboral desde Notion   |
| `GET`    | `/get-videos`       | 📺 Videos de YouTube                  |
| `GET`    | `/cheatsheet`       | 📚 Cheatsheets desde Notion           |
| `GET`    | `/cheatsheet-by-id` | 📄 Cheatsheet por ID desde Notion     |

## ⚠️ Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes variables:

```env
PORT=3000
NOTION_TOKEN=tu_token_de_notion
DATABASE=ID_BASE_FOOD
DATABASE_STACK=ID_BASE_STACK
DATABASE_PROJECT=ID_BASE_PROJECT
DATABASE_EXPERIENCE=ID_BASE_EXPERIENCE
DATABASE_CHEATSHEET=ID_BASE_CHEATSHEET
YOUTUBE_API_KEY=tu_api_key_youtube
YOUTUBE_ID=tu_playlist_id
```

## 🧩 Dependencias principales
- ⚡ express
- 📄 @notionhq/client
- 📝 notion-to-md
- 📺 googleapis
- 🔑 dotenv
- 🟦 typescript

## 🗂️ Estructura del proyecto
```
src/
	📥 index.ts           # Entry point
	🚦 server.ts          # Configuración del servidor Express
	client/
		🤝 notion-client.ts # Cliente y lógica para Notion
	controllers/         # Lógica de endpoints
		🍔 food.ts
		🎲 joker.ts
		🚧 portfolio.ts
		📺 youtube.ts
	routes/
		🛣️ routes.ts        # Definición de rutas
```