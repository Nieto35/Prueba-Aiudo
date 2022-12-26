EXPLICACION DE JSON
LA BASE DE DATOS HECHA PARA ESTA EVALUACION

los datos del json son creados con el id del personaje de rick y morty, por ende no habra id 
repedito
{
    (COUNTS) = CUENTAS DE LOS USUARIOS, CADA USUARIO TIENE 3 CUENTAS BANCARIAS 
    Lo siguiente solo es una explicacion de como funcioana cada una de sus 3 cuentas bancarias
      "counts": [
        {
            (LOGO) = Imagen de la cuenta
                "logo": "http://localhost:3007/assets/a81b172b71af10c97a265ce1edf738e7.svg", 
            (ID) = El id de la cuenta, con este id siempre se sabe que cuenta modificar
                "id": "3",
            (MONEY) = El dinero que tiene en la cuenta 
                "money": "500",
            (DEBT) = Total de la deuda que se tiene actualmente
                "debt": "0",
            (ORIGINAL_DEBT) = La deuda original que adquirió la persona, 
            (esto era pensado para un historial)
                "original_debt": "0",
            (NUMBER_QUOTAS_ELECT) = Las cuotas que le quedan por pagar
                "number_quotas_elected": "0",
            (ORIGINAL_NUMBER_QUOTAS_ELECT) = La cantidad de cuotas elegidas originalmente
            (esto era pensado para un historial)
                "original_number_quotas_elected": "0",
            (PAID_QUOTA) = numero de cuota por pagar
                "paid_quota": "0",
            (WEEKLY_PAYMENT) = La cantidad que debe pagar en la cuota
                "weekly_payment": "0"
        },
      ],
      (ID) = id de personaje de Rick y Morty
        "id": "1"
    },