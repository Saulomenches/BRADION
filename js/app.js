
/* =========================================
   BRADION — NAVEGAÇÃO E INTERAÇÕES
   Proteção Pix + Painel do Guardião
========================================= */

const loginScreen = document.getElementById("loginScreen");
const homeScreen = document.getElementById("homeScreen");
const securityScreen = document.getElementById("securityScreen");
const pixScreen = document.getElementById("pixScreen");

let protectionScreen;
let guardianScreen;
let riskAcknowledged = false;

const allScreens = [loginScreen, homeScreen, securityScreen, pixScreen];

function showScreen(screen) {
    allScreens.forEach(item => item?.classList.add("hidden"));
    protectionScreen?.classList.add("hidden");
    guardianScreen?.classList.add("hidden");

    if (screen) screen.classList.remove("hidden");
}

/* =========================================
   ESCUDOS DE SEGURANÇA
   Mantém os logos BRADION separados.
========================================= */

const shieldWhite = `
<svg viewBox="0 0 32 36" aria-hidden="true">
    <path d="M16 2 29 7v9c0 8-5.5 14-13 18C8.5 30 3 24 3 16V7L16 2Z"
        fill="none" stroke="#fff" stroke-width="2.5"
        stroke-linejoin="round"/>
    <path d="m10 17 4 4 8-9"
        fill="none" stroke="#fff" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const shieldPink = `
<svg viewBox="0 0 32 36" aria-hidden="true">
    <path d="M16 2 29 7v9c0 8-5.5 14-13 18C8.5 30 3 24 3 16V7L16 2Z"
        fill="none" stroke="#d41450" stroke-width="2.5"
        stroke-linejoin="round"/>
    <path d="m10 17 4 4 8-9"
        fill="none" stroke="#d41450" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function restoreSecurityShields() {
    const headerShield = document.querySelector(".security-header-logo");

    if (headerShield) {
        const wrapper = document.createElement("span");
        wrapper.className = "security-header-logo shield-header-icon";
        wrapper.innerHTML = shieldWhite;
        headerShield.replaceWith(wrapper);
    }

    document.querySelectorAll(".security-feature-card .feature-icon").forEach(icon => {
        icon.innerHTML = shieldPink;
        icon.classList.add("shield-feature-icon");
    });
}

restoreSecurityShields();

/* =========================================
   ESTILOS DAS TELAS DE ALERTA
========================================= */

const extraStyles = document.createElement("style");

