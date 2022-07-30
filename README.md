# Bonpi

## Step-by-step guide

Install Raspberry Pi Imager from https://www.raspberrypi.com/software/ or https://github.com/raspberrypi/rpi-imager. You could also use https://github.com/balena-io/etcher.


Bus 001 Device 002: ID 04b8:0202 Seiko Epson Corp. Interface Card UB-U05 for Thermal Receipt Printers [M129C/TM-T70/TM-T88IV]

## Trouble with permissions

	usermod -a -G lp bonpi
	sudo chmod +777 /dev/usb/lp0

## Find local IPs

	nmap 192.168.0.0/24

## Find open ports

	nz -z 192.168.0.198 1-50000

## Look up architecture on the pi

	uname -m

## Remote access

	ssh bonpi@bonpi.local
	rsync -azvh bonpi@bonpi.local:~/bonpi/ ./ --exclude node_modules

- https://www.raspberrypi.com/documentation/computers/remote-access.html


## Print via REST API

```
curl -X POST -H "Content-Type: application/json" -d '{"msg": "Radio Oskar. The channel of your wet dreams, an ode to perfume — for optimal peace and pleasure, shuffle this radio.", "url": "https://radio4000.com/oskar"}' localhost:3000/print
```