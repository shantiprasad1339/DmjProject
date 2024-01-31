import axios from "axios";
import React from "react";
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';


export default class GetIp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CountryName: '',
            CountryCode: '',
            value: ''
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        axios.get('http://ipapi.co/json/')
            .then((res) => {
                console.log(res.data)
                this.setState({
                    CountryName: res.data.country_code,
                    CountryCode: res.data.country_calling_code,
                })
            }
            )
            .catch((err) => console.log(err));
    }

    handleChange(e) {

        let re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                CountryCode: e.target.value,
            });
        }

    }


    render() {
        const { CountryCode, CountryName, value } = this.state;
        return (
            <>
                {/* <input
                    type='text'
                    pattern='\d{1}'
                    inputMode='numeric'
                    value={CountryCode}
                    onChange= /> */}

                <PhoneInput
                    initialValueFormat="national"
                    placeholder="Enter phone number"
                    value={value}
                    onChange={(e) => this.setState({ value: e.target.value })} />
                National: {value && formatPhoneNumber(value)}
                International: {value && formatPhoneNumberIntl(value)}

            </>
        )
    }
}