extraStyles.textContent = `
    .bradion-extra-screen {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 430px;
        min-height: 100vh;
        min-height: 100dvh;
        height: 100vh;
        height: 100dvh;
        margin: 0 auto;
        padding: 0 20px 28px;
        overflow-y: auto;
        color: #40142d;
        background: linear-gradient(
            160deg,
            #f00058 0%,
            #df004e 24%,
            #c0004b 48%,
            #ad0750 70%,
            #970044 100%
        );
        scrollbar-width: none;
    }

    .bradion-extra-screen::-webkit-scrollbar {
        display: none;
    }

    .extra-topbar {
        min-height: 58px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0 -20px;
        padding: 0 20px;
        color: #fff;
        background: rgba(105, 0, 43, .30);
        border-bottom: 1px solid rgba(255,255,255,.17);
    }

    .extra-back {
        width: 35px;
        height: 42px;
        color: white;
        background: transparent;
        font-size: 30px;
    }

    .extra-topbar strong {
        font-size: 15px;
        font-weight: 700;
    }

    .extra-brand {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0 17px;
        padding: 14px 10px;
        background: rgba(255,255,255,.97);
        border-radius: 20px;
        box-shadow: 0 7px 20px rgba(80,0,35,.17);
    }

    .extra-brand img {
        width: 65px;
        height: 65px;
        object-fit: contain;
    }

    .extra-brand strong {
        margin-top: 4px;
        color: #a90048;
        font-size: 18px;
    }

    .extra-brand span {
        color: #9c536f;
        font-size: 11px;
    }

    .extra-title {
        margin: 0;
        color: #fff;
        font-size: 25px;
        line-height: 1.2;
        text-align: center;
        text-shadow: 0 2px 8px rgba(80,0,35,.25);
    }

    .extra-description {
        margin: 11px 0 20px;
        color: #fff;
        font-size: 13px;
        line-height: 1.55;
        text-align: center;
    }

    .extra-card {
        padding: 18px;
        background: #fffafd;
        border: 1px solid rgba(255,255,255,.9);
        border-radius: 21px;
        box-shadow: 0 9px 25px rgba(70,0,32,.22);
    }

    .extra-footer {
        margin-top: auto;
        padding-top: 24px;
        color: rgba(255,255,255,.92);
        font-size: 10px;
        line-height: 1.6;
        text-align: center;
    }

    .protection-progress {
        height: 9px;
        width: 100%;
        margin-bottom: 20px;
        overflow: hidden;
        background: rgba(255,255,255,.30);
        border-radius: 20px;
    }

    .protection-progress span {
        display: block;
        width: 75%;
        height: 100%;
        background: #fff;
        border-radius: inherit;
    }

    .protection-audio {
        width: 100%;
        min-height: 49px;
        color: #ad0048;
        background: #fff;
        border: 1px solid #f4d3e0;
        border-radius: 26px;
        font-size: 14px;
        font-weight: 800;
        box-shadow: 0 4px 12px rgba(120,0,48,.10);
    }

    .protection-question {
        margin: 21px 0 8px;
        color: #57102f;
        font-size: 16px;
        text-align: center;
    }

    .protection-question-help {
        color: #765466;
        font-size: 12px;
        line-height: 1.5;
        text-align: center;
    }

    .protection-answer-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 11px;
        margin-top: 16px;
    }

    .protection-answer {
        min-height: 45px;
        color: #a90048;
        background: #fff;
        border: 1.5px solid #c6004d;
        border-radius: 24px;
        font-weight: 800;
    }

    .protection-answer.selected {
        color: #fff;
        background: #b60049;
    }

    .protection-feedback,
    .guardian-decision-feedback {
        display: none;
        margin-top: 14px;
        padding: 14px;
        color: #6e2948;
        background: #fff0f5;
        border-radius: 12px;
        font-size: 12px;
        line-height: 1.6;
    }

    .protection-feedback.visible,
    .guardian-decision-feedback.visible {
        display: block;
    }

    .protection-callout {
        display: flex;
        gap: 12px;
        margin-top: 18px;
        padding: 14px;
        color: #702442;
        background: #fce1eb;
        border: 1px solid #f4bfd2;
        border-radius: 14px;
        font-size: 12px;
        line-height: 1.55;
    }

    .protection-callout strong {
        display: block;
        margin-bottom: 4px;
        color: #a90048;
    }

    .protection-action {
        width: 100%;
        min-height: 51px;
        margin-top: 13px;
        border-radius: 28px;
        font-size: 14px;
        font-weight: 800;
    }

    .protection-cancel {
        color: #a90048;
        background: #fff;
        border: 1.5px solid #fff;
        box-shadow: 0 4px 12px rgba(120,0,48,.12);
    }

    .protection-guardian {
        color: #fff;
        background: linear-gradient(100deg, #f00058, #a90048);
        border: 1px solid rgba(255,255,255,.35);
        box-shadow: 0 5px 14px rgba(120,0,48,.20);
    }

    .protection-continue {
        display: none;
        color: #fff;
        background: linear-gradient(100deg, #0aa984, #087e69);
        box-shadow: 0 5px 14px rgba(8,126,105,.18);
    }

    .protection-continue.visible {
        display: block;
    }

    /* PAINEL DO GUARDIÃO */

    .guardian-screen {
        padding-bottom: max(30px, env(safe-area-inset-bottom));
    }

    .guardian-header {
        min-height: 112px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        margin: 0 -20px;
        padding: 20px 24px 25px;
        color: white;
        background: linear-gradient(120deg, #f00058, #bd0b48 60%, #79002f);
        border-radius: 0 0 25px 25px;
    }

    .guardian-header-line {
        display: flex;
        align-items: center;
        gap: 13px;
    }

    .guardian-header-line img {
        width: 52px;
        height: 52px;
        object-fit: contain;
    }

    .guardian-header-line strong {
        font-size: 16px;
        line-height: 1.4;
    }

    .guardian-header small {
        display: block;
        margin-top: 5px;
        color: rgba(255,255,255,.85);
        font-size: 11px;
    }

    .guardian-risk-card {
        margin-top: 18px;
        padding: 17px 14px;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 5px 16px rgba(110,0,48,.10);
    }

    .guardian-risk-label {
        margin-bottom: 13px;
        color: #765466;
        font-size: 12px;
        font-weight: 700;
        text-align: center;
    }

    .guardian-risk-levels {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 7px;
    }

    .guardian-risk-level {
        padding: 11px 4px;
        color: #765466;
        background: #f5f0f3;
        border-radius: 22px;
        font-size: 11px;
        text-align: center;
    }

    .guardian-risk-level.critical {
        color: #fff;
        background: linear-gradient(100deg, #ed145b, #a90048);
        font-weight: 800;
    }

    .guardian-alert-card {
        margin-top: 20px;
        padding: 19px;
        background: #fff;
        border: 1px solid #f0dce5;
        border-radius: 20px;
        box-shadow: 0 5px 17px rgba(110,0,48,.08);
    }

    .guardian-live-label {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 8px 12px;
        color: #b00042;
        background: #fde7ef;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 800;
    }

    .guardian-alert-title {
        margin: 15px 0 8px;
        color: #341827;
        font-size: 21px;
        line-height: 1.3;
    }

    .guardian-alert-description {
        margin: 0;
        color: #594653;
        font-size: 14px;
        line-height: 1.55;
    }

    .guardian-privacy {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-top: 18px;
        padding: 15px;
        color: #5d4a59;
        background: #f4eff5;
        border: 1px solid #e9dfea;
        border-radius: 14px;
        font-size: 12px;
        line-height: 1.6;
    }

    .guardian-privacy-icon {
        color: #8e315b;
        font-size: 22px;
    }

    .guardian-actions {
        display: flex;
        flex-direction: column;
        gap: 13px;
        margin-top: 24px;
    }

    .guardian-action {
        width: 100%;
        min-height: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 28px;
        color: white;
        font-size: 15px;
        font-weight: 800;
    }

    .guardian-block {
        background: linear-gradient(100deg, #ed145b, #b00043);
        box-shadow: 0 4px 12px rgba(176,0,67,.18);
    }

    .guardian-confirm {
        background: linear-gradient(100deg, #0aa984, #087e69);
        box-shadow: 0 4px 12px rgba(8,126,105,.16);
    }

    .guardian-decision-feedback {
        margin-top: 16px;
    }

    .guardian-return {
        width: 100%;
        min-height: 44px;
        margin-top: 14px;
        color: #fff;
        background: transparent;
        font-size: 13px;
        font-weight: 700;
    }

    /* ESCUDOS NA CENTRAL DE SEGURANÇA */

    .shield-header-icon {
        width: 34px;
        height: 38px;
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .shield-header-icon svg {
        width: 30px;
        height: 34px;
    }

    .shield-feature-icon {
        display: grid;
        place-items: center;
    }

    .shield-feature-icon svg {
        width: 25px;
        height: 29px;
    }

    @media (max-height: 740px) {
        .extra-brand {
            margin: 12px 0;
            padding: 9px;
        }

        .extra-brand img {
            width: 52px;
            height: 52px;
        }

        .extra-title {
            font-size: 22px;
        }

        .extra-card {
            padding: 14px;
        }
    }
`;

