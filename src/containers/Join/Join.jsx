import React, { Component } from "react";
import { getJoinControls, onChangeHandler } from "../../form/formService";
import classes from "./../Auth/Auth.module.scss";
import Input from "../../components/UI/Input/Input";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Button from "../../components/UI/Button/Button";
import Cross from "../../components/UI/Cross/Cross";
import { registerUser } from "../../services/AuthServise";

class Join extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      errorMessage: "",
      isError: false,
      isFormValid: false,
      formControls: { ...getJoinControls() },
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
  };

  loginHandler = () => {
    const username = this.state.formControls.login.value;
    const password = this.state.formControls.password.value;
    const name = this.state.formControls.name.value;
    const surname = this.state.formControls.surname.value;
    const companyName = this.state.formControls.companyName.value;

    registerUser(username, password, name, surname, companyName).then(res => {
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
          <h1>Регистрация аккаунта</h1>
          <Cross onClick={this.props.onClick} />
          {this.renderInputs()}
          {this.state.isError &&
          <div className={classes.error}>
            {this.state.errorMessage}
          </div>
          }
          <Button type='primary'
                  onClick={this.loginHandler}
                  disabled={!this.state.isFormValid}>Регистрация</Button>
        </form>
        <Backdrop onClick={this.props.onClick} />
      </>
    )
  }
}

export default Join;