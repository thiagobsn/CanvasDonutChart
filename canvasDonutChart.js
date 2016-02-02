/**************************
* CanvasDonutChart V1.1   *
* Thiago Bernardo         *
* thiagobsn@gmail.com     *
**************************/

var CanvasDonutChart =  function() {

  var COLOR_DEFAULT1 = "#4675A6";
  var COLOR_DEFAULT2 = "#CD5555";
  var COLOR_BACKGROUND_DEFAULT1 = "#aac2db";
  var COLOR_BACKGROUND_DEFAULT2 = "#FFC1C1";
  var DESC_HEIGHT_DEFAULT = 25;

  var _canvas;

  var _single = function(options){
    //console.log("# Single Canvas Donut Chart");
    var content = _getContent(options);
    if(content){
      _canvas = _createCanvas(options);
      var contentCanvas = _createContentCanvasDiv(options);
      var descCanvas = _createDesc(options);
      var lineWidth = _getLineWidth(options);
      var centerX = _canvas.width/2;
      var centerY = _canvas.height/2;
      var radius = _getRadius(options);
      if(!radius){
        if(options.arcText){
          radius = (_canvas.height-lineWidth-20)/2;
        }else{
            radius = (_canvas.height-lineWidth)/2;
        }
      }
      _setTextCenterCanvas(options,contentCanvas);
      var start = _getStart();
      var end = _getPercent(options);
      var colors = _getColors(options);
      var context = _canvas.getContext("2d");
      _drawDonutBackground(context,colors,centerX,centerY,lineWidth,radius);
      _drawDonut(context,colors,centerX,centerY,lineWidth,radius,start,end);
      if(options.arcText){
        var arcFontName, arcFontSize, arcAlign, arcStartAngle, arcDiameter;
        if(options.arcFontName){
          arcFontName = options.arcFontName;
        }else{
          arcFontName = "Verdana";
        }
        if(options.arcAlign){
          arcAlign = options.arcAlign;
        }else{
          arcAlign = "center";
        }
        if(options.arcStartAngle){
          arcStartAngle = parseInt(options.arcStartAngle);
        }else{
          arcStartAngle = 0;
        }
        if(options.arcFontSize){
          arcFontSize = options.arcFontSize+"pt";
        }else{
          arcFontSize = "8pt";
        }
        if(options.arcDiameter){
          arcDiameter = parseInt(options.arcDiameter);
        }else{
          arcDiameter = ((2*radius)+lineWidth+10);
        }
        _drawCircularText(context,centerX,centerY,options.arcText, arcDiameter ,arcStartAngle, arcAlign, false, true, arcFontName, arcFontSize, 0);
      }
      contentCanvas.appendChild(_canvas);
      content.appendChild(contentCanvas);
      if(descCanvas){
        content.appendChild(descCanvas);
      }
    }

  };

  var _getContent = function(options){
    if(options.id){
      var content = document.getElementById(options.id);
      if(content){
        content.innerHTML = "";
        content.setAttribute("class", "CanvasDonutContent");
        if(options.width && options.height){
          if(options.arcText){
            content.style.height = options.height +'px';
          }else{
            content.style.height = (options.height - DESC_HEIGHT_DEFAULT) +'px';
          }
          content.style.width  = options.width+'px';
        }
      }
      return content;
    }else{
      return null;
    }
  };

  var _createContentCanvasDiv = function(options){
    var content = document.createElement("div");
    content.setAttribute("class", "CanvasDonutChart");
    if(options.width && options.height){
      if(options.arcText){
        content.style.height = options.height +'px';
      }else{
        content.style.height = (options.height - DESC_HEIGHT_DEFAULT) +'px';
      }
      content.style.width  = options.width+'px';
    }
    return content;
  };

  var _createDesc = function(options){
    if(!options.arcText){
      var descHeight = DESC_HEIGHT_DEFAULT;
      var descSize = "1.2em";
      var spanDesc = document.createElement("span");
      spanDesc.setAttribute("class", "CanvasDonutChart");
      if(options.desc){
        spanDesc.textContent = options.desc;
        if(options.descSize){
            descSize = options.descSize+"em";
        }
        spanDesc.style.fontSize = descSize;
        spanDesc.style.lineHeight = descHeight+'px';
      }else{
        spanDesc = null;
      }
      return spanDesc;
    }
  };

  var _getLineWidth = function(options){
    var lineWidth;
    if(options.lineWidth){
      lineWidth = parseInt(options.lineWidth);
    }else{
      lineWidth = 10;
    }
    return lineWidth;
  };

  var _createCanvas = function(options){
    var canvas = document.createElement("canvas");
    if(options.width && options.height){
      if(options.arcText){
        canvas.height = parseInt(options.height);
      }else{
        canvas.height = parseInt(options.height) - DESC_HEIGHT_DEFAULT;
      }
      canvas.width  = parseInt(options.width);
    }
    return canvas;
  };

  var _getRadius = function(options){
    if(options.radius){
      return options.radius;
    }else{
      return null;
    }
  };

  var _getPercent = function(options){
    var fixPercent = (Math.PI/2);
    var percent;
    if(options.percent){
      percent = (((Math.PI * options.percent)/50) - fixPercent) - 0.00001;
    }else{
      percent = (1.5*Math.PI);
    }
    console.log(percent);
    return percent;
  };

  var _getStart = function(){
    return (1.5*Math.PI);
  };

  var _setTextCenterCanvas = function(options,contentCanvas){
    var contentText = document.createElement("span");
    contentText.style.lineHeight = _canvas.height+'px';
    if(options.textValue || options.textValue >= 0){
      contentText.textContent = options.textValue;
      var textValueSize = "1.2em";
      if(options.textValueSize){
        textValueSize = options.textValueSize+"em";
      }
      contentText.style.fontSize = textValueSize;
    }
    contentCanvas.appendChild(contentText);
  };

  var _getColors = function(options){
      var colors = {};
      if(options.color){
        colors.color = options.color;
      }else{
        colors.color = COLOR_DEFAULT1;
      }
      if(options.colorBackground){
          colors.background = options.colorBackground;
      }else{
          colors.background = COLOR_BACKGROUND_DEFAULT1;
      }
      return colors;
  };

  var _drawDonutBackground = function(context,colors,centerX,centerY,lineWidth,radius){
    context.beginPath();
    context.strokeStyle = colors.background;
    context.lineWidth=lineWidth;
    context.arc(centerX, centerY, radius, 0, 2*Math.PI);
    context.closePath();
    context.stroke();
  };

 var  _drawDonut = function(context,colors,centerX,centerY,lineWidth,radius,start,end){
    context.beginPath();
    context.strokeStyle = colors.color;
    context.lineWidth=lineWidth;
    context.arc(centerX, centerY, radius, start, end);
    context.stroke();
  };

  var _getCanvas = function(){
    return _canvas;
  };

  //http://blog.graphicsgen.com/2015/03/html5-canvas-rounded-text.html
  var _drawCircularText = function(context, centerX,centerY,text, diameter, startAngle, align, textInside, inwardFacing, fName, fSize, kerning) {
    var clockwise = align == "right" ? 1 : -1; // draw clockwise for aligned right. Else Anticlockwise
    startAngle = startAngle * (Math.PI / 180); // convert to radians
     // calculate height of the font. Many ways to do this - you can replace with your own!
    var div = document.createElement("div");
    div.innerHTML = text;
    div.style.position = 'absolute';
    div.style.top = '-10000px';
    div.style.left = '-10000px';
    div.style.fontFamily = fName;
    div.style.fontSize = fSize;
    document.body.appendChild(div);
    var textHeight = div.offsetHeight;
    document.body.removeChild(div);
    if (!textInside){
       diameter += textHeight;
    }
    context.fillStyle = 'black';
    context.font = fSize + ' ' + fName;
    if (((["left", "center"].indexOf(align) > -1) && inwardFacing) || (align == "right" && !inwardFacing)){
      text = text.split("").reverse().join("");
    }
    // Setup letters and positioning
    context.translate(centerX, centerY);          // Move to center
    startAngle += (Math.PI * !inwardFacing);       // Rotate 180 if outward facing
    context.textBaseline = 'middle';                // Ensure we draw in exact center
    context.textAlign='center';                     // Ensure we draw in exact center
    // rotate 50% of total angle for center alignment
    if (align == "center") {
       for (var j = 0; j < text.length; j++) {
           var charWid = context.measureText(text[j]).width;
           startAngle += ((charWid + (j == text.length-1 ? 0 : kerning)) /
           (diameter / 2 - textHeight)) / 2 * -clockwise;
       }
     }
    // Phew... now rotate into final start position
    context.rotate(startAngle);
    // Now for the fun bit: draw, rotate, and repeat
    for (var i = 0; i < text.length; i++) {
      // half letter
      var charWidth = context.measureText(text[i]).width;
      // rotate half letter
      context.rotate((charWidth/2) / (diameter / 2 - textHeight) * clockwise);
      // draw the character at "top" or "bottom"
      // depending on inward or outward facing
      context.fillText(text[i], 0, (inwardFacing ? 1 : -1) * (0 - diameter / 2 + textHeight / 2));
      context.rotate((charWidth/2 + kerning) / (diameter / 2 - textHeight) * clockwise); // rotate half letter
    }
  };

  return {single : _single,
          canvas : _getCanvas};
};