document.head.appendChild(extraStyles);

/* =========================================
   SOM DE ALERTA
========================================= */

function playWarningSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const context = new AudioContext();

        function playTone(frequency, start, duration) {
            const oscillator = context.createOscillator();
            const gain = context.createGain();

            oscillator.type = "sine";
            oscillator.frequency.value = frequency;

            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(0.12, start + 0.025);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

            oscillator.connect(gain);
            gain.connect(context.destination);

            oscillator.start(start);
            oscillator.stop(start + duration);
        }

        const now = context.currentTime;
        playTone(740, now, 0.16);
        playTone(520, now + 0.20, 0.20);

        window.setTimeout(() => context.close(), 700);
    } catch (error) {
        // O alerta visual permanece disponível se o áudio for bloqueado.
    }
}

/* =========================================
   TELA DE PAUSA PARA SEGURANÇA
========================================= */

protectionScreen = document.createElement("section");
protectionScreen.id = "protectionScreen";
protectionScreen.className = "screen bradion-extra-screen hidden";

protectionScreen.innerHTML = `
    <header class="extra-topbar">
        <button class="extra-back" id="protectionBackButton" aria-label="Voltar">‹</button>
        <strong>ALERTA DE SEGURANÇA</strong>
    </header>

    <div class="extra-brand">
        <img src="assets/img/logo-bradion.png" alt="Logo BRADION">
        <strong>BRADION</strong>
        <span>Modo Guardião</span>
    </div>

    <h1 class="extra-title">Pausa rápida para sua segurança</h1>

    <p class="extra-description">
        Identificamos alguns sinais que merecem sua atenção
        antes de continuar com este Pix.
    </p>

    <div class="protection-progress"><span></span></div>

    <div class="extra-card">
        <button class="protection-audio" id="listenProtectionButton">
            <svg viewBox="0 0 24 24" width="22" height="22"
                aria-hidden="true" focusable="false"
                style="vertical-align: middle; margin-right: 7px;">
                <path d="M4 9v6h4l5 4V5L8 9H4Z"
                    fill="currentColor" stroke="currentColor"
                    stroke-width="1.2" stroke-linejoin="round"/>
                <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"
                    fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round"/>
            </svg>
            Ouvir orientação
        </button>

        <h2 class="protection-question">
            Alguém pediu para você fazer este Pix?
        </h2>

        <p class="protection-question-help">
            Por exemplo, alguém dizendo que precisa transferir
            seu dinheiro para proteger sua conta?
        </p>

        <div class="protection-answer-buttons">
            <button class="protection-answer" data-answer="yes">Sim</button>
            <button class="protection-answer" data-answer="no">Não</button>
        </div>

        <div class="protection-feedback" id="protectionAnswerFeedback"></div>

        <button class="protection-action protection-continue" id="continuePixButton">
            Continuar com o Pix
        </button>

        <div class="protection-callout">
            <span>☎</span>
            <div>
                <strong>Atenção à ligação</strong>
                Se alguém estiver orientando você, não compartilhe
                códigos ou senhas. Encerre a ligação antes de continuar.
            </div>
        </div>

        <button class="protection-action protection-cancel" id="cancelProtectedPixButton">
            Cancelar Pix
        </button>

        <button class="protection-action protection-guardian" id="contactGuardianButton">
            Falar com meu Guardião
        </button>
    </div>

    <p class="extra-footer">BRADION · Modo Guardião · Ambiente demonstrativo</p>
`;

