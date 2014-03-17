# TimeFormat.js
Utility for formatting timestamp to Gregorian or Jalali date.

## Usage

### Initializing
```javascript
var time = new Timestamp();
var time = new Timestamp(options);
var time = new Timestamp({timestamp: 1394961512});
var time = new Timestamp({timestamp: 1394961512136, miliseconds: true});
var time = new Timestamp({jalali: [1392, 12, 25, 12, 0, 0]});
var time = new timestamp({gregorian: [2014, 3, 16, 12, 0, 0]});
```

### Updating

```javascript
time.fromTimestamp(1394961512)
time.fromJalali([1392, 12, 25, 12, 0, 0]);
time.fromGregorian([2014, 3, 16, 12, 0, 0]);
```

### Formatting

```javascript
time.formatJalali("y-m-d h:i:s");
time.formatGregorian("y-m-d h:i:s");
```

### Incrementing & Decrementing
```javascript
time.increment({month: 1, hours: 20});
time.decrement({day: 30, hours: 12});
```

### Options
**timestamp** key has precedence over **jalali** and **gregorian**.
And also **jalali** key has precedence over **gregorian**.

```javascript
var options = {
   miliseconds: true | false,
   timestamp: timestamp,
   jalali: [year, month, day, hours, minutes, seconds],
   gregorian: [year, month, day, hours, minutes, seconds]
}
```

### HTMLify
```javascript
time.htmlify("target");
time.htmlify("target", {
   format: "jalali",
   yearName: "year",
   monthName: "month",
   dayName: "day",
   hoursName: "hours",
   minutesName: "minutes"
});
```

## APIs

- to(format, section)
- toTimestamp()
- toJalali(section)
- toGregorian(section)
- fromTimestamp(integer)
- fromJalali(object)
- fromGregorian(object)
- formatJalali(string)
- formatGregorian(string)
- toString()
- increment()
- decrement()
- htmlify(target, options)