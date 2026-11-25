
/* =========================================
   CENTRAL DE SEGURANÇA — BRADION
========================================= */

(() => {
    const activateButton = document.getElementById("activateBradionButton");
    if (!activateButton) return;

    const status = document.getElementById("bradionStatus");
    const lgpdButton = document.getElementById("lgpdButton");
    const manageButton = document.getElementById("manageGuardiansButton");
    const guardianList = document.getElementById("guardianList");
    const guardianCounter = document.getElementById("guardianCounter");
    const securityScreen = document.getElementById("securityScreen");

    let bradionActive = false;

    const guardians = [];
    const maxGuardians = 2;

    function openModal(title, message, actions = [{ label: "Entendi", primary: true }]) {
        const backdrop = document.createElement("div");
        backdrop.className = "demo-modal-backdrop";

        const modal = document.createElement("section");
        modal.className = "demo-modal";

        const heading = document.createElement("h2");
        heading.textContent = title;

        const paragraph = document.createElement("p");
        paragraph.textContent = message;

        const actionArea = document.createElement("div");
        actionArea.className = "demo-modal-actions";

        actions.forEach((action) => {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = action.label;
            button.className = action.primary
                ? "modal-primary"
                : "modal-secondary";

            button.addEventListener("click", () => {
                backdrop.remove();
                if (typeof action.onClick === "function") action.onClick();
            });

            actionArea.appendChild(button);
        });

        modal.append(heading, paragraph, actionArea);
        backdrop.appendChild(modal);
        securityScreen.appendChild(backdrop);
    }

    function setBradionActive(value) {
        bradionActive = value;

        status.textContent = bradionActive ? "Ativado" : "Desativado";

        activateButton.textContent = bradionActive
            ? "Proteção ativada"
            : "Ativar proteção";

        activateButton.classList.toggle("is-active", bradionActive);
    }

    /* APRESENTAÇÃO DOS GUARDIÕES */

    function showGuardianIntroduction(onContinue) {
        openModal(
            "Seus guardiões",
            "Agora que seu BRADION está ativo, precisamos cadastrar até 2 guardiões para auxiliar você em validações de segurança em caso de suspeita de fraude. Para realizar o cadastro, as pessoas escolhidas precisam ser correntistas do Bradesco.",
            [
                {
                    label: "Agora não",
                    primary: false
                },
                {
                    label: "Continuar",
                    primary: true,
                    onClick: onContinue
                }
            ]
        );
    }

    /* ELEGIBILIDADE DO GUARDIÃO */

    function askGuardianEligibility(onEligible) {
        openModal(
            "Seu guardião é correntista Bradesco?",
            "A pessoa escolhida é cliente Bradesco?",
            [
                {
                    label: "Não",
                    primary: false,
                    onClick: () => {
                        openModal(
                            "Guardião não elegível",
                            "Essa pessoa ainda não é correntista do Bradesco. Para ser cadastrada como guardiã, é necessário abrir uma conta Bradesco. Depois disso, você poderá voltar e realizar o cadastro.",
                            [
                                {
                                    label: "Entendi",
                                    primary: true
                                }
                            ]
                        );
                    }
                },
                {
                    label: "Sim",
                    primary: true,
                    onClick: onEligible
                }
            ]
        );
    }

    /* INICIAR CADASTRO DE GUARDIÃO */

    function startGuardianRegistration(replaceIndex = -1) {
        showGuardianIntroduction(() => {
            askGuardianEligibility(() => {
                openGuardianForm(replaceIndex);
            });
        });
    }

    /* ATIVAÇÃO DO BRADION */

    activateButton.addEventListener("click", () => {
        if (bradionActive) {
            openModal(
                "Desativar proteção?",
                "O BRADION deixará de acompanhar os sinais de risco nesta demonstração.",
                [
                    {
                        label: "Manter ativa",
                        primary: false
                    },
                    {
                        label: "Desativar",
                        primary: true,
                        onClick: () => setBradionActive(false)
                    }
                ]
            );
            return;
        }

        openModal(
            "Ativar o BRADION",
            "O Modo Guardião ajuda a identificar situações suspeitas e pode orientar você durante uma possível tentativa de golpe.",
            [
                {
                    label: "Agora não",
                    primary: false
                },
                {
                    label: "Continuar",
                    primary: true,
                    onClick: () => {
                        openModal(
                            "Como funciona?",
                            "O sistema reúne sinais de risco, como comportamento incomum na sessão, uma chave Pix nova e indícios de pressão durante uma conversa.",
                            [
                                {
                                    label: "Voltar",
                                    primary: false
                                },
                                {
                                    label: "Ativar proteção",
                                    primary: true,
                                    onClick: () => {
                                        setBradionActive(true);
                                        startGuardianRegistration();
                                    }
                                }
                            ]
                        );
                    }
                }
            ]
        );
    });

    /* PRIVACIDADE E LGPD */

    lgpdButton.addEventListener("click", () => {
        openModal(
            "Privacidade e LGPD",
            "Este protótipo usa informações fictícias e não se conecta a sistemas bancários. Os dados inseridos no cadastro de guardiões ficam somente nesta demonstração e não são enviados a um servidor."
        );
    });

    /* LISTA DE GUARDIÕES */

    function renderGuardians() {
        guardianCounter.textContent =
            `${guardians.length} de ${maxGuardians} cadastrados`;

        guardianList.innerHTML = "";

        if (guardians.length === 0) {
            guardianList.innerHTML = `
                <div class="guardian-empty">
                    <div class="guardian-empty-icon">♙</div>
                    <strong>Você ainda não tem um guardião</strong>
                    <p>Cadastre alguém de confiança para ajudar na sua proteção.</p>
                </div>
            `;

            manageButton.textContent = "+ Adicionar guardião";
            return;
        }

        guardians.forEach((guardian) => {
            const item = document.createElement("article");
            item.className = "guardian-item";

            const avatar = document.createElement("div");
            avatar.className = "guardian-avatar";
            avatar.textContent = guardian.name.trim().charAt(0).toUpperCase();

            const info = document.createElement("div");
            info.className = "guardian-info";

            const name = document.createElement("strong");
            name.textContent = guardian.name;

            const details = document.createElement("small");
            details.textContent =
                `${guardian.phone} • ${guardian.relationship}`;

            const active = document.createElement("span");
            active.className = "guardian-active";
            active.textContent = "Cadastrado";

            info.append(name, details);
            item.append(avatar, info, active);

            guardianList.appendChild(item);
        });

        manageButton.textContent = guardians.length === 1
            ? "+ Adicionar segundo guardião"
            : "Trocar guardião";
    }

    /* FORMULÁRIO DE CADASTRO */

    function openGuardianForm(replaceIndex = -1) {
        const isReplacing = replaceIndex >= 0;
        const oldGuardian = isReplacing ? guardians[replaceIndex] : null;

        const backdrop = document.createElement("div");
        backdrop.className = "demo-modal-backdrop";

        const modal = document.createElement("section");
        modal.className = "demo-modal";

        modal.innerHTML = `
            <h2>${isReplacing ? "Trocar guardião" : "Adicionar guardião"}</h2>

            <p>
                ${isReplacing
                    ? "Informe os dados da nova pessoa que ficará no lugar do guardião selecionado."
                    : "Cadastre uma pessoa de confiança para fazer parte do seu Modo Guardião."
                }
            </p>

            <form class="guardian-form" novalidate>

                ${isReplacing ? `
                    <label>
                        Quem deseja substituir?
                        <select id="replaceGuardianSelect">
                            ${guardians.map((guardian, index) => `
                                <option value="${index}" ${index === replaceIndex ? "selected" : ""}>
                                    ${guardian.name.replace(/</g, "&lt;")}
                                </option>
                            `).join("")}
                        </select>
                    </label>
                ` : ""}

                <label>
                    Nome completo
                    <input
                        id="guardianNameInput"
                        type="text"
                        maxlength="60"
                        placeholder="Nome do guardião"
                        required
                    >
                </label>

                <label>
                    Telefone
                    <input
                        id="guardianPhoneInput"
                        type="tel"
                        maxlength="16"
                        placeholder="(11) 99999-9999"
                        required
                    >
                </label>

                <label>
                    CPF
                    <input
                        id="guardianCpfInput"
                        type="text"
                        inputmode="numeric"
                        maxlength="14"
                        placeholder="000.000.000-00"
                    >
                </label>

                <label>
                    Grau de parentesco
                    <select id="guardianRelationshipInput" required>
                        <option value="">Selecione</option>
                        <option>Familiar</option>
                        <option>Amigo(a)</option>
                        <option>Cônjuge/companheiro(a)</option>
                        <option>Outro</option>
                    </select>
                </label>

                <p class="form-error" id="guardianFormError">
                    Confira o nome, o telefone e o grau de parentesco.
                </p>

                <div class="demo-modal-actions">
                    <button
                        type="button"
                        class="modal-secondary"
                        id="cancelGuardianButton"
                    >
                        Fechar
                    </button>

                    <button type="submit" class="modal-primary">
                        ${isReplacing ? "Salvar troca" : "Cadastrar"}
                    </button>
                </div>
            </form>
        `;

        backdrop.appendChild(modal);
        securityScreen.appendChild(backdrop);

        const form = modal.querySelector(".guardian-form");
        const phoneInput = modal.querySelector("#guardianPhoneInput");
        const cpfInput = modal.querySelector("#guardianCpfInput");

        if (oldGuardian) {
            modal.querySelector("#guardianNameInput").value = oldGuardian.name;
            phoneInput.value = oldGuardian.phone;
            cpfInput.value = oldGuardian.cpf || "";

            modal.querySelector("#guardianRelationshipInput").value =
                oldGuardian.relationship;
        }

        /* MÁSCARA DE TELEFONE */

        phoneInput.addEventListener("input", () => {
            let digits = phoneInput.value.replace(/\D/g, "").slice(0, 11);

            if (digits.length > 10) {
                digits = digits.replace(
                    /^(\d{2})(\d{5})(\d{0,4}).*/,
                    "($1) $2-$3"
                );
            } else if (digits.length > 6) {
                digits = digits.replace(
                    /^(\d{2})(\d{4})(\d{0,4}).*/,
                    "($1) $2-$3"
                );
            } else if (digits.length > 2) {
                digits = digits.replace(
                    /^(\d{2})(\d{0,5})/,
                    "($1) $2"
                );
            } else if (digits.length > 0) {
                digits = digits.replace(/^(\d{0,2})/, "($1");
            }

            phoneInput.value = digits;
        });

        /* MÁSCARA DE CPF — SEM BLOQUEIO */

        cpfInput.addEventListener("input", () => {
            let digits = cpfInput.value.replace(/\D/g, "").slice(0, 11);

            if (digits.length > 9) {
                digits = digits.replace(
                    /^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/,
                    "$1.$2.$3-$4"
                );
            } else if (digits.length > 6) {
                digits = digits.replace(
                    /^(\d{3})(\d{3})(\d{0,3}).*/,
                    "$1.$2.$3"
                );
            } else if (digits.length > 3) {
                digits = digits.replace(
                    /^(\d{3})(\d{0,3}).*/,
                    "$1.$2"
                );
            }

            cpfInput.value = digits;
        });

        /* FECHAR FORMULÁRIO */

        modal.querySelector("#cancelGuardianButton").addEventListener("click", () => {
            backdrop.remove();
        });

        /* SALVAR CADASTRO */

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = modal.querySelector("#guardianNameInput").value.trim();
            const phone = phoneInput.value.trim();
            const cpf = cpfInput.value.trim();

            const relationship = modal.querySelector(
                "#guardianRelationshipInput"
            ).value;

            const phoneDigits = phone.replace(/\D/g, "");

            if (
                name.length < 3 ||
                phoneDigits.length < 10 ||
                !relationship
            ) {
                modal.querySelector("#guardianFormError").style.display = "block";
                return;
            }

            const guardian = {
                name,
                phone,
                cpf,
                relationship,
                bradesco: true
            };

            const selectedIndex = isReplacing
                ? Number(modal.querySelector("#replaceGuardianSelect").value)
                : -1;

            if (isReplacing) {
                guardians[selectedIndex] = guardian;
            } else if (guardians.length < maxGuardians) {
                guardians.push(guardian);
            }

            backdrop.remove();
            renderGuardians();

            openModal(
                isReplacing ? "Guardião atualizado" : "Guardião cadastrado",
                isReplacing
                    ? "Os dados do guardião foram atualizados nesta demonstração."
                    : "O cadastro foi concluído nesta demonstração.",
                [{ label: "Continuar na segurança", primary: true }]
            );
        });
    }

    /* GERENCIAMENTO DOS GUARDIÕES */

    manageButton.addEventListener("click", () => {
        if (guardians.length < maxGuardians) {
            startGuardianRegistration();
            return;
        }

        openModal(
            "Trocar guardião",
            "Você já cadastrou duas pessoas. Para adicionar outra, escolha qual delas deseja substituir.",
            [
                { label: "Cancelar", primary: false },
                {
                    label: "Escolher pessoa",
                    primary: true,
                    onClick: () => askGuardianEligibilityForReplacement()
                }
            ]
        );
    });

    function askGuardianEligibilityForReplacement() {
        openModal(
            "Escolher guardião",
            "Qual dos guardiões você deseja substituir?",
            [
                {
                    label: guardians[0].name,
                    primary: false,
                    onClick: () => startGuardianRegistration(0)
                },
                {
                    label: guardians[1].name,
                    primary: true,
                    onClick: () => startGuardianRegistration(1)
                }
            ]
        );
    }

    renderGuardians();
})();
