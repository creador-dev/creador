/* eslint no-console:0 no-alert:0 */
import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'

export default class SubscribeForm extends React.Component {
    state = {
        name: null,
        email: null,
    }

    _handleChange = e => {
        this.setState({
            [`${e.target.name}`]: e.target.value,
        })
    }

    _handleSubmit = e => {
        e.preventDefault()
        addToMailchimp(this.state.email, this.state)
        .then(({ msg, result }) => {
            if (result !== 'success') {
                throw msg
            }
            alert(msg)
        })
        .catch(err => {
            console.log('err', err)
            alert(err)
        })
    }

    render() {
        return (
            <div className="subscribe-form">
                <h3>Subscribe to my newsletter!</h3>
                <div className="subscribe-image"></div>
                <div>
                    <form onSubmit={this._handleSubmit}>
                        <div className="form__group">
                            <input
                                id="subscribeName"
                                className="hoverable form__field"
                                type="text"
                                onChange={this._handleChange}
                                placeholder="name"
                                name="name"
                                required
                            />
                            <label for="subscribeName" className="form__label">Your Name*</label>
                        </div>
                        <div className="form__group">
                            <input
                                id="subscribeEmail"
                                className="hoverable form__field"
                                type="email"
                                onChange={this._handleChange}
                                placeholder="email"
                                name="email"
                                required
                            />
                            <label for="subscribeEmail" className="form__label">Your Email*</label>
                        </div>
                        <input className="hoverable pure-material-button-contained" type="submit" value="Subscribe" />
                    </form>
                </div>
            </div>
        )
    }
}