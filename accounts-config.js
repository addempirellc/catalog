// accounts-config.js
(function () {
  const SUPABASE_URL = "https://xshxhfexvvzrrqllhrvp.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzaHhoZmV4dnZ6cnJxbGxocnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1ODU4MjUsImV4cCI6MjA3OTE2MTgyNX0.stCbU3Db73PueHgO4T10wObDdd6HJvE_DE-CTTLedGQ";

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // ✔️ Auto-crear perfil para usuarios que entren con Google
  async function ensureGoogleProfile() {
    const { data } = await supabase.auth.getSession();
    const session = data?.session;

    if (!session || !session.user) return;

    const user = session.user;

    await supabase
      .from("profiles")
      .upsert(
        {
          user_id: user.id,
          email: user.email || null,
          artist_name: user.user_metadata?.full_name || null,
          instagram: null
        },
        { onConflict: "user_id" }
      );
  }

  // Ejecutar al cargar
  ensureGoogleProfile();
})();
