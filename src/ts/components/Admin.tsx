import { Layout } from 'antd';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SContent } from './_styled';
import SignUpCard from './Cards/SignUpCard';

export interface IAdminProps {
	signedIn: boolean;
	updateSignIn: () => void;
}

export default class Admin extends React.PureComponent<IAdminProps> {
	constructor(props: IAdminProps) {
		super(props);
	}
	public render() {
		const { signedIn, updateSignIn  } = this.props;
		return (
			<Layout>
				{signedIn ? (
					<Layout>
						<SContent>
							<Switch>
								<Route render={() => <div>Signed In</div>} />
							</Switch>
						</SContent>
					</Layout>
				) : (
						<Layout>
							<SContent>
								<SignUpCard updateSignIn={updateSignIn}/>
							</SContent>

						</Layout>
					)}
			</Layout>
		);
	}
}

