\\npm run dev
cd backend
node databaseExplorer.js
netstat -ano | findstr :5001
taskkill /PID 24320 /F