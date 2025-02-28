const HORA_ABERTURA = 7,
    HORA_FECHAMENTO = 18,
    DIAS_UTEIS = [1, 2, 3, 4, 5],
    feriados = [{
        data: new Date(2025, 0, 1),
        nome: "Confraterniza\xe7\xe3o Universal"
    }, {
        data: new Date(2025, 2, 3),
        nome: "Carnaval"
    }, {
        data: new Date(2025, 2, 4),
        nome: "Carnaval"
    }, {
        data: new Date(2025, 3, 18),
        nome: "Sexta-feira Santa"
    }, {
        data: new Date(2025, 3, 21),
        nome: "Tiradentes"
    }, {
        data: new Date(2025, 4, 1),
        nome: "Dia do Trabalho"
    }, {
        data: new Date(2025, 5, 19),
        nome: "Corpus Christi"
    }, {
        data: new Date(2025, 8, 7),
        nome: "Independ\xeancia do Brasil"
    }, {
        data: new Date(2025, 9, 12),
        nome: "Nossa Senhora Aparecida"
    }, {
        data: new Date(2025, 10, 2),
        nome: "Finados"
    }, {
        data: new Date(2025, 10, 15),
        nome: "Proclama\xe7\xe3o da Rep\xfablica"
    }, {
        data: new Date(2025, 11, 25),
        nome: "Natal"
    }];

function encontrarFeriado(e) {
    return feriados.find(a => a.data.getDate() === e.getDate() && a.data.getMonth() === e.getMonth() && a.data.getFullYear() === e.getFullYear())
}

function ehFeriado(e) {
    return !!encontrarFeriado(e)
}

function getNomeFeriado(e) {
    let a = encontrarFeriado(e);
    return a ? a.nome : ""
}

function formatarData(e) {
    return e.toLocaleDateString("pt-BR")
}

function atualizarRelogio() {
    let e = document.getElementById("relogio");
    if (!e) {
        console.error("Elemento relogio n\xe3o encontrado!");
        return
    }
    let a = new Date;
    e.textContent = a.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })
}

function verificarHorarioComercial() {
    let e = new Date,
        a = e.getHours(),
        t = e.getDay(),
        o = document.getElementById("status"),
        n = document.body;
    if (!o || !n) {
        console.error("Elementos do DOM n\xe3o encontrados!");
        return
    }
    let r = !1,
        i = "";
    DIAS_UTEIS.includes(t) && a >= 7 && a < 18 && !ehFeriado(e) ? (r = !0, i = `ABERTO - Estamos em hor\xe1rio comercial. Atendimento at\xe9 \xe0s 18h00.`, o.className = "status aberto", n.classList.add("aberto"), n.classList.remove("fechado")) : (r = !1, i = 0 === t || 6 === t ? `FECHADO - Hoje \xe9 ${["Domingo", "Segunda-feira", "Ter\xe7a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S\xe1bado"][t]}, estamos fora do hor\xe1rio comercial.` : ehFeriado(e) ? `FECHADO - Hoje \xe9 feriado: ${getNomeFeriado(e)}.` : `FECHADO - Fora do hor\xe1rio comercial. Voltamos a atender \xe0s 7h00.`, o.className = "status fechado", n.classList.add("fechado"), n.classList.remove("aberto")), o.textContent = i
}

function preencherFeriados() {
    let e = document.getElementById("lista-feriados");
    if (!e) {
        console.error("Elemento lista-feriados n\xe3o encontrado!");
        return
    }
    e.innerHTML = "", feriados.forEach(a => {
        let t = document.createElement("li"),
            o = document.createElement("span");
        o.className = "data", o.textContent = formatarData(a.data);
        let n = document.createElement("span");
        n.className = "nome", n.textContent = a.nome, t.appendChild(o), t.appendChild(n), e.appendChild(t)
    })
}
document.addEventListener("DOMContentLoaded", function () {
    verificarHorarioComercial(), setInterval(atualizarRelogio, 1e3), preencherFeriados()
});