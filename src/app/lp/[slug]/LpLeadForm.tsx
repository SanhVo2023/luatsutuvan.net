"use client";

import { useState } from "react";

interface LpLeadFormProps {
  /** Practice-area key, sent for routing/analytics (matches LeadPayload.practiceArea) */
  practiceArea: string;
  /** Target keyword of the LP, recorded inside the question + utmContent */
  keyword: string;
  /** LP slug, recorded as landingPage / utmContent */
  slug: string;
  /** Submit-button label */
  ctaLabel: string;
}

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Lead-capture form for Google-Ads landing pages.
 *
 * It POSTs the site's canonical LeadPayload shape (fullName/phone/question +
 * practiceArea/urgency/utm fields/landingPage) to /api/contact — the SAME
 * endpoint the on-site QuickForm/ConsultForm use, which mirrors to the GAS
 * Contact Hub.
 * Field names MUST match src/app/api/contact/route.ts (it validates server-side
 * and 422s on fullName/phone/question), so we mirror that contract exactly.
 */
export default function LpLeadForm({
  practiceArea,
  keyword,
  slug,
  ctaLabel,
}: LpLeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [form, setForm] = useState({ fullName: "", phone: "", question: "" });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Client-side mirror of the server validation in /api/contact.
    const fullName = form.fullName.trim();
    const phone = form.phone.trim();
    if (fullName.length < 2) {
      setStatus("error");
      setErrorMsg("Vui lòng nhập họ tên.");
      return;
    }
    if (!/^[0-9+()\s.-]{8,15}$/.test(phone)) {
      setStatus("error");
      setErrorMsg("Số điện thoại không hợp lệ.");
      return;
    }

    // The route requires question.length >= 5; synthesize one from the keyword
    // when the (optional) free-text box is left empty so the lead never 422s.
    const question =
      form.question.trim().length >= 5
        ? form.question.trim()
        : `Tôi cần được tư vấn về ${keyword}.`;

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          question,
          email: "",
          practiceArea,
          urgency: "urgent",
          utmSource: "google-ads",
          utmMedium: "cpc",
          utmCampaign: "lp-funnel",
          utmContent: slug,
          landingPage: `/lp/${slug}`,
          source: keyword,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || `HTTP ${res.status}`);
      }
      setStatus("success");
      setForm({ fullName: "", phone: "", question: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : "Có lỗi xảy ra, vui lòng thử lại sau ít phút.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="card p-6 text-center sm:p-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-trust-50">
          <svg
            className="h-8 w-8 text-trust"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-navy text-xl font-bold">Đã nhận yêu cầu của bạn!</h3>
        <p className="text-steel mt-2 text-sm">
          Luật sư sẽ liên hệ tư vấn cho bạn trong thời gian sớm nhất. Vui lòng để
          ý điện thoại.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="card p-6 sm:p-8"
      noValidate
    >
      <h2 className="text-navy text-xl font-bold sm:text-2xl">
        Đăng ký tư vấn miễn phí
      </h2>
      <p className="text-steel mt-1 text-sm">
        Để lại thông tin, luật sư gọi lại trong 15 phút.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="lp-name" className="field-label">
            Họ và tên <span className="text-urgency">*</span>
          </label>
          <input
            id="lp-name"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={form.fullName}
            onChange={onChange}
            placeholder="Nguyễn Văn A"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="lp-phone" className="field-label">
            Số điện thoại / Zalo <span className="text-urgency">*</span>
          </label>
          <input
            id="lp-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={onChange}
            placeholder="09xx xxx xxx"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="lp-question" className="field-label">
            Mô tả ngắn vấn đề của bạn
          </label>
          <textarea
            id="lp-question"
            name="question"
            rows={3}
            value={form.question}
            onChange={onChange}
            placeholder="Ví dụ: Tôi muốn được tư vấn về..."
            className="field resize-none"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="text-danger mt-3 text-sm font-medium">
          {errorMsg || "Vui lòng kiểm tra lại thông tin và thử lại."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z"
              />
            </svg>
            Đang gửi...
          </>
        ) : (
          ctaLabel
        )}
      </button>

      <p className="text-steel mt-3 text-center text-xs">
        Thông tin của bạn được bảo mật tuyệt đối.
      </p>
    </form>
  );
}
