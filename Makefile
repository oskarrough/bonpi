host = bonpi@192.168.0.198

all:
	echo 'Hello there'

ssh:
	ssh $(host)

deploy:
	rsync -azvh ./ $(host):~/printer/ --exclude node_modules --exclude .git --exclude .vscode

pull:
	rsync -azvh $(host):~/printer/ ./ --exclude node_modules --exclude .git --exclude .vscode

expose-local-server:
	ngrok http --subdomain xxx 3000 