document.getElementById("app").appendChild(protectionScreen);

/* =========================================
   PAINEL DO GUARDIÃO
========================================= */

guardianScreen = document.createElement("section");
guardianScreen.id = "guardianScreen";
guardianScreen.className = "screen bradion-extra-screen guardian-screen hidden";

guardianScreen.innerHTML = `
    <header class="guardian-header">
        <div class="guardian-header-line">
            <img src="assets/img/logo-bradion.png" alt="Logo BRADION">
            <div>
                <strong>BRADION · Painel do Guardião</strong>
                <small>Modo Guardião · Alerta de segurança</small>
            </div>
        </div>
    </header>

    <div class="guardian-risk-card">
        <div class="guardian-risk-label">Nível de risco identificado</div>
        <div class="guardian-risk-levels">
            <div class="guardian-risk-level">Normal</div>
            <div class="guardian-risk-level">Atenção</div>
            <div class="guardian-risk-level critical">Risco Crítico</div>
        </div>
    </div>

    <div class="guardian-alert-card">
        <div class="guardian-live-label">
            <span>ϟ</span> Alerta em tempo real
        </div>

        <h1 class="guardian-alert-title">
            Alerta de risco alto em tentativa de Pix
        </h1>

        <p class="guardian-alert-description">
            A titular solicitou sua confirmação para uma tentativa
            de transferência.
        </p>

        <div class="guardian-privacy">
            <span class="guardian-privacy-icon">♙</span>
            <div>
                <strong>Privacidade LGPD</strong><br>
                Valor, saldo e dados do recebedor permanecem ocultos
                para proteger as informações da titular.
            </div>
        </div>
    </div>

    <div class="guardian-actions">
        <button class="guardian-action guardian-block" id="suggestBlockButton">
            <span>♧</span> Sugerir Bloqueio
        </button>

        <button class="guardian-action guardian-confirm" id="confirmSecurityButton">
            <span>♧</span> Confirmar Segurança
        </button>
    </div>

    <div class="guardian-decision-feedback" id="guardianDecisionFeedback"
        aria-live="polite"></div>

    <p class="extra-footer">
        Retorno em até 3 min · Apoio automático BIA no WhatsApp<br>
        Informações ilustrativas desta demonstração.
    </p>

    <button class="guardian-return" id="guardianReturnButton">
        Voltar à tela de proteção
    </button>
`;

document.getElementById("app").appendChild(guardianScreen);

/* =========================================
   NAVEGAÇÃO DAS TELAS EXTRAS
========================================= */

