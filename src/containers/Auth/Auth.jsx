import React, { Component } from "react";
import { getLoginControls, onChangeHandler } from "../../form/formService";
import classes from "./Auth.module.scss";
import Input from "../../components/UI/Input/Input";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Button from "../../components/UI/Button/Button";
import Cross from "../../components/UI/Cross/Cross";
import { loginUser } from "../../services/AuthServise";

class Auth extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      errorMessage: "",
      isError: false,
      isFormValid: false,
      formControls: { ...getLoginControls() },
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
  };

  loginHandler = async () => {
    const username = this.state.formControls.login.value;
    const password = this.state.formControls.password.value;

    loginUser(username, password).then(res => {
      this.props.onClick();
      this.props.setAuthorizedUser(true);
    }).catch(err => {
      alert(err.message);
      this.props.setAuthorizedUser(false);
    });
  };

  onChangeHandler = (event, controlName) => {
    const { formControls, isFormValid } = onChangeHandler(event, { ...this.state.formControls }, controlName);
    this.setState({
      formControls,
      isFormValid
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    })
  }

  render() {

    return (
      <>

        <form onSubmit={this.submitHandler} className={classes.Auth}>
          <h1>Вход в аккаунт</h1>
          <Cross onClick={this.props.onClick} />
          {this.renderInputs()}
          {this.state.isError &&
          <div className={classes.error}>
            {this.state.errorMessage}
          </div>
          }
          <Button type='primary'
                  onClick={this.loginHandler}
                  disabled={!this.state.isFormValid}>Вход</Button>
        </form>
        <Backdrop onClick={this.props.onClick} />
      </>
    )
  }
}

export default Auth;