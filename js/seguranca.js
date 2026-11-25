
/* =========================================
   CENTRAL DE SEGURANÇA — BRADION
   Cadastro e gerenciamento de guardiões
   Dados mantidos em memória nesta demonstração.
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

    /* MODAIS */

    function openModal(
        title,
        message,
        actions = [{ label: "Entendi", primary: true }]
    ) {
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

                if (typeof action.onClick === "function") {
                    action.onClick();
                }
            });

            actionArea.appendChild(button);
        });

        modal.append(heading, paragraph, actionArea);
        backdrop.appendChild(modal);
        securityScreen.appendChild(backdrop);
    }

    /* ATIVAÇÃO DO BRADION */

    function setBradionActive(value) {
        bradionActive = value;

        status.textContent = bradionActive
            ? "Ativado"
            : "Desativado";

        activateButton.textContent = bradionActive
            ? "Proteção ativada"
            : "Ativar proteção";

        activateButton.classList.toggle("is-active", bradionActive);
    }

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

                                        openModal(
                                            "Proteção ativada",
                                            "O BRADION está ativo nesta demonstração. Se identificar uma situação de risco, poderá orientar você sobre o que fazer."
                                        );
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
            "Este protótipo usa informações fictícias e não se conecta a sistemas bancários. Os dados inseridos no cadastro de guardiões ficam somente nesta demonstração, no navegador, e não são enviados a um servidor."
        );
    });

    /* ATUALIZAÇÃO DA LISTA DE GUARDIÕES */

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
            avatar.textContent = guardian.name.trim().charAt(0).toUpperCase() || "?";

            const info = document.createElement("div");
            info.className = "guardian-info";

            const name = document.createElement("strong");
            name.textContent = guardian.name || "Guardião";

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

    /* FORMULÁRIO DE CADASTRO OU TROCA */

    function openGuardianForm(replaceIndex = -1) {
        const isReplacing = replaceIndex >= 0;

        const oldGuardian = isReplacing
            ? guardians[replaceIndex]
            : null;

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
                        placeholder="Nome completo do guardião"
                        autocomplete="name"
                    >
                </label>

                <label>
                    Telefone com DDD
                    <input
                        id="guardianPhoneInput"
                        type="tel"
                        maxlength="16"
                        placeholder="(11) 99999-9999"
                        autocomplete="tel"
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
                        autocomplete="off"
                    >
                </label>

                <label>
                    Grau de parentesco
                    <select id="guardianRelationshipInput">
                        <option value="">Selecione</option>
                        <option>Familiar</option>
                        <option>Pai</option>
                        <option>Mãe</option>
                        <option>Filho(a)</option>
                        <option>Irmão(ã)</option>
                        <option>Cônjuge/companheiro(a)</option>
                        <option>Amigo(a)</option>
                        <option>Outro</option>
                    </select>
                </label>

                <div class="demo-modal-actions">
                    <button
                        type="button"
                        class="modal-secondary"
                        id="cancelGuardianButton"
                    >
                        Cancelar
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
            modal.querySelector("#guardianNameInput").value =
                oldGuardian.name;

            phoneInput.value = oldGuardian.phone;
            cpfInput.value = oldGuardian.cpf;

            modal.querySelector("#guardianRelationshipInput").value =
                oldGuardian.relationship;
        }

        /* MÁSCARA DE TELEFONE */

        phoneInput.addEventListener("input", () => {
            let digits = phoneInput.value
                .replace(/\D/g, "")
                .slice(0, 11);

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
                digits = digits.replace(
                    /^(\d{0,2})/,
                    "($1"
                );
            }

            phoneInput.value = digits;
        });

        /* MÁSCARA DE CPF — SEM BLOQUEIO DE CADASTRO */

        cpfInput.addEventListener("input", () => {
            let digits = cpfInput.value
                .replace(/\D/g, "")
                .slice(0, 11);

            if (digits.length > 9) {
                digits = digits.replace(
                    /^(\d{3})(\d{3})(\d{3})(\d{0,2})/,
                    "$1.$2.$3-$4"
                );
            } else if (digits.length > 6) {
                digits = digits.replace(
                    /^(\d{3})(\d{3})(\d{0,3})/,
                    "$1.$2.$3"
                );
            } else if (digits.length > 3) {
                digits = digits.replace(
                    /^(\d{3})(\d{0,3})/,
                    "$1.$2"
                );
            }

            cpfInput.value = digits;
        });

        /* CANCELAR */

        modal.querySelector("#cancelGuardianButton").addEventListener("click", () => {
            backdrop.remove();
        });

        /* SALVAR CADASTRO OU TROCA — SEM VALIDAÇÃO BLOQUEANTE */

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = modal.querySelector("#guardianNameInput")
                .value.trim();

            const phone = phoneInput.value.trim();
            const cpf = cpfInput.value.trim();

            const relationship = modal.querySelector(
                "#guardianRelationshipInput"
            ).value;

            const guardian = {
                name: name || "Guardião",
                phone: phone || "Telefone não informado",
                cpf,
                relationship: relationship || "Não informado"
            };

            const selectedIndex = isReplacing
                ? Number(modal.querySelector("#replaceGuardianSelect").value)
                : -1;

            if (isReplacing) {
                guardians[selectedIndex] = guardian;
            } else if (guardians.length < maxGuardians) {
                guardians.push(guardian);
            } else {
                backdrop.remove();

                openModal(
                    "Limite de guardiões atingido",
                    "Você já cadastrou duas pessoas. Para adicionar outra, escolha qual deseja substituir."
                );

                return;
            }

            backdrop.remove();
            renderGuardians();

            openModal(
                isReplacing ? "Guardião atualizado" : "Guardião cadastrado",
                "O cadastro foi concluído nesta demonstração.",
                [
                    {
                        label: "Continuar na segurança",
                        primary: true
                    }
                ]
            );
        });
    }

    /* GERENCIAMENTO DOS GUARDIÕES */

    manageButton.addEventListener("click", () => {
        if (guardians.length < maxGuardians) {
            openGuardianForm();
            return;
        }

        openModal(
            "Trocar guardião",
            "Você já cadastrou duas pessoas. Para adicionar outra, escolha qual delas deseja substituir.",
            [
                {
                    label: "Cancelar",
                    primary: false
                },
                {
                    label: "Escolher pessoa",
                    primary: true,
                    onClick: () => {
                        openModal(
                            "Quem deseja substituir?",
                            "Escolha qual guardião deseja substituir.",
                            guardians.map((guardian, index) => ({
                                label: guardian.name,
                                primary: index === 0,
                                onClick: () => openGuardianForm(index)
                            }))
                        );
                    }
                }
            ]
        );
    });

    renderGuardians();
})();
