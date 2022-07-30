all:
	echo 'Hello there'

ssh:
	ssh bonpi@bonpi.local

deploy:
	rsync -azvh ./ bonpi@bonpi.local:~/printer/ --exclude node_modules --exclude .git --exclude .vscode

pull:
	rsync -azvh bonpi@bonpi.local:~/printer/ ./ --exclude node_modules --exclude .git --exclude .vscode
