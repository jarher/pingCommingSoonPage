const errorMessages = {
  emailError: {
    valueMissing: "Email cannot be empty",
    errorType: "Please provide a valid email address.",
  },
};

class Messages {
  constructor(states) {
    this.states = states;
  }
  showErrorMessage(selector, message) {
    const selectorString = `#${selector} + .input-error-message`;
    document.querySelector(selectorString).innerText = message;
  }

  addErrorClass(selector) {
    document.getElementById(selector).classList.add("show-input-error");
  }

  removeErrorClass(selector) {
    document.getElementById(selector).classList.remove("show-input-error");
  }

  wordFormatter(selector) {
    const regex = /[A-Z]/;
    const index = selector.search(regex);

    if (index > 0) {
      const firstWord = selector.substring(0, index);
      const firstUpperCaseLetter = firstWord[0].toUpperCase();
      const firstWordSubstring = firstWord.substring(1);
      return `${firstUpperCaseLetter}${firstWordSubstring} ${selector.substring(
        index
      )}`;
    }
  }

  validateState(statesParameter) {
    const { states, errorMessage, idCammelCase } = statesParameter;
    const { isEmpty, isValid, id } = states;
    let message = "";

    function concatString(idName, errorMsg) {
      if (idName) {
        return `${idName} ${errorMsg}`;
      }
      return errorMsg;
    }

    if (!isValid) {
      this.addErrorClass(id);

      message = isEmpty
        ? concatString(idCammelCase, errorMessage.valueMissing)
        : concatString(idCammelCase, errorMessage.errorType);
    } else {
      this.removeErrorClass(id);
    }
    this.showErrorMessage(id, message);
  }

  checkStates() {
    const { type, id } = this.states;
    const stateParameters = {
      states: this.states,
    };

    if (type === "email") {
      stateParameters.errorMessage = errorMessages.emailError;
      this.validateState(stateParameters);
      return;
    }

    this.removeErrorClass(id);
  }
}

export default Messages;
