

install:
	@if ! brew list | grep -q gnupg; then \
		HOMEBREW_NO_AUTO_UPDATE=1 brew install gnupg; \
	fi
	gpg -o create_env_file.sh --decrypt create_env_file.sh.gpg
	chmod +x create_env_file.sh
	./create_env_file.sh

build:
	docker-compose -f docker-compose-full.yaml --build -d
