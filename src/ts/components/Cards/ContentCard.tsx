import { Divider, Radio } from 'antd';
import { Icon, notification } from 'antd';
// import { Icon } from 'antd';
import { Table } from 'antd';
import { Input } from 'antd';
import * as React from 'react';
import * as CST from 'ts/common/constants';
import ContractWrapper from '../../../../../astContractWrapper/src/ContractWrapper';
// import util from '../../../../../astContractWrapper/src/util';
// import ContractWrapper from '../../../../../astContractWrapper/src/ContractWrapper';
import Web3Wrapper from '../../../../../astContractWrapper/src/Web3Wrapper';
import dynamoUtil from '../../../../../coinTrust/src/utils/dynamoUtil';
// import httpUtil from '../../../../../coinTrust/src/utils/httpUtil';
import { SDivFlexCenter } from '../_styled';
import { SButton, SCard, SCardList, SCardTitle, SInput } from './_styled';

const contractAbi = require('../../../../../astContractWrapper/src/static/AST.json');

export const web3Wrapper = new Web3Wrapper(window, 'https://kovan.infura.io');
export const contractWrapper = new ContractWrapper(web3Wrapper, contractAbi.abi, CST.CONTRACT_ADDR);
// .contractWrapper = new ContractWrapper(web3Wrapper, contractAbi.abi, CST.CONTRACT_ADDR);
const openNotification = (e?: string) => {
	notification.open({
		message: 'Notification Title',
		description: e || 'Thanks for your report',
		icon: <Icon type="smile" style={{ color: '#108ee9' }} />
	});
};
// const { Option } = Select;
// const Dragger = Upload.Dragger;
interface IProps {
	userId: string;
	data: any;
	showItem: string;
}
interface IState {
	address: string;
	pictures: any;
	text: string;
	chain: string;
	approve: number;
	amount: number;
	toAddreses: string;
	stakeAmt: number;
	score: number;
	repos: string;
}
const { TextArea } = Input;

// Configure AWS with your access and secret key. I stored mine as an ENV on the server
// ie: process.env.ACCESS_KEY_ID = "abcdefg"

// const { TextArea } = Input;
const config = require(`ts/key/admin.json`);
dynamoUtil.init(config);

// const openNotification = (e?: string) => {
// 	notification.open({
// 		message: 'Notification Title',
// 		description: e || 'Thanks for your report',
// 		icon: <Icon type="smile" style={{ color: '#108ee9' }} />
// 	});
// };
// const { Option } = Select;
// const Dragger = Upload.Dragger;

