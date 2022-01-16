import React, { Component } from 'react'
import Table from './Table';
import Input from "react-validation/build/input";
export default class UserForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: '',
            Email: '',
            Phone_Number: '',
            Address: '',
            selState: { text: "Delhi", value: "1", key: "1", countryId: "91" },
            savedUsers: [],
            stateList: [
                { text: "Delhi", value: "1", key: "1", countryId: "91" },
                { text: "Odisha", value: "2", key: "2", countryId: "91" },
                { text: "Gujrat", value: "3", key: "3", countryId: "91" },
                { text: "Punjab", value: "4", key: "4", countryId: "91" },
                { text: "Lezhe", value: "5", key: "5", countryId: "92" },
                { text: "Librazhd", value: "6", key: "6", countryId: "92" },
                { text: "Lushnje", value: "7", key: "7", countryId: "92" },
                { text: "Eastern", value: "8", key: "8", countryId: "93" },
                { text: "Swains Island", value: "9", key: "9", countryId: "93" },
                { text: "Western", value: "10", key: "10", countryId: "93" },
                { text: "Bagmati", value: "11", key: "11", countryId: "94" },
                { text: "Bheri", value: "12", key: "12", countryId: "94" },
                { text: "Dhawalagiri", value: "13", key: "13", countryId: "94" }
            ],
            countryList: [
                { text: "India", value: "91", key: "91" },
                { text: "Pakistan", value: "92", key: "92" },
                { text: "America", value: "93", key: "93" },
                { text: "Nepal", value: "94", key: "94" }
            ],
            // eslint-disable-next-line no-undef
            selectedCountry: { text: "India", value: "91", key: "91" },
            hidebtns: false
        }

        this.updateSelectedCountry = this.updateSelectedCountry.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePhone = this.updatePhone.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.submit = this.submit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.editTableRecordHandler = this.editTableRecordHandler.bind(this);
        this.deleteTableRecordHandler = this.deleteTableRecordHandler.bind(this);
        this.updateState = this.updateState.bind(this);
        this.viewRecordHandler = this.viewRecordHandler.bind(this);
        // this.required = this.required.bind(this);
    }
    // required = (value) => {
    //     //////console.log(value)
    //     if (!value) {
    //       return (
    //         <div className="alert alert-danger" role="alert">
    //           This field is required!
    //         </div>
    //       );
    //     }
    //   };

    updateSelectedCountry(evt) {
        //////console.log(evt.target.value);
        const country = this.state.countryList.filter((data, idx) => data.value === evt.target.value)[0];
        const state = this.state.stateList.filter((data, idx) => data.countryId === country.value)[0];
        //////console.log("country: ", country);
        this.setState({
            selectedCountry: country,
            selState: state
        });
    }
    updateState(evt) {
        //////console.log(evt.target.value);
        const state = this.state.stateList.filter((data, idx) => data.text === evt.target.value)[0];
        this.setState({
            selState: state
        })
    }
    updateName(evt) {
        //////console.log(evt.target.value);
        this.setState({
            Name: evt.target.value
        });
    }
    updateEmail(evt) {
        //////console.log(evt.target.value);

        this.setState({
            Email: evt.target.value
        });
    }
    updatePhone(evt) {
        //////console.log(evt.target.value);

        this.setState({
            Phone_Number: evt.target.value
        });
    }
    updateAddress(evt) {

        this.setState({
            Address: evt.target.value
        });
    }
    submit() {
        const obj = {
            id: 1,
            Name: this.state.Name,
            Email: this.state.Email,
            Phone_Number: this.state.Phone_Number,
            Address: this.state.Address,
            selectedCountry: this.state.selectedCountry.text,
            selState: this.state.selState.text
        };
        let usrs = [...this.state.savedUsers];

        if (obj.Name.trim() === '' || obj.Email.trim() === '' || obj.Phone_Number.trim() === '' || obj.Address.trim() === '') {
            return;
        }
        if (usrs.length === 0) usrs.push(obj);
        let index = -1;
        const userEmailData = usrs.filter((data, idx) => {
            index = idx;
            return data.Email === obj.Email
        });
        if (userEmailData.length === 0) {
            usrs.push(obj);
        } else {
            if (index !== -1) usrs.splice(index, 1, obj);

        }


        this.setState({
            savedUsers: usrs
        });
        this.resetForm();
    }

    resetForm() {
        this.setState({
            Name: '',
            Email: '',
            Phone_Number: '',
            Address: '',
            selectedCountry: { text: "India", value: "91", key: "91" },
            selState: { text: "Delhi", value: "1", key: "1", countryId: "91" },
            hidebtns: false
        })
    }
    editTableRecordHandler(id, item) {
        //////console.log(" item", item)
        //////console.log("id ", id);

        const country = this.state.countryList.filter((data, idx) => data.text === item.selectedCountry)[0];
        const state = this.state.stateList.filter((data, idx) => data.text === item.selState)[0];
        this.setState({
            Name: item.Name,
            Email: item.Email,
            Phone_Number: item.Phone_Number,
            Address: item.Address,
            selectedCountry: country,
            selState: state
        });
    }
    viewRecordHandler(id, item) {

        const country = this.state.countryList.filter((data, idx) => data.text === item.selectedCountry)[0];
        const state = this.state.stateList.filter((data, idx) => data.text === item.selState)[0];
        this.setState({
            Name: item.Name,
            Email: item.Email,
            Phone_Number: item.Phone_Number,
            Address: item.Address,
            selectedCountry: country,
            selState: state,
            hidebtns: true
        });
    }

    deleteTableRecordHandler(id) {
        let index = this.state.savedUsers.findIndex((data, idx) => data.Email === id);
        const delData = [...this.state.savedUsers];
        delData.splice(index, 1);
        this.setState({
            savedUsers: delData,
            id: id
        });
    }

    render() {

        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col">
                        <input type='text' className="form-control" onChange={this.updateName} placeholder='Name' value={this.state.Name} />
                    </div>
                    <div className="col">
                        <input type='text' className="form-control" onChange={this.updateEmail} placeholder='Email' value={this.state.Email} />
                    </div>
                    <div className="col">
                        <input type='number' className="form-control" onChange={this.updatePhone} placeholder='Phone Number' value={this.state.Phone_Number} />
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col">
                        <select className="form-control" value={this.state.selectedCountry.value} onChange={this.updateSelectedCountry} >
                            {
                                this.state.countryList.map((data, idx) => {
                                    return (
                                        <option value={data.value} key={idx}>
                                            {data.text}
                                        </option>)
                                })
                            }
                        </select>
                    </div>
                    <div className="col">
                        <select className="form-control" value={this.state.selState.text} onChange={this.updateState}>
                            {
                                this.state.stateList.map((data, idx) => {
                                    if (data.countryId === this.state.selectedCountry.value)
                                        return (
                                            <option value={data.text} key={idx}>
                                                {data.text}
                                            </option>)
                                })
                            }
                            <option value='State' />
                        </select>
                    </div>
                    <div className="col">
                        <textarea type='text' className="form-control" onChange={this.updateAddress} value={this.state.Address} placeholder='Address' />
                    </div>
                </div>
                {
                    !this.state.hidebtns ?
                        <div className='row my-3'>
                            <div className='col-md-3 offset-md-9 text-right'>
                                <button className='btn btn-sm btn-primary ms-5' onClick={this.submit}> Submit</button>
                                <button className='btn btn-sm btn-danger ms-3' onClick={this.resetForm}>Cancle</button>
                            </div>
                        </div> : ''
                }
                {
                    (this.state.savedUsers && this.state.savedUsers.length > 0) ?
                        <Table data={this.state.savedUsers} countries={this.state.countryList}
                            editTableRecordHandler={this.editTableRecordHandler}
                            deleteTableRecordHandler={this.deleteTableRecordHandler}
                            viewRecordHandler={this.viewRecordHandler}
                        />
                        : ''
                }

            </div>
        )
    }
}
