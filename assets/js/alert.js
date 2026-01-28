(function () {
  // cria o HTML do alerta
  const alertHTML = `
    <div id="tw-alert"
      class="fixed inset-0 z-50 hidden items-center justify-center bg-black/50">

      <div
        class="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
        onclick="event.stopPropagation()">

        <p class="text-gray-800">
          Precisa de ajuda?
        </p>

        <a id="tw-alert-link"
          href="#"
          target="_blank"
          class="mt-4 inline-block rounded-lg bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600">
          Falar no WhatsApp
        </a>

        <button
          class="mt-4 block w-full text-sm text-gray-500 hover:text-gray-700"
          onclick="closeTwAlert()">
          Fechar
        </button>
      </div>
    </div>
  `;

  // injeta no body quando a página carregar
  document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', alertHTML);
  });

  // expõe funções globalmente
  window.showWhatsappAlert = function (phone, message) {
    const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    const alert = document.getElementById('tw-alert');
    const alertLink = document.getElementById('tw-alert-link');

    alertLink.href = link;
    alert.classList.remove('hidden');
    alert.classList.add('flex');
  };

  window.closeTwAlert = function () {
    const alert = document.getElementById('tw-alert');
    alert.classList.add('hidden');
    alert.classList.remove('flex');
  };
})();