export default class ContentCard extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			address: '',
			text: '',
			pictures: [],
			chain: '',
			approve: 0,
			amount: 0,
			toAddreses: '0x0',
			stakeAmt: 0,
			score: 0,
			repos: ''
		};
	}

	private handleTextChange = (e: any) => {
		this.setState({ text: e.target.value });
	};

	private handleApproveChange = (am: string) => {
		this.setState({ approve: Number(am) });
	};

	private handleAmountChange = (am: string) => {
		this.setState({ amount: Number(am) });
	};

	private handleToAddrChange = (addr: string) => {
		this.setState({ toAddreses: addr });
	};

	private handleStakeChange = (amt: string) => {
		this.setState({ stakeAmt: Number(amt) });
	};

	private approve = () => {
		console.log((window as any).web3.currentProvider);
		web3Wrapper.erc20Approve(
			CST.CONTRACT_ADDR,
			CST.PLATFORM_ADDR,
			(window as any).web3.currentProvider.selectedAddress,
			this.state.approve
		);
	};

	private parseScore = () => {
		const { address, score } = this.state;
		const { userId, data, showItem } = this.props;
		console.log({
			address: address,
			verifierId: userId,
			timestamp: 123367890,
			score: score
		});
		dynamoUtil.addScore({
			address:
				data && data.length > Number(showItem) ? data[Number(showItem)].address : '0x00',
			verifierId: (window as any).web3.currentProvider.selectedAddress,
			timestamp: 123367890,
			score: score
		});
	};

	private stakeToken = () => {
		contractWrapper.stake(
			(window as any).web3.currentProvider.selectedAddress,
			this.state.stakeAmt
		);
	};

	private transferToken = () => {
		web3Wrapper.erc20Transfer(
			CST.CONTRACT_ADDR,
			(window as any).web3.currentProvider.selectedAddress,
			this.state.toAddreses,
			this.state.amount
		);
	};

	private handleScoreChange = (e: any) => {
		this.setState({
			score: Number(e)
		});
	};

	private query = async () => {
		// const response = await httpUtil.get(
		// 	'http://localhost:3000/?userId=id2&address=0x11B73358799D057D195fCeC8B93C70E54E39da27&chain=ETH'
		// );
		// this.setState({
		// 	repos: response
		// });
		// console.log(this.state.address);
		console.log('123');
	};

	private handleAddressChange = (add: string) => {
		this.setState({ address: add });
	};

	private handleSubmit = () => {
		// const { userId } = this.props;
		const { chain } = this.state;
		const { text, address } = this.state;
		console.log(text);
		console.log({
			userId: 'userId',
			address: address,
			description: text,
			link: 'a',
			twitter: 'a',
			chain: chain
		});
		dynamoUtil
			.addPendingAddress({
				userId: 'userId',
				address: address,
				description: text,
				link: 'a',
				twitter: 'a',
				chain: chain
			})
			.then(openNotification() as any);
	};
	public render() {
		const { data, showItem } = this.props;
		const { address, approve, amount, toAddreses, stakeAmt, score, repos } = this.state;
		const list: any[] = [];
		if (data && data.length > Number(showItem)) {
			list.push(data[Number(showItem)]);
			console.log(data);
		}
		const columns = [
			{
				title: 'address',
				dataIndex: 'address',
				key: 'address',
				render: (add: any) => <a href="">{add}</a>
			},
			{ title: 'chain', dataIndex: 'chain', key: 'chain' },
			{ title: 'description', dataIndex: 'description', key: 'description' },
			{ title: 'link', dataIndex: 'link', key: 'link' },
			{ title: 'twitter', dataIndex: 'twitter', key: 'twitter' },
			{ title: 'userId', dataIndex: 'userId', key: 'userId' },
			{
				title: 'Action',
				key: 'action',
				render: () => (
					<span>
						<SInput
							right
							placeholder="amount"
							style={{ height: '30px', color: 'black' }}
							width="50%"
							value={score}
							onChange={e => this.handleScoreChange(e.target.value)}
						/>
						<Divider type="vertical" />
						<a onClick={this.parseScore}>Confirm</a>
					</span>
				)
			}
		];
		return (
			<SCard
				title={
					<SCardTitle style={{ color: 'black' }}>
						{`Report Address ${
							data && data.length > Number(showItem)
								? data[Number(showItem)].chain
								: '-'
						}`}
					</SCardTitle>
				}
				style={{ height: 'auto', width: '100%' }}
			>
				<Table columns={columns} dataSource={list} />
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardList>
						<SDivFlexCenter horizontal width="100%">
							<li>
								{data && data.length > Number(showItem)
									? data[Number(showItem)].address
									: '-'}{' '}
							</li>
							<Radio.Group
								defaultValue="a"
								buttonStyle="solid"
								style={{ marginLeft: 3 }}
							>
								<Radio.Button value="a" style={{ width: 53 }}>
									fade
								</Radio.Button>
								<Radio.Button value="b" style={{ width: 53 }}>
									true
								</Radio.Button>
							</Radio.Group>
						</SDivFlexCenter>
						<TextArea
							rows={4}
							placeholder="Please type in your description"
							onChange={(e: any) => this.handleTextChange(e)}
						/>
						<SDivFlexCenter horizontal width="100%" padding="10px">
							<SButton
								onClick={() =>
									this.setState({
										address: '',
										pictures: []
									})
								}
								width="49%"
							>
								Reset
							</SButton>
							<SButton width="49%" onClick={this.handleSubmit}>
								Submit
							</SButton>
						</SDivFlexCenter>
						<SDivFlexCenter horizontal width="100%" padding="10px">
							<SInput
								right
								placeholder="toAddres"
								style={{ height: '30px', color: 'black' }}
								width="60%"
								value={toAddreses}
								onChange={e => this.handleToAddrChange(e.target.value)}
							/>
							<SInput
								right
								placeholder="amount"
								style={{ height: '30px', color: 'black' }}
								width="20%"
								value={amount}
								onChange={e => this.handleAmountChange(e.target.value)}
							/>
							<SButton width="20%" onClick={this.transferToken}>
								Transfer
							</SButton>
						</SDivFlexCenter>

						<SDivFlexCenter horizontal width="100%" padding="10px">
							<SInput
								right
								placeholder="Approve Amount"
								style={{ height: '30px', color: 'black' }}
								width="80%"
								value={approve}
								onChange={e => this.handleApproveChange(e.target.value)}
							/>
							<SButton width="20%" onClick={this.approve}>
								Approve
							</SButton>
						</SDivFlexCenter>
						<SDivFlexCenter horizontal width="100%" padding="10px">
							<SInput
								right
								placeholder="stakeAmount"
								style={{ height: '30px', color: 'black' }}
								width="80%"
								value={stakeAmt}
								onChange={e => this.handleStakeChange(e.target.value)}
							/>
							<SButton width="20%" onClick={this.stakeToken}>
								Stake
							</SButton>
						</SDivFlexCenter>
						<SDivFlexCenter horizontal width="100%" padding="10px">
							<SInput
								right
								placeholder="Address"
								style={{ height: '30px', color: 'black' }}
								width="80%"
								value={address}
								onChange={e => this.handleAddressChange(e.target.value)}
							/>
							<SButton width="20%" onClick={this.query}>
								Query
							</SButton>
							<li>{repos}</li>
						</SDivFlexCenter>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
