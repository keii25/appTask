let form = {

    taskName: 'task',

    processForm: function (form) {
        let frm = document.getElementById(form);
        let status = true;

        for (let input in frm.children) {
            if (!this.isUndefined(frm[input])) {
                let inputValue = frm[input];

                if (this.checkType(inputValue)) {
                    if (this.isEmptyOrNull(inputValue)) {
                        status = false;
                        break;
                    }
                }
            }
        }

        return status;
    },

    isUndefined(element) {
        return (element === undefined) ? true : false;
    },

    isEmptyOrNull(input) {
        return (input.value === "" || input.value.length === 0) ? true : false;
    },

    checkType(input) {
        return (input.type === "text" || input.type === "textarea" || input.type === "date") ? true : false;
    },

    getValuesFromForm(form) {
        let frm = document.getElementById(form);
        let result = {};

        for (let value in frm.children) {
            if (!this.isUndefined(frm[value])) {
                let getValue = frm[value];

                if (this.checkType(getValue))
                    result[getValue.id] = getValue.value;
            }
        }

        return result;
    },

    submitForm(form) {
        if (this.processForm(form))
            this.saveDataOnStorage(this.taskName, form);
        else
            console.log('error!');
    },

    saveDataOnStorage(item, form) {
        let task = [];

        if (!this.checkIfExistData(item)) {
            task.push(this.getValuesFromForm(form));
            localStorage.setItem(this.taskName, JSON.stringify(task));
        }
    },

    checkIfExistData(item) {
        return (this.isUndefined(localStorage.getItem(item))) ? true : false;
    }
}

form.submitForm('formTask');
