export const PERFORMER = "Исполнитель";
export const CUSTOMER = "Заказчик";
export const PERFORMER_CUSTOMER = "Заказчик, Исполнитель";

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
  const control = { ...formControls[controlName] };
  control.value = event.target.value;
  control.touched = true;
  control.valid = validateControl(control.validation, control.value);

  formControls[controlName] = control;

  let isFormValid = true;
  Object.keys(formControls).forEach(name => {
    isFormValid = formControls[name].valid && isFormValid;
  });

  return { formControls, isFormValid }
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
    { name: "Внесение предоплаты (20%)", responsible: CUSTOMER },
    { name: "Предоставление исходных данных", responsible: CUSTOMER },
    { name: "Выездное обследование", responsible: PERFORMER },
    { name: "Разработка графической части", responsible: PERFORMER },
    { name: "Согласование графической части", responsible: CUSTOMER },
    { name: "Разработка тестовой части", responsible: PERFORMER },
    { name: "Согласование текстовой части", responsible: CUSTOMER },
    { name: "Подписание акта", responsible: PERFORMER_CUSTOMER },
    { name: "Оплата Контракта (80%)", responsible: CUSTOMER },
    { name: "Передача результатов Контракта на бумажном носителе", responsible: PERFORMER },
  ],

  planned: {
    startDate: null,
    endDate: null
  },

  fact: {
    startDate: null,
    endDate: null
  },
};


export const typesDocs = {
  category1: [
    {
      id: "PRO_ENE_I_POV_ENE_EFF_POS_GOR_OKR_GOS_I_MUN_UCHR",
      name: "Программы энергосбережения и повышения энергетической эффективности поселений, городских округов; государственных и муниципальных учреждений"
    },
    {
      id: "PRO_KOM_RAZV_SIS_KOM_INF",
      name: "Программы комплексного развития систем коммунальной инфраструктуры"
    },
    {
      id: "SHE_TEP_VOD_I_VOD",
      name: "Схемы теплоснабжения, водоснабжения и водоотведения"
    },
    {
      id: "KON_SOG_V_OTN_OB_TEP_CEN_SIS_GOR_VOD_HOL_VOD_I_ILI_VOD",
      name: "Концессионные соглашения в отношении объектов теплоснабжения, централизованных систем горячего водоснабжения, холодного водоснабжения и (или) водоотведения",
    },
    {
      id: "INV_I_PRO_PRO_ORG_KOM_KOM",
      name: "Инвестиционные и производственные программы организаций коммунального комплекса"
    },
    {
      id: "TOP_ENE_BAL_MUN_OBR",
      name: "Топливно-энергетические балансы муниципальных образований"
    },
  ],
  category2: [
    {
      id: "PRO_KOM_RAZ_TRA_INF",
      name: "Программы комплексного развития транспортной инфраструктуры",
    },
    {
      id: "KOM_SHE_ORG_DOR_DVI",
      name: "Комплексные схемы организации дорожного движения"
    }
  ],
  category3: [
    {
      id: "DRU_DOK",
      name: "Другие документы"
    }
  ]
}

export const requestFields = {
  category1: [
    {
      id: "KOL_SKV_NA_TER_MUN_OBR",
      name: "Количество скважин на территории муниципального образования",
    },
    {
      id: "KOL_KOT_NA_TER_MUN_OBR",
      name: "Количество котельных на территории муниципального образования",
    },
    {
      id: "CHIS_NAS_MUN_OBR",
      name: "Численность населения муниципального образования"
    }
  ],
  category2: [
    {
      id: "PRO_AVT_DOR_OBSHCH_POL",
      name: "Протяженность автомобильных дорог общего пользования (федерального, регионального и местного значения)"
    },
    {
      id: "CHIS_NAS",
      name: "Численность населения",
    },
  ],
  category3: [
    {
      id: "CHIS_NAS",
      name: "Численность населения",
    },
  ],
}

export function getStageControls() {
  const controls = stageControls.stages;
  return controls.map((control, index) => {
    control.planned = { ...stageControls.planned }
    control.fact = { ...stageControls.fact }
    control.order = index;
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
    login: { ...authControls.login, valid: true },
    name: { ...authControls.name, valid: true },
    surname: { ...authControls.surname, valid: true }
  }
}

