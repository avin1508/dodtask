const path = require('path');
const xlsx = require('xlsx');
const { costingDetails } = require('../database/models');



const ExcelJS = require('exceljs');
const { sendEmailWithAttachment } = require('../helpers/sendVerificationEmail');

class CostingSheetController { }

CostingSheetController.addCostingSheet = async (req, res, next) => {
    try {
 
        const filePath = path.join(__dirname, `../../stock-management-task-stock_management/uploads/temp-temp-COSHTING_SHEET1.xlsx`);
        
        
        const workbook = xlsx.readFile(filePath);
        
        
        const sheetName = workbook.SheetNames[0];
        
        
        const sheet = workbook.Sheets[sheetName];
        
        
        const data = xlsx.utils.sheet_to_json(sheet);


        for (let item of data) {
         let createData = {
                No: item.No,
                fabricName: item.FABRIC,
                curValue: item.CUR,
                dutyValue : item.DUTY ?? 0,
                price: item.PRICE,
                cons: item.CONS,
               Inr: item.INR
            }

            console.log("crreaa",createData)

            await costingDetails.create(createData)
        }

         
      }
      catch(err){

        console.log("errr",err)

      }
  
    }




CostingSheetController.generateAndSendCostingSheet = async (req, res, next) => {
  try {
      const email = req.body.email;
      if (!email) {
          return res.status(400).json({ message: 'Email is required' });
      }

      const data = await costingDetails.findAll();

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Costing Details');
      sheet.addRow(['No', 'Fabric Name', 'Currency Value', 'Duty Value', 'Price', 'Cons', 'INR']);

      data.forEach(item => {
          sheet.addRow([item.No, item.fabricName, item.curValue, item.dutyValue, item.price, item.cons, item.Inr]);
      });

      const buffer = await workbook.xlsx.writeBuffer();

      const subject = 'Costing Details';
      const body = 'Please find attached the costing details';
      await sendEmailWithAttachment(email, subject, body, buffer);

      res.status(200).json({ message: 'Costing sheet generated and sent successfully' });
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ message: 'Error generating and sending costing sheet' });
  }
};


    
module.exports = CostingSheetController;





