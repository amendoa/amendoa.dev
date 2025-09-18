---
title: Make bindfs mount persistent across reboots on macOS
tags:
  - snippets
---

To make [bindfs](https://bindfs.org/) mounts persist across reboots on macOS, you can use `LaunchAgents` to run the `bindfs` command at system startup.

To make this work, you'll have to create a `.plist` file in the `/Library/LaunchAgents` directory:

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

and then tell launchd to look to your file in the next startup:

```
launchctl load /Library/LaunchAgents/com.yourproduct.action-to-do.plist
```

That way your script will be executed on every reboot.


If something goes wrong, you can check the logs here: `/tmp/com.yourproduct.action-to-do.err`.
