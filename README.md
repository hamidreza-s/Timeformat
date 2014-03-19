# TimeFormat.js
Utility for formatting timestamp to Gregorian or Jalali date.

## Requirements
Nothing.

## Usage


### Initializing
```javascript
var time = new Timeformat();
var time = new Timeformat(options);
var time = new Timeformat({timestamp: 1394961512});
var time = new Timeformat({timestamp: 1394961512136, miliseconds: true});
var time = new Timeformat({jalali: {year: 1392, month: 12, day: 25, minutes: 12}});
var time = new Timeformat({gregorian: {year: 2014, month: 3, day: 16}});
```

### Constructing
The **timestamp** key has precedence over **jalali** and **gregorian**.
And also **jalali** key has precedence over **gregorian**.

```javascript
var options = {
   miliseconds: true | false,
   timestamp: timestamp,
   jalali: {
      year: int, 
      month: int, 
      day: int, 
      hours: int, 
      minutes: int, 
      seconds: int
   },
   gregorian: {
      year: int, 
      month: int, 
      day: int, 
      hours: int, 
      minutes: int, 
      seconds: int
   }
}
var timeformat = new Timeformat(options);
```
**Note:** Default time for each key is current time.

### Accessing
```javascript
time.toTimestamp();

time.to('jalali' /* all sections */);
time.to('jalali', 'year');
time.toJalali('year');

time.to('gregorian' /* all sections */);
time.to('gregorian', 'month');
time.toGregorian('month');

```

### Updating
```javascript
time.fromTimestamp(1394961512);

time.from('jalali', {year: 1392, month: 12});
time.fromJalali({year: 1392, month: 12});

time.from('gregorian', {day: 4, hours: 3});
time.fromGregorian({day: 4, hours: 3});
```

### Formatting
```javascript
time.formatJalali("{{y}}-{{m}}-{{d}} {{h}}:{{i}}:{{s}}");
time.formatGregorian("{{y}}-{{m}}-{{d}} {{h}}:{{i}}:{{s}}");
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

## API List
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