/*STATS*/
	
var nbPosts = 20;
function postsStats(){
	var friends = {};
	var name = "Steven Luong";
	friends[name]={"name":name,"nb":1};
	FB.api('/me?fields=posts.limit('+nbPosts+')', function(response) {
		//console.log(JSON.stringify(response.posts.data.count));
		//console.log(response.posts);
		_.each(response.posts.data,function(post){
			//console.log(post.likes.data);
			_.each(post.likes.data,function(friend){
				//console.log(friend.name);
				//var tmp=_.where(friends,{"name":friend.name});
				var name = friend.name
				//console.log(friends[name]);
				if(_.has(friends,name)){
					friends[name]["nb"]++;
				}else{
					friends[name] = {"name":name,"nb":1};	
				};
			//friends[friend.name]?friends[friend.name]++:friends[friend.name]=1;
			});
		});
		//console.log(response.posts.data.length);
		var friendsTab = _.map(friends,function(value,key){
			return {"name":value["name"],"nb":value["nb"]};
		});
		var sortedFriendsTab = _.sortBy(friendsTab,function(friend){return -friend["nb"]});
		_.each(sortedFriendsTab,function(friend){
			$("#order").append(friend["name"]+" - "+friend["nb"]+"<br/>");
		});
		//console.log(sortedFriendsTab);
		/*var sortedFriendsMap = _.object(_.map(sortedFriendsTab, function(friend){
		  return [friend["nb"],friend["name"]];
		  }));
		  console.log(sortedFriendsMap);
		  */
	})
}


/* LOGIN */
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	//console.log('statusChangeCallback');
	//console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		testAPI();
		postsStats();
		$("#login-button").hide();
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log ' +
			'into this app.';
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		document.getElementById('status').innerHTML = 'Please log ' +
			'into Facebook.';
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	$('#nbPosts').html(nbPosts);
	FB.init({
		appId      : '394479884078532',
	cookie     : true,  // enable cookies to allow the server to access 
	// the session
	xfbml      : true,  // parse social plugins on this page
	version    : 'v2.3' // use version 2.2
	});

	// Now that we've initialized the JavaScript SDK, we call 
	// FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to
	// the callback you provide.  They can be:
	//
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into
	//    your app or not.
	//
	// These three cases are handled in the callback function.

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});

};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_GB/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
	//console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
		console.log('user : ' + response.name);
		document.getElementById('status').innerHTML =
		'Welcome ' + response.name + ' !';
	});
}
