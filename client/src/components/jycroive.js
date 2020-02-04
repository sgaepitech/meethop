import React, {Component} from 'react';
import { Transition } from 'react-transition-group';

export default class RegisterLogin extends Component {
	constructor() {
		super();
		this.state = {
			currentScreen: 'login',
			currentScreen: 'register'
		};
	}

	render() {
		const { currentScreen } = this.state;

		return(
			<div className="app-wrapper">
				<SignInScreen showLogin={this.showLogin} active={currentScreen === 'login'} />
				<RegistrationScreen showRegistration={this.showRegistration} active={currentScreen === 'register'} />
			</div>
		);
	}

	showLogin = () => {
		this.setState({ currentScreen: 'login' });
	}

	showRegistration = () => {
		this.setState({ currentScreen: 'register' });
	}
}

const getTransitionState = (props, newProps) => {
	const newState = {};
	if (props.active && !newProps.active) {
		newState.isTransitioningOut = true;
		newState.isTransitioningIn = false;
	} else if (!props.active && newProps.active) {
		newState.isTransitioningIn = true;
		newState.isTransitioningOut = false;
	}
	return newState;
}

class SignInScreen extends Component {
	constructor() {
		super();
		this.state = {
			isTransitioningIn: false,
			isTransitioningOut: false
		};
	}

	componentWillReceiveProps(newProps) {
		const newState = getTransitionState(this.props, newProps);

		this.setState(newState);
	}

	render() {
		const { active, showLogin } = this.props;
		const { isTransitioningIn, isTransitioningOut } = this.state;

		let classes = ['login__wrapper'];
		if (active) { classes.push('active'); }
		if (isTransitioningIn) { classes.push('transition-in'); }
		if (isTransitioningOut) { classes.push('transition-out'); }

		return (
			<div className={classes.join(' ')} onClick={showLogin}>
				<div className="fade-wrapper">
					<h2 className="form-title mb-4">Welcome back!</h2>
					<TextField id="email" label="Email" />
					<TextField id="password" type="password" label="Password" />
					<button className="w-100 btn btn-primary">Sign In</button>
					<a className="text-white d-inline-block mt-4" href="#">Recover your password</a>
				</div>
			</div>
		);
	}
}

class RegistrationScreen extends Component {
	constructor() {
		super();

		this.state = {
			goingBack: false,
			currentStep: 0,
			userType: null,
			isTransitioningIn: false,
			isTransitioningOut: false,
		};
	}

	componentWillReceiveProps(newProps) {
		const newState = getTransitionState(this.props, newProps);

		this.setState(newState);
	}

