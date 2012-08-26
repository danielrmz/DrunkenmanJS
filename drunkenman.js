var Environment = 
{
  drawingPane : '#drawingPane'
};

var Element = function(_X, _Y, _ext, _draw)
{
  var that = {};

  var X = 0;
  var Y = 0;
  var ext = 
  {
    width: 50,
    height: 50, 
    color: 'red'
  };
  that.draw = function(context)
  {
    context.fillStyle = ext.color;
    context.fillRect(X, Y, ext.width, ext.height);
  };

  //Init
  if(_X || _X === 0)
  {
    X = _X;
  } 
  if(_Y || _Y === 0)
  {
    Y = _Y;
  } 
  if(_draw)
  {
    that.draw = _draw;
  } 
  if(_ext)
  {
    ext = _ext;
  } 

  that.setX = function(_X)
  {
     X = _X;
  };

  that.getX = function()
  {
      return X;
  };

  that.setY = function(_Y)
  {
    Y = _Y;
  }

  that.getY = function()
  {
    return Y;
  }

  that.setExt = function(key, val)
  {
    ext[key] = val;
  }

  return that;
};

var Canvas = function(_width, _height, _backgroundColor, _context) 
{
  var that = {};

  var width = _width? _width : 800;
  var height =  _height? _height : 600;
  var backgroundColor = _backgroundColor? _backgroundColor : 'black';
  
  that.context = _context;

  that.clear =  function()
  {
    that.context.fillStyle = backgroundColor;
    that.context.fillRect(0, 0, width, height);   
  };

  return that;
};

var GameEngine = function(_canvas)
{
  var that = {};

  var eventKeys = {};
  var animations = [];
  var canvas = _canvas;

  that.register = function(element, animation)
  {
    animations.push(element);
    for(key in animation)
    {
      if(!eventKeys[key])
      {
        eventKeys[key] = [];
      }
      eventKeys[key].push(animation[key]);
    } 
  };

  that.dispatch = function(key)
  {
    for(var index in eventKeys[key])
    {
      eventKeys[key][index]();
    }
  };

  that.draw = function()
  {
    canvas.clear();
    for(var index in animations)
    {
      animations[index].draw(canvas.context);
    } 
  };

  that.start = function()
  {
    setInterval(that.draw, 50); 
  };

  return that;
}

$('document').ready(function(){
  //setInterval(GameLoop, 100);

  var canvas = Canvas(
    800, 600, 
    'black', 
    document.getElementById('drawingPane').getContext('2d'));

  canvas.clear();

  var gameEngine = GameEngine(canvas);

  //Dispatcher 
  $('#canvasKeyListener').keypress(function(e)
  {
    var key = e.which;
    gameEngine.dispatch(key);
  });

  var player = Element(20,20);

  gameEngine.register(player,
  {
    97  /*a*/: function moveLeft(){player.setX(player.getX() - 5);},
    115 /*s*/: function moveDown(){player.setY(player.getY() + 5);},
    100 /*d*/: function moveRight(){player.setX(player.getX() + 5);},
    119 /*w*/: function moveUp(){player.setY(player.getY() - 5);}
  });

  gameEngine.start();
});




