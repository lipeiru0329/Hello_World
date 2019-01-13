import { Radio } from 'antd';
// import { Icon } from 'antd';
import { Table } from 'antd';
import { Input } from 'antd';
import { Icon, notification } from 'antd';
import * as React from 'react';
// import ContractWrapper from '../../../../../astContractWrapper/src/ContractWrapper';
import Web3Wrapper from '../../../../../astContractWrapper/src/Web3Wrapper';
import dynamoUtil from '../../../../../coinTrust/src/utils/dynamoUtil';
// import * as CST from 'ts/common/constants';
import { SDivFlexCenter } from '../_styled';
import { SButton, SCard, SCardList, SCardTitle, SInput } from './_styled';
export const web3Wrapper = new Web3Wrapper(window, 'https://kovan.infura.io');
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
		this.state = { address: '', text: '', pictures: [], chain: '', approve: 0 };
	}

	// private normFile = (e: any) => {
	// 	console.log('Upload event:', e);
	// 	// if (Array.isArray(e)) {
	// 	// 	return e;
	// 	// }
	// 	// return e && e.fileList;
	// };

	// private handleCancel = () => this.setState({ previewVisible: false });

	// private handlePreview = (file: any) => {
	// 	this.setState({
	// 		previewImage: file.url || file.thumbUrl,
	// 		previewVisible: true
	// 	});
	// };

	private handleTextChange = (e: any) => {
		this.setState({ text: e.target.value });
	};

	private handleApproveChange = (am: string) => {
		this.setState({
			approve: Number(am)
		});
	};

	private approve = () => {
		web3Wrapper.erc20Approve(
			'0x8CDB3126a6eB2781A0a766E27DE1dE5c592bf096',
			'0x08cb8054201a9FdfE63fbdB1b3028E12d284D0dD',
			this.state.approve
		);
	};

	private query = () => {
		console.log(this.state.address);
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
		const { address, approve } = this.state;
		const list: any[] = [];
		if (data) {
			list.push(data[Number(showItem)]);
			console.log(data);
		}
		const columns = [
			{
				title: 'address',
				dataIndex: 'address',
				key: 'address',
				render: (add: any) => <a href="javascript:;">{add}</a>
			},
			{ title: 'chain', dataIndex: 'chain', key: 'chain' },
			{ title: 'description', dataIndex: 'description', key: 'description' },
			{ title: 'link', dataIndex: 'link', key: 'link' },
			{ title: 'twitter', dataIndex: 'twitter', key: 'twitter' },
			{ title: 'userId', dataIndex: 'userId', key: 'userId' }
		];
		return (
			<SCard
				title={
					<SCardTitle style={{ color: 'black' }}>
						{`Report Address ${data ? data[Number(showItem)].chain : '-'}`}
					</SCardTitle>
				}
				style={{ height: 'auto', width: '100%' }}
			>
				<Table columns={columns} dataSource={list} />
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardList>
						<SDivFlexCenter horizontal width="100%">
							<li>{data ? data[Number(showItem)].address : '-'} </li>
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
								placeholder="Address"
								style={{ height: '30px', color: 'black' }}
								width="80%"
								value={address}
								onChange={e => this.handleAddressChange(e.target.value)}
							/>
							<SButton width="20%" onClick={this.query}>
								Query
							</SButton>
						</SDivFlexCenter>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
