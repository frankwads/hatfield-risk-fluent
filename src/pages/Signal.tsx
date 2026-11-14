                    </li>

                    <li className={domainStyle}>
                      Litigation, regulatory and cybersecurity events over the
                      review window
                    </li>

                    <li className={domainStyle}>
                      Geographic and supply-chain exposure, with the sources
                      each finding came from
                    </li>
                  </ul>

                  <p className="mt-6 mb-0 text-[12px] text-[#667085] max-w-[62ch] leading-[1.6]">
                    Every finding carries its source, a severity and an audit
                    trail. AI supports the analysis; your organization retains
                    decision authority.
                  </p>
                </div>

                <div className="bg-[#F6F8FB] rounded-2xl px-6 py-7 w-full">
                  <p className="m-0 text-[13px] font-semibold text-[#0A1A33]">
                    Sample risk report
                  </p>

                  <p className="mt-2 mb-0 text-[12px] text-[#667085] leading-[1.6]">
                    PDF, no sign-up required.
                  </p>

                  <a
                    href={SAMPLE_REPORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block px-[18px] py-[11px] rounded-[7px] no-underline text-[13px] font-semibold bg-[#2F6BFF] text-white hover:bg-[#245CE0] transition-colors"
                  >
                    Open the sample report
                  </a>

                  <p className="mt-4 mb-0 text-[11px] text-[#98A2B3] leading-[1.5]">
                    Opens in a new tab.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* REQUEST ACCESS */}
          <section
            id="request"
            className="scroll-mt-8 bg-[#F6F8FB] rounded-2xl px-6 md:px-[38px] py-[38px] my-[70px]"
          >
            <h2 className="m-0 mb-[6px] text-[26px] font-semibold tracking-[-0.025em] text-[#0A1A33]">
              Request access
            </h2>

            <p className="m-0 mb-[26px] text-sm text-[#667085]">
              Confirm your email address, then our team provisions accounts
              within one business day.
            </p>

            {result?.ok ? (
              <div>
                <p className="text-[15px] font-medium text-[#1B56A6] m-0">
                  {result.message}
                </p>

                <p className="mt-3 mb-0 text-[13px] text-[#667085]">
                  The confirmation link is valid for three days. If it does
                  not arrive, check your spam folder or email{" "}
                  <a
                    href="mailto:contact@hatfield.ai?subject=Registration"
                    className="text-[#1B56A6]"
                  >
                    contact@hatfield.ai
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[18px] gap-y-[15px]">

                  {/* COMPANY */}
                  <div className="flex flex-col gap-[6px] md:col-span-2">
                    <label
                      htmlFor="company"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Company name *
                    </label>

                    <input
                      id="company"
                      name="company"
                      required
                      autoComplete="organization"
                      className={fieldStyle("Company name")}
                    />
                  </div>

                  {/* FIRST NAME */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="first"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      First name *
                    </label>

                    <input
                      id="first"
                      name="first"
                      required
                      autoComplete="given-name"
                      className={fieldStyle("First name")}
                    />
                  </div>

                  {/* LAST NAME */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="last"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Last name *
                    </label>

                    <input
                      id="last"
                      name="last"
                      required
                      autoComplete="family-name"
                      className={fieldStyle("Last name")}
                    />
                  </div>

                  {/* SUFFIX */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="suffix"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Suffix
                    </label>

                    <input
                      id="suffix"
                      name="suffix"
                      placeholder="Jr., III, CFA"
                      className={fieldStyle("Suffix")}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="email"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Work email *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={fieldStyle("Work email")}
                    />

                    <span className="text-[11px] text-[#98A2B3]">
                      Corporate address required.
                    </span>
                  </div>

                  {/* ROLE */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="role"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Your role *
                    </label>

                    <input
                      id="role"
                      name="role"
                      required
                      autoComplete="organization-title"
                      className={fieldStyle("Your role")}
                    />
                  </div>

                  {/* PHONE */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="phone"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Phone (optional)
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={fieldStyle("Phone")}
                    />
                  </div>

                  {/* INDUSTRY - options from GET /api/sectors (item 7) */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="industry"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Industry *
                    </label>

                    <select
                      id="industry"
                      name="industry"
                      required
                      className={fieldStyle("Industry")}
                    >
                      <option value="">Select</option>
                      {sectors.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                      <option>Other</option>
                    </select>
                  </div>

                  {/* SUBSCRIPTION (item 29): trial or paid */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="subscription"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Subscription *
                    </label>

                    <select
                      id="subscription"
                      name="subscription"
                      required
                      value={subscription}
                      onChange={(e) => handleSubscriptionChange(e.target.value)}
                      className={fieldStyle("Subscription")}
                    >
                      <option value="">Select</option>
                      <option value="demo">Free trial</option>
                      <option value="paid">Paid subscription</option>
                    </select>
                  </div>

                  {/* COMPANIES TO MONITOR (item 29) */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="companies"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Companies to monitor
                      {subscription === "paid" && " *"}
                    </label>

                    <input
                      id="companies"
                      name="companies"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      step={1}
                      value={companiesText}
                      disabled={subscription !== "paid"}
                      required={subscription === "paid"}
                      placeholder={
                        subscription === "demo"
                          ? "Pre-selected"
                          : subscription === ""
                          ? "Select subscription first"
                          : "1 or more"
                      }
                      onChange={(e) =>
                        setCompaniesText(e.target.value.replace(/\D/g, ""))
                      }
                      className={
                        subscription !== "paid"
                          ? "text-sm bg-[#EAECF0] text-[#98A2B3] border border-[#D0D5DD] rounded-lg px-3 py-[11px] w-full outline-none cursor-not-allowed"
                          : fieldStyle("Companies to monitor")
                      }
                    />

                    {subscription === "paid" && companies >= 1 && (
                      <span className="text-[11px] text-[#667085]">
                        {usd(estimateMonthly)} a month &middot;{" "}
                        {usd(estimateMonthly * ANNUAL_MONTHS)} annual prepaid
                        &middot; {bandFor(companies).label} band
                      </span>
                    )}
                  </div>

                  {/* BILLING */}
                  <div className="flex flex-col gap-[6px]">
                    <label
                      htmlFor="billing"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Billing preference
                      {subscription === "paid" && " *"}
                    </label>

                    <select
                      id="billing"
                      name="billing"
                      value={selectedBilling}
                      disabled={billingDisabled}
                      required={subscription === "paid"}
                      onChange={(e) => {
                        setSelectedBilling(e.target.value);
                        setBillingError(false);
                      }}
                      className={`text-sm border rounded-lg px-3 py-[11px] w-full outline-none transition-colors ${
                        billingDisabled
                          ? "bg-[#EAECF0] text-[#98A2B3] border-[#D0D5DD] cursor-not-allowed"
                          : billingError
                          ? "bg-white text-[#101828] border-[#B23B3B]"
                          : "bg-white text-[#101828] border-[#E2E7EF] focus:border-[#2F6BFF]"
                      }`}
                    >
                      <option value="">
                        {billingPlaceholder}
                      </option>

                      {!billingDisabled && (
                        <>
                          <option value="monthly">
                            Monthly
                          </option>

                          <option value="annual">
                            Annual
                          </option>
                        </>
                      )}
                    </select>

                    {billingError && (
                      <span className="text-[11px] text-[#B23B3B] mt-[2px]">
                        Please select Monthly or Annual.
                      </span>
                    )}
                  </div>

                  {/* NOTES */}
                  <div className="flex flex-col gap-[6px] md:col-span-2">
                    <label
                      htmlFor="notes"
                      className="text-[12px] font-medium text-[#667085]"
                    >
                      Anything we should know?
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      className="min-h-[72px] text-sm text-[#101828] bg-white border border-[#E2E7EF] rounded-lg px-3 py-[11px] w-full outline-none resize-y focus:border-[#2F6BFF]"
                    />
                  </div>
                </div>

                {/* HONEYPOT - hidden from people, assistive tech, tab order
                    and autofill (item 6). */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="company_website">
                    Company website (leave blank)
                  </label>
                  <input
                    id="company_website"
                    name="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {TURNSTILE_SITE_KEY && (
                  <div
                    ref={turnstileRef}
                    className="cf-turnstile mt-[18px]"
                    data-sitekey={TURNSTILE_SITE_KEY}
                    data-theme="light"
                  />
                )}

                {result && !result.ok && (
                  <p
                    role="alert"
                    className="mt-[18px] mb-0 text-[13px] text-[#B23B3B]"
                  >
                    {result.message}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-[22px]">
                  <button
                    type="submit"
                    disabled={sending}
                    className={`inline-block px-[18px] py-[11px] rounded-[7px] text-[13px] font-semibold border-0 text-white transition-colors ${
                      sending
                        ? "bg-[#98A2B3] cursor-not-allowed"
                        : "bg-[#2F6BFF] hover:bg-[#245CE0] cursor-pointer"
                    }`}
                  >
                    {sending ? "Sending…" : "Request access"}
                  </button>

                  <p className="m-0 text-[12px] text-[#667085]">
                    We use your details only to provision and support your
                    account.
                    {selectedTier === "demo" && (
                      <>
                        {" "}
                        You selected the{" "}
                        <strong className="text-[#101828]">free trial</strong>.
                      </>
                    )}
                    {selectedTier && selectedTier !== "demo" && (
                      <>
                        {" "}
                        You selected{" "}
                        <strong className="text-[#101828]">
                          {companies.toLocaleString("en-US")}{" "}
                          {companies === 1 ? "company" : "companies"} (
                          {labelFor(selectedTier)} band)
                        </strong>
                        .
                      </>
                    )}
                  </p>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#071326] text-[#8FA2BC] text-[12px] py-[27px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[42px] flex flex-col sm:flex-row gap-4 justify-between">
          {/* Item 12: the d/b/a. */}
          <p className="m-0">
            Hatfield Advisory LLC d/b/a Hatfield.ai&trade;, St. Petersburg, Florida
          </p>

          <p className="m-0">
            <a
              href="#request"
              className="text-[#C8D3E3] no-underline hover:text-white"
            >
              Request access
            </a>

            {SAMPLE_REPORT_URL && (
              <>
                {"  ·  "}

                <a
                  href="#sample"
                  className="text-[#C8D3E3] no-underline hover:text-white"
                >
                  Sample risk report
                </a>
              </>
            )}

            {"  ·  "}

            {/* Item 24: the tear sheet. */}
            <a
              href={SIGNAL_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C8D3E3] no-underline hover:text-white"
            >
              HatfieldIQ overview (PDF)
            </a>

            {"  ·  "}

            <a
              href="/contact"
              className="text-[#C8D3E3] no-underline hover:text-white"
            >
              Contact us
            </a>

            {"  ·  "}

            {/* Item 9: /login, not the app root. */}
            <a
              href={SIGNAL_LOGIN_URL}
              className="text-[#C8D3E3] no-underline hover:text-white"
            >
              Client sign in
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Signal;