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
            var gy, gm, gd;
            var jy, jm, jd;
            var g_day_no, j_day_no;
            var j_np;

            var i;

            gy = g[0]-1600;
            gm = g[1]-1;
            gd = g[2]-1;
            gh = g[3];
            gi = g[4];
            gs = g[5];

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

            return new Array(jy, jm, jd, gh, gi, gs);
         },

         /**
          * Jalali to Gregorian
          */
         j_to_g: function(j){
            if(!j) return undefined;
            var gy, gm, gd;
            var jy, jm, jd;
            var g_day_no, j_day_no;
            var leap;

            var i;

            jy = j[0]-979;
            jm = j[1]-1;
            jd = j[2]-1;
            jh = j[3];
            ji = j[4];
            js = j[5];

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

            return new Array(gy, gm, gd, jh, ji, js);
         },

         jalali_today: function(){
            Today = new Date();
            j = this.g_to_j(new Array(
               Today.getFullYear(),
               Today.getMonth()+1,
               Today.getDate(),
               Today.getHours(),
               Today.getMinutes(),
               Today.getSeconds()
            ));
            
            return j[2]+"/"+j[1]+"/"+j[0]+" "+j[3]+":"+j[4]+":"+j[5];
         },

         /**
          * Gregorian to Timestamp
          */
         g_to_t: function(g){
            if(!g) return undefined;
            var 
               f = new Date(),
               y = g[0],
               m = g[1],
               d = g[2],
               h = g[3],
               i = g[4],
               s = g[5];

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
           return this.g_to_j([
            f.getFullYear(), 
            (f.getMonth() + 1), 
            f.getDate(),
            f.getHours(),
            f.getMinutes(),
            f.getSeconds()
           ]);
         },

         /**
          * Timestamp to Gregorian
          */
         t_to_g: function(t){
           if(!t) return undefined;
           var f = new Date(parseInt(t));
           return [
            f.getFullYear(), 
            (f.getMonth() + 1), 
            f.getDate(),
            f.getHours(),
            f.getMinutes(),
            f.getSeconds()
           ];
         }
      }

      var 
         timestamp,
         defaults = {
            miliseconds: false
         };
         options = options || {};

      if(options.timestamp) timestamp = options.timestamp;
      else if(options.jalali) timestamp = timeConvertor.j_to_t(options.jalali);
      else if(options.gregorian) timestamp = timeConvertor.g_to_t(options.gregorian);
      else timestamp = (new Date).getTime();


      for(var i in options){ defaults[i] = options[i] }

      var date = new Date(parseInt(timestamp));

      date.toTimestamp = function(){
        if(defaults.miliseconds) return this.getTime();
        return (this.getTime() / 1000).toFixed();
      };

      date.toJalali = function(){
        return timeConvertor.t_to_j(this.getTime());
      };

      date.toGregorian = function(){
        return timeConvertor.t_to_g(this.getTime());
      };

      date.toJalaliYear = function(){
        return this.toJalali()[0];
      }

      date.toJalaliMonth = function(){
        return this.toJalali()[1];
      }

      date.toJalaliDay = function(){
        return this.toJalali()[2];
      }

      date.toJalaliHours = function(){
        return this.toJalali()[3];
      }

      date.toJalaliMinutes = function(){
        return this.toJalali()[4];
      }

      date.toJalaliSeconds = function(){
        return this.toJalali()[5];
      }

      date.toGregorianYear = function(){
        return this.toGregorian()[0];
      }

      date.toGregorianMonth = function(){
        return this.toGregorian()[1];
      }

      date.toGregorianDay = function(){
        return this.toGregorian()[2];
      }

      date.toGregorianHours = function(){
        return this.toGregorian()[3];
      }

      date.toGregorianMinutes = function(){
        return this.toGregorian()[4];
      }

      date.toGregorianSeconds = function(){
        return this.toGregorian()[5];
      }

      date.fromTimestamp = function(timestamp){
        if(defaults.miliseconds) this.setTime(timestamp);
        else this.setTime(timestamp * 1000)

        return this;
      };

      date.fromJalali = function(array){
        this.setTime(timeConvertor.j_to_t(array));
        return this;
      };

      date.fromGregorian = function(array){
        this.setTime(timeConvertor.g_to_j(array));
        return this;
      };

      date.formatJalali = function(format){
        return format
           .replace("y", this.toJalaliYear())
           .replace("m", this.toJalaliMonth())
           .replace("d", this.toJalaliDay())
           .replace("h", this.toJalaliHours())
           .replace("i", this.toJalaliMinutes())
           .replace("s", this.toJalaliSeconds())
        ;
      };

      date.formatGregorian = function(format){
        return format
           .replace("y", this.toGregorianYear())
           .replace("m", this.toGregorianMonth())
           .replace("d", this.toGregorianDay())
           .replace("h", this.toGregorianHours())
           .replace("i", this.toGregorianMinutes())
           .replace("s", this.toGregorianSeconds())
        ;
      };

      date.toString = function(){
        if(defaults.miliseconds) return "Timestamp " + this.getTime();
        return "Timestamp: " + (this.getTime() / 1000).toFixed();
      }

      return date;
   };

   window.Timestamp = Timestamp;

})();