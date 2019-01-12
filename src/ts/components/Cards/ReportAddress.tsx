import { Radio } from 'antd';
// import { Icon } from 'antd';
import { Input } from 'antd';

import * as React from 'react';
import ImageUploader from 'react-images-upload';
// import awsCognitoUtil from 'ts/common/awsCognitoUtil';
// import * as CST from 'ts/common/constants';
import { SDivFlexCenter } from '../_styled';
import { SButton, SCard, SCardList, SCardTitle, SInput } from './_styled';

const { TextArea } = Input;

// const { Option } = Select;
// const Dragger = Upload.Dragger;

interface IState {
	address: string;
	pictures: any;
	text: string;
}

export default class ReportAddress extends React.Component<{}, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			address: '',
			text: '',
			pictures: []
		};
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

	private handleTextChange = (e: string) => {
		this.setState({
			text: e
		});
	};
	private onDrop = (pictureFiles: any) => {
		console.log(pictureFiles);
		this.setState({
			pictures: this.state.pictures.concat(pictureFiles)
		});
	};

	private handleAddressChange = (add: string) => {
		this.setState({
			address: add
		});
	};

	private handleSubmit = () => {
		console.log("test");
	}

	public render() {
		// const { account, password, loginError, loading } = this.state;
		// const { getFieldDecorator } = this.props.form;
		const { address, text } = this.state;
		// const { previewVisible, previewImage, fileList } = this.state;
		// const uploadButton = (
		// 	<div>
		// 		<Icon type="plus" />
		// 		<div className="ant-upload-text">Upload</div>
		// 	</div>
		// );
		return (
			<SCard
				title={<SCardTitle style={{ color: 'black' }}>Report Address</SCardTitle>}
				margin="200px 0 0 0"
				style={{ height: 'auto', width: 600 }}
			>
				<SDivFlexCenter horizontal padding="0 10px">
					<SCardList>
						<SDivFlexCenter horizontal style={{ marginTop: '5px' }}>
							<SCardList noMargin>
								<div className="status-list-wrapper">
									<ul>
										<li style={{ padding: '5px 5px' }}>
											<span className="title" style={{ color: 'black' }}>
												Report Address
											</span>
										</li>
									</ul>
								</div>
							</SCardList>
						</SDivFlexCenter>
						<SDivFlexCenter horizontal width="100%">
							<SInput
								right
								placeholder="Address"
								style={{ height: '30px', color: 'black' }}
								width="80%"
								value={address}
								onChange={e => this.handleAddressChange(e.target.value)}
							/>
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
						<ImageUploader
							withIcon={true}
							buttonText="Choose images"
							onChange={(e: any) => this.onDrop(e)}
							imgExtension={['.jpg', '.gif', '.png', '.gif']}
							maxFileSize={5242880}
							withPreview={true}
							label={'accepted: jpg, gif, png'}
							style={{ width: 550 }}
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
							<SButton
								style={{
									opacity: Number(text && address) === 0 ? 0.3 : 1
								}}
								width="49%"
								onClick={this.handleSubmit}
							>
								Submit
							</SButton>
						</SDivFlexCenter>
					</SCardList>
				</SDivFlexCenter>
			</SCard>
		);
	}
}
