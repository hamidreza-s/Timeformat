# TimeFormat.js
Utility for formatting timestamp to Gregorian or Jalali date.

## Usage

### Initializing
```javascript
var time = new Timeformat();
var time = new Timeformat(options);
var time = new Timeformat({timestamp: 1394961512});
var time = new Timeformat({timestamp: 1394961512136, miliseconds: true});
var time = new Timeformat({jalali: [1392, 12, 25, 12, 0, 0]});
var time = new Timeformat({gregorian: [2014, 3, 16, 12, 0, 0]});
```

### Constructor Options
**timestamp** key has precedence over **jalali** and **gregorian**.
And also **jalali** key has precedence over **gregorian**.

```javascript
var options = {
   miliseconds: true | false,
   timestamp: timestamp,
   jalali: [year, month, day, hours, minutes, seconds],
   gregorian: [year, month, day, hours, minutes, seconds]
}
var timestamp = new Timeformat(options);
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

### HTMLify
```javascript
time.html("#target-all");

time.html("#target-date", {
   format: "jalali",
   year: {name: "year", cssClass: "date"},
   month: {name: "month", cssClass: "date"},
   day: {name: "day", cssClass: "date"}
});

time.html("#target-time", {
   hours: {name: "hours", cssClass: "date"},
   minutes: {name: "minutes", cssClass: "date"}
});
```
**Note:** There is a `live binding` between *HTML elements* and *timestamp object*. Changing each of them applies to one onether.

## APIs
- to(format, section)
- toTimestamp()
- toJalali(section)
- toGregorian(section)
- from(format, section)
- fromTimestamp(integer)
- fromJalali(object)
- fromGregorian(object)
- formatJalali(string)
- formatGregorian(string)
- html(target, options)
- toString()
- increment()
- decrement()