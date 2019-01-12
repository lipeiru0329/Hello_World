// import AWS from 'aws-sdk'; // Tried 'aws-sdk/dist/aws-sdk' too
// import AWSCognito from 'amazon-cognito-identity-js'; // Tried var cognito = ... too
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
// import AmazonCognitoIdentity from 'amazon-cognito-identity-js';

class AwsCognitoUtil {

	/**********************************************************
	 *
	 * authentication
	 *
	 **********************************************************/
	private translateFirebaseError(errorCode: string, errorMessage: string): string {
		switch (errorCode) {
			case 'auth/user-not-found':
				return 'Invalid user. Please sign up or log in by other method.';
			case 'auth/wrong-password':
				return 'Invalid password. Please try again.';
			case 'auth/weak-password':
				return 'Password too weak. Please try again.';
			case 'auth/email-already-in-use':
			case 'auth/account-exists-with-different-credential':
				return 'Already signed up. Please log in via the correct method.';
			case 'auth/invalid-email':
				return 'Invalid email. Please try again.';
			default:
				return errorMessage;
		}
	}

	public async emailSignIn(email: string, password: string) {
		try {
			let authenticationData = {
				Username: email,
				Password: password,
			};
			let authenticationDetails = new AuthenticationDetails(authenticationData);
			let poolData = {
				UserPoolId: 'ap-southeast-1_BCTyosFcw', // Your user pool id here
				ClientId: '7o0kggco7e0i3ch07k2uu41sc4' // Your client id here
			};
			let userPool = new CognitoUserPool(poolData);
			let userData = {
				Username: email,
				Pool: userPool
			};
			var cognitoUser = new CognitoUser(userData);
			cognitoUser.authenticateUser(authenticationDetails, {
				onSuccess: function (result) {
					console.log('access token + ' + result.getAccessToken().getJwtToken());
				},

				onFailure: function (err) {
					alert(err);
				},

			});
			return '';
		} catch (error) {
			return this.translateFirebaseError(error.code, error.message);
		}
	}

	public async emailSignUp(email: string, username: string, password: string) {
		try {
			let poolData = {
				UserPoolId: 'ap-southeast-1_BCTyosFcw', // Your user pool id here
				ClientId: '208rasf776qcbbfbuh4mmkq7tv' //Your client id here
			};

			var userPool = new CognitoUserPool(poolData);

			var attributeList = [];

			var dataEmail = {
				Name: 'email',
				Value: email
			};

			var dataPhoneNumber = {
				Name: 'phone_number',
				Value: '+15555555555'
			};
			var attributeEmail = new CognitoUserAttribute(dataEmail);
			var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

			attributeList.push(attributeEmail);
			attributeList.push(attributePhoneNumber);

			userPool.signUp(username, password, attributeList, [], function (err, result) {
				if (err) {
					console.log(err);
					alert(err);
					return;
				}
				if (result) {
					const cognitoUser = result.user;
					console.log('user name is ' + cognitoUser.getUsername());
				}
				return null;
			});
			return null;
		} catch (error) {
			return this.translateFirebaseError(error.code, error.message);
		}
	}

	public async confirmation(username: string, confirmString: string) {
		try {
			let poolData = {
				UserPoolId: 'ap-southeast-1_BCTyosFcw', // Your user pool id here
				ClientId: '208rasf776qcbbfbuh4mmkq7tv' //Your client id here
			};
		 
			var userPool = new CognitoUserPool(poolData);
			var userData = {
				Username : username,
				Pool : userPool
			};
		 
			var cognitoUser = new CognitoUser(userData);
			cognitoUser.confirmRegistration(confirmString, true, function(err, result) {
				if (err) {
					alert(err);
					return;
				}
				console.log('call result: ' + result);
			});
			return null;
		} catch (error) {
			return this.translateFirebaseError(error.code, error.message);
		}
	}

	public signOut() {
		let poolData = {
			UserPoolId: 'ap-southeast-1_BCTyosFcw', // Your user pool id here
			ClientId: '7o0kggco7e0i3ch07k2uu41sc4' // Your client id here
		};
		var userPool = new CognitoUserPool(poolData);
		var cognitoUser = userPool.getCurrentUser();
		if (cognitoUser != null) {
			return cognitoUser.signOut();
		}
		else
			return null;

	}
	/**********************************************************
	 *
	 * fetch bot data
	 *
	 **********************************************************/
}

const awsCognitoUtil = new AwsCognitoUtil();
export default awsCognitoUtil;
