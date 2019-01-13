import { Icon, Layout, Menu } from 'antd';
import { Tag } from 'antd';
// import { Icon } from 'antd';
// import { Input } from 'antd';
// import { notification } from 'antd';
// import AWS from 'aws-sdk';
import * as React from 'react';
// import App from 'ts/components/Cards/App';
import * as CST from 'ts/common/constants';
import dynamoUtil from '../../../../../coinTrust/src/utils/dynamoUtil';

import ContractWrapper from '../../../../../astContractWrapper/src/ContractWrapper';
import Web3Wrapper from '../../../../../astContractWrapper/src/Web3Wrapper';
import { SDivFlexCenter } from '../_styled';
import { SButton, SInput } from './_styled';

import ContentCard from './ContentCard';

const contractAbi = require('../../../../../astContractWrapper/src/static/AST.json');
export const web3Wrapper = new Web3Wrapper(window, 'https://kovan.infura.io');
export const contractWrapper = new ContractWrapper(web3Wrapper, contractAbi.abi, CST.CONTRACT_ADDR);

const { Header, Content, Sider } = Layout;

const config = require(`ts/key/admin.json`);
dynamoUtil.init(config);

interface IProps {
	userId: string;
}
interface IState {
	collapsed: boolean;
	data: any;
	showItem: string;
	userId12: string;
	token: number;
	stake: number;
}

export default class ReportAddress extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			collapsed: false,
			data: null,
			showItem: '0',
			userId12: '',
			token: 0,
			stake: 0
		};
	}

	public componentDidMount = async () => {
		const { userId } = this.props;
		console.log(userId);
		const data = await dynamoUtil.getPendingAddress(userId);
		this.setState({ data: data });
		console.log(data);
		const tokenBalnce = await web3Wrapper.getErc20Balance(
			CST.CONTRACT_ADDR,
			(window as any).web3.currentProvider.selectedAddress
		);
		this.setState({
			token: tokenBalnce
		});
	};
	private toggle = () => {
		this.setState({ collapsed: !this.state.collapsed });
	};

	private handleUserIdChange = (e: any) => {
		this.setState({ userId12: e });
	};

	private search = async () => {
		const { userId12 } = this.state;
		console.log(userId12);
		const data = await dynamoUtil.getPendingAddress(userId12);
		this.setState({ data: data });
		console.log('123');
	};

	private showItem = (ee: any) => {
		this.setState({ showItem: ee.key });
		console.log(ee.key);
	};

	public render() {
		const { userId } = this.props;

		const { showItem, data, userId12, token, stake } = this.state;
		const list: any[] = [];
		if (data)
			data.forEach((e: any, i: any) => {
				list.push(
					<Menu.Item key={i}>
						<Icon type="user" />
						<span>{e.address}</span>
					</Menu.Item>
				);
			});
		return (
			<Layout style={{ width: '100%', height: 1000 }}>
				<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
					<div className="logo" />
					<SDivFlexCenter horizontal width="100%" padding="10px">
						<SInput
							right
							placeholder="Approve Amount"
							style={{
								height: '30px',
								color: 'black',
								display: this.state.collapsed ? 'none' : 'block'
							}}
							value={userId12}
							onChange={e => this.handleUserIdChange(e.target.value)}
						/>
					</SDivFlexCenter>
					<SButton
						disable={userId12 === ''}
						onClick={this.search}
						style={{ display: this.state.collapsed ? 'none' : 'block' }}
					>
						Search by UserId
					</SButton>
					<Menu
						theme="dark"
						mode="inline"
						onSelect={(ee: any) => this.showItem(ee)}
						defaultSelectedKeys={['0']}
					>
						{list ? list : null}
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<Icon
							className="trigger"
							type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.toggle}
						/>
						<Tag color="#108ee9" style={{ marginLeft: 20 }}>
							Token Balance: {token}
						</Tag>
						<Tag color="#108ee9" style={{ marginLeft: 20 }}>
							Has Varified
						</Tag>
						<Tag color="#108ee9" style={{ marginLeft: 20 }}>
							Stake Amount: {stake}
						</Tag>
					</Header>
					<Content
						style={{
							margin: '24px 16px',
							padding: 24,
							background: '#fff',
							minHeight: 280
						}}
					>
						<ContentCard userId={userId} data={data} showItem={showItem} />
					</Content>
				</Layout>
			</Layout>
		);
	}
}
