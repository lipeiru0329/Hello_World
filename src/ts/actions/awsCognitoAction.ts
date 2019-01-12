import * as CST from 'ts/common/constants';

export function authUpdate(signedIn: boolean) {
	return {
		type: CST.AC_AUTH,
		[CST.AC_AUTH]: signedIn
	};
}

export function signUpUpdate(signUp: boolean) {
	return { type: CST.AC_SIGNUP, [CST.AC_SIGNUP]: signUp };
}

export function updateUserId(userId: string) {
	return {
		type: CST.AC_USERID, [CST.AC_USERID]: userId
	}
}