function openProtectionScreen() {
    showScreen(protectionScreen);
    protectionScreen.scrollTop = 0;

    document.getElementById("protectionAnswerFeedback")
        .classList.remove("visible");

    document.getElementById("continuePixButton")
        .classList.remove("visible");

    document.querySelectorAll(".protection-answer").forEach(item => {
        item.classList.remove("selected");
    });

    playWarningSound();
}

function openGuardianScreen() {
    showScreen(guardianScreen);
    guardianScreen.scrollTop = 0;

    document.getElementById("guardianDecisionFeedback")
        .classList.remove("visible");
}

document.getElementById("protectionBackButton").addEventListener("click", () => {
    showScreen(pixScreen);
});

document.getElementById("contactGuardianButton").addEventListener("click", openGuardianScreen);

document.getElementById("guardianReturnButton").addEventListener("click", openProtectionScreen);

/* =========================================
   RESPOSTA SIM / NÃO
========================================= */

document.querySelectorAll(".protection-answer").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".protection-answer").forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        const feedback = document.getElementById("protectionAnswerFeedback");
        const continueButton = document.getElementById("continuePixButton");

        if (button.dataset.answer === "yes") {
            feedback.textContent =
                "Atenção: se alguém pediu que você fizesse esta transferência, " +
                "não continue sob pressão. Recomendamos cancelar o Pix e procurar " +
                "um canal oficial do banco.";

            continueButton.classList.remove("visible");
        } else {
            feedback.textContent =
                "Obrigado por responder. Se você reconhece o destinatário, " +
                "entende o motivo da transferência e está agindo por vontade própria, " +
                "pode revisar os dados antes de continuar.";

            continueButton.classList.add("visible");
        }

        feedback.classList.add("visible");
    });
});

/* =========================================
   CONTINUAR COM O PIX
========================================= */

document.getElementById("continuePixButton").addEventListener("click", () => {
    riskAcknowledged = true;

    const notice = document.querySelector(".pix-demo-notice");
    const reviewButton = document.getElementById("reviewPixButton");

    showScreen(pixScreen);

    if (notice) {
        notice.textContent =
            "Você revisou o alerta BRADION. Confira novamente os dados antes de concluir. " +
            "Esta é uma demonstração: nenhum Pix será enviado.";
    }

    if (reviewButton) {
        reviewButton.textContent = "Concluir simulação";
    }
});

/* =========================================
   ORIENTAÇÃO EM ÁUDIO
========================================= */

document.getElementById("listenProtectionButton").addEventListener("click", () => {
    const orientation =
        "Atenção. Antes de continuar, queremos ajudar você a se proteger. " +
        "Alguém pediu para você fazer este Pix? " +
        "Se alguém estiver ao telefone orientando a transferência, " +
        "não compartilhe senhas ou códigos. " +
        "Na dúvida, cancele a transferência e fale com uma pessoa de confiança.";

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(orientation);
        speech.lang = "pt-BR";
        speech.rate = 0.92;

        window.speechSynthesis.speak(speech);
    }
});

/* =========================================
   CANCELAR PIX
========================================= */

document.getElementById("cancelProtectedPixButton").addEventListener("click", () => {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    riskAcknowledged = false;
    showScreen(homeScreen);
});

/* =========================================
   DECISÕES DO GUARDIÃO
========================================= */

const decisionFeedback = document.getElementById("guardianDecisionFeedback");

document.getElementById("suggestBlockButton").addEventListener("click", () => {
    decisionFeedback.innerHTML = `
        <strong>Sugestão de bloqueio registrada nesta demonstração.</strong><br>
        A titular deverá ser orientada a interromper a transferência
        e conferir a situação pelos canais oficiais do banco.
        Nenhum bloqueio real foi realizado.
    `;

    decisionFeedback.classList.add("visible");
});

document.getElementById("confirmSecurityButton").addEventListener("click", () => {
    decisionFeedback.innerHTML = `
        <strong>Confirmação registrada nesta demonstração.</strong><br>
        O Guardião confirmou que reconhece a situação.
        A titular ainda deve conferir os dados e decidir se deseja continuar.
        Nenhuma transferência foi autorizada ou realizada.
    `;

    decisionFeedback.classList.add("visible");
});

/* =========================================
   NAVEGAÇÃO PRINCIPAL
========================================= */

document.getElementById("enterButton").addEventListener("click", () => showScreen(homeScreen));
document.getElementById("logoutButton").addEventListener("click", () => showScreen(loginScreen));
document.getElementById("securityButton").addEventListener("click", () => showScreen(securityScreen));
document.getElementById("backHomeButton").addEventListener("click", () => showScreen(homeScreen));
document.getElementById("securityNavHome").addEventListener("click", () => showScreen(homeScreen));

