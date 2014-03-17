;(function(){

   function Timestamp(options){

      var timeConvertor = {
         
         g_days_in_month: new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31),

         j_days_in_month: new Array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29),

         div: function(a,b){
            return Math.floor(a/b);
         },

         reminder: function(a,b){
            return a - this.div(a,b)*b;
         },

         /**
          * Gregorian to Jalali
          */
         g_to_j: function(g){
            if(!g) return undefined;
            var gy, gm, gd, gh, gi, gs;
            var jy, jm, jd;
            var g_day_no, j_day_no;
            var j_np;

            var i;

            gy = g['year']-1600;
            gm = g['month']-1;
            gd = g['day']-1;
            gh = g['hours'];
            gi = g['minutes'];
            gs = g['seconds'];

            g_day_no = 365*gy+this.div((gy+3),4)-this.div((gy+99),100)+this.div((gy+399),400);
            for (i=0;i<gm;++i)
               g_day_no += this.g_days_in_month[i];
            if (gm>1 && ((gy%4==0 && gy%100!=0) || (gy%400==0)))
            /* leap and after Feb */
               ++g_day_no;
            g_day_no += gd;

            j_day_no = g_day_no-79;

            j_np = this.div(j_day_no, 12053);
            j_day_no = this.reminder (j_day_no, 12053);

            jy = 979+33*j_np+4*this.div(j_day_no,1461);
            j_day_no = this.reminder (j_day_no, 1461);

            if (j_day_no >= 366){
               jy += this.div((j_day_no-1),365);
               j_day_no = this.reminder ((j_day_no-1), 365);
            }

            for (i = 0; i < 11 && j_day_no >= this.j_days_in_month[i]; ++i){
               j_day_no -= this.j_days_in_month[i];
            }

            jm = i+1;
            jd = j_day_no+1;

            return {year: jy, month: jm, day: jd, hours: gh, minutes: gi, seconds: gs};
         },

         /**
          * Jalali to Gregorian
          */
         j_to_g: function(j){
            if(!j) return undefined;
            var gy, gm, gd;
            var jy, jm, jd, jh, ji, js;
            var g_day_no, j_day_no;
            var leap;

            var i;

            jy = j['year']-979;
            jm = j['month']-1;
            jd = j['day']-1;
            jh = j['hours'];
            ji = j['minutes'];
            js = j['seconds'];

            j_day_no = 365*jy + this.div(jy,33)*8 + this.div((this.reminder (jy, 33)+3),4);
            for (i=0; i < jm; ++i)
               j_day_no += this.j_days_in_month[i];

            j_day_no += jd;

            g_day_no = j_day_no+79;

            gy = 1600 + 400*this.div(g_day_no,146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
            g_day_no = this.reminder (g_day_no, 146097);

            leap = 1;
            if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */
            {
               g_day_no--;
               gy += 100*this.div(g_day_no,36524); /* 36524 = 365*100 + 100/4 - 100/100 */
               g_day_no = this.reminder (g_day_no, 36524);

               if (g_day_no >= 365)
               g_day_no++;
               else
               leap = 0;
            }

            gy += 4*this.div(g_day_no,1461); /* 1461 = 365*4 + 4/4 */
            g_day_no = this.reminder (g_day_no, 1461);

            if (g_day_no >= 366){
               leap = 0;

               g_day_no--;
               gy += this.div(g_day_no, 365);
               g_day_no = this.reminder (g_day_no, 365);
            }

            for (i = 0; g_day_no >= this.g_days_in_month[i] + (i == 1 && leap); i++)
               g_day_no -= this.g_days_in_month[i] + (i == 1 && leap);
            
            gm = i+1;
            gd = g_day_no+1;

            return {year: gy, month: gm, day: gd, hours: jh, minutes: ji, seconds: js};
         },

         jalali_today: function(){
            Today = new Date();
            j = this.g_to_j({
               year: Today.getFullYear(),
               month: Today.getMonth()+1,
               day: Today.getDate(),
               hours: Today.getHours(),
               minutes: Today.getMinutes(),
               seconds: Today.getSeconds()
            });
            
            return 
               j['year'] + "/" +
               j['month'] + "/" +
               j['day'] + " " +
               j['hours'] + ":" + 
               j['minutes'] + ":" +
               j['seconds'];
         },

         /**
          * Gregorian to Timestamp
          */
         g_to_t: function(g){
            if(!g) return undefined;
            var 
               f = new Date(),
               y = g['year'],
               m = g['month'],
               d = g['day'],
               h = g['hours'],
               i = g['minutes'],
               s = g['seconds']
            ;

            f.setYear(y);
            f.setMonth(m - 1);
            f.setDate(d);
            f.setHours(h);
            f.setMinutes(i);
            f.setSeconds(s);

            return f.getTime().toString();
         },

         /**
          * Jalali to Timestamp
          */
         j_to_t: function(j){
            if(!j) return undefined;
            var g = this.j_to_g(j);
            return this.g_to_t(g);
         },

         /**
          * Timestamp to Jalali
          */
         t_to_j: function(t){
           if(!t) return undefined;
           var f = new Date(parseInt(t));
           return this.g_to_j({
            year: f.getFullYear(), 
            month: (f.getMonth() + 1), 
            day: f.getDate(),
            hours: f.getHours(),
            minutes: f.getMinutes(),
            seconds: f.getSeconds()
           });
         },

         /**
          * Timestamp to Gregorian
          */
         t_to_g: function(t){
           if(!t) return undefined;
           var f = new Date(parseInt(t));
           return {
            year: f.getFullYear(), 
            month: (f.getMonth() + 1), 
            day: f.getDate(),
            hours: f.getHours(),
            minutes: f.getMinutes(),
            seconds: f.getSeconds()
           };
         }
      }

      var 
         timestamp,
         defaults = {
            miliseconds: false
         };
         options = options || {},
         currentT = (new Date).getTime(),
         currentJ = timeConvertor.t_to_j(currentT),
         currentG = timeConvertor.t_to_g(currentT),
         sections = [
            'year', 'month', 'day',
            'hours', 'minutes', 'seconds'
         ],
         zero = {
            year: 0, month: 0, day: 0,
            hours: 0, minutes: 0, seconds: 0,
            timestamp: 0
         },
         seconds = {
            year: 31104000, month: 2592000, day: 86400,
            hours: 3600, minutes: 60, seconds: 1,
            timestamp: 1
         }
      ;

      var extend = function(source, target){
         var result = {};
         for(var i in source){ result[i] = source[i]; }
         for(var i in target){ result[i] = target[i]; }
         return result;
      };

      var accumulate = function(object){
         var result = 0;
         for(var i in object){
            if(!seconds.hasOwnProperty(i)) continue;
            result += (seconds[i] * object[i]);
         }
         return result;
      };

      if(options.timestamp) timestamp = options.timestamp;
      else if(options.jalali) timestamp = timeConvertor.j_to_t(extend(currentJ, options.jalali));
      else if(options.gregorian) timestamp = timeConvertor.g_to_t(extend(currentG, options.gregorian));
      else timestamp = (new Date).getTime();

      defaults = extend(defaults, options);

      var date = new Date(parseInt(timestamp));

      date.toTimestamp = function(){
        if(defaults.miliseconds) return this.getTime();
        return parseInt((this.getTime() / 1000).toFixed());
      };

      date.to = function(format, section){
         switch(format){
            case 'jalali':
               if(!section) return timeConvertor.t_to_j(this.getTime());
               if(sections.indexOf(section) == -1) return undefined;
               return timeConvertor.t_to_j(this.getTime())[section];
               break;
            case 'gregorian':
               if(!section) return timeConvertor.t_to_g(this.getTime());
               if(sections.indexOf(section) == -1) return undefined;
               return timeConvertor.t_to_g(this.getTime())[section];
               break;
            default: return undefined;
         }
      };

      date.toJalali = function(section){
         return this.to('jalali', section);
      }

      date.toGregorian = function(section){
         return this.to('gregorian', section);
      }

      date.fromTimestamp = function(timestamp){
         if(defaults.miliseconds) this.setTime(timestamp);
         else this.setTime(timestamp * 1000)
         return this;
      };

      date.fromJalali = function(object){
         this.setTime(timeConvertor.j_to_t(object));
         return this;
      };

      date.fromGregorian = function(object){
         this.setTime(timeConvertor.g_to_j(object));
         return this;
      };

      date.increment = function(period){
         var extended = extend(this.zero, period);
         var accumulated = accumulate(extended);
         this.fromTimestamp(this.toTimestamp() + accumulated);
         return this;
      };

      date.decrement = function(period){
         var extended = extend(this.zero, period);
         var accumulated = accumulate(extended);
         this.fromTimestamp(this.toTimestamp() - accumulated);
         return this;
      };

      date.formatJalali = function(format){
         return format
            .replace("y", this.toJalali('year'))
            .replace("m", this.toJalali('month'))
            .replace("d", this.toJalali('day'))
            .replace("h", this.toJalali('hours'))
            .replace("i", this.toJalali('minutes'))
            .replace("s", this.toJalali('seconds'))
         ;
      };

      date.formatGregorian = function(format){
         return format
            .replace("y", this.toGregorian('year'))
            .replace("m", this.toGregorian('month'))
            .replace("d", this.toGregorian('day'))
            .replace("h", this.toGregorian('hours'))
            .replace("i", this.toGregorian('minutes'))
            .replace("s", this.toGregorian('seconds'))
         ;
      };

      date.toString = function(){
         if(defaults.miliseconds) return "Timestamp " + this.getTime();
         return "Timestamp: " + (this.getTime() / 1000).toFixed();
      }

      date.htmlify = function(selector, options){
         var defaults = extend({
            format: "jalali",
            hours: false,
            yearName: "year",
            monthName: "month",
            dayName: "day",
            hoursName: "hours",
            minutesName: "minutes",
         }, options);

         console.log(defaults);

         var yearEl = document.createElement("input");
         yearEl.name = defaults.yearName;
         yearEl.type = "text";
         yearEl.placeholder = "Year";
         yearEl.value = this.to(defaults.format, 'year');

         var monthEl = document.createElement("input");
         monthEl.name = defaults.monthName;
         monthEl.type = "text";
         monthEl.placeholder = "Month";
         monthEl.value = this.to(defaults.format, 'month');
         
         var dayEl = document.createElement("input");
         dayEl.name = defaults.dayName;
         dayEl.type = "text";
         dayEl.placeholder = "Day";
         dayEl.value = this.to(defaults.format, 'day');

         if(defaults.hours){
            var hoursEl = document.createElement("input");
            hoursEl.name = defaults.dayName;
            hoursEl.type = "text";
            hoursEl.placeholder = "Hours";
            hoursEl.value = this.to(defaults.format, 'hours');

            var minutesEl = document.createElement("input");
            minutesEl.name = defaults.dayName;
            minutesEl.type = "text";
            minutesEl.placeholder = "Minutes";
            minutesEl.value = this.to(defaults.format, 'minutes');
         }

         var place = document.getElementById(selector);
         place.appendChild(yearEl);
         place.appendChild(monthEl);
         place.appendChild(dayEl);
         if(defaults.hours){
            place.appendChild(hoursEl);
            place.appendChild(minutesEl);
         }
      }

      return date;
   };

   window.Timestamp = Timestamp;

})();