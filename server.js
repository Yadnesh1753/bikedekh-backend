const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
// Need high limit to handle the base64 images payload from frontend
app.use(express.json({ limit: '50mb' }));

// Initial mock data simulating a database
let bikesDB = [
  {
    id: '1',
    name: 'Meteor 350 Supernova',
    price: 230000,
    year: 2023,
    kmDriven: 4500,
    description: 'Perfect condition, single owner cruiser bike. Regularly serviced with full service history available.',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop'
    ],
    specs: { 'Engine CC': '349cc', 'Mileage': '35 km/l' },
    highlights: ['Engine CC', 'Mileage'],
    status: 'available',
    interestCount: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: '2',
    name: 'Duke 390 BS6',
    price: 285000,
    year: 2022,
    kmDriven: 12500,
    description: 'Aggressive street naked bike. Quickshifter+ enabled, TFT display. Minor scratch on the right fairing, otherwise mint condition.',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9361f9ab6604?q=80&w=2070&auto=format&fit=crop'
    ],
    specs: { 'Engine CC': '373cc', 'Power': '42.9 bhp' },
    highlights: ['Power', 'Engine CC'],
    status: 'available',
    interestCount: 24,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  }
];

let statsDB = {
  totalBikes: 2,
  soldBikes: 0,
  happyCustomers: 128,
  totalInterest: 36,
};

// GET /api/bikes
app.get('/api/bikes', (req, res) => {
  const { status, maxPrice, minYear } = req.query;
  let filtered = bikesDB;
  
  if (status && status !== 'all') {
    filtered = filtered.filter(b => b.status === status);
  } else if (!status) {
    filtered = filtered.filter(b => b.status === 'available');
  }

  if (maxPrice) filtered = filtered.filter(b => b.price <= Number(maxPrice));
  if (minYear) filtered = filtered.filter(b => b.year >= Number(minYear));
  
  // Send sorted by newest
  res.json(filtered.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// GET /api/bikes/:id
app.get('/api/bikes/:id', (req, res) => {
  const bike = bikesDB.find(b => b.id === req.params.id);
  if (!bike) return res.status(404).json({ error: 'Bike not found' });
  res.json(bike);
});

// POST /api/bikes
app.post('/api/bikes', (req, res) => {
  const newBike = {
    ...req.body,
    id: Math.random().toString(36).substr(2, 9),
    status: 'available',
    interestCount: 0,
    createdAt: new Date().toISOString(),
  };
  
  bikesDB = [newBike, ...bikesDB];
  statsDB.totalBikes += 1;
  
  res.status(201).json(newBike);
});

// POST /api/interest
app.post('/api/interest', (req, res) => {
  const { bikeId } = req.body;
  const bike = bikesDB.find(b => b.id === bikeId);
  if (bike) {
    bike.interestCount += 1;
    statsDB.totalInterest += 1;
  }
  res.json({ success: true });
});

// POST /api/bikes/sold/:id
app.post('/api/bikes/sold/:id', (req, res) => {
  const bike = bikesDB.find(b => b.id === req.params.id);
  if (bike && bike.status !== 'sold') {
    bike.status = 'sold';
    statsDB.soldBikes += 1;
    statsDB.totalBikes = Math.max(0, statsDB.totalBikes - 1);
  }
  res.json(bike || { error: 'Not found' });
});

// GET /api/stats
app.get('/api/stats', (req, res) => {
  res.json(statsDB);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend Central Server running on http://localhost:${PORT}`);
});
