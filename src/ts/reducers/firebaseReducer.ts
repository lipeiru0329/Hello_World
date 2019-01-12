import { AnyAction } from 'redux';
import * as CST from 'ts/common/constants';
import { IFirebaseState } from 'ts/common/types';

export const initialState = { [CST.AC_AUTH]: false, [CST.AC_SIGNUP]: false, [CST.AC_USERID]: '' };

export function firebaseReducer(
	state: IFirebaseState = initialState,
	action: AnyAction
): IFirebaseState {
	switch (action.type) {
		case CST.AC_AUTH:
			return action[CST.AC_AUTH]
				? Object.assign({}, state, { [CST.AC_AUTH]: action[CST.AC_AUTH] })
				: initialState;
		case CST.AC_SIGNUP:
			return action[CST.AC_SIGNUP]
				? Object.assign({}, state, {
						[CST.AC_SIGNUP]: action[CST.AC_SIGNUP]
				  })
				: initialState;
		case CST.AC_USERID:
			return action[CST.AC_USERID]
				? Object.assign({}, state, {
						[CST.AC_USERID]: action[CST.AC_USERID]
				  })
				: initialState;
		default:
			return state;
	}
}
