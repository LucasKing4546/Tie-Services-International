<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Casa Pannonia - Contact US</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
<link rel="stylesheet" type="text/css" href="css/style.css"  />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript">
<!--
jQuery(document).ready(function(){
	$('#contactform').submit(function(){				  
		var action = $(this).attr('action');
		//$('#contactform')
		//	.before('<div class="loader"><img src="images/loading.gif" align="center" /></div>')
		//	.attr('disabled','disabled');
		$.post(action, { 
			name: $('#name').val(),
			email: $('#email').val(),
			//phone: $('#phone').val(),
			//concerning: $('#concerning').val(),
			message: $('#message').val()
		},
			function(data){
				$('#contactform #submit').attr('disabled','');
				$('.response').remove();
				$('#contactform').before('<div class="response">'+data+'</div>');
				$('.response').slideDown();
				//$('.loader').fadeOut(500,function(){$(this).remove()});
				if(data=='Message sent!') $('#contactform').slideUp();
			}
		); 
		return false;
	});
});
-->
</script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript">

      function initialize() {
        var mapDiv = document.getElementById('map-canvas');
        var map = new google.maps.Map(mapDiv, {
          center: new google.maps.LatLng(47.797202, 22.862924),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
      
        var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(47.797202, 22.862924),
          draggable: true
        });
      }
      

      google.maps.event.addDomListener(window, 'load', initialize);
    </script>
</head>
<body>
<div class="main">
	<div class="header">
		<div style="padding-top:15px; float:left;"><a href="http://pannonia.ro/"><img src="images/logotop.gif" style="width:250px; border:0;" alt="Casa Pannonia" /></a></div>	
		<div class="menu">
		  <ul>
			<li><a href="index.php">Home</a></li>
			<li><a href="galerie.php">Gallery</a></li>
			<li><a href="contactus.php" class="active">Contact US</a></li>
		  </ul>
		</div>
	</div>
	<div class="clr"></div>
	<div class="body">
		<div style="width:250px; float:left; margin:0 10px;">	
			<div class="logo"><img src="images/logo.jpg" style="width:250px; height:250px;" alt="picture" /> </div>
			<div class="side_body">
				<div>
					<div style="text-align:center;width:250px; padding-bottom:10px;"><strong>
					Strada: Dsida Jeno, Nr.: 18<br />
					440050 Satu Mare, Romania<br /> 
					Phone: +40 725.99.82.78				
					</strong>
					</div>
					<div style="text-align:center;width:250px; "><a href="http://www.booking.com/hotel/ro/casa-pannonia.html?aid=330843;lang=ro;pb=1" target="booking"><img src="//aff.bstatic.com/images/affiliate/330843/booknow_ro.gif" alt="Rezervaţi acum" style="border: 0; padding-left:40px;" /></a>
						<div style="clear:both;">Oferit de Booking.com</div>
					</div>					
					<div style="clear:both; padding-top:10px;">
						<div class="fb-like-box" data-href="https://www.facebook.com/CPannonia" data-width="250" data-height="400" data-colorscheme="light" data-show-faces="true" data-header="false" data-stream="false" data-show-border="false"></div>
					</div>
				</div>
				<div class="clr"></div>
			</div>
			<div class="clr"></div>
		</div>	
		<div class="main_body" style="min-height:810px; float:left;">	
			<div id="map-canvas" style="width: 550px; height: 450px"></div>		
			<p style="padding-top:10px;"><strong>Strada: Dsida Jeno, Nr.: 18<br />440050 Satu Mare, Romania<br /> Phone: +40 725.99.82.78	</strong></p>						
			<h2>communicate with us</h2>	 	
			<form action="contact.php" method="post" id="contactform">
				<ol>
					<li>
						<label for="name">your name*<br />
						<span>add your name </span></label>
						<input id="name" name="name" class="text" />
					</li>
					<li>
						<label for="email">your email address*<br />
						<span>add a valid address</span></label>
						<input id="email" name="email" class="text" />
					</li>
					<li>
						<label for="message">your message*<br />
						<span>communicate with us</span></label>
						<textarea id="message" name="message" rows="6" cols="50"></textarea>
					</li>
					<li class="buttons">
						<input type="submit" value="Send Message" id="submit" />
					</li>
				</ol>
			</form>
			<p>&nbsp;</p>  
			<div class="clr"></div>		
		</div>
		<div class="parteneri" style="float:right; min-height:810px;">
      <div style="height:25px;text-align:center; background-color: #5F2D0B; color:#fff; margin-bottom:10px; padding-top:10px; "><strong>parteneri</strong></div>
			<div class="clr"></div>
			<div style="padding:10px 0 10px 0px; border-bottom:1px solid #CCC;">
				<script type="text/javascript" src="http://www.infopensiuni.ro/cod/cod2.js"></script><a title="Cazare Romania" href="http://www.infopensiuni.ro"> Cazare Romania</a>
				<div class="clr"></div>
			</div>
			<div class="clr" style="padding:10px 0;"></div>	
			<div style="width:100px; text-align:center; display:block;padding:10px">
				<!-- CentruTuristic.ro v.1 --> <div> <table CELLPADDIN=0 CELLSPACING=0 border=0 width=100px> <tr> <td align="center"> <a href="http://www.centruturistic.ro/" title="Pensiuni, hoteluri si vile Romania" target=blank><img src="https://scontent.fotp3-3.fna.fbcdn.net/v/t1.0-9/11953194_887251804689040_94173731343307073_n.png?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=9u6zSGCR2fgAX86bXOV&_nc_ht=scontent.fotp3-3.fna&oh=7d376b6ea869415ae51066fd811215d6&oe=5F05DBA8" style="width:100%; height:auto;"></a> </td> </tr> <tr> <td align=center> <a href="http://www.centruturistic.ro/satu_mare/cazare_satu_mare.html" target=blank title="Pensiuni si hoteluri Satu Mare"> <font color=#04398F size=2> Cazare Satu Mare </font> </a> </td> </tr> </table> </div><!-- CentruTuristic.ro v.1 -->
				<div class="clr"></div>
			</div>
			<div class="clr"></div>	
		</div>			
		<div class="clr"></div>	
  </div>
