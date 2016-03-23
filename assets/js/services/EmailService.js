app.service("EmailService", ["$http", "$state", function($http, $state) {
	var self = this;
	var fromHeader = "FROM:Realm@somedomain.com\r\n";
	var htmlHeaders = "MIME-Version: 1.0\r\n";
	htmlHeaders += "Content-type: text/html\r\n";

	self.sendEmail = function(email, html) {
		if (email.headers === undefined) {
			email.headers = fromHeader;
		} else {
			email.headers += fromHeader;
		}
		if (html) {
			email.headers += htmlHeaders;
		}
		var data = {
			to: email.to,
			subject: email.subject,
			message: email.message,
			headers: email.headers,
			parameters: email.parameters
		};
		$http.post("assets/php/sendEmail.php", data).success(function(response) {
			if (response === "success") {
				console.log(response);
				//show email sent
				return response;
			} else {
				console.log("failed to send email");
				//show fail email send
			}
		}).error(function(error) {
			console.error(error);
		});
	};
}])