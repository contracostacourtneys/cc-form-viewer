# Contra Costa Form Viewer #

Contra Costa Form Viewer is a work-in-progress application that lets users fill out PDF forms online.

## How it Works ##

The frontend is a React/Redux application that pulls input field form data from the server, gets the relevant PDF file from the server, then uses Mozilla's PDF.js to render the forms on the page.  The goal was to convert PDFs to PNGs/SVGs on the server-side, but due to an issue with fonts not displaying properly, it must be rendered by the client.

The backend is a NodeJS/Express server that uses a LevelDB database to store input field form data.  When a user requests a form, the server checks if the form is in the database.  If it _is_ in the database, it gets sent directly to the user; otherwise, it gets converted using PDF.js, stored in the database, then sent to the user.  I wanted to also convert PDFs to PNGs/SVGs on the server-side and send it over to them so the client doesn't have to render the PDFs themselves (it's a bit slow), but due to the aforementioned font issue, we just send over the PDF when the client requests it.

## How to Install ##

1. Run `npm install` in root folder
2. Run `webpack` in root folder (Webpack v3.10.x)
3. Run `node server/main.js`