	render() {
		const { active, showRegistration } = this.props;
		const {
			currentStep,
			userType,
			goingBack,
			isTransitioningIn,
			isTransitioningOut } = this.state;

		const classes = ['registration__wrapper'];
		if (active) { classes.push('active'); }
		if (isTransitioningIn) { classes.push('transition-in'); }
		if (isTransitioningOut) { classes.push('transition-out'); }

		const duration = 150;

		const defaultStyle = {
			transition: `transform ${duration}ms ease-out`,
			transform: 'translateX(100%)',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%'
		}

		const transitionStyles = {
			entering: { transform: goingBack ? 'translateX(-100%)' : 'translateX(100%)' },
			entered:  { transform: 'translateX(0)' },
			exiting: { transform: goingBack ? 'translateX(100%)' : 'translateX(-100%)' }
		};

		const transitionWrapperStyle = {
			position: 'relative',
			overflow: 'hidden',
			height: '100%',
			width: 'calc(100% - 4rem)',
			position: 'absolute'
		};

		return (
			<div className={classes.join(' ')} onClick={showRegistration}>
				<h2 className="form-title mb-4 text-center">
					{currentStep < 2 && 'Register'}
					{currentStep === 2 && 'Registration Complete'}
				</h2>
				<div style={transitionWrapperStyle}>
				<Transition in={currentStep === 0} timeout={150} unmountOnExit>
					{(state) => (
						<div style={{ ...defaultStyle, ...transitionStyles[state] }}>
							<p>What are your advertising needs?</p>
							<div>
								<div>
									<Box label="Monetization" selected={userType === 'monetization'} onClick={() => { this.setUserType('monetization'); }}>
										Lorem ipsum dolor sit amet plurilam monetizitor buttonis
									</Box>
								</div>
								<div>
									<Box label="Brands &amp; Agencies" selected={userType === 'brands'} onClick={() => { this.setUserType('brands'); }}>
										Lorem ipsum dolor sit amet branditor und agencia sectionar
									</Box>
								</div>
								<div>
									<Box label="User Acquisition" selected={userType === 'ua'} onClick={() => { this.setUserType('ua'); }}>
										Lorem ipsum dolor sit amet acqisitur ut personis
									</Box>
								</div>
							</div>
							<div className="registration__footer text-right">
								<button disabled={userType == null} className="btn btn-outline-secondary mt-4" onClick={this.goToNextStep}>Continue</button>
							</div>
					</div>)}
				</Transition>
				<Transition in={currentStep === 1} timeout={150} unmountOnExit>
					{(state) => (
						<div style={{ ...defaultStyle, ...transitionStyles[state] }}>
							<h3 className="form-subtitle">{this.displayUserType()}</h3>
							<TextField id="reg_email" label="Email" />
							<div className="form-row">
								<div className="col">
									<TextField id="reg_name" label="First name" />
								</div>
								<div className="col">
									<TextField id="reg_last_name" label="Last name" />
								</div>
							</div>
							<div className="form-row">
								<div className="col">
									<TextField id="reg_company" label="Company" />
								</div>
								<div className="col">
									<TextField id="reg_phone" label="Phone number" />
								</div>
							</div>
							<hr />
							<div className="form-row mb-4">
								<div className="col">
									<label className="form-label">Region</label>
									<select className="custom-select">
										<option>EMEA</option>
										<option>North America</option>
										<option>LATAM</option>
										<option>APAC</option>
										<option>ANZ</option>
									</select>
								</div>
								<div className="col">
									<label className="form-label">Classification</label>
									<select className="custom-select">
										<option>Books</option>
										<option>Games</option>
										<option>Avocados</option>
									</select>
								</div>
							</div>
							<div className="registration__footer">
								<div className="row">
									<div className="col">
										<button className="btn btn-outline-secondary mr-2 mt-4" onClick={this.goToPreviousStep}>
											Go Back
										</button>
									</div>
									<div className="col text-right">
										<button className="btn btn-primary mt-4" onClick={this.goToNextStep}>Register</button>
									</div>
								</div>
							</div>
						</div>)}
				</Transition>
				<Transition in={currentStep === 2} timeout={150} unmountOnExit>
					{(state) => (
						<div style={{ ...defaultStyle, ...transitionStyles[state] }}>
							<div className="text-center">
								<p>Please look for a confirmation email in your inbox.</p>
								<button className="mt-5 btn btn-sm btn-light" onClick={this.reset}>Reset</button>
							</div>
						</div>)}
					</Transition>
				</div>
			</div>
		);
	}

	displayUserType = () => {
		const { userType } = this.state;
		if (userType === 'monetization') { return 'Monetization'; }
		if (userType === 'ua') { return 'User Acquisition'; }
		return 'Brands & Agencies';
	}

	reset = () => {
		this.setState({ currentStep: 0, goingBack: true });
	}

	setUserType = (userType) => {
		this.setState({ userType });
	}

	goToPreviousStep = () => {
		const { currentStep } = this.state;
		if (currentStep > 0) {
			this.setState({ currentStep: currentStep - 1, goingBack: true });
		}
	}

	goToNextStep = () => {
		const { currentStep } = this.state;
		if (currentStep < 2) {
			this.setState({ currentStep: currentStep + 1, goingBack: false });
		}
	}
}

const Box = ({ label, onClick, selected, children }) => (
	<div className={`box__container card card-body ${selected ? 'box--selected' : ''}`} onClick={onClick}>
		<h3 className="box__title align-middle">{label}</h3>
		{children && <p className="box__copy">{children}</p>}
	</div>
);

const TextField = ({ id, label, type }) => (
	<div className="form-group">
		<label className="form-label" htmlFor={id}>{label}</label>
		<input type={type ? type : "text"} id={id} className="form-control" />
	</div>
);

// ReactDOM.render(<RegisterLogin />, document.getElementById('app'));
