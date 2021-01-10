let form = {

    // nombre del item para guardar en localstorage
    taskName: 'task',

    //procesa el formulario en busca de los campos que se encuentren definidos
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

    //revisa si el elemento esta undefined
    isUndefined(element) {
        return (element === undefined) ? true : false;
    },

    //revisa si el elemento esta vacio o Corregir: cambiar a trim
    isEmptyOrNull(input) {
        return (input.value === "" || input.value.length === 0) ? true : false;
    },

    //Verifica el tipo de campo del form
    checkType(input) {
        return (input.type === "text" || input.type === "textarea" || input.type === "date") ? true : false;
    },

    //obtiene los valores del formulario y devuelve el objeto
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

    //metodo de ejecucion del formulario
    submitForm(form) {
        if (this.processForm(form))
            this.saveDataOnStorage(this.taskName, form);
        else
            console.log('error!');
    },

    //guarda el formulario procesado
    saveDataOnStorage(item, form) {
        let task = [];

        if (!this.checkIfExistData(item)) {
            task.push(this.getValuesFromForm(form));
            localStorage.setItem(this.taskName, JSON.stringify(task));
        }
    },

    //verifica que los datos existan
    checkIfExistData(item) {
        return (this.isUndefined(localStorage.getItem(item))) ? true : false;
    }
}

form.submitForm('formTask');
