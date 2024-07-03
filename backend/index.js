const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Purchase = require('./modal/purchaseModal');

const app = express();
const port = 3001;
app.use(cors({
    orgin : [""],
    methods : ["POST", "PUT", "DELETE", "PATCH","GET"],
    credentials: true, 
}));

// MongoDB connection
mongoose.connect('mongodb+srv://mixik98401:BQiAv6X0n83V4Yw3@cluster0.qpaqsqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
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
    console.log(`Server is running on http://localhost:${port}`);
});
