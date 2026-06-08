import { Resend } from "resend";

const FROM = "Matoteka <jovan@matoteka.com>";
const REPLY_TO = "jovan@matoteka.com";
const BRAND = "#ec5b13";

function baseUrl(): string {
  return (process.env.AUTH_URL || "https://matoteka.com").replace(/\/$/, "");
}

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY is not set — skipping send.");
    return null;
  }
  return new Resend(key);
}

function greeting(name?: string | null): string {
  return name ? `Zdravo ${name},` : "Zdravo,";
}

/** Branded, inline-styled HTML shell with a single call-to-action button. */
function layout(opts: {
  heading: string;
  bodyHtml: string;
  buttonLabel: string;
  buttonUrl: string;
  footerNote: string;
}): string {
  return `<!DOCTYPE html><html lang="sr"><body style="margin:0;padding:0;background:#f5f5f5;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;max-width:520px;margin:0 auto;padding:32px 24px;">
  <div style="text-align:center;margin-bottom:24px;">
    <span style="font-size:24px;font-weight:700;color:${BRAND};">Matoteka</span>
  </div>
  <div style="background:#ffffff;border-radius:16px;padding:28px 28px 32px;border:1px solid #ececec;">
    <h1 style="margin:0 0 16px;font-size:20px;color:#1a1a1a;">${opts.heading}</h1>
    ${opts.bodyHtml}
    <div style="text-align:center;margin:28px 0 8px;">
      <a href="${opts.buttonUrl}" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;font-weight:600;padding:13px 28px;border-radius:12px;">${opts.buttonLabel}</a>
    </div>
    <p style="font-size:12px;color:#888;margin-top:20px;word-break:break-all;">Ako dugme ne radi, otvori ovaj link:<br><a href="${opts.buttonUrl}" style="color:${BRAND};">${opts.buttonUrl}</a></p>
  </div>
  <p style="font-size:12px;color:#999;text-align:center;margin-top:20px;">${opts.footerNote}</p>
</div>
</body></html>`;
}

export async function sendVerificationEmail(
  to: string,
  name: string | null,
  rawToken: string,
): Promise<void> {
  const resend = client();
  if (!resend) return;

  const url = `${baseUrl()}/verifikacija?token=${rawToken}`;
  const html = layout({
    heading: "Potvrdi svoj nalog",
    bodyHtml: `<p style="margin:0 0 12px;">${greeting(name)}</p>
      <p style="margin:0 0 12px;">Hvala što si se registrovao/la na <strong>Matoteku</strong>. Klikni na dugme ispod da potvrdiš svoju email adresu i aktiviraš nalog.</p>`,
    buttonLabel: "Potvrdi email",
    buttonUrl: url,
    footerNote: "Link važi 24 sata. Ako se nisi registrovao/la na Matoteci, slobodno ignoriši ovaj mejl.",
  });
  const text = `${greeting(name)}\n\nPotvrdi svoju email adresu na Matoteci otvaranjem ovog linka (važi 24 sata):\n${url}\n\nAko se nisi registrovao/la, ignoriši ovaj mejl.`;

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject: "Potvrdi svoj nalog na Matoteci",
    html,
    text,
  });
  if (error) throw new Error(`Resend error: ${error.message}`);
}

export async function sendPasswordResetEmail(
  to: string,
  name: string | null,
  rawToken: string,
): Promise<void> {
  const resend = client();
  if (!resend) return;

  const url = `${baseUrl()}/reset-lozinke?token=${rawToken}`;
  const html = layout({
    heading: "Resetuj lozinku",
    bodyHtml: `<p style="margin:0 0 12px;">${greeting(name)}</p>
      <p style="margin:0 0 12px;">Dobili smo zahtev za postavljanje nove lozinke za tvoj nalog na <strong>Matoteci</strong>. Klikni na dugme ispod da izabereš novu lozinku.</p>`,
    buttonLabel: "Postavi novu lozinku",
    buttonUrl: url,
    footerNote: "Link važi 1 sat. Ako nisi tražio/la promenu lozinke, ignoriši ovaj mejl — tvoja lozinka ostaje nepromenjena.",
  });
  const text = `${greeting(name)}\n\nPostavi novu lozinku za svoj nalog na Matoteci otvaranjem ovog linka (važi 1 sat):\n${url}\n\nAko nisi tražio/la promenu, ignoriši ovaj mejl.`;

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject: "Resetuj lozinku na Matoteci",
    html,
    text,
  });
  if (error) throw new Error(`Resend error: ${error.message}`);
}
