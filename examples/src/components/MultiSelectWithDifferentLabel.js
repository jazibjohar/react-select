import React from 'react';
import Select from 'smb-react-selection';

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

const WHY_WOULD_YOU = [
	{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

const inputRender = (values) => {
  if (!values) {
    return null;
  }
  const splitLen = values.split(',');
  return `${splitLen.length}`;
};

var MultiSelectWithDifferentLabel = React.createClass({
	displayName: 'MultiSelectWithDifferentLabel',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			disabled: false,
			crazy: false,
			options: FLAVOURS,
			value: [],
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	toggleDisabled (e) {
		this.setState({ disabled: e.target.checked });
	},
	toggleChocolate (e) {
		let crazy = e.target.checked;
		this.setState({
			crazy: crazy,
			options: crazy ? WHY_WOULD_YOU : FLAVOURS,
		});
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue disabled={this.state.disabled} value={this.state.value} placeholder="Select your favourite(s)" options={this.state.options} onChange={this.handleSelectChange} showSelectedCount={true} valueRenderer={() => inputRender(this.state.value)} />
				<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.disabled} onChange={this.toggleDisabled} />
						<span className="checkbox-label">Disable the control</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.crazy} onChange={this.toggleChocolate} />
						<span className="checkbox-label">I don't like Chocolate (disabled the option)</span>
					</label>
				</div>
			</div>
		);
	}
});

module.exports = MultiSelectWithDifferentLabel;