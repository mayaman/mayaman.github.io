
    if(!Detector.webgl){
      Detector.addGetWebGLMessage();
    } else {

      var years = ["0", "1", "2"];
      var container = document.getElementById('container');
      var globe = new DAT.Globe(container);

      console.log(globe);
      var i, tweens = [];

      var settime = function(globe, t) {
        return function() {
          console.log('setting time to: ' + t);
          new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
          var y = document.getElementById('year'+years[t]);
          if (y.getAttribute('class') === 'year active') {
            return;
          }
          var yy = document.getElementsByClassName('year');
          for(i=0; i<yy.length; i++) {
            yy[i].setAttribute('class','year');
          }
          y.setAttribute('class', 'year active');
        };
      };

      var stepAnimation = function(globe, t) {
        console.log('setting time to: ' + t);
        new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
        var y = document.getElementById('year'+years[t]);
        if (y.getAttribute('class') === 'year active') {
          return;
        }
        var yy = document.getElementsByClassName('year');
        for(i=0; i<yy.length; i++) {
          yy[i].setAttribute('class','year');
        }
        y.setAttribute('class', 'year active');
      };

      for(var i = 0; i<years.length; i++) {
        var y = document.getElementById('year'+years[i]);
        y.addEventListener('mouseover', settime(globe,i), false);
      }

      var xhr;
      TWEEN.start();
      var data;
      xhr = new XMLHttpRequest();
      xhr.open('GET', 'data/lat_long_mag_dat.json', true);
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            window.data = data;
            for (i=0;i < data.length;i++) {
              console.log('adding data of length ' + data.length);
              console.log('adding data of length ' + data[i][1].length);
              globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
            }
            globe.createPoints();
            settime(globe,1)();
            globe.animate();
            document.body.style.backgroundImage = 'none'; // remove loading
          }
        }
      };
      xhr.send(null);
      var year = 0;
      setInterval(function() {
        // stepAnimation(globe, year);
        // if (year < years.length - 1) {
        //   year++;
        // } else {
        //   year = 0;
        // }
        // console.log('year: ' + year);
        //
        // globe.addData(data[year][1], {format: 'magnitude', name: data[year][0], animated: true});
        // globe.createPoints();
        // globe.animate();
      }, 500);
    }
