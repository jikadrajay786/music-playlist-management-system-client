# music-playlist-management-system-client

This is the frontend application with React and Vite. It communicates with the backend API to provide a full-featured user interface.

I have use node 23.

tech used:
- React
- Vite
- TypeScript
- Material UI (MUI)
- RTK Query (Redux Toolkit Query)

setup instructions:
clone this public repo for the frontend

Install dependencies
npm install

Create build
npm run build

Start app in dev
npm run dev

For local environment ( if server is running on localhost)
http://localhost:4901 replace this baseurl in api interceptor file.

Folder structure
src/
|--- components/
|--- pages/
|--- RTK/
|--- Assests/
|--- wrapper/
|--- App.tsx
|--- main.tsx

The main entry point is main.tsx and after that App.tsx in which we have routes for the project.
Components: holds common components, drawers, modals etc...
Pages: holds pages of the application
RTK: holds the store setup, api interceptor and api actions
wrapper: holds protect and public wrapper
