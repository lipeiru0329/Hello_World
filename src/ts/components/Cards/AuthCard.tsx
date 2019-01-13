import * as React from 'react';
import awsCognitoUtil from 'ts/common/awsCognitoUtil';
import * as CST from 'ts/common/constants';
import { ColorStyles } from 'ts/common/styles';

import { SDivFlexCenter } from '../_styled';
import { SCard, SCardList, SCardTitle, SInput } from './_styled';

interface IProps {
	showSignUp: (e: boolean) => void;
	updateSignIn: (e: boolean) => void;
	updateUserId: (e: string) => void;
}

interface IState {
	account: string;
	password: string;
	loginError: string;
	loading: boolean;
}

export default class AuthCard extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			account: '',
			password: '',
			loginError: '',
			loading: false
		};
	}

	private handleAccountChange = (acc: string) =>
		this.setState({
			account: acc
		});

	private handlePasswordChange = (pass: string) =>
		this.setState({
			password: pass
		});

	private handleClear = () =>
		this.setState({
			account: '',
			password: '',
			loginError: ''
		});

	private signUp = () => {
		const { showSignUp } = this.props;
		console.log('123');
		showSignUp(true);
	};

	private handleSignIn = () => {
		const { updateSignIn, updateUserId } = this.props;
		this.setState({ loading: true });
		awsCognitoUtil.emailSignIn(this.state.account, this.state.password).catch(error => {
			console.log(error);
			this.setState({
				loginError: error,
				loading: false
			});
		});
		updateSignIn(true);
		updateUserId(this.state.account);
	};

	private handleKeyPress = (key: string) => {
		const { updateSignIn, updateUserId } = this.props;
		if (key === 'Enter') {
			this.setState({ loading: true });
			awsCognitoUtil.emailSignIn(this.state.account, this.state.password).catch(error => {
				console.log(error);
				this.setState({
					loginError: error,
					loading: false
				});
			});
			updateSignIn(true);
			updateUserId(this.state.account);
		}
	};

	public render() {
		const { account, password, loginError, loading } = this.state;
		return (
			<SCard
				title={<SCardTitle>{CST.TH_LOGIN}</SCardTitle>}
				width="460px"
				margin="200px 0 0 0"
				className="SSCard"
				style={{ background: ColorStyles.CardBackgroundDarkSolid }}
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardList>
						<div className="status-list-wrapper">
							<ul>
								<li
									className={
										'input-line no-bg' + (loading ? ' input-disabled' : '')
									}
								>
									<span className="title">{CST.TH_ACCOUNT}</span>
									<SInput
										placeholder={CST.TH_ACCOUNT_PH}
										width="280px"
										value={account}
										onChange={e => this.handleAccountChange(e.target.value)}
									/>
								</li>
								<li
									className={
										'input-line no-bg' + (loading ? ' input-disabled' : '')
									}
								>
									<span className="title">{CST.TH_PASSWORD}</span>
									<SInput
										type="password"
										placeholder={CST.TH_PASSWORD_PH}
										width="280px"
										value={password}
										onKeyPress={e => this.handleKeyPress(e.key)}
										onChange={e => this.handlePasswordChange(e.target.value)}
									/>
								</li>
								<li>
									<SDivFlexCenter
										horizontal
										width="100%"
										padding="0"
										marginTop="10px"
									>
										<button
											className="form-button"
											onClick={this.handleSignIn}
											disabled={loading}
										>
											{CST.TH_SUBMIT.toUpperCase()}
										</button>

										<button
											className="form-button"
											onClick={this.handleClear}
											disabled={loading}
										>
											{CST.TH_CLEAR.toUpperCase()}
										</button>
									</SDivFlexCenter>
								</li>
								<li>
									Do not have an account, please{' '}
									<button onClick={() => this.signUp()}>Sign Up</button>
								</li>
								{loginError ? (
									<li className="error-line no-bg">{loginError}</li>
								) : null}
							</ul>
						</div>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
