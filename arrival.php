<!doctype html>
<head>
  <meta charset="utf-8">
  <title>銀河の車窓から</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <STYLE type="text/css">
<!--
*{margin:0;
padding:0;
}
body {
    background: url(img/stars.jpg);
	min-height:100%;
}
#window{
	background-image:url(img/window.png);
	background-size:100% 100%;
	position:absolute;
	height:100%;
	width:100%;
	z-index:100;
}
#surface{
	height:400px;
	position: fixed;
	bottom:-410px;
	overflow:visible;
	min-width:2000px;
}
#surface img{
	width:100%;
	}
#flag{
	width:0px;
	height:0px;
	left:50%;
	top:20%;
	margin-left:-300px;
	position:absolute;
	border-radius: 10px;		/* CSS3草案 */
	-webkit-border-radius: 10px;	/* Safari,Google Chrome用 */
	-moz-border-radius: 10px;	/* Firefox用 */
	background-color: rgba(0,0,0,0.8);
	padding:20px 5px;
	border:#EEE solid 1px;
	z-index:999;
	text-align:center;
	display:none;
	color:#FFF;
	overflow:scroll;
}
#flag a{
	color:#fff;
}
#flag h1{
	font-size:4em;
}
#comments{
	width:100%;
	min-height:200px;
	position:absolute;
	bottom:-210px;
	text-align:center;
	z-index:10;
}
#comment{
	margin-top:20px;
}
-->
</STYLE>
</head>
<body>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=235856976538039";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<div id="surface"><img src="img/surface.png"></div>
<div id="flag"><p><h1> <?php
$DATA = array(
	"mars" => "火星",
	"venus" => "金星",
	"realearth" => "地球",
	"earth" => "太陽",
	"mercury" => "水星",
	"pluto" => "冥王星",
	"neptune" => "海王星",
	"uranus" => "天王星",
	"jupiter" => "木星",
	"saturn" => "土星"
);
if (isset($_GET['star'])) {
	echo $DATA[$_GET['star']];
}
?> </h1><p>ご乗車ありがとうございました</p><p><a href="./index.html">もういちど旅をする</a></p><div id="comment"><p>記念に一言</p><div class="fb-comments" data-href="http://galactic-railways.com" data-width="500px" data-numposts="5" data-colorscheme="dark"></div></div></div>
<audio id="bgm" src="audio/921.mp3" autoplay loop></audio>
<audio id="shushu" src="audio/arriving.mp3#t=5" autoplay ></audio>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
  <script type="text/javascript" src="jquery.easing.1.3.js"></script>
  <script type="text/javascript">
$(document).ready( function() {

		$('#surface').animate({
				bottom: -100,
				right:-600,}, 7000, 'easeOutCubic', flag);

function poo() {
audio = new Audio("audio/poo.mp3#t=3");
audio.play();
}
	
	function comments(){
		$('#comments').animate({
				bottom: 10,}, 2000, 'easeOutCubic',poo);
	}
function flag(){
    $('#flag').show().animate({
          width: '600px',
          height: '400px'
    }, 500,'easeOutBack',comments);
	}
	
	});
</script>
</body>
</html>
