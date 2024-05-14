
const express = require('express');
const router = express.Router();
const { addCostingSheet } = require('../controllers/uploadController');
const { uploadExcel } = require('../utils/uploadfile');
const CostingSheetController = require('../controllers/uploadController');


router.post('/upload', uploadExcel.any(), addCostingSheet);
router.get('/exportDataToExcel',CostingSheetController.generateAndSendCostingSheet)

module.exports = { router};
