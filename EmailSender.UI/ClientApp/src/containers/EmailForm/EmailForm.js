import React, { Component } from 'react';
import Input from '../../components/UI/Controls/Input/Input';
import Button from '../../components/UI/Controls/Button/Button';
import sendEmail from '../../services/HttpService';

class EmailForm extends Component {
    state = {
        emailForm: {
            from: {
                value: "",
                rules: {
                    required: true,
                    type: "email",
                    allowMultiple: false
                },
                valid: true
            },
            to: {
                value: "",
                rules: {
                    required: true,
                    type: "email",
                    allowMultiple: true
                },
                valid: true
            },
            cc: {
                value: "",
                rules: {
                    type: "email",
                    allowMultiple: true
                },
                valid: true
            },
            bcc: {
                value: "",
                rules: {
                    type: "email",
                    allowMultiple: true
                },
                valid: true
            },
            subject: {
                value: "",
                rules: "",
                valid: true
            },
            message: {
                value: "",
                rules : "",
                valid: true
            }
        },
        isValid: false,
        isSucced: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules && rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules && rules.type == "email" && value) {
            var emails = value.split(";");
            const regexp = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emails.length == 1) {
                isValid = (regexp.test(emails[0].trim())) && isValid;
            }
            else if (rules.allowMultiple) {
                emails.forEach((email) => {
                    isValid = (regexp.test(email.trim())) && isValid;
                });
            }
            else {
                isValid = false;
            }
        }

        return isValid;
    }

    emailChangeHandler = (event, inputIdentifier) => {
        const updatedEmailForm = {
            ...this.state.emailForm
        };

        let updatedFormElement = updatedEmailForm[inputIdentifier];
        
        updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.rules);

        updatedEmailForm[inputIdentifier] = updatedFormElement;
        this.setState({ emailForm: updatedEmailForm });

    }

     inputChangedHandler = (event, inputIdentifier) => {
        const updatedEmailForm = {
            ...this.state.emailForm
         };

         let updatedFormElement = updatedEmailForm[inputIdentifier];

         if (event.target.value) {
             updatedFormElement.value = updatedFormElement.allowMultiple ? event.target.value.split(";") : event.target.value;
         } else { updatedFormElement.value = null; }


         updatedEmailForm[inputIdentifier] = updatedFormElement;
         this.setState({ emailForm: updatedEmailForm });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const formData = {};

        //Check form validation
        const updatedEmailForm = {
            ...this.state.emailForm
        };

        let formIsValid = true;
        for (let inputIdentifier in updatedEmailForm) {
          
            let emailElement = updatedEmailForm[inputIdentifier];
            let elementValue = null;
            elementValue = (emailElement.rules.allowMultiple && emailElement.value) ?
                emailElement.value.split(";") : emailElement.value;
            formData[inputIdentifier] = elementValue == "" ? null : elementValue;

            emailElement.valid = this.checkValidity(Array.isArray(elementValue) ?
                                                elementValue.join(";") : elementValue, emailElement.rules);
            formIsValid = emailElement.valid && formIsValid;
        }

        formIsValid ?
            (sendEmail(formData)
                .then(response => {
                    for (let elementIdentifier in this.state.emailForm) {
                        updatedEmailForm[elementIdentifier].value = '';
                    }

                    this.setState({ isSucced: true, emailForm: updatedEmailForm });
                })
                .catch(error => { this.setState({ isSucced: false }); })) :
            this.setState({ formIsValid: false });
    }

    render() {
      
        const style = {
            padding: '35px',
            margin: '30px',
            borderRadius: '10px',
            backgroundColor: '#c3cbdc',
            backgroundImage: 'linear-gradient(147deg, #c3cbdc 0%, #edf1f4 74%)',
            alignItems: 'center'
        };

        return (
            <form style={style} onSubmit={this.submitHandler}>
                {this.state.isSucced ?
                    <div className="alert alert-primary" role="alert">
                        Your Mail Has Been Sent !
            </div> : null}
                <Input elementType='input'
                    label='From:'
                    changed={(event) => this.inputChangedHandler(event, 'from')}
                    blured={(event) => this.emailChangeHandler(event, 'from')}
                    invalid={!this.state.emailForm.from.valid}
                    value={this.state.emailForm.from.value} />
                <Input elementType='input'
                    label='To:'
                    changed={(event) => this.inputChangedHandler(event, 'to')}
                    blured={(event) => this.emailChangeHandler(event, 'to')}
                    invalid={!this.state.emailForm.to.valid}
                    value={this.state.emailForm.to.value} />
                <Input elementType='input'
                    label='CC:'
                    changed={(event) => this.inputChangedHandler(event, 'cc')}
                    blured={(event) => this.emailChangeHandler(event, 'cc')}
                    invalid={!this.state.emailForm.cc.valid}
                    value={this.state.emailForm.cc.value} />
                <Input elementType='input'
                    label='BCC:'
                    changed={(event) => this.inputChangedHandler(event, 'bcc')}
                    blured={(event) => this.emailChangeHandler(event, 'bcc')}
                    invalid={!this.state.emailForm.bcc.valid}
                    value={this.state.emailForm.bcc.value} />
                <Input elementType='input'
                    label='Subject:'
                    changed={(event) => this.inputChangedHandler(event, 'subject')}
                    value={this.state.emailForm.subject.value} />
                <Input elementType='textArea'
                    label='Message:'
                    rows='10'
                    changed={(event) => this.inputChangedHandler(event, 'message')}
                    value={this.state.emailForm.message.value} />
                <Button text="Send" />
            </form>
        );
    }
}


export default EmailForm;