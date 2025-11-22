(function () {
  const SUPABASE_URL = "https://xshxhfexvvzrrqllhrvp.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzaHhoZmV4dnZ6cnJxbGxocnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1ODU4MjUsImV4cCI6MjA3OTE2MTgyNX0.stCbU3Db73PueHgO4T10wObDdd6HJvE_DE-CTTLedGQ";

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // ------- TRADUCCIONES (las mismas que ya tenías) -------
  const translations = { /* TODO: pega aquí tu objeto gigante de traducciones ES/EN tal cual */ };

  let currentLang = "es";

  function t(key) {
    const langPack = translations[currentLang] || {};
    return Object.prototype.hasOwnProperty.call(langPack, key) ? langPack[key] : key;
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key));
    });

    const membershipOptions = document.querySelectorAll("#membership option");
    membershipOptions.forEach((opt) => {
      const key = opt.getAttribute("data-i18n");
      if (key) opt.textContent = t(key);
    });
  }

  const items = document.querySelectorAll(".service-qty");
  const summaryList = document.getElementById("summary-list");
  const totalAmount = document.getElementById("total-amount");
  const discountLabel = document.getElementById("discount-label");
  const upsellNote = document.getElementById("upsell-note");
  const whatsappLink = document.getElementById("whatsapp-link");
  const membershipSelect = document.getElementById("membership");
  const langSelect = document.getElementById("lang-select");

  const membershipCodeInput = document.getElementById("membership-code");
  const membershipCodeStatus = document.getElementById("membership-code-status");

  const accountBox = document.getElementById("account-create-box");
  const signupEmail = document.getElementById("signup-email");
  const signupPassword = document.getElementById("signup-password");
  const signupArtist = document.getElementById("signup-artist");
  const signupIG = document.getElementById("signup-ig");
  const signupStatus = document.getElementById("signup-status");
  const btnCreateAccount = document.getElementById("btn-create-account");
  const btnGoogleSignup = document.getElementById("btn-google-signup");

  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const btnLoginAccount = document.getElementById("btn-login-account");
  const loginStatus = document.getElementById("login-status");
  const btnGoogleLogin = document.getElementById("btn-google-login");

  const cardGuest = document.getElementById("card-guest");
  const cardAccount = document.getElementById("card-account");

  const phoneNumber = "19718182710";

  const discounts = {
    none: 0,
    key: 0.10,
    rising: 0.20,
    crown: 0.30
  };

  let accountCreated = false;
  let accountEmailCache = "";
  let isMembershipValid = false;

  function getValidCodes() {
    if (Array.isArray(window.validCodes)) {
      return window.validCodes.map((c) => String(c).trim().toUpperCase());
    }
    return [];
  }

  function formatMoney(value) {
    return value.toFixed(2).replace(/\.00$/, "");
  }

  function getServiceName(key) {
    return t(key);
  }

  function validateMembershipCode() {
    const codes = getValidCodes();
    const raw = membershipCodeInput.value.trim().toUpperCase();
    membershipCodeStatus.classList.remove("valid", "invalid");
    isMembershipValid = false;

    if (!raw) {
      membershipCodeStatus.textContent = ""; // vacío, sin key fea
      return false;
    }

    if (codes.includes(raw)) {
      membershipCodeStatus.textContent = t("membership.codeStatus.valid");
      membershipCodeStatus.classList.add("valid");
      isMembershipValid = true;
      return true;
    } else {
      membershipCodeStatus.textContent = t("membership.codeStatus.invalid");
      membershipCodeStatus.classList.add("invalid");
      return false;
    }
  }

  function getAccessType() {
    const checked = document.querySelector('input[name="access-type"]:checked');
    return checked ? checked.value : "guest";
  }

  function updateAccessCards() {
    const accessType = getAccessType();
    if (accessType === "guest") {
      cardGuest.classList.add("access-card-highlight");
      cardAccount.classList.remove("access-card-highlight");
      accountBox.style.display = "none";
    } else {
      cardAccount.classList.add("access-card-highlight");
      cardGuest.classList.remove("access-card-highlight");
      accountBox.style.display = "block";
    }
    updateSummary();
  }

  // ------- AUTH EMAIL/PASSWORD -------

  async function createAccount() {
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();
    const artist = signupArtist.value.trim();
    const ig = signupIG.value.trim();
    signupStatus.style.color = "#f97316";
    signupStatus.textContent = "";

    if (!email || !password) {
      signupStatus.textContent = currentLang === "es"
        ? "Debes ingresar correo y contraseña."
        : "You must enter email and password.";
      return;
    }

    if (password.length < 6) {
      signupStatus.textContent = currentLang === "es"
        ? "La contraseña debe tener al menos 6 caracteres."
        : "Password must be at least 6 characters.";
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://addempire-services.netlify.app"
      }
    });

    if (authError) {
      signupStatus.textContent =
        (currentLang === "es" ? "Error creando cuenta: " : "Error creating account: ") +
        authError.message;
      return;
    }

    const user = authData.user;
    if (!user) {
      signupStatus.textContent = currentLang === "es"
        ? "No se pudo obtener el usuario creado."
        : "Could not get created user.";
      return;
    }

    // PERFIL con email (sin depender de triggers)
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: user.id,
          email: email,
          artist_name: artist || null,
          instagram: ig || null
        },
        { onConflict: "user_id" }
      );

    if (profileError) {
      signupStatus.textContent = currentLang === "es"
        ? "Cuenta creada, pero error guardando datos de perfil."
        : "Account created, but error saving profile data.";
    } else {
      accountCreated = true;
      accountEmailCache = email;
      signupStatus.style.color = "#4ade80";
      signupStatus.textContent = currentLang === "es"
        ? "Cuenta creada. Revisa tu correo y selecciona tus servicios."
        : "Account created. Check your email and select your services.";
      document.getElementById("access-account").checked = true;
      updateAccessCards();
    }

    updateSummary();
  }

  async function handleCreateAccountClick() {
    btnCreateAccount.disabled = true;
    try {
      await createAccount();
    } finally {
      btnCreateAccount.disabled = false;
    }
  }

  async function loginAccount() {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();
    loginStatus.style.color = "#f97316";
    loginStatus.textContent = "";

    if (!email || !password) {
      loginStatus.textContent = currentLang === "es"
        ? "Debes ingresar correo y contraseña."
        : "You must enter email and password.";
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      loginStatus.textContent =
        (currentLang === "es" ? "Error al iniciar sesión: " : "Login error: ") +
        error.message;
      return;
    }

    if (!data || !data.user) {
      loginStatus.textContent = currentLang === "es"
        ? "No se pudo obtener la sesión."
        : "Could not get session.";
      return;
    }

    accountCreated = true;
    accountEmailCache = email;
    loginStatus.style.color = "#4ade80";
    loginStatus.textContent = currentLang === "es"
      ? "Sesión iniciada. Puedes continuar con tu pedido."
      : "Session started. You can continue with your order.";
    signupStatus.textContent = "";

    document.getElementById("access-account").checked = true;
    updateAccessCards();
    updateSummary();
  }

  async function handleLoginClick() {
    btnLoginAccount.disabled = true;
    try {
      await loginAccount();
    } finally {
      btnLoginAccount.disabled = false;
    }
  }

  // ------- GOOGLE OAUTH (signup + login) -------

  async function handleGoogleAuth() {
    // mensaje en ambos, por si el usuario está mirando login o signup
    signupStatus.style.color = "#f97316";
    signupStatus.textContent = currentLang === "es"
      ? "Redirigiendo a Google..."
      : "Redirecting to Google...";

    loginStatus.style.color = "#f97316";
    loginStatus.textContent = signupStatus.textContent;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://addempire-services.netlify.app"
      }
    });

    if (error) {
      const msg =
        (currentLang === "es" ? "Error con Google: " : "Google sign-in error: ") +
        error.message;
      signupStatus.textContent = msg;
      loginStatus.textContent = msg;
    }
  }

  // ------- SESIÓN EXISTENTE (incluye Google) -------

  async function checkExistingSession() {
    const { data } = await supabase.auth.getSession();
    const session = data && data.session;

    if (session && session.user) {
      const user = session.user;
      accountCreated = true;
      accountEmailCache = user.email || "";
      document.getElementById("access-account").checked = true;
      updateAccessCards();

      // asegurar perfil básico con email
      await supabase
        .from("profiles")
        .upsert(
          {
            user_id: user.id,
            email: user.email || null
          },
          { onConflict: "user_id" }
        );
    } else {
      updateAccessCards();
    }
    updateSummary();
  }

  // ------- RESUMEN / WHATSAPP -------

  function updateSummary() {
    const membership = membershipSelect.value;
    const baseMembershipRate = discounts[membership] || 0;
    const membershipRate = isMembershipValid ? baseMembershipRate : 0;
    const accessType = getAccessType();

    let selected = [];
    let totalBase = 0;
    let totalWithDiscount = 0;

    let qtyGrab = 0;
    let qtyMix = 0;
    let qtyPack = 0;
    let qtyBeatOrig = 0;

    items.forEach((input) => {
      const qty = Number(input.value) || 0;
      if (qty <= 0) return;

      const nameKey = input.getAttribute("data-name") || "Servicio";
      const name = getServiceName(nameKey);
      const price = Number(input.getAttribute("data-price") || 0);
      const cat = input.getAttribute("data-category") || "";

      const lineBase = price * qty;
      const lineDiscounted = lineBase * (1 - membershipRate);

      totalBase += lineBase;
      totalWithDiscount += lineDiscounted;

      selected.push({
        name,
        qty,
        base: lineBase,
        discounted: lineDiscounted
      });

      if (cat === "grabacion") qtyGrab += qty;
      if (cat === "mixmaster") qtyMix += qty;
      if (cat === "pack_full") qtyPack += qty;
      if (cat === "beat_original") qtyBeatOrig += qty;
    });

    summaryList.innerHTML = "";
    if (selected.length === 0) {
      const li = document.createElement("li");
      li.textContent = t("summary.empty");
      summaryList.appendChild(li);
    } else {
      selected.forEach((s) => {
        const li = document.createElement("li");
        const linePrice = formatMoney(s.discounted);
        li.textContent = `${s.name} (x${s.qty}) — $${linePrice}`;
        summaryList.appendChild(li);
      });
    }

    // extra 10% cuenta AddStudio en la línea más cara
    let extraAccountDiscount = 0;
    if (accessType === "account" && accountCreated && selected.length > 0) {
      let maxLine = selected[0];
      selected.forEach((s) => {
        if (s.discounted > maxLine.discounted) maxLine = s;
      });
      extraAccountDiscount = maxLine.discounted * 0.10;
      totalWithDiscount -= extraAccountDiscount;
    }

    const totalPrefix = t("summary.totalWithDiscountPrefix");
    const totalSuffix = t("summary.totalSuffix");
    totalAmount.textContent = `${totalPrefix}${formatMoney(totalWithDiscount)}${totalSuffix}`;

    const parts = [];
    if (membershipRate > 0) {
      const percent = Math.round(membershipRate * 100);
      parts.push(
        `${t("summary.discount.applied")}−${percent}%. (${t("summary.totalPrefix")}${formatMoney(
          totalBase
        )}${t("summary.totalSuffix")})`
      );
    }
    if (extraAccountDiscount > 0) {
      parts.push(`${t("summary.accountDiscount.applied")}$${formatMoney(extraAccountDiscount)} USD`);
    }
    discountLabel.textContent = parts.length > 0 ? parts.join(" | ") : t("summary.discount.none");

    if (qtyGrab > 0 && qtyMix > 0 && qtyPack === 0 && qtyBeatOrig === 0) {
      upsellNote.textContent = t("upsell.message");
    } else {
      upsellNote.textContent = "";
    }

    // bloquear WhatsApp sin servicios
    if (selected.length === 0) {
      whatsappLink.setAttribute("href", "#");
      whatsappLink.setAttribute("aria-disabled", "true");
      return;
    }

    // bloquear si dijo "account" pero aún no tiene cuenta activa
    if (accessType === "account" && !accountCreated) {
      whatsappLink.setAttribute("href", "#");
      whatsappLink.setAttribute("aria-disabled", "true");
      return;
    }

    const serviciosTexto = selected
      .map((s) => `• ${s.name} (x${s.qty}) — $${formatMoney(s.discounted)}`)
      .join("\n");

    let membershipText;
    const rawCode = membershipCodeInput.value.trim();
    if (membershipRate > 0) {
      membershipText = t(`membership.text.${membership}`);
    } else if (membership !== "none" && rawCode) {
      membershipText =
        currentLang === "es"
          ? "Seleccionado pero código no validado"
          : "Selected but code not validated";
    } else {
      membershipText = t("membership.text.none");
    }

    const artistCode = rawCode || "";
    const notSpecified = t("wa.notSpecified");

    let accountValue;
    if (accessType === "account") {
      if (accountCreated) {
        accountValue =
          currentLang === "es"
            ? `Sí, cuenta activa (${accountEmailCache || notSpecified})`
            : `Yes, active account (${accountEmailCache || notSpecified})`;
      } else {
        accountValue =
          currentLang === "es"
            ? "Pendiente de crear cuenta"
            : "Account not created yet";
      }
    } else {
      accountValue =
        currentLang === "es" ? "No (precio regular)" : "No (regular price)";
    }

    const totalLabel = t("wa.totalLabel");
    const greeting = t("wa.greeting");
    const membershipLabel = t("wa.membershipLabel");
    const membershipCodeLabel = t("wa.membershipCodeLabel");
    const accountLabel = t("wa.accountLabel");

    const message =
      `${greeting}\n\n` +
      `${serviciosTexto}\n\n` +
      `${totalLabel} $${formatMoney(totalWithDiscount)} USD\n` +
      `${membershipLabel} ${membershipText}\n` +
      `${membershipCodeLabel} ${artistCode || notSpecified}\n` +
      `${accountLabel} ${accountValue}\n`;

    const url =
      "https://wa.me/" +
      phoneNumber +
      "?text=" +
      encodeURIComponent(message);

    whatsappLink.setAttribute("href", url);
    whatsappLink.setAttribute("aria-disabled", "false");
  }

  // ------- EVENTOS -------

  items.forEach((input) => {
    input.addEventListener("input", updateSummary);
  });
  membershipSelect.addEventListener("change", updateSummary);
  membershipCodeInput.addEventListener("input", () => {
    validateMembershipCode();
    updateSummary();
  });

  document.getElementById("access-guest").addEventListener("change", updateAccessCards);
  document.getElementById("access-account").addEventListener("change", updateAccessCards);

  cardGuest.addEventListener("click", () => {
    document.getElementById("access-guest").checked = true;
    updateAccessCards();
  });
  cardAccount.addEventListener("click", () => {
    document.getElementById("access-account").checked = true;
    updateAccessCards();
  });

  btnCreateAccount.addEventListener("click", handleCreateAccountClick);
  btnLoginAccount.addEventListener("click", handleLoginClick);

  btnGoogleSignup.addEventListener("click", handleGoogleAuth);
  btnGoogleLogin.addEventListener("click", handleGoogleAuth);

  langSelect.addEventListener("change", () => {
    currentLang = langSelect.value || "es";
    applyTranslations();
    validateMembershipCode();
    updateSummary();
  });

  // init
  applyTranslations();
  validateMembershipCode();
  checkExistingSession();
})();
