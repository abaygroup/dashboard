export const registerField = {
    inputs: [
        {
            type: "text",
            name: "brandname",
            placeholder: function() {
                if (localStorage.getItem('i18nextLng') === "ru") {
                    return "Имя бренда"
                }
                if (localStorage.getItem('i18nextLng') === "kz") {
                    return "Бренд атауы"
                }
            },
        },
        {
            type: "email",
            name: "email",
            placeholder: function() {
                return "example@gmail.com"
            }
        },
        {
            type: "password",
            name: "password",
            placeholder: function () {
                if (localStorage.getItem('i18nextLng') === "ru") {
                   return "Ваше пароль" 
                } 
                if (localStorage.getItem('i18nextLng') === "kz") {
                    return "Өз парольіңіз"
                }
            },
        },
        {
            type: "password",
            name: "re_password",
            placeholder: function () {
                if (localStorage.getItem('i18nextLng') === "ru") {
                   return "Подтвердить пароль" 
                } 
                if (localStorage.getItem('i18nextLng') === "kz") {
                    return "Парольді растаңыз"
                }
            }
        },
    ]
}

export const loginField = {
    inputs: [
        {
            type: "email",
            name: "email",
            placeholder: function() {
                return "example@gmail.com"
            }
        },
        {
            type: "password",
            name: "password",
            placeholder: function () {
                if (localStorage.getItem('i18nextLng') === "ru") {
                   return "Ваше пароль" 
                } 
                if (localStorage.getItem('i18nextLng') === "kz") {
                    return "Өз парольіңіз"
                }
            },
        }
    ]
}