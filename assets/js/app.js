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

menuP.addEventListener('click', () => {
    toggleSubMenu(submenuP)
})

function toggleSubMenu (element) {
    element.classList.toggle('hidden')
    element.classList.toggle('flex')
}

submenuPS.addEventListener('mouseleave', () => {
    toggleSubMenu(submenuPS)
})

submenuP.addEventListener('mouseleave', () => {
    toggleSubMenu(submenuP)
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
    window.open(`https://api.whatsapp.com/send?phone=+5511930426110&text=${encodeURI(mensagem)}`, '_blank')
})

btnCtaEnviar.addEventListener('click', () => {
    let { nome, nomeEmpresa, email, telefone } = pegarDadosForm()
    if (!nome || !email || !telefone) {
        return
    }

    // Decrypt
    var bytes = CryptoJS.AES.decrypt('U2FsdGVkX19LnNqqfCDPKKIWu5mnph44PKD+jenSqMQvVWxO6Nz1vdO+vWWQpk3DLBNwoBrUMw/XXGP4oa1Tpw==', 'henriquecarvalho')
    var secretKey = bytes.toString(CryptoJS.enc.Utf8)

    axios.post('https://api.smtp2go.com/v3/email/send', {
        api_key: secretKey,
        to: ["Comercial Agilus <henrique@agilus.com.br>"],
        sender: "Site Agilus <site@agilus.com.br>",
        subject: 'Cliente interessado no Agilus CRM - contato pelo site',
        text_body: `Nome do cliente: ${nome}\nNome Empresa: ${nomeEmpresa}\nEmail: ${email}\nTelefone: ${telefone}`
    }).then(() => {
        if (modalCta) {
            (toggleModal())()
        }
        alert('Recebemos os seus dados e já entraremos em contato! Obrigado')
    }).catch(error => {
        alert('Não foi possível enviar o contato. Fale com a gente pelo número (11) 4040-8065')
        console.error('Email não enviado. Erro: ' + error)
    })
})

function toggleModal () {
    return () => {
        modalCta.classList.toggle('flex')
        modalCta.classList.toggle('hidden')
    }
}

function pegarDadosForm () {
    return {
        nome: document.querySelector('input[type=text]').value,
        nomeEmpresa: document.getElementById('nomeEmpresa').value,
        email: document.querySelector('input[type=email]').value,
        telefone: document.querySelector('input[type=tel]').value
    }
}