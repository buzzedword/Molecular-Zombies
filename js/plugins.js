// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.
	jQuery.event.special.acc = {
	    setup: function(data, namespaces) {
	        console.log('setup');
	        var elem = this, $elem = jQuery(elem);
	        $elem.bind('deviceorientation MozOrientation devicemotion',  jQuery.event.special.acc.handler);
	    },
	    teardown: function(namespaces) {
	        console.log('teardown');
	        var elem = this, $elem = jQuery(elem);
	        $elem.unbind('deviceorientation',  jQuery.event.special.acc.handler);
	    },
	    handler: function(e) {
			// console.log('event handler!');
	        var elem = this, $elem = jQuery(elem), oe = e.originalEvent;
	        e.type = "acc";
			
			console.log('Event Type: ' + e.originalEvent.type);
			switch(e.originalEvent.type) {
				// Firefox 3.6
				case 'MozOrientation':
					e.accX  = -(e.originalEvent.x * (180 / Math.PI));
					e.accY  = -(e.originalEvent.y * (180 / Math.PI));
					console.log('Logged for Firefox 36!');		
					break;
				// Google Chrome, iPhone 4
				case 'deviceorientation':
					e.accX = e.originalEvent.gamma;
					e.accY = e.originalEvent.beta;
					console.log('Logged for chrome / iphone 4 / Android 3.1');
					break;
				// iPad 1 / Firefox 6
				case 'devicemotion':
					e.accX = -(e.originalEvent.accelerationIncludingGravity.x * (180 / Math.PI));
					e.accY = -(e.originalEvent.accelerationIncludingGravity.y * (180 / Math.PI));
					e.accZ = -(e.originalEvent.accelerationIncludingGravity.z * (180 / Math.PI));
					console.log('iPad browser / Firefox');
					break;
				case 'acceleration':
					console.log(e);
					break;
				default:
					console.log('Could not find anything...');
			}
	        
	        jQuery.event.handle.apply(this, arguments)
	    }
	};