import 'tsconfig-paths/register';
import http from 'http';
import app from './app';


const PORT = 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize socket

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
