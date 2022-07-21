all:
	echo 'Hello there'

ssh:
	ssh bonpi@bonpi.local

deploy:
	rsync -azvh ./ bonpi@bonpi.local:~/printer/ --exclude node_modules .git

pull:
	rsync -azvh bonpi@bonpi.local:~/printer/ ./ --exclude node_modules .git
