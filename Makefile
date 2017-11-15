TMP_DIR ?=cordova-plugin-android-wifi-manager

.PHONY: clean
clean:
	rm -rf /tmp/$(TMP_DIR)

.PHONY: init
init: /tmp/$(TMP_DIR)/config.xml
/tmp/$(TMP_DIR)/config.xml:
	cordova create /tmp/$(TMP_DIR) com.test testapp
	cd /tmp/$(TMP_DIR) && cordova platforms add android
	cd /tmp/$(TMP_DIR) && cordova plugins add cordova-plugin-android-wifi-manager --searchpath $(shell pwd)

.PHONY: bundle
bundle: /tmp/$(TMP_DIR)/www/js/index.js
/tmp/$(TMP_DIR)/www/js/index.js /tmp/$(TMP_DIR)/www/index.html: init
	cp example/index.js /tmp/$(TMP_DIR)/www/js/index.js
	cp example/index.html /tmp/$(TMP_DIR)/www/index.html

test: init bundle
	cd /tmp/$(TMP_DIR) && cordova build

run: init bundle
	cd /tmp/$(TMP_DIR) && cordova run
