import * as React from 'react';
import * as CST from 'ts/common/constants';
import awsCognitoUtil from 'ts/common/awsCognitoUtil';
import { SDivFlexCenter } from '../_styled';
import { SCard, SCardList, SCardTitle, SInput } from './_styled';

interface IProps {
	updateSignIn: () => void;
}
interface IState {
	account: string;
	password: string;
	loginError: string;
	email: string;
	loading: boolean;
	confirm: boolean;
	confirmMsg: string;
}

export default class SignUpCard extends React.Component<IProps, IState>{
	constructor(props: any) {
		super(props);
		this.state = {
			account: '',
			password: '',
			loginError: '',
			email: '',
			loading: false,
			confirm: false,
			confirmMsg: '',
		};
	}

	private handleAccountChange = (acc: string) => this.setState({
		account: acc
	});

	private handleEmailChange = (email: string) => this.setState({
		email: email
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

	private handleConfirmChange = (msg: string) => this.setState({
		confirmMsg: msg
	});
	
	private handleSignUp = () => {
		this.setState({ confirm: true });
		awsCognitoUtil.emailSignUp(this.state.email, this.state.account, this.state.password).catch(error => {
			this.setState({
				loginError: error,
				loading: false,
				confirm: false,
			});
		});
	};

	private handleKeyPress = (key: string) => {
		if (key === 'Enter') {
			this.setState({ confirm: true });
			awsCognitoUtil.emailSignUp(this.state.email, this.state.account, this.state.password).catch(error => {
				this.setState({
					loginError: error,
					loading: false,
					confirm: false,
				});
			});
		}
	};

	private handleConfirm = () => {
		this.setState({ loading: true });
		awsCognitoUtil.confirmation(this.state.account, this.state.confirmMsg).catch(error => {
			this.setState({
				loginError: error,
				loading: false,
				confirm: false,
			});
		});
		this.props.updateSignIn();
	};

	public render() {
		const { account, password, loginError, loading, email, confirm, confirmMsg } = this.state;
		return (
			<SCard
				title={<SCardTitle>Sign Up</SCardTitle>}
				width="460px"
				margin="200px 0 0 0"
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
									<span className="title">EMAIL</span>
									<SInput
										placeholder="EMAIL"
										width="280px"
										value={email}
										onChange={e => this.handleEmailChange(e.target.value)}
									/>
								</li>
								<li
									className={'input-line no-bg' + (loading ? ' input-disabled' : '')}
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
											onClick={this.handleSignUp}
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
								{loginError ? (
									<li className="error-line no-bg">{loginError}</li>
								) : null}
								{confirm ? (
									<SCard
										title={<SCardTitle>Confirm</SCardTitle>}
										width="460px"
										margin="200px 0 0 0"
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
															<span className="title">CONFIRM</span>
															<SInput
																placeholder="CONFIRM"
																width="280px"
																value={confirmMsg}
																onChange={e => this.handleConfirmChange(e.target.value)}
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
																	onClick={this.handleConfirm}
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
													</ul>
												</div>
											</SCardList>
										</SDivFlexCenter>
									</SCard>
								) : null}
							</ul>
						</div>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
