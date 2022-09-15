const keySite = "6LecN_ghAAAAAKi1mep4mLtYy9ilsMvh5gZohf5W";
const secretKey = "6LecN_ghAAAAANU7UapwGb9pWXdb-imNeMIh_Nfv";

getAllValuesInputs = (form) => {
  let formNameFields = {};
  for (const input of form) {
    const names = input.name.split("-");

    if (input.name && !input.disabled && names[0] !== "g") {
      formNameFields = {
        ...formNameFields,
        [names[0] === "g" ? "token" : [names[0]]]: {
          ...formNameFields[names[0]],
          [names[1]]: document.getElementById(input.id).value,
        },
      };
    }
  }
  return formNameFields;
};

newErrorMessage = (message) => {
  document.getElementById("div-error").style.display = "flex";

  setTimeout(() => {
    document.getElementById("div-error").style.display = "none";
  }, 5000);

  document.getElementById("message").textContent = message;
};

document.getElementById("check-pay").addEventListener("change", (e) => {
  const formPay = document
    .getElementById("div-form-pay")
    .getElementsByTagName("*");

  for (const tag of formPay) tag.disabled = !e.target.checked;

  document.getElementById("div-form-pay").style.display = e.target.checked
    ? "flex"
    : "none";
});

captcha = () => {
  grecaptcha.ready(() => {
    grecaptcha.execute(keySite, { action: "submit" }).then(async (token) => {
      if (token)
        if (Date.now() % (Math.random() * 100).toFixed(0) <= 5) {
          const message =
            "Erro 450: Não foi póssivel enviar o formulário, tente novamente!";
          newErrorMessage(message);
          console.log({ internalCode: "450", message });
        } else console.log(getAllValuesInputs(document.forms[0].elements));
      else {
        const message = "Erro 131: Foi encontrado um erro com o Captcha!";
        newErrorMessage(message);
        console.log({ internalCode: "131", message });
      }
    });
  });
};

document.getElementById("form-fields").addEventListener("submit", (e) => {
  e.preventDefault();
  captcha();
});

//Gostaria de solucionar essa parte ainda!
// validateCaptcha = async (token) => {
//   const url = `https://www.google.com/recaptcha/api/siteverify?response=${token}&secret=${secretKey}`;
//   const res = await fetch(url, {
//     method: "POST",
//     mode: "no-cors",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "same-origin",
//   });

//   console.log(res);// aqui tem que ter return
// };
