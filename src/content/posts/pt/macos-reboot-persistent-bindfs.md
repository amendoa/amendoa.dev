---
title: "Tornando Volumes Do Bindfs Permanentes No MacOS"
lang: pt
translationKey: macos-reboot-persistent-bindfs
routeSlug: volumes-bindfs-persistentes-macos 
tags: [snippets]
category: Snippets
date: 2026-01-10
---

Para tornar os volumes do [bindfs](https://bindfs.org/) permanentes no macOs, você pode usar os `LaunchAgents` para rodar o `bindfs` na inicialização do sistema.

Para isso, você precisará criar um arquivo `.plist` no diretório `/Library/LaunchAgents`:

```xml title="/Library/LaunchAgents/com.yourproduct.action-to-do.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>Label</key>
		<string>com.yourproduct.action-to-do</string><!-- You can use any name here, but it's a convention to use a reverse-domain-name style name-->
		<key>ProgramArguments</key><!-- You can add any bindfs valid param in the array tag below-->
		<array>
			<string>/usr/local/bin/bindfs</string> <!-- This is bindfs binary dir, it depends of your instalation, commonly it's /usr/local/bin/bindfs-->
			<string>/source-dir</string>
			<string>/dest-dir</string>
		</array>
		<key>RunAtLoad</key>
		<true/>
		<key>StandardErrorPath</key>
		<string>/tmp/com.yourproduct.action-to-do.err</string>
		<key>StandardOutPath</key>
		<string>/tmp/com.yourproduct.action-to-do.out</string>
	</dict>
</plist>
```

e então, indique seu novo arquivo para o launchd:

```
launchctl load /Library/LaunchAgents/com.yourproduct.action-to-do.plist
```

Assim, seu script será executado em todo reboot.

Se algo der errado, você encontrará os logs aqui: `/tmp/com.yourproduct.action-to-do.err`.
