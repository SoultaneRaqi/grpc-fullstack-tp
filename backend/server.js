import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Proto
const PROTO_PATH = path.join(__dirname, 'proto', 'produit.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
});
const produitProto = grpc.loadPackageDefinition(packageDefinition).produit;

// Database Config
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'testdb'
});

// gRPC Methods
const getAll = async (call, callback) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produits');
    callback(null, { produits: rows });
  } catch (error) {
    callback({ code: grpc.status.INTERNAL, details: error.message });
  }
};

const create = async (call, callback) => {
  try {
    const { nom, prix } = call.request;
    const [result] = await pool.query('INSERT INTO produits (nom, prix) VALUES (?, ?)', [nom, prix]);
    callback(null, { id: result.insertId, nom, prix });
  } catch (error) {
    callback({ code: grpc.status.INTERNAL, details: error.message });
  }
};

// Start Server
const server = new grpc.Server();
server.addService(produitProto.ProduitService.service, { GetAll: getAll, Create: create });

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC Server running on port 50051');
  server.start();
});