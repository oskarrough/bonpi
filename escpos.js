const escpos = require('escpos')
escpos.SerialPort = require('escpos-serialport')

const device  = new escpos.SerialPort('/dev/usb/lp0', {
	baudRate: 14400,
	stopBit: 2
})
const options = {}
const printer = new escpos.Printer(device, options)

device.open(function(error) {
	console.log(error)
	printer
		.font('a')
		.align('ct')
		.style('bu')
		.size(1, 1)
		.text('The quick brown fox jumps over the lazy dog')
		.text('敏捷的棕色狐狸跳过懒狗')
		.barcode('1234567', 'EAN8')
		.table(["One", "Two", "Three"])
		.qrimage('https://github.com/song940/node-escpos', function(err){
			this.cut()
			this.close()
		})
})
