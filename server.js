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
    id: '5',
    name: 'Bajaj Pulsar NS200 Fi ABS',
    price: 112000,
    year: 2022,
    kmDriven: 9800,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    featured: false,
    description: 'Sharp, sporty streetfighter with fuel injection and ABS. Clean body, no scratches. Chain, sprocket, oil and filter recently done. Ideal entry-level performance bike.',
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
    featured: false,
    description: 'Honda CB Hornet 2.0 with split LED headlights and Honda Selectable Torque Control (HSTC). Full service history at Honda dealership Thane. Tyres recently replaced. Ready to ride.',
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
    featured: false,
    description: 'Performance streetfighter with Race Tuned Fuel Injection and SmartXonnect Bluetooth. Dual-channel ABS. Satin Black with red racing decals. All service records available.',
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
    featured: false,
    description: 'Low kilometer premium naked from Kawasaki. Parallel-twin engine, Sugomi aggressive styling, full LED. Purchased from Kawasaki Mumbai, all warranty documents available. Perfect condition.',
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
    featured: false,
    description: 'The ultimate long-distance tourer. Dominar 400 with full-LED projector headlamps, liquid-cooled engine, slipper clutch. New tyres, fresh oil, new chain set. Road-trip ready.',
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
  // ── ELECTRIC MOTORCYCLES ──
  {
    id: '14',
    name: 'Revolt RV400 — Electric Motorcycle',
    price: 138000,
    year: 2023,
    kmDriven: 6800,
    vehicleType: 'motorcycle',
    fuelType: 'electric',
    featured: true,
    description: 'India\'s first AI-enabled electric motorcycle. Revolt RV400 with swappable battery, 150 km range, and app-controlled artificial exhaust note. Single owner, home-charged daily. No fuel costs, zero emissions, and near-zero maintenance. Battery in excellent health.',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580341289255-5b47c98a8e95?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Battery': '3.24 kWh', 'Range': '150 km', 'Top Speed': '85 km/h', 'Charging': '4.5 hrs (Home)', 'Motor': '3 kW Rated', 'Features': 'AI + App Connected' },
    highlights: ['Range', 'Top Speed', 'Features'],
    status: 'available',
    interestCount: 27,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5).toISOString(),
  },
  {
    id: '15',
    name: 'Ultraviolette F77 Recon — Electric Sportbike',
    price: 290000,
    year: 2024,
    kmDriven: 2200,
    vehicleType: 'motorcycle',
    fuelType: 'electric',
    featured: true,
    description: 'India\'s fastest and most advanced electric motorcycle. Ultraviolette F77 Recon with 10.3 kWh battery, 0-100 kmph in 2.9 seconds, and 323 km range. Carbon-fibre composite body, ride modes, traction control. Barely used — near showroom condition.',
    images: [
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Battery': '10.3 kWh', 'Range': '323 km', 'Top Speed': '155 km/h', '0-100': '2.9 seconds', 'Motor': '38.9 bhp Peak', 'Body': 'Carbon Composite' },
    highlights: ['Range', 'Top Speed', '0-100'],
    status: 'available',
    interestCount: 41,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 0.5).toISOString(),
  },
  // ── SCOOTIES ──
  {
    id: '10',
    name: 'Honda Activa 6G Special Edition',
    price: 82000,
    year: 2023,
    kmDriven: 5200,
    vehicleType: 'scooty',
    fuelType: 'petrol',
    featured: false,
    description: 'India\'s best-selling scooter in pristine condition. BS6 engine, LED headlamp, external fuel-lid. Single lady owner, office-use only. All service at Honda dealership. Comes with original accessories and 2 keys.',
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
    featured: false,
    description: 'TVS Jupiter Classic with USB charging port and eco mode. Excellent city rider with superb mileage. Titanium Grey. All service records from TVS service center. No accident history.',
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
    featured: false,
    description: 'Stylish 125cc scooter with Smart Motor Generator hybrid assist. Metallic Red. Near new — barely used. Full LED, digital instrument cluster, side stand cut-off. Dealer serviced.',
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
    featured: true,
    description: 'Future-ready electric scooter with 4.5 kWh battery and 181 km range. Ola S1 Pro in Midnight Blue with geo-fencing, cruise control, voice assistant, and OTA updates. Minimal running cost, home charged.',
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
  {
    id: '16',
    name: 'Ather 450X Gen 3 — Electric Scooter',
    price: 148000,
    year: 2024,
    kmDriven: 1800,
    vehicleType: 'scooty',
    fuelType: 'electric',
    featured: true,
    description: 'The smartest electric scooter in India. Ather 450X Gen 3 with 2.9 kWh battery, 146 km range, touchscreen dashboard, and Ather Grid fast-charging access. Warp mode, auto-hold, and Google Maps navigation built-in. Brand new condition.',
    images: [
      'https://images.unsplash.com/photo-1607592424398-d5cc30ffe08a?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: { 'Battery': '2.9 kWh', 'Range': '146 km', 'Top Speed': '90 km/h', 'Charging': '1 hr (Ather Grid)', 'Motor': '8.8 kW Peak', 'Display': '7" Touchscreen' },
    highlights: ['Range', 'Charging', 'Display'],
    status: 'available',
    interestCount: 38,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

let statsDB = {
  totalBikes: 16,
  soldBikes: 7,
  happyCustomers: 143,
  totalInterest: 319,
};

// Separate sold history log (persists sold records with date+price)
let soldHistoryDB = [
  { id: 'sh1', name: 'Bajaj Pulsar RS200 BS6', price: 148000, vehicleType: 'motorcycle', fuelType: 'petrol', year: 2021, kmDriven: 18200, soldAt: new Date(Date.now() - 1000*60*60*24*2).toISOString() },
  { id: 'sh2', name: 'Honda CB300R', price: 225000, vehicleType: 'motorcycle', fuelType: 'petrol', year: 2022, kmDriven: 9500, soldAt: new Date(Date.now() - 1000*60*60*24*6).toISOString() },
  { id: 'sh3', name: 'TVS NTorq 125 Race XP', price: 92000, vehicleType: 'scooty', fuelType: 'petrol', year: 2022, kmDriven: 7800, soldAt: new Date(Date.now() - 1000*60*60*24*12).toISOString() },
  { id: 'sh4', name: 'Hero Splendor Plus XTEC', price: 78000, vehicleType: 'motorcycle', fuelType: 'petrol', year: 2023, kmDriven: 4100, soldAt: new Date(Date.now() - 1000*60*60*24*20).toISOString() },
  { id: 'sh5', name: 'Royal Enfield Meteor 350', price: 210000, vehicleType: 'motorcycle', fuelType: 'petrol', year: 2021, kmDriven: 14500, soldAt: new Date(Date.now() - 1000*60*60*24*35).toISOString() },
  { id: 'sh6', name: 'Ather 450S Electric', price: 128000, vehicleType: 'scooty', fuelType: 'electric', year: 2023, kmDriven: 2900, soldAt: new Date(Date.now() - 1000*60*60*24*42).toISOString() },
  { id: 'sh7', name: 'KTM RC 200', price: 195000, vehicleType: 'motorcycle', fuelType: 'petrol', year: 2022, kmDriven: 11200, soldAt: new Date(Date.now() - 1000*60*60*24*58).toISOString() },
];

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// GET /api/bikes/featured — featured-marked or newest 4 fallback
app.get('/api/bikes/featured', (req, res) => {
  const available = bikesDB.filter(b => b.status === 'available');
  const featuredMarked = available.filter(b => b.featured === true);

  if (featuredMarked.length > 0) {
    // Return up to 4 dealer-marked featured bikes
    return res.json(featuredMarked.slice(0, 4));
  }

  // Fallback: 4 newest available bikes
  const byNewest = [...available].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(byNewest.slice(0, 4));
});

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

  res.json(filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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
    featured: false,
    interestCount: 0,
    createdAt: new Date().toISOString(),
  };
  bikesDB = [newBike, ...bikesDB];
  statsDB.totalBikes += 1;
  res.status(201).json(newBike);
});

// PUT /api/bikes/:id/featured — toggle featured status
app.put('/api/bikes/:id/featured', (req, res) => {
  const bike = bikesDB.find(b => b.id === req.params.id);
  if (!bike) return res.status(404).json({ error: 'Bike not found' });
  bike.featured = !bike.featured;
  res.json({ id: bike.id, featured: bike.featured });
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
    const soldAt = new Date().toISOString();
    bike.status = 'sold';
    bike.featured = false;
    bike.soldAt = soldAt;
    bike.soldPrice = bike.price;
    statsDB.soldBikes += 1;
    statsDB.totalBikes = Math.max(0, statsDB.totalBikes - 1);
    // Add to sold history
    soldHistoryDB = [{ id: bike.id, name: bike.name, price: bike.price, vehicleType: bike.vehicleType || 'motorcycle', fuelType: bike.fuelType || 'petrol', year: bike.year, kmDriven: bike.kmDriven, soldAt }, ...soldHistoryDB];
  }
  res.json(bike || { error: 'Not found' });
});

