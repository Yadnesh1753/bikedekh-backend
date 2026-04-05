const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ─── BIKE DATABASE ────────────────────────────────────────────────────────────
let bikesDB = [
  // ── MOTORCYCLES ──
  {
    id: '1',
    name: 'Royal Enfield Classic 350 Signals',
    price: 178000,
    year: 2022,
    kmDriven: 8200,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    featured: false,
    description: 'Iconic retro cruiser in the stunning Signals edition colorway. Single owner, regularly serviced at authorized RE service center. All original parts. Comes with 2 keys, service booklet, and original accessories.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=2048&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '349cc', 'Power': '20.2 bhp', 'Torque': '27 Nm', 'Mileage': '35 km/l', 'Fuel Type': 'Petrol', 'ABS': 'Dual Channel' },
    highlights: ['Engine CC', 'Mileage', 'ABS'],
    status: 'available',
    interestCount: 18,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: '2',
    name: 'KTM Duke 390 BS6 — TFT Edition',
    price: 278000,
    year: 2022,
    kmDriven: 12500,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    featured: false,
    description: 'Aggressive street naked with Quickshifter+ and full-color TFT display. Cornering ABS, lean-angle sensitive traction control. Minor scuff on right fairing — priced accordingly. First owner, all service on time at KTM dealership.',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '373cc', 'Power': '42.9 bhp', 'Torque': '37 Nm', 'Mileage': '25 km/l', 'ABS': 'Cornering ABS', 'Display': 'TFT Color' },
    highlights: ['Power', 'Engine CC', 'ABS'],
    status: 'available',
    interestCount: 31,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: '3',
    name: 'Yamaha MT-15 V2 — MotoGP Edition',
    price: 158000,
    year: 2023,
    kmDriven: 3100,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    featured: false,
    description: 'Near new condition, barely used. Yamaha MT-15 V2 with Variable Valve Actuation (VVA). MotoGP livery, assist & slipper clutch, LED headlight. Dealer maintained, all records available.',
    images: [
      'https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9f1a456b4edc?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '155cc', 'Power': '18.4 bhp', 'Torque': '14.1 Nm', 'Mileage': '47 km/l', 'Technology': 'VVA + Slipper Clutch', 'ABS': 'Single Channel' },
    highlights: ['Engine CC', 'Mileage', 'Technology'],
    status: 'available',
    interestCount: 22,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: '4',
    name: 'Royal Enfield Himalayan BS6 — Salt Edition',
    price: 205000,
    year: 2021,
    kmDriven: 18500,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    featured: false,
    description: 'Adventure touring ready. Himalayan in gorgeous Salt colorway with Tripper navigation pod. Serviced at 15,000 and 17,500 km. Comes with tank bag and luggage racks. Ideal for highway and off-road.',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547549082-4b0449f8d025?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '411cc', 'Power': '24.3 bhp', 'Torque': '32 Nm', 'Mileage': '30 km/l', 'Fuel Tank': '15 Liters', 'Ground Clearance': '220mm' },
    highlights: ['Engine CC', 'Ground Clearance', 'Fuel Tank'],
    status: 'available',
    interestCount: 14,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
  },
  {
    id: 'S1',
    name: 'Honda Activa 6G — Pearl Yellow',
    price: 82000,
    year: 2023,
    kmDriven: 5200,
    vehicleType: 'scooty',
    fuelType: 'petrol',
    featured: false,
    description: 'India\'s favorite scooter. Immaculate condition. Single owner.',
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1500&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '109.5cc', 'Power': '7.6 bhp', 'Mileage': '60 km/l' },
    highlights: ['Engine CC', 'Mileage'],
    status: 'sold',
    soldAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    interestCount: 25,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  }
];

