# Bonpi

This repo explains how to print things on a thermal receipt printer. You can use it to print things yourself, or you could read this document for inspiration on how to do it yourself.

- First it establishes a connection to the printer. See `printer.js`. 
- Next, there's a tiny `print()` function that prints simple messages and URLs into QR codes. See `print.js`.
- Last, the function can optionally be exposed via a `POST` API endpoint. See `server.js`.

As a bonus, there's a `print-linear.js` which is able to receive webhooks from Linear.app and prints new issues and comments.

## Step-by-step guide

- Get hardware: Raspberry Pi + Epson TM88IV

Ebay is your friend. Other ESCPOS printers should also work.

	Bus 001 Device 002: ID 04b8:0202 Seiko Epson Corp. Interface Card UB-U05 for Thermal Receipt Printers [M129C/TM-T70/TM-T88IV]

- Install distro on pi

Install Raspberry Pi Imager from https://www.raspberrypi.com/software/ or https://github.com/raspberrypi/rpi-imager.

Before you start copying the image, make sure to use the imagers option to enable ssh and configure wifi directly. That way it "just works".

- Connect to pi using ssh

	ssh bonpi@bonpi.local
	rsync -azvh bonpi@bonpi.local:~/bonpi/ ./ --exclude node_modules

Also see https://www.raspberrypi.com/documentation/computers/remote-access.html.

- Download this repo to the pi

Easiest would be to get the zip from github.

- Run `node server.js`
- Optionally install and use `ngrok` to expose the local server to the public

    ngrok http --subdomain bonpi 3000

## Trouble with permissions

	usermod -a -G lp bonpi
	sudo chmod +777 /dev/usb/lp0

## Find local IPs

	nmap 192.168.0.0/24

## Find open ports

	nz -z 192.168.0.198 1-50000

## Look up architecture on the pi

	uname -m

## Print via REST API

	curl -X POST -H "Content-Type: application/json" -d '{"msg": "Radio Oskar. The channel of your wet dreams, an ode to perfume — for optimal peace and pleasure, shuffle this radio.", "url": "https://radio4000.com/oskar"}' localhost:3000/print