/* =========================================
   NAVEGAÇÃO PIX
========================================= */

function openPixScreen() {
    showScreen(pixScreen);
}

document.getElementById("pixButton").addEventListener("click", openPixScreen);
document.getElementById("securityNavPix").addEventListener("click", openPixScreen);
document.getElementById("pixBackButton").addEventListener("click", () => showScreen(homeScreen));
document.getElementById("pixBackHomeButton").addEventListener("click", () => showScreen(homeScreen));

document.querySelectorAll('.login-quick-access [data-action="pix"]').forEach(item => {
    item.addEventListener("click", openPixScreen);
});

/* =========================================
   CONTINUAR / CONCLUIR TRANSFERÊNCIA
========================================= */

document.getElementById("reviewPixButton").addEventListener("click", () => {
    const amount = document.getElementById("pixAmount").value.trim();
    const key = document.getElementById("pixKey").value.trim();
    const notice = document.querySelector(".pix-demo-notice");
    const reviewButton = document.getElementById("reviewPixButton");

    if (!amount || !key) {
        if (notice) {
            notice.textContent = "Confira os dados da transferência antes de continuar.";
        }
        return;
    }

    if (riskAcknowledged) {
        if (notice) {
            notice.textContent =
                "Simulação concluída. Você revisou os dados e o alerta de segurança. " +
                "Nenhum Pix real foi enviado.";
        }

        reviewButton.textContent = "Simulação concluída";
        reviewButton.disabled = true;
        reviewButton.style.opacity = ".7";
        return;
    }

    openProtectionScreen();
});

/* =========================================
   MOSTRAR E OCULTAR SALDO
========================================= */

let balanceVisible = false;

const balanceValue = document.getElementById("balanceValue");
const eyeIcon = document.getElementById("eyeIcon");

document.getElementById("toggleBalance").addEventListener("click", () => {
    balanceVisible = !balanceVisible;

    balanceValue.classList.toggle("masked", !balanceVisible);

    eyeIcon.innerHTML = balanceVisible
        ? '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'
        : '<path d="M3 3l18 18M10.6 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 3.8M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7c1.5 0 2.8-.3 4-.8"/>';
});

/* =========================================
   AÇÕES DEMONSTRATIVAS
========================================= */

const demoMessages = {
    menuButton: "Menu demonstrativo.",
    notificationButton: "Notificações demonstrativas.",
    accountButton: "Conta demonstrativa selecionada.",
    otherAccountButton: "Troca de conta: demonstração.",
    homeNotifications: "Você não possui notificações nesta demonstração.",
    biaButton: "Olá! Eu sou a BIA. Como posso ajudar?",
    statementButton: "Extrato demonstrativo.",
    payButton: "Área de pagamentos: demonstração.",
    piggyButton: "Área de cofrinhos: demonstração."
};

Object.entries(demoMessages).forEach(([id, message]) => {
    const element = document.getElementById(id);

    if (element) {
        element.addEventListener("click", () => alert(message));
    }
});

document.getElementById("securityNavMenu").addEventListener("click", () => {
    alert("Menu demonstrativo.");
});

/* =========================================
   ATALHOS DA TELA DE LOGIN
========================================= */

document.querySelectorAll(".login-quick-access .quick-item").forEach(item => {
    item.addEventListener("click", () => {
        const action = item.dataset.action;

        if (action === "pix") {
            openPixScreen();
            return;
        }

        const messages = {
            "security-key": "Chave de Segurança: demonstração.",
            bia: "Assistente BIA: demonstração."
        };

        alert(messages[action] || "Demonstração.");
    });
});

/* =========================================
   NAVEGAÇÃO INFERIOR DA HOME
========================================= */

document.querySelectorAll(".bottom-nav-item[data-tab]").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".bottom-nav-item[data-tab]").forEach(navItem => {
            navItem.classList.remove("active");
        });

        item.classList.add("active");

        const messages = {
            shop: "Área Shop: demonstração.",
            profile: "Área Perfil: demonstração.",
            services: "Área de Serviços: demonstração."
        };

        if (messages[item.dataset.tab]) {
            alert(messages[item.dataset.tab]);
        }
    });
});

/* =========================================
   SERVIÇOS DA HOME
========================================= */

document.querySelectorAll(".service-item").forEach(item => {
    item.addEventListener("click", () => {
        alert("Serviço demonstrativo.");
    });
});
