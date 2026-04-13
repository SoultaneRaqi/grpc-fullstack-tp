import { useEffect, useState } from 'react';
import { ProduitServiceClient } from './produit_grpc_web_pb';
import { Empty, Produit } from './produit_pb';

const client = new ProduitServiceClient('http://localhost:8080');

function App() {
  const [produits, setProduits] = useState([]);
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = () => {
    client.getAll(new Empty(), {}, (err, response) => {
      if (!err) setProduits(response.toObject().produitsList);
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const req = new Produit();
    req.setNom(nom);
    req.setPrix(parseFloat(prix));

    client.create(req, {}, (err) => {
      if (!err) {
        fetchProduits();
        setNom('');
        setPrix('');
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventory (gRPC + Vite ⚡)</h1>
      <ul>
        {produits.map(p => <li key={p.id}>{p.nom} - ${p.prix}</li>)}
      </ul>
      
      <form onSubmit={handleAdd}>
        <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Name" required />
        <input type="number" step="0.01" value={prix} onChange={e => setPrix(e.target.value)} placeholder="Price" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default App;