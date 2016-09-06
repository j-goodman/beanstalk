var sky;

sky = function () {
  this.palette = {
    red: 158,
    green: 202,
    blue: 239,
  };
  this.day = {
    red: 158,
    green: 202,
    blue: 239,
  };
  this.dusk = {
    red: 240,
    green: 172,
    blue: 40,
  };
  this.night = {
    red: 16,
    green: 20,
    blue: 45,
  };
  this.time = 0; this.hour = 0;
  this.interval = setInterval(function () {
    var progress;
    this.time += 0.1;
    this.hour = this.time%2400;
    if (this.hour>=0 && this.hour<600) {
    // SUNSET
      progress = this.hour/500;
      this.palette.red = Math.floor((this.day.red*(1-progress) + this.dusk.red*(progress)));
      this.palette.green = Math.floor((this.day.green*(1-progress) + this.dusk.green*(progress)));
      this.palette.blue = Math.floor((this.day.blue*(1-progress) + this.dusk.blue*(progress)));
    } else if (this.hour>=600 && this.hour<1200) {
    // DUSK
      progress = (this.hour-600)/600;
      this.palette.red = Math.floor((this.dusk.red*(1-progress) + this.night.red*(progress)));
      this.palette.green = Math.floor((this.dusk.green*(1-progress) + this.night.green*(progress)));
      this.palette.blue = Math.floor((this.dusk.blue*(1-progress) + this.night.blue*(progress)));
    } else if (this.hour>=1200 && this.hour<1800) {
    // SUNRISE
      progress = (this.hour-1200)/600;
      this.palette.red = Math.floor((this.night.red*(1-progress) + this.dusk.red*(progress)));
      this.palette.green = Math.floor((this.night.green*(1-progress) + this.dusk.green*(progress)));
      this.palette.blue = Math.floor((this.night.blue*(1-progress) + this.dusk.blue*(progress)));
    } else if (this.hour>=1800 && this.hour<2400) {
    // SUNRISE
      progress = (this.hour-1800)/600;
      this.palette.red = Math.floor((this.dusk.red*(1-progress) + this.day.red*(progress)));
      this.palette.green = Math.floor((this.dusk.green*(1-progress) + this.day.green*(progress)));
      this.palette.blue = Math.floor((this.dusk.blue*(1-progress) + this.day.blue*(progress)));
    }
    this.color = '#'+
      this.palette.red.toString(16)+
      this.palette.green.toString(16)+
      this.palette.blue.toString(16);
  }.bind(this), 32);
};

module.exports = sky;