// Helper to compute stats
const computeStats = () => {
  const now = new Date();
  const currentMonth = now.getUTCMonth();
  const currentYear = now.getUTCFullYear();

  let totalBikes = 0;
  let soldBikes = 0;
  let totalInterest = 0;
  let totalGarageValue = 0;
  let totalRevenue = 0;
  let monthlyRevenue = 0;

  bikesDB.forEach(bike => {
    totalInterest += (bike.interestCount || 0);
    
    if (bike.status === 'available') {
      totalBikes += 1;
      totalGarageValue += (bike.price || 0);
    } else if (bike.status === 'sold') {
      soldBikes += 1;
      totalRevenue += (bike.price || 0);
      
      if (bike.soldAt) {
        const soldDate = new Date(bike.soldAt);
        if (soldDate.getUTCMonth() === currentMonth && soldDate.getUTCFullYear() === currentYear) {
          monthlyRevenue += (bike.price || 0);
        }
      }
    }
  });

  return {
    totalBikes,
    soldBikes,
    happyCustomers: soldBikes + 143, // baseline
    totalInterest,
    totalGarageValue,
    totalRevenue,
    monthlyRevenue,
    history: bikesDB
      .filter(b => b.status === 'sold')
      .sort((a,b) => new Date(b.soldAt) - new Date(a.soldAt))
      .slice(0, 5)
  };
};

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// GET /api/stats
app.get('/api/stats', (req, res) => {
  res.json(computeStats());
});

// GET /api/bikes/featured
app.get('/api/bikes/featured', (req, res) => {
  const available = bikesDB.filter(b => b.status === 'available');
  const featuredMarked = available.filter(b => b.featured === true);
  if (featuredMarked.length > 0) return res.json(featuredMarked.slice(0, 4));
  res.json([...available].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4));
});

// GET /api/bikes
app.get('/api/bikes', (req, res) => {
  const { status } = req.query;
  let filtered = bikesDB;
  if (status && status !== 'all') filtered = filtered.filter(b => b.status === status);
  else if (!status) filtered = filtered.filter(b => b.status === 'available');
  res.json(filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// POST /api/bikes
app.post('/api/bikes', (req, res) => {
  const newBike = {
    ...req.body,
    id: Math.random().toString(36).substr(2, 9),
    status: 'available',
    featured: false,
    interestCount: 0,
    createdAt: new Date().toISOString(),
  };
  bikesDB = [newBike, ...bikesDB];
  res.status(201).json(newBike);
});

// POST /api/bikes/sold/:id
app.post('/api/bikes/sold/:id', (req, res) => {
  const bike = bikesDB.find(b => b.id === req.params.id);
  if (bike && bike.status !== 'sold') {
    bike.status = 'sold';
    bike.soldAt = new Date().toISOString();
    bike.featured = false;
  }
  res.json(bike || { error: 'Not found' });
});

// PUT /api/bikes/:id/featured
app.put('/api/bikes/:id/featured', (req, res) => {
  const bike = bikesDB.find(b => b.id === req.params.id);
  if (!bike) return res.status(404).json({ error: 'Bike not found' });
  bike.featured = !bike.featured;
  res.json({ id: bike.id, featured: bike.featured });
});

app.put('/api/bikes/:id', (req, res) => {
  const index = bikesDB.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Bike not found' });
  bikesDB[index] = { ...bikesDB[index], ...req.body };
  res.json(bikesDB[index]);
});

app.get('/api/bikes/:id', (req, res) => {
  const bike = bikesDB.find(b => b.id === req.params.id);
  if (!bike) return res.status(404).json({ error: 'Bike not found' });
  res.json(bike);
});

// DELETE /api/bikes/:id
app.delete('/api/bikes/:id', (req, res) => {
  const index = bikesDB.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Bike not found' });
  const deletedBike = bikesDB.splice(index, 1)[0];
  res.json({ message: 'Bike deleted successfully', deletedBike });
});

app.post('/api/interest', (req, res) => {
  const { bikeId } = req.body;
  const bike = bikesDB.find(b => b.id === bikeId);
  if (bike) bike.interestCount = (bike.interestCount || 0) + 1;
  res.json({ success: true });
});

app.get('/', (req, res) => {
  res.send('Shamshad\'s Auto Shop Backend ready!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend Central Server running on http://localhost:${PORT}`);
});
