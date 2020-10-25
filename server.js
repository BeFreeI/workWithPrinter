const app = require('./app');
const { PORT } = require('./src/common/config');

app.listen(PORT, () => {
  console.log(`Server is running in  http://localhost:${PORT}\\`);
});
