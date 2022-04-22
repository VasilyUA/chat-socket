const cluster = require("cluster");
const http = require("http");
const os = require("os");
const pid = process.pid;

const { setupMaster } = require("@socket.io/sticky");

if (cluster.isMaster) {
  console.log(`Master started. Pid: ${pid}`);
  const httpServer = http.createServer();

  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  cluster.setupMaster({
    serialization: "advanced",
  });
  httpServer.listen(4000);

  const cpusCount = os.cpus().length;
  console.log(`CPUs: ${cpusCount}`);

  for (let i = 0; i < cpusCount - 1; i++) {
    const w = cluster.fork();
    w.process.stdout; // eslint-disable-line
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker died! Pid: ${worker.process.pid}`);
    const newW = cluster.fork();
    newW.process.stdout; // eslint-disable-line
  });
}

if (cluster.isWorker) {
  require("./server");
}
