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
    name: 'Royal Enfield Classic 350 Signals Edition',
    price: 178000,
    year: 2022,
    kmDriven: 8200,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    description: 'Iconic retro cruiser in the stunning Signals edition colorway. Single owner, regularly serviced at authorized RE service center. All original parts, no modifications. Comes with 2 keys, service booklet, and original accessories.',
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
    description: 'Aggressive street naked with Quickshifter+ and full-color TFT display. Slipper clutch, cornering ABS, lean-angle sensitive traction control. Minor scuff on right fairing panel — priced accordingly. First owner, all service on time at KTM dealership.',
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
    description: 'Near new condition, barely used. Yamaha MT-15 V2 with Variable Valve Actuation (VVA) for smooth low-end torque and strong top-end power. MotoGP livery. Dealer maintained, all records available.',
    images: [
      'https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568772585407-9f1a456b4edc?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '155cc', 'Power': '18.4 bhp', 'Torque': '14.1 Nm', 'Mileage': '47 km/l', 'Technology': 'VVA + Assist & Slipper Clutch', 'ABS': 'Single Channel' },
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
    description: 'Adventure touring ready! Himalayan in the gorgeous Salt colorway. Tripper navigation pod installed. Serviced at 15,000 and 17,500 km. Ideal for highway touring and off-road exploration.',
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
    id: '5',
    name: 'Bajaj Pulsar NS200 Fi ABS',
    price: 112000,
    year: 2022,
    kmDriven: 9800,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    description: 'Sharp, sporty streetfighter. Fuel injected, ABS equipped NS200. Clean body with no scratches. Chain and sprocket recently replaced. Ideal entry-level performance bike.',
    images: [
      'https://images.unsplash.com/photo-1580341289255-5b47c98a8e95?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '199.5cc', 'Power': '24.5 bhp', 'Torque': '18.74 Nm', 'Mileage': '40 km/l', 'Fuel System': 'Fuel Injection', 'ABS': 'Single Channel' },
    highlights: ['Power', 'Engine CC', 'Mileage'],
    status: 'available',
    interestCount: 9,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    id: '6',
    name: 'Honda CB Hornet 2.0 Special Edition',
    price: 135000,
    year: 2021,
    kmDriven: 11200,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    description: 'Honda reliability at its finest. CB Hornet 2.0 with split LED headlights, digital-analog combo instrument cluster, and Honda Selectable Torque Control (HSTC). Full service history at Honda dealership in Thane.',
    images: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2104&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '184.4cc', 'Power': '17.03 bhp', 'Torque': '16.1 Nm', 'Mileage': '45 km/l', 'Safety': 'HSTC', 'ABS': 'Single Channel' },
    highlights: ['Engine CC', 'Mileage', 'Safety'],
    status: 'available',
    interestCount: 7,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
  {
    id: '7',
    name: 'TVS Apache RTR 200 4V Race Edition',
    price: 104000,
    year: 2022,
    kmDriven: 15500,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    description: 'Performance-focused streetfighter with Race Tuned Fuel Injection and SmartXonnect Bluetooth. Both front and rear discs. All service records available.',
    images: [
      'https://images.unsplash.com/photo-1568772585407-9f1a456b4edc?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '197.75cc', 'Power': '20.8 bhp', 'Torque': '19.2 Nm', 'Mileage': '41 km/l', 'Technology': 'RT-Fi + SmartXonnect', 'ABS': 'Dual Channel' },
    highlights: ['Power', 'Engine CC', 'ABS'],
    status: 'available',
    interestCount: 11,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
  },
  {
    id: '8',
    name: 'Kawasaki Z400 ABS — Metallic Spark Black',
    price: 305000,
    year: 2022,
    kmDriven: 5200,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    description: 'Low kilometer premium naked from Kawasaki. Parallel-twin engine, Sugomi-inspired aggressive styling, full LED lighting. Purchased from Kawasaki dealer in Mumbai, all warranty documents available.',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '399cc', 'Power': '44.8 bhp', 'Torque': '38 Nm', 'Mileage': '22 km/l', 'Configuration': 'Parallel Twin', 'ABS': 'Dual Channel' },
    highlights: ['Power', 'Engine CC', 'Configuration'],
    status: 'available',
    interestCount: 28,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: '9',
    name: 'Bajaj Dominar 400 Touring Edition',
    price: 198000,
    year: 2022,
    kmDriven: 22100,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    description: 'The ultimate long-distance tourer from India. Dominar 400 with full-LED projector headlamps, liquid-cooled engine, and slipper clutch. New tyres, fresh oil, and new chain set recently done.',
    images: [
      'https://images.unsplash.com/photo-1547549082-4b0449f8d025?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580341289255-5b47c98a8e95?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '373cc', 'Power': '39.4 bhp', 'Torque': '35 Nm', 'Mileage': '28 km/l', 'Cooling': 'Liquid Cooled', 'ABS': 'Dual Channel' },
    highlights: ['Power', 'Engine CC', 'Cooling'],
    status: 'available',
    interestCount: 16,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  // ── SCOOTIES ──────────────────────────────────────────
  {
    id: '10',
    name: 'Honda Activa 6G Special Edition',
    price: 82000,
    year: 2023,
    kmDriven: 5200,
    vehicleType: 'scooty',
    fuelType: 'petrol',
    description: 'India\'s best-selling scooter in pristine condition. Honda Activa 6G with BS6 compliant engine, LED headlamp, and external fuel-lid. Single lady owner, only used for office commute. All service done at Honda dealership. Comes with original accessories and 2 keys.',
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '109.51cc', 'Power': '7.68 bhp', 'Torque': '8.79 Nm', 'Mileage': '60 km/l', 'Brakes': 'CBS', 'Fuel Type': 'Petrol' },
    highlights: ['Engine CC', 'Mileage', 'Brakes'],
    status: 'available',
    interestCount: 19,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: '11',
    name: 'TVS Jupiter Classic Edition',
    price: 78000,
    year: 2022,
    kmDriven: 9800,
    vehicleType: 'scooty',
    fuelType: 'petrol',
    description: 'TVS Jupiter Classic with USB charging port and eco mode. Excellent for city riding — superb mileage and smooth ride quality. Titanium Grey color. Well-maintained, all service records available from TVS service center. No accident history.',
    images: [
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '109.7cc', 'Power': '7.47 bhp', 'Torque': '8.4 Nm', 'Mileage': '62 km/l', 'Features': 'USB Charging + Eco Mode', 'Brakes': 'CBS' },
    highlights: ['Engine CC', 'Mileage', 'Features'],
    status: 'available',
    interestCount: 13,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  },
  {
    id: '12',
    name: 'Yamaha Fascino 125 FI Hybrid',
    price: 88000,
    year: 2023,
    kmDriven: 3400,
    vehicleType: 'scooty',
    fuelType: 'petrol',
    description: 'Stylish and modern 125cc scooter with Smart Motor Generator (hybrid assist). Fascino 125 in the trendy Metallic Red color. Near new — barely used. Full LED lighting, digital instrument cluster, and side stand engine cut-off. Dealer serviced.',
    images: [
      'https://images.unsplash.com/photo-1607592424398-d5cc30ffe08a?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Engine CC': '125cc', 'Power': '8.2 bhp', 'Torque': '10.3 Nm', 'Mileage': '66 km/l', 'Technology': 'Smart Motor Generator', 'Brakes': 'CBS' },
    highlights: ['Engine CC', 'Mileage', 'Technology'],
    status: 'available',
    interestCount: 21,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: '13',
    name: 'Ola S1 Pro — Electric Scooter',
    price: 115000,
    year: 2023,
    kmDriven: 4100,
    vehicleType: 'scooty',
    fuelType: 'electric',
    description: 'Future-ready electric scooter with 4.5 kWh battery and 181 km claimed range. Ola S1 Pro in Midnight Blue with Geo-fencing, cruise control, voice assistant, and over-the-air updates. Charged at home, minimal running cost. No fuel, no pollution. Perfect for city commute.',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607592424398-d5cc30ffe08a?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Battery': '4.5 kWh', 'Range': '181 km', 'Top Speed': '116 km/h', 'Charging': '6.5 hrs (Home)', 'Motor': '8.5 kW Peak', 'Features': 'OTA Updates + Cruise Control' },
    highlights: ['Range', 'Top Speed', 'Battery'],
    status: 'available',
    interestCount: 34,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
];

let statsDB = {
  totalBikes: 13,
  soldBikes: 7,
  happyCustomers: 143,
  totalInterest: 203,
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

// PUT /api/bikes/:id
app.put('/api/bikes/:id', (req, res) => {
  const index = bikesDB.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Bike not found' });
  }
  
  bikesDB[index] = { 
    ...bikesDB[index], 
    ...req.body 
  };
  
  res.json(bikesDB[index]);
});


// GET /api/stats
app.get('/api/stats', (req, res) => {
  res.json(statsDB);
});

// GET / - Root route to confirm server is working
app.get('/', (req, res) => {
  res.send('BikeDekh Backend API is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend Central Server running on http://localhost:${PORT}`);
});