// GET /api/bikes/sold-history
app.get('/api/bikes/sold-history', (req, res) => {
  const { from, to } = req.query;
  let history = [...soldHistoryDB];
  // Also include bikes from bikesDB that were marked sold
  const soldFromMain = bikesDB.filter(b => b.status === 'sold' && b.soldAt);
  const mainIds = new Set(history.map(h => h.id));
  soldFromMain.forEach(b => { if (!mainIds.has(b.id)) history.push({ id: b.id, name: b.name, price: b.soldPrice || b.price, vehicleType: b.vehicleType, fuelType: b.fuelType, year: b.year, kmDriven: b.kmDriven, soldAt: b.soldAt }); });
  if (from) history = history.filter(h => new Date(h.soldAt) >= new Date(from));
  if (to) history = history.filter(h => new Date(h.soldAt) <= new Date(new Date(to).setHours(23,59,59)));
  history.sort((a, b) => new Date(b.soldAt) - new Date(a.soldAt));
  res.json(history);
});

// GET /api/dashboard — aggregated data for dashboard
app.get('/api/dashboard', (req, res) => {
  const available = bikesDB.filter(b => b.status === 'available');
  const inventoryWorth = available.reduce((sum, b) => sum + b.price, 0);
  
  // Build monthly revenue for last 6 months using soldHistoryDB
  const allSold = [...soldHistoryDB];
  const soldFromMain = bikesDB.filter(b => b.status === 'sold' && b.soldAt);
  const mainIds = new Set(allSold.map(h => h.id));
  soldFromMain.forEach(b => { if (!mainIds.has(b.id)) allSold.push({ id: b.id, price: b.soldPrice || b.price, soldAt: b.soldAt }); });
  
  const monthLabels = [];
  const monthRevenue = [];
  const monthCount = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const label = d.toLocaleString('en-IN', { month: 'short', year: '2-digit' });
    const sold = allSold.filter(s => {
      const sd = new Date(s.soldAt);
      return sd.getMonth() === d.getMonth() && sd.getFullYear() === d.getFullYear();
    });
    monthLabels.push(label);
    monthRevenue.push(sold.reduce((sum, s) => sum + s.price, 0));
    monthCount.push(sold.length);
  }
  
  // Inventory breakdown
  const motorcycleCount = available.filter(b => b.vehicleType !== 'scooty').length;
  const scootyCount = available.filter(b => b.vehicleType === 'scooty').length;
  const electricCount = available.filter(b => b.fuelType === 'electric').length;
  const petrolCount = available.filter(b => b.fuelType !== 'electric').length;
  
  res.json({ inventoryWorth, monthLabels, monthRevenue, monthCount, motorcycleCount, scootyCount, electricCount, petrolCount, totalAvailable: available.length });
});

// PUT /api/bikes/:id
app.put('/api/bikes/:id', (req, res) => {
  const index = bikesDB.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Bike not found' });
  bikesDB[index] = { ...bikesDB[index], ...req.body };
  res.json(bikesDB[index]);
});

// GET /api/stats
app.get('/api/stats', (req, res) => {
  res.json(statsDB);
});

// GET / — health check
app.get('/', (req, res) => {
  res.send('BikeDekh Backend API is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend Central Server running on http://localhost:${PORT}`);
});
