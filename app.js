(function () {
  const SUPABASE_URL = "https://xshxhfexvvzrrqllhrvp.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzaHhoZmV4dnZ6cnJxbGxocnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1ODU4MjUsImV4cCI6MjA3OTE2MTgyNX0.stCbU3Db73PueHgO4T10wObDdd6HJvE_DE-CTTLedGQ";

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // ---------------- TRADUCCIONES ----------------
  const translations = {
    es: {
      "header.tagline": "ADDSTUDIO · LOUISVILLE, KY",
      "header.title": "Catálogo de Servicios",
      "header.subtitle": "Selecciona lo que necesitas, pon cantidades y agenda directo.",
      "lang.label": "Idioma:",

      "access.title": "Cómo quieres continuar:",
      "access.guest.title": "Seguir sin cuenta",
      "access.guest.subtitle": "Precio normal, sin beneficios de cuenta.",
      "access.account.title": "Crear cuenta AddStudio",
      "access.account.subtitle": "Obtén −10% automático de bienvenida + 5% mensual en 1 servicio.",
      "access.note":
        "Crear cuenta implica que guardemos tu email para enviarte recordatorios, ofertas y beneficios exclusivos (incluyendo descuentos de bienvenida y mensuales). Puedes darte de baja cuando quieras.",

      "auth.signup.title": "Crear cuenta AddStudio",
      "auth.signup.helper": "Activa tus beneficios de bienvenida y descuentos mensuales.",
      "auth.login.title": "Iniciar sesión",
      "auth.login.helper": "Si ya tienes cuenta, entra aquí para aplicar tus beneficios.",
      "auth.email": "Correo electrónico",
      "auth.password": "Contraseña",
      "auth.artistName": "Nombre artístico",
      "auth.instagram": "Instagram",
      "auth.signup.button": "Guardar datos de perfil",
      "auth.signup.google": "Crear / iniciar sesión con Google",
      "auth.login.button": "Iniciar sesión (Google)",

      "membership.label": "Membresía AddStudio:",
      "membership.none": "Sin membresía",
      "membership.key": "Key Tier (−10%)",
      "membership.rising": "Rising Tier (−20%)",
      "membership.crown": "Crown Tier (−30%)",
      "membership.note":
        "El descuento de membresía solo se aplica si tu código de artista es válido. Beats no exclusivos pueden bajar hasta $5 con membresía.",
      "membership.codeLabel": "Código de artista (si tienes membresía):",
      "membership.codePlaceholder": "Ej: ASD-K-MRA-001",
      "membership.codeStatus.valid": "Código de membresía validado.",
      "membership.codeStatus.invalid": "Código no reconocido. Verifica tu código o tu membresía.",
      "membership.codeStatus.empty": "",

      "service.recording.title": "🎙 Grabación Vocal",
      "service.recording.desc": "Grabación profesional, guía vocal y calidad para plataformas.",
      "service.recording.label": "Horas de grabación",
      "service.recording.price": "$30 / hora",
      "service.recording.name": "Grabación Vocal",

      "service.mix.title": "🎛 Mezcla + Master",
      "service.mix.desc": "Limpieza vocal, afinación y optimizado para streaming y radio.",
      "service.mix.label": "Canciones a mezclar/masterizar",
      "service.mix.price": "$50 / canción (precio base)",
      "service.mix.name": "Mezcla + Master",

      "service.tuning.title": "🛠 Afinación Vocal",
      "service.tuning.desc": "Corrección de tono y tiempo, sonido profesional.",
      "service.tuning.label": "Canciones a afinar",
      "service.tuning.price": "$30 / canción",
      "service.tuning.name": "Afinación Vocal (Vocal Tuning)",

      "service.beatOriginal.title": "🎹 Beats Originales (Exclusivos)",
      "service.beatOriginal.desc": "Beats desde cero con uso comercial.",
      "service.beatOriginal.label": "Cantidad de beats exclusivos",
      "service.beatOriginal.price": "$150 / beat (precio base)",
      "service.beatOriginal.name": "Beat Original Exclusivo",

      "service.beatNonExclusive.title": "🔥 Beats No Exclusivos",
      "service.beatNonExclusive.desc": "Ideal para mixtapes, demos y proyectos económicos.",
      "service.beatNonExclusive.label": "Cantidad de beats no exclusivos",
      "service.beatNonExclusive.priceMain": "$50 / beat",
      "service.beatNonExclusive.priceNote": "(desde $5 con membresía)",
      "service.beatNonExclusive.name": "Beat No Exclusivo",

      "service.packFull.title": "📦 Pack “Canción Full Terminada”",
      "service.packFull.desc":
        "Grabación + Mezcla + Master + Beat original (referencia de pack completo).",
      "service.packFull.label": "Cantidad de canciones full",
      "service.packFull.price": "$250 / canción (precio base)",
      "service.packFull.name": "Pack Canción Full Terminada",

      "service.coversVideo.title": "📸 Portadas & 🎬 Videos Promo (por canción)",
      "service.coversVideo.desc":
        "Portada y reels pensados para lanzar una canción a plataformas.",
      "service.covers.label": "Portadas profesionales (1 canción)",
      "service.covers.price": "$15 / portada",
      "service.covers.name": "Portada profesional",
      "service.video.label": "Videos promo / reels (1 canción)",
      "service.video.price": "$30 / video",
      "service.video.name": "Video promo / Reel",

      "service.coversPacks.title": "📦 Packs de Portadas",
      "service.coversPacks.desc":
        "Pensado para varios lanzamientos: te sale mejor por volumen.",
      "service.coversPacks.pack1.label": "Pack 1 · 5 portadas",
      "service.coversPacks.pack1.price": "$65 / pack",
      "service.coversPacks.pack1.name": "Pack 5 portadas",
      "service.coversPacks.pack2.label": "Pack 2 · 10 portadas",
      "service.coversPacks.pack2.price": "$100 / pack",
      "service.coversPacks.pack2.name": "Pack 10 portadas",

      "service.reelsPacks.title": "📦 Packs de Reels Promo",
      "service.reelsPacks.desc": "Reels listos para contenido constante en redes.",
      "service.reelsPacks.pack1.label": "Pack 1 · 10 reels",
      "service.reelsPacks.pack1.price": "$250 / pack",
      "service.reelsPacks.pack1.name": "Pack 10 reels",
      "service.reelsPacks.pack2.label": "Pack 2 · 25 reels",
      "service.reelsPacks.pack2.price": "$500 / pack",
      "service.reelsPacks.pack2.name": "Pack 25 reels",
      "service.reelsPacks.pack3.label": "Pack 3 · 50 reels",
      "service.reelsPacks.pack3.price": "$900 / pack",
      "service.reelsPacks.pack3.name": "Pack 50 reels",

      "service.coaching.title": "🧠 Asesoría Artística",
      "service.coaching.desc":
        "Corrección creativa, guía de proyecto y dudas sobre licencias.",
      "service.coaching.label": "Bloques de asesoría (30 min)",
      "service.coaching.price": "$25 / bloque",
      "service.coaching.name": "Asesoría Artística (30 min)",

      "summary.title": "🧾 Resumen de tu pedido",
      "summary.empty": "No has agregado cantidades aún.",
      "summary.note":
        "Este total es una estimación. Precios finales se confirman por WhatsApp según complejidad del proyecto, tu membresía y beneficios de cuenta (si aplica).",
      "summary.button": "Enviar pedido por WhatsApp",
      "summary.totalPrefix": "Total estimado: ",
      "summary.totalSuffix": " USD",
      "summary.totalWithDiscountPrefix": "Total estimado con descuentos: ",
      "summary.discount.none": "Sin descuentos aplicados todavía.",
      "summary.discount.applied": "Descuento de membresía aplicado: ",
      "summary.accountDiscount.applied": "Beneficio por cuenta AddStudio (aprox): ",

      "upsell.message":
        "💡 Tienes grabación + mezcla/master seleccionados. Si agregas beat original o Pack Full, se vuelve una canción completa y normalmente te sale mejor en conjunto.",

      "steps.title": "⚙️ Cómo funciona",
      "steps.step1": "Seleccionas servicios y cantidades en el catálogo.",
      "steps.step2": "Nos contactas por WhatsApp con el resumen y tus datos.",
      "steps.step3":
        "Agendamos fecha, cerramos detalles y recibes tus archivos finales.",

      "trust.title": "👑 ¿Por qué AddEmpire Studio?",
      "trust.point1": "Sonido pensado para música urbana y artistas independientes.",
      "trust.point2":
        "Uso comercial asegurado según el acuerdo del proyecto para que puedas mover tu música con seguridad.",
      "trust.point3":
        "Dirección creativa real: no solo “apretar botones”, sino construir tu sonido.",

      "footer.text":
        "AddEmpire Studio · Sonido profesional desde un home studio real en Louisville, KY.",
      "footer.privacy": "Política de privacidad",
      "footer.terms": "Términos del servicio",
      "footer.cookies": "Política de cookies",

      "wa.greeting": "Hola, quiero agendar estos servicios en AddEmpire Studio:",
      "wa.totalLabel": "Total estimado con descuentos:",
      "wa.membershipLabel": "Membresía:",
      "wa.membershipCodeLabel": "Código de artista:",
      "wa.accountLabel": "Cuenta AddStudio:",
      "wa.notSpecified": "No especificado",

      "membership.text.none": "Sin membresía",
      "membership.text.key": "Key Tier (−10%)",
      "membership.text.rising": "Rising Tier (−20%)",
      "membership.text.crown": "Crown Tier (−30%)"
    },
    en: {
      "header.tagline": "ADDSTUDIO · LOUISVILLE, KY",
      "header.title": "Service Catalog",
      "header.subtitle": "Select what you need, set quantities and book directly.",
      "lang.label": "Language:",

      "access.title": "How do you want to continue:",
      "access.guest.title": "Continue without account",
      "access.guest.subtitle": "Regular price, no account benefits.",
      "access.account.title": "Create AddStudio account",
      "access.account.subtitle":
        "Get −10% welcome automatic + 5% monthly on 1 service.",
      "access.note":
        "Creating an account means we store your email to send reminders, offers and exclusive benefits (including welcome and monthly discounts). You can unsubscribe anytime.",

      "auth.signup.title": "Create AddStudio account",
      "auth.signup.helper": "Activate your welcome benefits and monthly discounts.",
      "auth.login.title": "Log in",
      "auth.login.helper":
        "If you already have an account, log in to apply your benefits.",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.artistName": "Artist name",
      "auth.instagram": "Instagram",
      "auth.signup.button": "Save profile data",
      "auth.signup.google": "Sign up / log in with Google",
      "auth.login.button": "Log in (Google)",

      "membership.label": "AddStudio Membership:",
      "membership.none": "No membership",
      "membership.key": "Key Tier (−10%)",
      "membership.rising": "Rising Tier (−20%)",
      "membership.crown": "Crown Tier (−30%)",
      "membership.note":
        "Membership discount is only applied if your artist code is valid. Non-exclusive beats can go as low as $5 with membership.",
      "membership.codeLabel": "Artist code (if you have membership):",
      "membership.codePlaceholder": "Ex: ASD-K-MRA-001",
      "membership.codeStatus.valid": "Membership code validated.",
      "membership.codeStatus.invalid":
        "Code not recognized. Check your code or membership.",
      "membership.codeStatus.empty": "",

      "service.recording.title": "🎙 Vocal Recording",
      "service.recording.desc":
        "Professional recording, vocal guidance and platform-ready quality.",
      "service.recording.label": "Recording hours",
      "service.recording.price": "$30 / hour",
      "service.recording.name": "Vocal Recording",

      "service.mix.title": "🎛 Mix & Master",
      "service.mix.desc":
        "Vocal cleanup, tuning and optimization for streaming and radio.",
      "service.mix.label": "Songs to mix/master",
      "service.mix.price": "$50 / song (base price)",
      "service.mix.name": "Mix & Master",

      "service.tuning.title": "🛠 Vocal Tuning",
      "service.tuning.desc":
        "Pitch and timing correction, professional sound.",
      "service.tuning.label": "Songs to tune",
      "service.tuning.price": "$30 / song",
      "service.tuning.name": "Vocal Tuning",

      "service.beatOriginal.title": "🎹 Original Beats (Exclusive)",
      "service.beatOriginal.desc":
        "Custom beats from scratch for commercial use.",
      "service.beatOriginal.label": "Number of exclusive beats",
      "service.beatOriginal.price": "$150 / beat (base price)",
      "service.beatOriginal.name": "Exclusive Original Beat",

      "service.beatNonExclusive.title": "🔥 Non-Exclusive Beats",
      "service.beatNonExclusive.desc":
        "Perfect for mixtapes, demos and budget projects.",
      "service.beatNonExclusive.label": "Number of non-exclusive beats",
      "service.beatNonExclusive.priceMain": "$50 / beat",
      "service.beatNonExclusive.priceNote": "(from $5 with membership)",
      "service.beatNonExclusive.name": "Non-Exclusive Beat",

      "service.packFull.title": "📦 “Full Finished Song” Pack",
      "service.packFull.desc":
        "Recording + Mix + Master + Original beat (reference as a full pack).",
      "service.packFull.label": "Number of full songs",
      "service.packFull.price": "$250 / song (base price)",
      "service.packFull.name": "Full Finished Song Pack",

      "service.coversVideo.title": "📸 Covers & 🎬 Promo Videos (per song)",
      "service.coversVideo.desc":
        "Cover and reels designed to launch one song on platforms.",
      "service.covers.label": "Professional covers (1 song)",
      "service.covers.price": "$15 / cover",
      "service.covers.name": "Professional Cover",
      "service.video.label": "Promo videos / reels (1 song)",
      "service.video.price": "$30 / video",
      "service.video.name": "Promo Video / Reel",

      "service.coversPacks.title": "📦 Cover Packs",
      "service.coversPacks.desc":
        "Made for multiple releases: better price per cover.",
      "service.coversPacks.pack1.label": "Pack 1 · 5 covers",
      "service.coversPacks.pack1.price": "$65 / pack",
      "service.coversPacks.pack1.name": "Pack 5 covers",
      "service.coversPacks.pack2.label": "Pack 2 · 10 covers",
      "service.coversPacks.pack2.price": "$100 / pack",
      "service.coversPacks.pack2.name": "Pack 10 covers",

      "service.reelsPacks.title": "📦 Promo Reels Packs",
      "service.reelsPacks.desc":
        "Reels ready for consistent social media content.",
      "service.reelsPacks.pack1.label": "Pack 1 · 10 reels",
      "service.reelsPacks.pack1.price": "$250 / pack",
      "service.reelsPacks.pack1.name": "Pack 10 reels",
      "service.reelsPacks.pack2.label": "Pack 2 · 25 reels",
      "service.reelsPacks.pack2.price": "$500 / pack",
      "service.reelsPacks.pack2.name": "Pack 25 reels",
      "service.reelsPacks.pack3.label": "Pack 3 · 50 reels",
      "service.reelsPacks.pack3.price": "$900 / pack",
      "service.reelsPacks.pack3.name": "Pack 50 reels",

      "service.coaching.title": "🧠 Artistic Coaching",
      "service.coaching.desc":
        "Creative feedback, project guidance and licensing questions.",
      "service.coaching.label": "Coaching blocks (30 min)",
      "service.coaching.price": "$25 / block",
      "service.coaching.name": "Artistic Coaching (30 min)",

      "summary.title": "🧾 Your order summary",
      "summary.empty": "You haven't added any quantities yet.",
      "summary.note":
        "This total is an estimate. Final prices are confirmed on WhatsApp depending on project complexity, your membership and account benefits (if any).",
      "summary.button": "Send order via WhatsApp",
      "summary.totalPrefix": "Estimated total: ",
      "summary.totalSuffix": " USD",
      "summary.totalWithDiscountPrefix": "Estimated total with discounts: ",
      "summary.discount.none": "No discounts applied yet.",
      "summary.discount.applied": "Membership discount applied: ",
      "summary.accountDiscount.applied":
        "Benefit for AddStudio account (approx): ",

      "upsell.message":
        "💡 You selected recording + mix/master. If you add an original beat or Full Pack, you basically get a complete song and it usually works better as a bundle.",

      "steps.title": "⚙️ How it works",
      "steps.step1": "Select services and quantities in the catalog.",
      "steps.step2": "Contact us on WhatsApp with the summary and your info.",
      "steps.step3":
        "We schedule a date, close details and deliver your final files.",

      "trust.title": "👑 Why AddEmpire Studio?",
      "trust.point1":
        "Sound tailored for urban music and independent artists.",
      "trust.point2":
        "Commercial use secured according to our project agreement so you can move your music safely.",
      "trust.point3":
        "Real creative direction: not just pushing buttons, but building your sound.",

      "footer.text":
        "AddEmpire Studio · Professional sound from a real home studio in Louisville, KY.",
      "footer.privacy": "Privacy policy",
      "footer.terms": "Terms of service",
      "footer.cookies": "Cookies policy",

      "wa.greeting": "Hi, I want to book these services at AddEmpire Studio:",
      "wa.totalLabel": "Estimated total with discounts:",
      "wa.membershipLabel": "Membership:",
      "wa.membershipCodeLabel": "Artist code:",
      "wa.accountLabel": "AddStudio account:",
      "wa.notSpecified": "Not specified",

      "membership.text.none": "No membership",
      "membership.text.key": "Key Tier (−10%)",
      "membership.text.rising": "Rising Tier (−20%)",
      "membership.text.crown": "Crown Tier (−30%)"
    }
  };

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

  // ---------------- REFERENCIAS DOM ----------------
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
  const signupArtist = document.getElementById("signup-artist");
  const signupIG = document.getElementById("signup-ig");
  const signupStatus = document.getElementById("signup-status");
  const btnCreateAccount = document.getElementById("btn-create-account");
  const btnGoogleSignup = document.getElementById("btn-google-signup");

  const btnLoginAccount = document.getElementById("btn-login-account");
  const loginStatus = document.getElementById("login-status");
  const btnGoogleLogin = document.getElementById("btn-google-login");

  const cardGuest = document.getElementById("card-guest");
  const cardAccount = document.getElementById("card-account");

  const sessionIndicator = document.getElementById("session-indicator");
  const btnLogout = document.getElementById("btn-logout");

  const btnRecommendedPack = document.getElementById("btn-recommended-pack");

  const phoneNumber = "19718182710";

  const discounts = {
    none: 0,
    key: 0.1,
    rising: 0.2,
    crown: 0.3
  };

  let accountCreated = false;
  let accountEmailCache = "";
  let isMembershipValid = false;
  let currentUser = null; // usuario logueado (Google)

  // ---------------- UTILIDADES ----------------
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
      membershipCodeStatus.textContent = "";
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

  function updateSessionIndicator() {
    if (!sessionIndicator) return;

    if (accountCreated && accountEmailCache) {
      sessionIndicator.classList.add("session-active");
      sessionIndicator.textContent =
        currentLang === "es"
          ? `Sesión iniciada: ${accountEmailCache}`
          : `Logged in as: ${accountEmailCache}`;
    } else {
      sessionIndicator.classList.remove("session-active");
      sessionIndicator.textContent =
        currentLang === "es"
          ? "Modo invitado (sin sesión)"
          : "Guest mode (no session)";
    }
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

  // ---------------- AUTH: SOLO GOOGLE ----------------

  async function createAccount() {
    const msg =
      currentLang === "es"
        ? "La creación de cuenta ahora es solo con Google. Usa el botón de Google."
        : "Account creation is now Google-only. Use the Google button.";
    signupStatus.style.color = "#f97316";
    signupStatus.textContent = msg;
  }

  async function handleCreateAccountClick() {
    // Este botón ahora guarda perfil si ya hay sesión Google.
    if (!currentUser) {
      const msg =
        currentLang === "es"
          ? "Primero inicia sesión con Google para guardar tu nombre artístico e Instagram."
          : "First sign in with Google to save your artist name and Instagram.";
      signupStatus.style.color = "#f97316";
      signupStatus.textContent = msg;
      return;
    }

    const artist = signupArtist.value.trim() || null;
    const ig = signupIG.value.trim() || null;

    signupStatus.style.color = "#f97316";
    signupStatus.textContent =
      currentLang === "es"
        ? "Guardando perfil..."
        : "Saving profile...";

    const { error } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: currentUser.id,
          email: currentUser.email || null,
          artist_name: artist,
          instagram: ig
        },
        { onConflict: "user_id" }
      );

    if (error) {
      signupStatus.style.color = "#f97316";
      signupStatus.textContent =
        (currentLang === "es"
          ? "Error guardando perfil: "
          : "Error saving profile: ") + error.message;
      return;
    }

    signupStatus.style.color = "#4ade80";
    signupStatus.textContent =
      currentLang === "es"
        ? "Perfil actualizado correctamente."
        : "Profile updated successfully.";
  }

  async function loginAccount() {
    const msg =
      currentLang === "es"
        ? "El inicio de sesión ahora es solo con Google. Usa el botón de Google."
        : "Login is now Google-only. Use the Google button.";
    loginStatus.style.color = "#f97316";
    loginStatus.textContent = msg;
  }

  async function handleLoginClick() {
    await loginAccount();
  }

  // ------- GOOGLE OAUTH (signup + login) -------
  async function handleGoogleAuth() {
    const msg =
      currentLang === "es"
        ? "Redirigiendo a Google..."
        : "Redirecting to Google...";

    signupStatus.style.color = "#f97316";
    signupStatus.textContent = msg;

    loginStatus.style.color = "#f97316";
    loginStatus.textContent = msg;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/"
      }
    });

    if (error) {
      const errMsg =
        (currentLang === "es" ? "Error con Google: " : "Google sign-in error: ") +
        error.message;

      signupStatus.textContent = errMsg;
      loginStatus.textContent = errMsg;
    }
  }

  // ------- LOGOUT -------
  async function handleLogout() {
    signupStatus.textContent = "";
    loginStatus.textContent = "";

    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    }

    currentUser = null;
    accountCreated = false;
    accountEmailCache = "";

    const accessGuest = document.getElementById("access-guest");
    if (accessGuest) accessGuest.checked = true;
    updateAccessCards();

    if (btnLogout) btnLogout.style.display = "none";

    updateSessionIndicator();
    updateSummary();
  }

  // ------- SESIÓN EXISTENTE (incluye Google) -------
  async function checkExistingSession() {
    const { data } = await supabase.auth.getSession();
    const session = data && data.session;

    if (session && session.user) {
      const user = session.user;
      currentUser = user;
      accountCreated = true;
      accountEmailCache = user.email || "";

      const accessAccount = document.getElementById("access-account");
      if (accessAccount) accessAccount.checked = true;
      updateAccessCards();

      if (btnLogout) btnLogout.style.display = "inline-flex";

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
      currentUser = null;
      accountCreated = false;
      accountEmailCache = "";

      const accessGuest = document.getElementById("access-guest");
      if (accessGuest) accessGuest.checked = true;
      updateAccessCards();

      if (btnLogout) btnLogout.style.display = "none";
    }

    updateSessionIndicator();
    updateSummary();
  }

  // ---------------- PACK ARTÍSTICO RECOMENDADO ----------------
  function applyRecommendedPack() {
    // Definimos los mínimos del pack
    const packConfig = {
      "service.packFull.name": 1,            // Canción Full Terminada
      "service.covers.name": 1,             // Portada profesional
      "service.reelsPacks.pack1.name": 1,   // Pack 10 reels
      "service.coaching.name": 1            // Asesoría (opcional pero recomendada)
    };

    items.forEach((input) => {
      const key = input.getAttribute("data-name");
      if (!key) return;

      const desired = packConfig[key];
      if (typeof desired === "number") {
        const current = Number(input.value) || 0;
        if (current < desired) {
          input.value = String(desired);
        }
      }
    });

    updateSummary();
  }

  // ---------------- RESUMEN / WHATSAPP ----------------
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

    // Extra −10% por cuenta AddStudio en la línea más cara
    let extraAccountDiscount = 0;
    if (accessType === "account" && accountCreated && selected.length > 0) {
      let maxLine = selected[0];
      selected.forEach((s) => {
        if (s.discounted > maxLine.discounted) maxLine = s;
      });
      extraAccountDiscount = maxLine.discounted * 0.1;
      totalWithDiscount -= extraAccountDiscount;
    }

    const totalPrefix = t("summary.totalWithDiscountPrefix");
    const totalSuffix = t("summary.totalSuffix");
    totalAmount.textContent = `${totalPrefix}${formatMoney(
      totalWithDiscount
    )}${totalSuffix}`;

    const parts = [];
    if (membershipRate > 0) {
      const percent = Math.round(membershipRate * 100);
      parts.push(
        `${t("summary.discount.applied")}−${percent}%. (${t(
          "summary.totalPrefix"
        )}${formatMoney(totalBase)}${t("summary.totalSuffix")})`
      );
    }
    if (extraAccountDiscount > 0) {
      parts.push(
        `${t("summary.accountDiscount.applied")}$${formatMoney(
          extraAccountDiscount
        )} USD`
      );
    }
    discountLabel.textContent =
      parts.length > 0 ? parts.join(" | ") : t("summary.discount.none");

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
      "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

    whatsappLink.setAttribute("href", url);
    whatsappLink.setAttribute("aria-disabled", "false");
  }

  // ---------------- EVENTOS ----------------
  items.forEach((input) => {
    input.addEventListener("input", updateSummary);
  });
  membershipSelect.addEventListener("change", updateSummary);
  membershipCodeInput.addEventListener("input", () => {
    validateMembershipCode();
    updateSummary();
  });

  document
    .getElementById("access-guest")
    .addEventListener("change", updateAccessCards);
  document
    .getElementById("access-account")
    .addEventListener("change", updateAccessCards);

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

  if (btnLogout) {
    btnLogout.addEventListener("click", handleLogout);
  }

  if (btnRecommendedPack) {
    btnRecommendedPack.addEventListener("click", applyRecommendedPack);
  }

  langSelect.addEventListener("change", () => {
    currentLang = langSelect.value || "es";
    applyTranslations();
    validateMembershipCode();
    updateSummary();
    updateSessionIndicator();
  });

  // ---------------- INIT ----------------
  applyTranslations();
  validateMembershipCode();
  checkExistingSession();
})();
