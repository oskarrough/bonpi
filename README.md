# Bonpi

This repo explains **how to print things on a thermal receipt printer using node.js**, optionally via a Raspberry Pi. The idea is the following:

We have a Raspberry Pi with some Linux installed. I used Ubuntu Server.

- connected to the Printer via USB
- connected to the internet via Wi-Fi
- runs the `src/server.js` script from this repo
- expose it to the interwebs with ngrok
		
The server exposes two endpoints:

- `/print` which accepts a JSON object with a required `msg` and an optional `url` property. It then prints the message and a QR code with the URL.
- `/my-linear-webhook` is to be used as a webhook for Linear.app, and is able to print new issues, comments and more.
		
The server uses `printer.js` to connect to the printer. And `print.js` to actually print stuff.

## Step-by-step guide

### Get hardware: Raspberry Pi + Epson TM88IV

Ebay is your friend. Other ESCPOS printers should also work.

	Bus 001 Device 002: ID 04b8:0202 Seiko Epson Corp. Interface Card UB-U05 for Thermal Receipt Printers [M129C/TM-T70/TM-T88IV]

### Install distro on pi

Install Raspberry Pi Imager from https://www.raspberrypi.com/software/ or https://github.com/raspberrypi/rpi-imager.

Before you start copying the image, make sure to use the imagers option to enable ssh and configure wifi directly. That way it "just works".

### Connect to pi using ssh

	ssh bonpi@bonpi.local
	rsync -azvh bonpi@bonpi.local:~/bonpi/ ./ --exclude node_modules

Also see https://www.raspberrypi.com/documentation/computers/remote-access.html.

### Download this repo to the pi

Easiest would be to get the zip from github.

### Start the server

	node server.js

or

    npx nodemon start

### Optionally install and use `ngrok` to expose the local server to the public

    ngrok http --domain blablabla.ngrok-free.app 3000

or maybe this?

    ngrok http --subdomain bonpi 3000
    ngrok http --region=eu --hostname=bonpi.eu.ngrok.io 80

## Tips

### Trouble with permissions

Most likely it won't print out of the box. I needed to run this to get the printer to respond:

	usermod -a -G lp bonpi
	sudo chmod +777 /dev/usb/lp0

### Find local IPs

    arp -a
	nmap -sn 192.168.0.0/24

### Find open ports

	nz -z 192.168.0.198 1-50000

### Look up architecture on the pi

	uname -m

### Print via REST API

	curl -X POST -H "Content-Type: application/json" -d '{"msg": "Radio Oskar. The channel of your wet dreams, an ode to perfume — for optimal peace and pleasure, shuffle this radio.", "url": "https://radio4000.com/oskar"}' localhost:3000/print

	sudo raspi-config


### Running in the background

You can either run `node start &` or use pm2:

    npm i -g pm2
    pm2 start src/server.js
    pm2 start ngrok -- http --domain INSERTDOMAINHERE.ngrok-free.app 3000 > /dev/null &

