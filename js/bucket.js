/**
 * The Bucket class is a blueprint for the bucket we generate
 * @author  John Doe
 * @version 1.0, May 2014
 */
function Bucket(x,y){
	this.x = x; // starts empty, will keep track of the bucket's left-right position as a #
	
	this.y = y; // starts empty, will keep track of the bucket's up-down position as a #
	this.width = 100; // keep track of bucket's width
	this.height = 100; // keep track of bucket's height
	this.item_on_page; // represents bucket's physical presence on the screen
	/** 
	*	The create method does lots of things when the bucket gets created on the page
	*/
	this.create = function(){
		// make a section tag in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("section");
		// give it a class which styles it in CSS to resemble a bucket
		this.item_on_page.className = "bucket";
		this.item_on_page.style.width = this.width + "px";
		this.item_on_page.style.height = this.height + "px";
		this.item_on_page.style.backgroundColor = "rgba(51,53,153,.5)";
		this.item_on_page.style.position = "absolute";
		this.item_on_page.style.borderBottomLeftRadius = "25px";
		this.item_on_page.style.borderBottomRightRadius = "25px";
		// use those x and y coordinates in the CSS to position the bucket:
		this.setpos()
		// attach the item to our HTML hierarchy, as a child of the body:
		document.getElementsByTagName("body")[0].appendChild(this.item_on_page);
	}
	/** 
	*   The destroy function does lots of cleaning up when a bucket is removed from the page
	*/
	this.destroy = function(){
		// clear all splashing images first
		for (var j = 0; j < document.getElementsByClassName("splash").length; j++){
			var thatsplash = document.getElementsByClassName("splash")[j];
			document.getElementsByTagName("body")[0].removeChild(thatsplash);
		}
		// create an image to hold a splash animation
		var newsplash = document.createElement("img");
		// set its source and other styling
		newsplash.src = "img/splash-anim.gif?"+Math.random();
		newsplash.className = "splash";
		newsplash.style.position = "absolute";
		newsplash.style.left = this.x+"px";
		newsplash.style.top = this.y+"px";
		// attach the splashing image to our HTML hierarchy
		document.getElementsByTagName("body")[0].appendChild(newsplash);
		// remove this bucket from the array. First look up and store the current bucket's index # in the array
		var this_buckets_index_num = bucketArray.indexOf(this);
		// remove exactly one bucket from the array, starting at the current bucket's index number
		bucketArray.splice(this_buckets_index_num,1);
		// remove it from the page
		document.getElementsByTagName("body")[0].removeChild(this.item_on_page);
	}
	// the setpos function takes the x, y properties stored with the object, and applies them to the CSS styling left & top properties
	this.setpos = function(){
		// apply the current x and y properties to the CSS to position the item:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
	}
	
} //close the Bucket class