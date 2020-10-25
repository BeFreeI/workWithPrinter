const router = require('express').Router();
const Printer = require('@thiagoelg/node-printer');
const childProcess = require('child_process');
const { PrinterApp } = require('./common/config');
const LableSample = process.cwd()+'/src/common/testSample.nlbl';

router.route('/')
  .get((req, res) => {
    res.json(Printer.getPrinters().map((el) => el.name));
  })
  .post(async (req, res) => {
    childProcess.exec(`${PrinterApp} ${LableSample} "${req.body.string}" "${req.body.printer}"`);
    res.status(204).end();
  });

module.exports = router;
