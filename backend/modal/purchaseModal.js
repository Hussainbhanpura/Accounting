const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    inwardsAmount: {
        type: Number,
        required: true
    },
    purchaseAmount: {
        type: Number,
        required: true
    },
    gst: {
        type: Number,
        required: true
    }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
