import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as awsCognitoAction from 'ts/actions/awsCognitoAction';
import { IState } from 'ts/common/types';
import Admin from 'ts/components/Admin';
function mapStateToProps(state: IState) {
	return { signedIn: state.firebase.auth, signUp: state.firebase.signup };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IState, undefined, AnyAction>) {
	return {
		updateSignIn: (e: boolean) => dispatch(awsCognitoAction.authUpdate(e)),
		showSignUp: (e: boolean) => dispatch(awsCognitoAction.signUpUpdate(e))
	};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin);
