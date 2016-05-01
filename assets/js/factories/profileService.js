app.factory('profileService', function() {
	var data = {};
	function set(info) {
		data = info;
	};

	function get() {
		return data;
	};

	return {
		set: set,
		get: get
	};
});