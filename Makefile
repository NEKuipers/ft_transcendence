

install:
	@if ! brew list | grep -q gnupg; then \
		HOMEBREW_NO_AUTO_UPDATE=1 brew install gnupg; \
	fi
	gpg -o .env --decrypt .env.gpg

build:
	docker-compose -f docker-compose-all.yaml --build -d
