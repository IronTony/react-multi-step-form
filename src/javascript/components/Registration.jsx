/**
 * @jsx React.DOM
 */
var React         = require('react')
var AccountFields = require('./AccountFields')
var Confirmation  = require('./Confirmation')
var SurveyFields  = require('./SurveyFields')
var assign        = require('object-assign')

// Idealy, these form values would be saved in another
// sort of persistence, like a Store via Flux pattern
var data = window.data = {
  name     : null,
  email    : null,
  password : null,
  age      : null,
  colors   : []
}

var Registration = React.createClass({
  getInitialState: function() {
    return {
      step : 1
    }
  },

  saveData: function(field_data) {
    return function() {
      data = assign({}, data, field_data)

      return this
    }.bind(this)()
  },

  nextStep: function() {
    this.setState({
      step : this.state.step + 1
    })

    return this
  },

  previousStep: function() {
    this.setState({
      step : this.state.step - 1
    })

    return this
  },

  submitRegistration: function() {
    alert('Ajax submit registration would happen here')

    this.setState({
      step : this.state.step + 1
    })
  },

  render: function() {
    var style = {
      width : (this.state.step / 4 * 100) + '%'
    }

    return (
      <main>
        <span className="progress-step">Step {this.state.step}</span>
        <progress className="progress" style={style}></progress>
        {this.state.step === 1 &&
          <AccountFields fieldValues={data}
                         nextStep={this.nextStep}
                         previousStep={this.previousStep}
                         saveData={this.saveData} />
        }
        {this.state.step === 2 &&
          <SurveyFields fieldValues={data}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveData={this.saveData} />
        }
        {this.state.step === 3 &&
          <Confirmation fieldValues={data}
                        previousStep={this.previousStep}
                        submitRegistration={this.submitRegistration} />
        }
        {this.state.step === 4 &&
          <div>
            <h2>Successfully Registered!</h2>
            <p>Please check your email <b>{data.email}</b> for a confirmation link to activate your account.</p>
          </div>
        }
      </main>
    )
  }
})

module.exports = Registration