# pure MVC

## how to install

`npm i @planet221b/pure-mvc@latest`

## About

Basic Model-View-Controller architecture with extended functionality in TypeScript.

Example project here https://github.com/planet-221b/pureMVC-example.

## Added functionalities.

1. mediators have `sleap()` & `wake()` functions, which will give you ability to stop and start mediator from listening notifications dynamically.
2. mediators have `subscribeToNotifications()` and `unsubscribeToNotification` functions, which are giving ability to dynamically subscribe and unsubscribe listening notifications. `listenNotificationInterests` now is a getter not a function.
3. same notification can call multiple commands, so added functions to remove commands from notification's call queue. To remove single command from call queue call `removeCommand(notification, command)` on facade, and to remove all commands from notification's queue call `removeCommands(notification)` on facade.

## ToDo

## 1. Implement ability to create multiple view-mediators without additional work.

### Description

At the moment can't register multiple times same mediator. So if you've a view-mediator pair and you need to create multiple pairs, it's inposible without additional work, because you'll have mediator with same name.
Problem is that retrieving and registering mediators are beeing based on mediators' names.

## 2. Create a TypeScript example with all new functionalities usage. And update attached example.

### Description

At the moment, attached example repo is in ES6 and doesn't using all new functionalities
