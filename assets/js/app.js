const menuPS = document.getElementById('menu-ps') // li produtos e serviços
const menuP = document.getElementById('menu-p') // li preços
const submenuPS = document.getElementById('submenu-ps') // lista dentro de produtos e serviços
const submenuP = document.getElementById('submenu-p') // lista dentro de preços
const buttonMenuHamburguer = document.getElementById('nav-toggle') // menu hamburguer
const navContent = document.getElementById('nav-content') // links do header
const btnCta = document.getElementById('btn-cta') // botão de cta (click-to-action)
const btnCta2 = document.getElementById('btn-cta2')
const modalCta = document.getElementById('modal-cta') // modal de cta (click-to-action)
const btnCloseModalCta = document.getElementById('btn-close-modal')
const formModalCta = document.getElementById('form')
const btnCtaWhatsapp = document.getElementById('btn-cta-whatsapp')
const btnCtaEnviar = document.getElementById('btn-cta-enviar')
const inputTelefone = document.getElementById('telefone')


if (inputTelefone) {
    VMasker(inputTelefone).maskPattern('(99) 99999-9999')
}

buttonMenuHamburguer.addEventListener('click', () => {
    navContent.classList.toggle('hidden')
})

menuPS.addEventListener('click', () => {
    toggleSubMenu(submenuPS)
})

function toggleSubMenu (element) {
    element.classList.toggle('hidden')
    element.classList.toggle('flex')
}

submenuPS.addEventListener('mouseleave', () => {
    toggleSubMenu(submenuPS)
})

if (btnCta) {
    btnCta.addEventListener('click', toggleModal())
}
if (btnCta2) {
    btnCta2.addEventListener('click', toggleModal())
}
if (btnCloseModalCta) {
    btnCloseModalCta.addEventListener('click', toggleModal())
}

formModalCta.addEventListener('submit', event => {
  event.preventDefault()
})

btnCtaWhatsapp.addEventListener('click', () => {
    let { nome, nomeEmpresa } = pegarDadosForm()
    if (!nome) {
        return
    }
    let mensagem = `Olá. Meu nome é ${nome} ${nomeEmpresa ? '(da empresa ' + nomeEmpresa + ')' : ''} e gostaria de mais informações sobre o sistema da Agilus.`
    window.open(`https://api.whatsapp.com/send?l=pt&phone=5511930426110&text=${encodeURI(mensagem)}`, '_blank')
})

btnCtaEnviar.addEventListener('click', () => {
    let { nome, nomeEmpresa, email, telefone, ramos } = pegarDadosForm()
    if (!nome || !email || !telefone) {
        return
    }

    let textoRamos = ramos.length > 1 ? ramos.join(', ') : ramos[0]
    if (!textoRamos) {
        textoRamos = `Não informado`
    }
    let titlePage = document.title

    toggleButtonEnviar()

    const objSendToEmail = {
        nome,
        nomeEmpresa,
        email,
        telefone,
        textoRamos,
        planoSelecionado: `${planoSelecionado ? 'Plano Selecionado: Qtde. usuários: ' + planoSelecionado.qtdeUsuarios + ' - R$' + planoSelecionado.valorMensal : ''}`,
        titlePage
    }

    axios({
        url: 'https://api.emailjs.com/api/v1.0/email/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            service_id: 'service_1xefoei',
            template_id: 'template_ohok4v8',
            user_id: 'Qby85l9VwRRgxZVl1',
            template_params: objSendToEmail
        })
    }).then(() => {
        toggleButtonEnviar()
        if (modalCta) {
            (toggleModal())()
        }
        console.log('e-mail enviado')
        alert('Recebemos os seus dados e já entraremos em contato! Obrigado')
    }).catch(error => {
        toggleButtonEnviar()
        alert('Não foi possível enviar o contato. Fale com a gente pelo número (11) 4040-8065')
        console.error('Email não enviado. Erro: ' + error)
    })

    axios({
        url: 'https://agiluscrm.com.br:40000/api/Armazem/Armazenar',
        method: 'POST',
        data: {
            Nome: nome,
            CpfCnpj: '',
            DataNascimento: null,
            Chave: 'ce128c97-5b3a-4547-8716-f83d62317311',
            Telefones: [
                {Numero: telefone, Ddd: '', Tipo: ''}
            ],
            Emails: [
                {Endereco: email, Tipo: ''}
            ],
            FiltroSimuladorFaixaEtaria: {}
        }
    }).then(() => {
        console.log('cliente incluido na campanha do Agilus CRM')
    }).catch(error => {
        console.error('Cliete não enviado para o Agilus CRM. Erro: ' + error)
    }).finally(() => {
        toggleButtonEnviar()
    })
})

function toggleModal () {
    return () => {
        modalCta.classList.toggle('flex')
        modalCta.classList.toggle('hidden')
    }
}

function toggleButtonEnviar () {
    const textoEl = btnCtaEnviar.children[0]
    const loadingEl = btnCtaEnviar.children[1]
    textoEl.classList.toggle('hidden')
    loadingEl.classList.toggle('flex')
    loadingEl.classList.toggle('hidden')
    if (!loadingEl.classList.contains('hidden')) {
        btnCtaEnviar.setAttribute('disabled', 'disabled')
    }
    else {
        btnCtaEnviar.removeAttribute('disabled')
    }
}

function pegarDadosForm () {
    return {
        nome: document.querySelector('input[type=text]').value,
        nomeEmpresa: document.getElementById('nomeEmpresa').value,
        email: document.querySelector('input[type=email]').value,
        telefone: document.querySelector('input[type=tel]').value,
        ramos: [
            document.getElementById('planoSaude') && document.getElementById('planoSaude').checked ? 'Plano de Saúde' : null,
            document.getElementById('consignado') && document.getElementById('consignado').checked ? 'Consignado' : null
        ].filter(item => item != null)
    }
}