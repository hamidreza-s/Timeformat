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

## APIs

- toTimestamp()
- toJalali()
- toGregorian()
- toJalaliYear()
- toJalaliMonth()
- toJalaliDay()
- toJalaliHours()
- toJalaliMinutes()
- toJalaliSeconds()
- toGregorianYear()
- toGregorianMonth()
- toGregorianDay()
- toGregorianHours()
- toGregorianMinutes()
- toGregorianSeconds()
- fromTimestamp(integer)
- fromJalali(array)
- fromGregorian(array)
- formatJalali(string)
- formatGregorian(string)
- toString()