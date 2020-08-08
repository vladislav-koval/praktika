export const PERFORMER = 1;
export const CUSTOMER = 2;
export const PERFORMER_CUSTOMER = 3;

export function validateControl(validation, value) {
    if (!validation) {
        return true;
    }

    let isValid = true;
    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
}

export function onChangeHandler(event, formControls, controlName) {
    const control = {...formControls[controlName]};
    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.validation, control.value);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
        isFormValid = formControls[name].valid && isFormValid;
    });

    return {formControls, isFormValid}
}

const authControls = {
    login: {
        value: '',
        type: 'text',
        label: 'Логин',
        errorMessage: 'Логин не может быть пустым',
        valid: false,
        touched: false,
        validation: {
            required: true,
            login: true,
        }
    },
    password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Пароль может состоять минимум из 5 символов',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 5,
        }
    },
    acceptPassword: {
        value: '',
        passValue: '',
        type: 'password',
        label: 'Подтвердите пароль',
        errorMessage: 'Пароли не совпадают',
        valid: false,
        touched: false,
    },
    name: {
        value: '',
        type: 'text',
        label: 'Имя',
        errorMessage: 'Имя не может быть пустым',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 2,
        }
    },
    surname: {
        value: '',
        type: 'text',
        label: 'Фамилия',
        errorMessage: 'Фамилия не может быть пустой',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 2,
        }
    },

    companyName: {
        value: '',
        type: 'text',
        label: 'Название Компании',
        errorMessage: 'Заполните название Компании',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 2,
        }
    }
};

const stageControls = {
    stages: [
        {name: "Внесение предоплаты (20%)", responsible: CUSTOMER},
        {name: "Предоставление исходных данных", responsible: CUSTOMER},
        {name: "Выездное обследование", responsible: PERFORMER},
        {name: "Разработка графической части", responsible: PERFORMER},
        {name: "Согласование графической части", responsible: CUSTOMER},
        {name: "Разработка тестовой части", responsible: PERFORMER},
        {name: "Согласование текстовой части", responsible: CUSTOMER},
        {name: "Подписание акта", responsible: PERFORMER_CUSTOMER},
        {name: "Оплата Контракта (80%)", responsible: CUSTOMER},
        {name: "Передача результатов Контракта на бумажном носителе", responsible: PERFORMER},
    ],

    startDate: {
        value: '',
        type: 'date',
        label: 'Время начала этапа:',
        errorMessage: '',
        valid: false,
        touched: false,
        validation: {
            required: false,
        }
    },
    endDate: {
        value: '',
        type: 'date',
        label: 'Время конца этапа:',
        errorMessage: '',
        valid: false,
        touched: false,
        validation: {
            required: false,
        }
    },
};

export function getStageControls() {
    const controls = stageControls.stages;
    return controls.map(control => {
        control.startDate = {...stageControls.startDate}
        control.endDate = {...stageControls.endDate}
        return control;
    });
}

export function getLoginControls() {
    return {
        login: authControls.login,
        password: authControls.password
    }
}

export function getJoinControls() {
    return {
        login: authControls.login,
        password: authControls.password,
        acceptPassword: authControls.acceptPassword,
        name: authControls.name,
        surname: authControls.surname,
        companyName: authControls.companyName
    }
}

export function getProfileControls() {
    return {
        login: {...authControls.login, valid: true},
        name: {...authControls.name, valid: true},
        surname: {...authControls.surname, valid: true}
    }
}