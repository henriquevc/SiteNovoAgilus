const menuPS = document.getElementById('menu-ps') // li produtos e serviços
const submenuPS = document.getElementById('submenu-ps') // lista dentro de produtos e serviços
const buttonToggle = document.getElementById('nav-toggle') // menu hamburguer
const navContent = document.getElementById('nav-content') // links do header
const btnCta = document.getElementById('btn-cta') // botão de cta (click-to-action)
const btnCta2 = document.getElementById('btn-cta2')
const modalCta = document.getElementById('modal-cta') // modal de cta (click-to-action)
const btnCloseModalCta = document.getElementById('btn-close-modal')
const btnCtaWhatsapp = document.getElementById('btn-cta-whatsapp')
const btnCtaEnviar = document.getElementById('btn-cta-enviar')
const inputTelefone = document.getElementById('telefone')

VMasker(inputTelefone).maskPattern('(99) 99999-9999')

buttonToggle.addEventListener('click', () => {
    navContent.classList.toggle('hidden')
})

menuPS.addEventListener('click', () => {
    submenuPS.className.includes('sr-only') ?
        submenuPS.classList.remove('sr-only')
    :   submenuPS.classList.add('sr-only')
})

submenuPS.addEventListener('mouseleave', () => {
    submenuPS.classList.add('sr-only')
})

btnCta.addEventListener('click', toggleModal())
btnCta2.addEventListener('click', toggleModal())
btnCloseModalCta.addEventListener('click', toggleModal())

btnCtaWhatsapp.addEventListener('click', () => {
    let { nome } = pegarDadosForm()
    if (!nome) {
        return
    }
    let mensagem = `Olá. Meu nome é ${nome} e gostaria de mais informações sobre o AgilusCRM.`
    window.open(`https://api.whatsapp.com/send?phone=+5511976847567&text=${encodeURI(mensagem)}`, '_blank')
})

btnCtaEnviar.addEventListener('click', () => {
    let { nome, email, telefone } = pegarDadosForm()
    if (!nome || !email || !telefone) {
        return
    }
    let emailFormatado = encodeURI(`mailto:comercial@agilus.com.br?Subject=Interessado no sistema Agilus CRM - Plano de saúde&Body=Olá, estou interessado no sistema e gostaria de mais informações.\n\nSeguem meus dados para contato:\n\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}`)
    window.open(emailFormatado, '_blank')
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
        email: document.querySelector('input[type=email]').value,
        telefone: document.querySelector('input[type=tel]').value
    }
}