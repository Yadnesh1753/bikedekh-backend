require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:bazaar123@cluster0.pwmywzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas!');
    // Optional seeding
    const count = await Bike.countDocuments();
    if (count === 0) {
      console.log('Database empty. Seeding initial bikes...');
      await Bike.insertMany(initialBikes);
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

const bikeSchema = new mongoose.Schema({
  name: String,
  price: Number,
  year: Number,
  kmDriven: Number,
  vehicleType: String,
  fuelType: String,
  featured: { type: Boolean, default: false },
  featuredOrder: { type: Number, default: 99 },
  description: String,
  images: [String],
  specs: mongoose.Schema.Types.Mixed,
  highlights: [String],
  status: { type: String, default: 'available' }, // 'available' or 'sold'
  soldAt: Date,
  interestCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

bikeSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id.toString();
  return object;
});

const Bike = mongoose.model('Bike', bikeSchema);

const initialBikes = [
  {
    name: 'Royal Enfield Classic 350 Signals',
    price: 178000,
    year: 2022,
    kmDriven: 8200,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    description: 'Iconic retro cruiser in the stunning Signals edition colorway. Single owner, regularly serviced at authorized RE service center. All original parts. Comes with 2 keys, service booklet, and original accessories.',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=2048&auto=format&fit=crop'],
    specs: { 'Engine CC': '349cc', 'Power': '20.2 bhp', 'Torque': '27 Nm', 'Mileage': '35 km/l', 'Fuel Type': 'Petrol', 'ABS': 'Dual Channel' },
    highlights: ['Engine CC', 'Mileage', 'ABS'],
    interestCount: 18,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
  },
  {
    name: 'KTM Duke 390 BS6 — TFT Edition',
    price: 278000,
    year: 2022,
    kmDriven: 12500,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    description: 'Aggressive street naked with Quickshifter+ and full-color TFT display. Cornering ABS, lean-angle sensitive traction control. Minor scuff on right fairing — priced accordingly. First owner, all service on time at KTM dealership.',
    images: ['https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop'],
    specs: { 'Engine CC': '373cc', 'Power': '42.9 bhp', 'Torque': '37 Nm', 'Mileage': '25 km/l', 'ABS': 'Cornering ABS', 'Display': 'TFT Color' },
    highlights: ['Power', 'Engine CC', 'ABS'],
    interestCount: 31,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
  },
  {
    name: 'Yamaha MT-15 V2 — MotoGP Edition',
    price: 158000,
    year: 2023,
    kmDriven: 3100,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    description: 'Near new condition, barely used. Yamaha MT-15 V2 with Variable Valve Actuation (VVA). MotoGP livery, assist & slipper clutch, LED headlight. Dealer maintained, all records available.',
    images: ['https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1568772585407-9f1a456b4edc?q=80&w=2070&auto=format&fit=crop'],
    specs: { 'Engine CC': '155cc', 'Power': '18.4 bhp', 'Torque': '14.1 Nm', 'Mileage': '47 km/l', 'Technology': 'VVA + Slipper Clutch', 'ABS': 'Single Channel' },
    highlights: ['Engine CC', 'Mileage', 'Technology'],
    interestCount: 22,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)
  },
  {
    name: 'Royal Enfield Himalayan BS6 — Salt Edition',
    price: 205000,
    year: 2021,
    kmDriven: 18500,
    vehicleType: 'motorcycle',
    fuelType: 'petrol',
    description: 'Adventure touring ready. Himalayan in gorgeous Salt colorway with Tripper navigation pod. Serviced at 15,000 and 17,500 km. Comes with tank bag and luggage racks. Ideal for highway and off-road.',
    images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1547549082-4b0449f8d025?q=80&w=2070&auto=format&fit=crop'],
    specs: { 'Engine CC': '411cc', 'Power': '24.3 bhp', 'Torque': '32 Nm', 'Mileage': '30 km/l', 'Fuel Tank': '15 Liters', 'Ground Clearance': '220mm' },
    highlights: ['Engine CC', 'Ground Clearance', 'Fuel Tank'],
    interestCount: 14,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8)
  },
  {
    name: 'Honda Activa 6G — Pearl Yellow',
    price: 82000,
    year: 2023,
    kmDriven: 5200,
    vehicleType: 'scooty',
    fuelType: 'petrol',
    description: 'India\'s favorite scooter. Immaculate condition. Single owner.',
    images: ['https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=1500&auto=format&fit=crop'],
    specs: { 'Engine CC': '109.5cc', 'Power': '7.6 bhp', 'Mileage': '60 km/l' },
    highlights: ['Engine CC', 'Mileage'],
    status: 'sold',
    soldAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    interestCount: 25,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20)
  }
];

const computeStats = async () => {
  const now = new Date();
  const currentMonth = now.getUTCMonth();
  const currentYear = now.getUTCFullYear();

  let totalBikes = 0;
  let soldBikes = 0;
  let totalInterest = 0;
  let totalGarageValue = 0;
  let totalRevenue = 0;
  let monthlyRevenue = 0;

  const bikes = await Bike.find({});

  bikes.forEach(bike => {
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

  const history = await Bike.find({ status: 'sold' })
    .sort({ soldAt: -1 })
    .limit(5);

  return {
    totalBikes,
    soldBikes,
    happyCustomers: soldBikes + 143, // baseline
    totalInterest,
    totalGarageValue,
    totalRevenue,
    monthlyRevenue,
    history
  };
};

// ─── ROUTES ───────────────────────────────────────────────────────────────────

app.get('/api/stats', async (req, res) => {
  try {
    const stats = await computeStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bikes/featured', async (req, res) => {
  try {
    let featuredMarked = await Bike.find({ status: 'available', featured: true }).sort({ featuredOrder: 1, createdAt: -1 }).limit(4);
    if (featuredMarked.length > 0) return res.json(featuredMarked);
    const newest = await Bike.find({ status: 'available' }).sort({ createdAt: -1 }).limit(4);
    res.json(newest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bikes', async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'all') query.status = status;
    else if (!status) query.status = 'available';
    
    const bikes = await Bike.find(query).sort({ createdAt: -1 });
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bikes', async (req, res) => {
  try {
    const newBike = new Bike({ ...req.body, status: 'available', featured: false, interestCount: 0 });
    await newBike.save();
    res.status(201).json(newBike);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bikes/sold/:id', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ error: 'Not found' });
    if (bike.status !== 'sold') {
      bike.status = 'sold';
      bike.soldAt = new Date();
      bike.featured = false;
      await bike.save();
    }
    res.json(bike);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/bikes/:id/featured', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ error: 'Bike not found' });
    
    // Support either toggling featured boolean, or updating featuredOrder
    if (req.body && req.body.order !== undefined) {
        bike.featuredOrder = req.body.order;
    } else {
        bike.featured = !bike.featured;
    }
    
    await bike.save();
    res.json({ id: bike._id, featured: bike.featured, featuredOrder: bike.featuredOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/bikes/:id', async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bike) return res.status(404).json({ error: 'Bike not found' });
    res.json(bike);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bikes/:id', async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);
    if (!bike) return res.status(404).json({ error: 'Bike not found' });
    res.json(bike);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/bikes/:id', async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);
    if (!bike) return res.status(404).json({ error: 'Bike not found' });
    res.json({ message: 'Bike deleted successfully', deletedBike: bike });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/interest', async (req, res) => {
  try {
    const { bikeId } = req.body;
    await Bike.findByIdAndUpdate(bikeId, { $inc: { interestCount: 1 } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Shamshad\'s Auto Shop Backend connected to MongoDB Atlas!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend Central Server running on http://localhost:${PORT}`);
});
