const multer = require("multer");

const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath = "./public/others";
    if (file.fieldname == "supplierInvoice") {
      filePath = "./public/supplierInvoice";
    } else if (file.fieldname == "file") {
      filePath = `./uploads`;
    } else if (file.fieldname == "customPO") {
      filePath = "./public/customPO";
    } else {
      console.log("coming--->");
      filePath = `./uploads/${file.fieldname}`
    }

    console.log(filePath, 'filePath')

    if (!fs.existsSync(filePath)) {
      // Create the directory
      fs.mkdirSync(filePath, { recursive: true });
      console.log('Directory created successfully.');
    }

    console.log(filePath, 'filePath')
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let fileName = "";
    if (file.fieldname == "supplierInvoice") {
      fileName = `supplierInvoice-${uniqueSuffix}-${file.originalname}`;
    } else if (file.fieldname == "file") {
      fileName = `temp-${file.originalname}`;
    } else if (file.fieldname == "customPO") {
      fileName = `customPO-${uniqueSuffix}-${file.originalname}`;
    } else {
      fileName = `${file.fieldname}-${uniqueSuffix}-${file.originalname}`;
    }
    console.log(fileName, 'fileName')
    cb(null, fileName);
  },
});

const documentFilterForExcel = (req, file, cb) => {
  console.log("Inside document filter",file.mimetype);
  if (
    file.mimetype == "text/csv" ||
    file.mimetype ==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype == "application/vnd.ms-excel"
  ) {
    console.log("valid extensions");
    cb(null, true);
  } else {
    console.log("Not valid extensions");
    return cb(new Error("Only .xlsx, .xls and .csv format allowed!"));
  }
};

const uploadExcel = multer({
  storage: storage,
  fileFilter: documentFilterForExcel,
});

module.exports = {

  uploadExcel

};
