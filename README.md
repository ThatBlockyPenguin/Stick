# Stick
Stick is a tiny logger for Deno.

Here's how to use it:

## Logger
The most basic way to use Stick is to create a default `Logger` instance.
```js
import Logger from 'https://deno.land/x/stick/mod.ts';

const logger = new Logger();
logger.info('Hello, world!');
// [Thu, 13 Jan 2022 09:18:41 GMT] [INFO] Hello, world!
```
The output format is "[label] [name] [level] message". Note that `name` is optional, and left out by default.

`Logger` can also take parameters:
```js
Logger(level: Logger.LogLevel, label: string | () => string, name: string)
```
However, an easier way to create a `Logger` instance is to use the Builder:

## Logger.Builder
```js
new Logger.Builder().setName('Process XYZ').build();
```

`Logger.Builder` has a few functions you can use: `setName`, `setLevel`, and `setLabel`. Once you have set everything you need, call `build` to receive a new `Logger`.

## Logger.LogLevel
`LogLevel`s are how Stick determines what messages get logged. The current available levels are:

### ERROR
Use when logging an error. Level 0.

### WARNING
Use when warning the user. Level 1.

### INFO
Use when logging general information. Level 2.

### DEBUG
Use when logging information for debugging purposes. Level 3.

When a `Logger` instance is created, it is assigned a `LogLevel`. By default, this is `INFO`. A Logger will not log any messages above it's specified level - e.g. a Logger on INFO will not log DEBUG messages, but will log INFO, WARNING, and ERROR messages.

## Logger.Labels
This is an object which contains a few pre-specified labels for creating Loggers with. The current available labels are:

### UTC_DATE_TIME
Resolves to `new Date().toUTCString()`
This is the default for all new Loggers

### HH_MM_SS
Resolves to `new Date().toISOString().substring(11, 19)` (The current time in HH:MM:SS format)

### HH_MM
Resolves to `new Date().toISOString().substring(11, 16)` (The current time in HH:MM format)

### ISO_STRING
Resolves to `new Date().toISOString()`
