const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {

    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            res.status(404).json({ message: 'Vendor not found' })
        }
        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        })

        const saveFirm = await firm.save();
        vendor.firm.push(saveFirm);
        await vendor.save();

        return res.status(200).json({ message: 'Firm added successfully' })
    } catch (error) {
        console.error(error);
        res.status(501).json({ error: 'Internal server error' })
    }

}

const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const deleteFirm = await Firm.findByIdAndDelete(firmId);
        if(!deleteFirm){
            res.status(404).json({error: 'Firm not found'})
        }
    } catch (error) {
        console.error(error);
        res.status(501).json({ error: 'Internal server error' })
    }
}

module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirmById }