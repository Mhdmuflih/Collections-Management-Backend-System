// // cluster.ts
// import cluster from 'cluster';
// import os from 'os';
// import { app, connectDB } from './src/server';

// const PORT = process.env.PORT || 3000;

// if (cluster.isPrimary) {
//   const numCPUs = os.cpus().length;
//   console.log(`Primary ${process.pid} is running`);
//   console.log(`Forking ${numCPUs} workers`);

//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died. Starting a new worker.`);
//     cluster.fork();
//   });
// } else {
//   // Workers run the app
//   (async () => {
//     try {
//       await connectDB();
//       app.listen(PORT, () => {
//         console.log(`Worker ${process.pid} started, listening on port ${PORT}`);
//       });
//     } catch (error) {
//       console.error('Failed to start server:', error);
//       process.exit(1);
//     }
//   })();
// }
