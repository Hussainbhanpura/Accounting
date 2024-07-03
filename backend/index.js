require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Purchase = require('./modal/purchaseModal');

const app = express();
const port = process.env.PORT || 3001;
const mongoUrl = process.env.MONGO_URL;
app.use(cors({
    orgin : ["https://accounts-flax.vercel.app"],
    methods : ["POST", "PUT", "DELETE", "PATCH","GET"],
    credentials: true, 
}));
app.use(cors())

// MongoDB connection
mongoose.connect(`${mongoUrl}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware to parse JSON data
app.use(express.json());

// API to add a purchase
app.post('/api/data', async (req, res) => {
    const { inwardsAmount, purchaseAmount, gst } = req.body;

    try {
        const newPurchase = new Purchase({ inwardsAmount, purchaseAmount, gst });
        await newPurchase.save();
        res.json({ message: "Purchase added successfully", data: newPurchase });
    } catch (err) {
        res.status(500).json({ message: "Failed to add purchase", error: err.message });
    }
});

// API to calculate total GST and inwards
app.get('/api/total', async (req, res) => {
    try {
        const result = await Purchase.aggregate([
            {
                $group: {
                    _id: null,
                    totalGst: { $sum: { $toDouble: "$gst" } },
                    totalInwards: { $sum: { $toDouble: "$inwardsAmount" } }
                }
            }
        ]);

        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.json({ totalGst: 0, totalInwards: 0 });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to calculate totals", error: err.message });
    }
});

app.listen(port, () => {
   console.log("Hello")
});
