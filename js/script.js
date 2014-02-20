// declare var's here outside of curlies, so all functions can refer to them
var spawntimer;
var movetimer;
var dropArray = new Array();
var user_bucket = new Bucket(25,250);

onload=init;

function init(){
	// setInterval fires off a function periodically
	spawntimer = setInterval(spawn,500);
	movetimer = setInterval(moveAllDrops,100);
	// actually put the bucket on the page
	user_bucket.create();
	document.onkeydown = function(e){
		checkKey(e);
	}
}

function spawn(){
	//make an object that's an instance of the Drop Class:
	var anotherdrop = new Drop();
	anotherdrop.create();
	// store into our drop array
	dropArray.push(anotherdrop);
}

function moveAllDrops(){
	// iterate through the array of drops, and do what's in {} to each one
	for(var i=0; i< dropArray.length; i++){
		var currentdrop = dropArray[i];
		// adds a little to the stored y property of the drop
		currentdrop.y += 5;
		// move the drop a few pixels;
		currentdrop.item_on_page.style.top = dropArray[i].y + "px";
		// if drop gets to "bottom" of screen, destroy it
		if(currentdrop.y > 350){
			currentdrop.destroy();
		}
		// if the currentdrop is "hitting" the bucket
		if(collisionCheck(user_bucket, currentdrop)){
			// do various things like add to score, and get rid of drop
			currentdrop.destroy();
		}
	}// close FOR loop
}

function checkKey(e){
	// equalize understanding of the event in all browsers
	e = e || window.event;
	// if it's the left errow...
	if(e.keyCode == '39'){
		// add to buckets x (which will move it rightward) and apply to CSS 'left'
		user_bucket.x += 15;
		user_bucket.setpos();
	} else if(e.keyCode == '37'){
		// add to buckets x (which will move it leftward) and apply to CSS 'left'
		user_bucket.x -= 15;
		user_bucket.setpos();
	}
}

function collisionCheck(big_obj, sm_obj){
	
	var big_obj_left_x = big_obj.x;
	var big_obj_right_x = big_obj.x + big_obj.width;
	var big_obj_top_y = big_obj.y;
	var big_obj_bottom_y = big_obj.y + big_obj.height;
	
	var sm_obj_left_x = sm_obj.x;
	var sm_obj_right_x = sm_obj.x + sm_obj.width;
	var sm_obj_top_y = sm_obj.y;
	var sm_obj_bottom_y = sm_obj.y + sm_obj.height;
	// if the coordinates of the two objects indicate they're touching in their left-to-right positions
	if((sm_obj_left_x > big_obj_left_x)&&(sm_obj_right_x < big_obj_right_x)){
		// if the coordinates of the two objects indicate they're touching in their top-to-bottom positions
		if((sm_obj_top_y > big_obj_top_y)&&(sm_obj_bottom_y < big_obj_bottom_y)){
			// send back that yes, they're colliding! 
			return true;
		}
	}
	// otherwise send back that no, they're NOT colliding!
	return false;
}