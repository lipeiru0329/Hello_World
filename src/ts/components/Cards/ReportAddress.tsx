import { Icon, Layout, Menu } from 'antd';
// import { Icon } from 'antd';
// import { Input } from 'antd';
// import { notification } from 'antd';
// import AWS from 'aws-sdk';
import * as React from 'react';
// import App from 'ts/components/Cards/App';
import dynamoUtil from '../../../../../coinTrust/src/utils/dynamoUtil';
import ContentCard from './ContentCard';

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
}

export default class ReportAddress extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = { collapsed: false, data: null, showItem: '0' };
	}

	public componentDidMount = async () => {
		const data = await dynamoUtil.getPendingAddress('userId');
		this.setState({ data: data });
		console.log(data);
	};
	private toggle = () => {
		this.setState({ collapsed: !this.state.collapsed });
	};

	private showItem = (ee: any) => {
		this.setState({ showItem: ee.key });
		console.log(ee.key);
	};

	public render() {
		const { userId } = this.props;
		const { showItem, data } = this.state;
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
