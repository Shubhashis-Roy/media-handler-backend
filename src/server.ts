import 'tsconfig-paths/register';
import app from './app';

const PORT = 5000;

// Create HTTP server
// const server = http.createServer(app);

// Initialize socket

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
