import { Layout } from 'antd';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SContent } from './_styled';
import AuthCard from './Cards/AuthCard';
import ReportAddress from './Cards/ReportAddress';
// import AuthCard from './Cards/AuthCard';
import SignUpCard from './Cards/SignUpCard';

export interface IProps {
	signedIn: boolean;
	signUp: boolean;
	userId: string;
	updateSignIn: (e: boolean) => void;
	showSignUp: (e: boolean) => void;
	updateUserId: (e: string) => void;
}

export default class Admin extends React.PureComponent<IProps> {
	public render() {
		const { signedIn, updateSignIn, signUp, showSignUp, userId, updateUserId } = this.props;
		console.log(signedIn);
		return (
			<Layout>
				{signedIn ? (
					<Layout>
						<SContent>
							<Switch>
								<Route render={() => <ReportAddress userId={userId} />} />
							</Switch>
						</SContent>
					</Layout>
				) : signUp ? (
					<Layout>
						<SContent>
							<SignUpCard
								showSignUp={showSignUp}
								updateSignIn={updateSignIn}
								updateUserId={updateUserId}
							/>
						</SContent>
					</Layout>
				) : (
					<Layout>
						<SContent>
							<AuthCard
								showSignUp={showSignUp}
								updateSignIn={updateSignIn}
								updateUserId={updateUserId}
							/>
						</SContent>
					</Layout>
				)}
			</Layout>
		);
	}
}
