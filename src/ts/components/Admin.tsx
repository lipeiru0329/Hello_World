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
	updateSignIn: (e: boolean) => void;
	showSignUp: (e: boolean) => void;
}

export default class Admin extends React.PureComponent<IProps> {
	public render() {
		const { signedIn, updateSignIn, signUp, showSignUp } = this.props;
		return (
			<Layout>
				{!signedIn ? (
					<Layout>
						<SContent>
							<Switch>
								<Route render={() => <ReportAddress />} />
							</Switch>
						</SContent>
					</Layout>
				) : signUp ? (
					<Layout>
						<SContent>
							<SignUpCard updateSignIn={updateSignIn} />
						</SContent>
					</Layout>
				) : (
					<Layout>
						<SContent>
							<AuthCard showSignUp={showSignUp} updateSignIn={updateSignIn} />
						</SContent>
					</Layout>
				)}
			</Layout>
		);
	}
}