</div>
<div class="clr"></div>
<div class="footer_block">
	<div class="footer"> © Copyright 2012. www.pannonia.ro. All Rights Reserved. Website made by balan ciprian<br />
    <a href="index.php">Home</a> | <a href="galerie.php">Gallery</a> | <a href="contactus.php">Contact US</a></div>
<!-- Quantcast Choice. Consent Manager Tag v2.0 (for TCF 2.0) -->
<script type="text/javascript" async=true>
(function() {
  var host = window.location.hostname;
  var element = document.createElement('script');
  var firstScript = document.getElementsByTagName('script')[0];
  var milliseconds = new Date().getTime();
  var url = 'https://quantcast.mgr.consensu.org'
    .concat('/choice/', '2z86hP6SXQLhv', '/', host, '/choice.js')
    .concat('?timestamp=', milliseconds);
  var uspTries = 0;
  var uspTriesLimit = 3;
  element.async = true;
  element.type = 'text/javascript';
  element.src = url;

  firstScript.parentNode.insertBefore(element, firstScript);

  function makeStub() {
    var TCF_LOCATOR_NAME = '__tcfapiLocator';
    var queue = [];
    var win = window;
    var cmpFrame;

    function addFrame() {
      var doc = win.document;
      var otherCMP = !!(win.frames[TCF_LOCATOR_NAME]);

      if (!otherCMP) {
        if (doc.body) {
          var iframe = doc.createElement('iframe');

          iframe.style.cssText = 'display:none';
          iframe.name = TCF_LOCATOR_NAME;
          doc.body.appendChild(iframe);
        } else {
          setTimeout(addFrame, 5);
        }
      }
      return !otherCMP;
    }

    function tcfAPIHandler() {
      var gdprApplies;
      var args = arguments;

      if (!args.length) {
        return queue;
      } else if (args[0] === 'setGdprApplies') {
        if (
          args.length > 3 &&
          args[2] === 2 &&
          typeof args[3] === 'boolean'
        ) {
          gdprApplies = args[3];
          if (typeof args[2] === 'function') {
            args[2]('set', true);
          }
        }
      } else if (args[0] === 'ping') {
        var retr = {
          gdprApplies: gdprApplies,
          cmpLoaded: false,
          cmpStatus: 'stub'
        };

        if (typeof args[2] === 'function') {
          args[2](retr);
        }
      } else {
        queue.push(args);
      }
    }

    function postMessageEventHandler(event) {
      var msgIsString = typeof event.data === 'string';
      var json = {};

      try {
        if (msgIsString) {
          json = JSON.parse(event.data);
        } else {
          json = event.data;
        }
      } catch (ignore) {}

      var payload = json.__tcfapiCall;

      if (payload) {
        window.__tcfapi(
          payload.command,
          payload.version,
          function(retValue, success) {
            var returnMsg = {
              __tcfapiReturn: {
                returnValue: retValue,
                success: success,
                callId: payload.callId
              }
            };
            if (msgIsString) {
              returnMsg = JSON.stringify(returnMsg);
            }
            event.source.postMessage(returnMsg, '*');
          },
          payload.parameter
        );
      }
    }

    while (win) {
      try {
        if (win.frames[TCF_LOCATOR_NAME]) {
          cmpFrame = win;
          break;
        }
      } catch (ignore) {}

      if (win === window.top) {
        break;
      }
      win = win.parent;
    }
    if (!cmpFrame) {
      addFrame();
      win.__tcfapi = tcfAPIHandler;
      win.addEventListener('message', postMessageEventHandler, false);
    }
  };

  if (typeof module !== 'undefined') {
    module.exports = makeStub;
  } else {
    makeStub();
  }

  var uspStubFunction = function() {
    var arg = arguments;
    if (typeof window.__uspapi !== uspStubFunction) {
      setTimeout(function() {
        if (typeof window.__uspapi !== 'undefined') {
          window.__uspapi.apply(window.__uspapi, arg);
        }
      }, 500);
    }
  };

  var checkIfUspIsReady = function() {
    uspTries++;
    if (window.__uspapi === uspStubFunction && uspTries < uspTriesLimit) {
      console.warn('USP is not accessible');
    } else {
      clearInterval(uspInterval);
    }
  };

  if (typeof window.__uspapi === 'undefined') {
    window.__uspapi = uspStubFunction;
    var uspInterval = setInterval(checkIfUspIsReady, 6000);
  }
})();
</script>
<!-- End Quantcast Choice. Consent Manager Tag v2.0 (for TCF 2.0) -->
</div>
<div class="clr"></div>
</body>
</html>