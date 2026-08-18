(function () {
  const app = document.getElementById("app");
  const items = window.CART_ITEMS;
  const platformName = window.PLATFORM_NAME;
  const DEFAULT_DISTRIBUTION = "독점";
  const state = {
    selected: new Set([items[0].id, items[1].id]),
    lastProposalKind: "bundle",
    lastProposalItems: [items[0].id, items[1].id]
  };

  const icons = {
    trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1.2 13a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 6"/></svg>',
    send: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>'
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function money(value) {
    return Number(value || 0).toLocaleString("en-US");
  }

  function selectedItems() {
    return items.filter((item) => state.selected.has(item.id));
  }

  function routeTo(hash) {
    window.location.hash = hash;
  }

  function proposalLabel() {
    const count = state.selected.size;
    if (count >= 2) return "묶음 제안하기";
    if (count === 1) return "단일 제안하기";
    return "제안하기";
  }

  function poster(item, size = 56, label = "포스터") {
    const tone = window.POSTER_TONES[item.posterTone] || window.POSTER_TONES.rose;
    return `
      <div class="poster" style="--poster-width:${size}px;--poster-bg:${tone.bg};--poster-bg-dark:${tone.dark};--poster-ink:${tone.ink};">
        ${item.posterImage
          ? `<img src="${escapeHtml(item.posterImage)}" alt="${escapeHtml(item.title || "콘텐츠")} 포스터">`
          : escapeHtml(label)}
      </div>
    `;
  }

  function checkbox(checked, mixed = false) {
    const mark = checked ? "✓" : "";
    return `<span class="checkbox ${checked ? "is-checked" : ""} ${mixed ? "is-mixed" : ""}" aria-hidden="true">${mark}</span>`;
  }

  function shell(content) {
    return `
      <div class="app-shell">
        ${content}
      </div>
    `;
  }

  function cartPage() {
    if (items.length === 0) return emptyCartPage();

    const chosen = selectedItems();
    const allChecked = state.selected.size === items.length;
    const mixed = state.selected.size > 0 && !allChecked;
    const isBundle = state.selected.size >= 2;
    const proposalRoute = isBundle ? "proposal-bundle" : "proposal-single";

    const cards = items.map((item) => `
      <article class="cart-card ${state.selected.has(item.id) ? "is-selected" : ""}" data-action="toggle-item" data-id="${item.id}">
        ${checkbox(state.selected.has(item.id))}
        ${poster(item, 48)}
        <div class="cart-card__body">
          <div class="item-title">${escapeHtml(item.title)}</div>
          <div class="item-meta">${item.type} · ${item.episodes}화 · ${item.year}</div>
          <div class="item-genres">${item.genres.join(" · ")}</div>
        </div>
        <div class="cart-card__side">
          <button class="icon-button" data-action="remove-item" data-id="${item.id}" aria-label="${escapeHtml(item.title)} 삭제">${icons.trash}</button>
        </div>
      </article>
    `).join("");

    const selectedList = chosen.length
      ? chosen.slice(0, 4).map((item) => `
          <div class="selected-item">
            ${poster(item, 26, "")}
            <div class="selected-item__body">
              <div class="item-title">${escapeHtml(item.title)}</div>
            </div>
          </div>
        `).join("") + (chosen.length > 4 ? `<div class="tiny">+${chosen.length - 4}편 더</div>` : "")
      : `<div class="muted">제안할 콘텐츠를 선택해주세요.</div>`;

    return shell(`
      <main class="container">
        <div class="page-title">
          <h1>콘텐츠 장바구니</h1>
          <span>${items.length}편</span>
        </div>
        <section class="cart-layout">
          <div>
            <div class="cart-toolbar">
              <button class="text-button" style="margin-left:0" data-action="toggle-all">
                ${checkbox(allChecked, mixed)}
                <span class="muted">전체 선택</span>
                <span class="tiny">${state.selected.size} / ${items.length}</span>
              </button>
              <button class="text-button" data-action="clear-selected">${icons.trash} 선택 삭제</button>
            </div>
            <div class="cart-list">${cards}</div>
          </div>
          <aside class="panel summary">
            <div class="summary__head">
              <h2>선택한 콘텐츠</h2>
              <span>${state.selected.size}편</span>
            </div>
            <div class="selected-list">${selectedList}</div>
            <div class="summary__line"></div>
            <button class="button button--primary button--full" data-action="go-proposal" data-route="${proposalRoute}" ${state.selected.size === 0 ? "disabled" : ""}>
              ${proposalLabel()}
            </button>
            <div class="turnkey-card">
              <div class="turnkey-card__title">콘텐츠 구성이 필요하신가요?</div>
              <p>예산과 요청사항을 보내면 담당자가 콘텐츠를 구성해 제안드려요.</p>
              <button class="button button--ghost button--full" data-action="go-concierge-buy">컨시어지 요청하기</button>
            </div>
          </aside>
        </section>
      </main>
    `);
  }

  function emptyCartPage() {
    return shell(`
      <main class="container">
        <div class="page-title">
          <h1>콘텐츠 장바구니</h1>
          <span>0편</span>
        </div>
        <section class="empty-card">
          <div class="empty-posters">
            ${poster({ posterTone: "rose" }, 62)}
            ${poster({ posterTone: "indigo" }, 62)}
            ${poster({ posterTone: "teal" }, 62)}
          </div>
          <div>
            <h2>장바구니가 비어 있어요</h2>
            <p>관심있는 콘텐츠를 장바구니에 담아두거나<br>예산과 요청사항만으로 컨시어지 요청을 보낼 수 있습니다.</p>
          </div>
          <div class="empty-actions">
            <button class="button button--ghost js-route" data-route="cart">콘텐츠 둘러보기</button>
            <button class="button button--primary" data-action="go-concierge-buy">컨시어지 요청하기</button>
          </div>
        </section>
      </main>
    `);
  }

  function breadcrumb(current = "제안서 작성") {
    return `
      <div class="breadcrumb">
        <button class="js-route" data-route="cart">장바구니</button>
        <span>›</span>
        <strong>${current}</strong>
      </div>
    `;
  }

  function textInput(name, value, prefix = "", suffix = "") {
    return `
      <div class="input-wrap">
        ${prefix ? `<span class="input-affix input-prefix">${prefix}</span>` : ""}
        <input name="${name}" value="${escapeHtml(value)}">
        ${suffix ? `<span class="input-affix input-suffix">${suffix}</span>` : ""}
      </div>
    `;
  }

  function proposalPricingFields(priceName, priceValue, rsName, rsValue = "") {
    return `
      <div class="settlement-fields" data-settlement-fields>
        <div class="field settlement-field settlement-field--amount" data-settlement-field="amount">
          <label>제안 금액 <span class="required">*</span></label>
          <div class="price-control">${toggle("currency", ["USD", "KRW"], "USD")}${textInput(priceName, priceValue, "$", "USD")}</div>
        </div>
        <div class="field settlement-field settlement-field--rs rs-rate-field" data-settlement-field="rs">
          <label>RS비율 <span class="required">*</span></label>
          ${textInput(rsName, rsValue, "", "%")}
        </div>
      </div>
    `;
  }

  function bundlePricingFields(itemId, priceValue, rsValue = "") {
    return `
      <div class="settlement-field settlement-field--amount" data-settlement-field="amount">
        ${textInput(`price-${itemId}`, priceValue, "$", "USD")}
      </div>
      <div class="settlement-field settlement-field--rs rs-rate-field" data-settlement-field="rs">
        ${textInput(`rsRate-${itemId}`, rsValue, "", "%")}
      </div>
    `;
  }

  function placeholderInput(name, placeholder) {
    return `
      <div class="input-wrap">
        <input name="${name}" value="" placeholder="${escapeHtml(placeholder)}">
      </div>
    `;
  }

  function chips(name, options, active) {
    return `
      <div class="chip-group">
        ${options.map((option) => `
          <button class="chip ${option === active ? "is-active" : ""}" type="button" data-chip="${name}" data-value="${option}">
            ${option}
          </button>
        `).join("")}
      </div>
    `;
  }

  function toggle(name, options, active) {
    return `
      <div class="toggle">
        ${options.map((option) => `
          <button class="${option === active ? "is-active" : ""}" type="button" data-chip="${name}" data-value="${option}">
            ${option}
          </button>
        `).join("")}
      </div>
    `;
  }

  function selectInput(name, options, active, disabledOptions = []) {
    return `
      <select class="select-input" name="${name}" autocomplete="off">
        ${options.map((option) => `
          <option value="${option}" ${option === active ? "selected" : ""} ${disabledOptions.includes(option) ? "disabled" : ""}>${option}</option>
        `).join("")}
      </select>
    `;
  }

  function field(label, content, required = false) {
    return `
      <div class="field">
        <label>${label} ${required ? '<span class="required">*</span>' : ""}</label>
        ${content}
      </div>
    `;
  }

  function singleProposalPage() {
    const chosen = selectedItems();
    const item = chosen[0] || items[0];
    state.lastProposalKind = "single";
    state.lastProposalItems = [item.id];

    return shell(`
      <main class="container narrow">
        ${breadcrumb()}
        <section class="selected-content-card">
          ${poster(item)}
          <div>
            <div class="item-title">${escapeHtml(item.title)}</div>
            <div class="item-meta">${item.type} · ${item.episodes}화 · ${item.year}</div>
            <div class="item-genres">${item.genres.join(" · ")}</div>
          </div>
        </section>
        <section class="form-card proposal-card">
          <form class="form-stack" data-form="single">
            <div class="condition-grid">
              <div class="field--wide">${proposalPricingFields("amount", "", "rsRate")}</div>
              ${field("배포 유형", selectInput("distribution", window.DISTRIBUTION_OPTIONS, DEFAULT_DISTRIBUTION), true)}
              ${field("정산 방식", selectInput("settlement", window.SETTLEMENT_OPTIONS, "MG + RS", ["RS"]), true)}
              <div class="field field--wide">
                <label>공개 지역 <span class="required">*</span></label>
                ${placeholderInput("region", "Ex. Global, Korea only, Asia")}
              </div>
              <div class="field field--wide release-row">
                <label>희망 릴리즈 기간 <span class="required">*</span></label>
                ${chips("release", window.RELEASE_OPTIONS, "2년")}
              </div>
            </div>
            <div class="field field--memo">
              <label>추가 요청 사항</label>
              <textarea class="textarea" placeholder="플랫폼에 추가로 전달할 내용이 있다면 작성해주세요."></textarea>
            </div>
          </form>
          ${footer("single")}
        </section>
      </main>
    `);
  }

  function bundleProposalPage() {
    const chosen = selectedItems().length >= 2 ? selectedItems() : items.slice(0, 4);
    state.lastProposalKind = "bundle";
    state.lastProposalItems = chosen.map((item) => item.id);

    const prices = ["50,000", "45,000", "50,000", "35,000", "40,000"];
    const sumPer = chosen.reduce((total, item, index) => total + Number(prices[index].replaceAll(",", "")), 0);
    const bundleBudget = 180000;
    const budgetGap = bundleBudget - sumPer;
    const isBudgetMatched = budgetGap === 0;

    const bundleItems = chosen.map((item, index) => `
      <article class="bundle-item">
        <div class="bundle-item__info">
          ${poster(item, 34, "")}
          <div class="bundle-item__body">
            <div class="item-title">${escapeHtml(item.title)}</div>
            <div class="item-meta">${item.type} · ${item.episodes}화</div>
          </div>
        </div>
        <div class="bundle-item__controls settlement-fields" data-settlement-fields>
          ${selectInput(`exclusive-${item.id}`, window.EXCLUSIVITY_OPTIONS, "독점")}
          ${selectInput(`settlement-${item.id}`, window.SETTLEMENT_OPTIONS, "MG + RS", ["RS"])}
          ${bundlePricingFields(item.id, prices[index])}
        </div>
      </article>
    `).join("");

    return shell(`
      <main class="container bundle-container">
        ${breadcrumb()}
        <section class="form-card proposal-card">
          <form class="form-stack" data-form="bundle">
            <div class="grid-price">
              ${field("화폐 단위", toggle("currency", ["USD", "KRW"], "USD"), true)}
              ${field("묶음 희망 가격", textInput("bundlePrice", money(bundleBudget), "$", "USD"), true)}
            </div>
            <div>
              <div class="section-head">
                <div class="section-label">콘텐츠별 설정 <span class="required">*</span></div>
                <label class="inline-check">
                  <input type="checkbox" data-action="toggle-admin-pricing">
                  <span>개별 가격은 관리자에게 맡기기</span>
                </label>
              </div>
              <div class="bundle-setting-group">
                <div class="bundle-setting-head">
                  <span>콘텐츠</span>
                  <span>독점 여부</span>
                  <span>정산 방식</span>
                  <span>제안 금액</span>
                  <span>RS비율</span>
                </div>
                <div class="bundle-items">${bundleItems}</div>
                <div class="bundle-total">
                  <span>개별 희망 가격 합계</span>
                  <strong class="currency-total" data-amount="${sumPer}">$ ${money(sumPer)}</strong>
                </div>
              </div>
              <div class="bundle-price-note ${isBudgetMatched ? "is-match" : "is-mismatch"}" data-budget="${bundleBudget}" data-sum="${sumPer}">
                <span class="status-mark">${isBudgetMatched ? "✓" : "!"}</span>
                <span>${isBudgetMatched ? "묶음 희망 가격과 개별 합계가 일치합니다." : `묶음 희망 가격과 개별 합계가 $ ${money(Math.abs(budgetGap))} 차이납니다.`}</span>
              </div>
            </div>
            <div class="grid-2">
              ${field("공개 지역 (공통)", placeholderInput("region", "Ex. Global, Korea only, Asia"), true)}
              ${field("릴리즈 기간 (공통)", selectInput("release", window.RELEASE_OPTIONS, "2년"), true)}
            </div>
            <div class="field field--memo">
              <label>추가 요청 사항</label>
              <textarea class="textarea" placeholder="묶음 제안에 대한 보충 설명, 우선 노출 요청 등 자유롭게 작성해주세요."></textarea>
            </div>
          </form>
          ${footer("bundle")}
        </section>
      </main>
    `);
  }

  function turnkeyRequestPage() {
    state.lastProposalKind = "turnkey";
    state.lastProposalItems = [];

    return shell(`
      <main class="container narrow">
        ${breadcrumb("컨시어지 요청")}
        <section class="turnkey-intro">
          <div>
            <div class="eyebrow">Turnkey Request</div>
            <h1>콘텐츠 구성을 맡겨 요청하기</h1>
          </div>
          <p>희망 예산과 요청사항을 보내면 담당자가 조건에 맞는 콘텐츠 구성을 준비합니다.</p>
        </section>
        <section class="form-card">
          <form class="form-stack" data-form="turnkey">
            <div class="field">
              <label>희망 예산 <span class="required">*</span></label>
              <div class="price-control">${toggle("currency", ["USD", "KRW"], "USD")}${textInput("turnkeyBudget", "100,000", "$", "USD")}</div>
            </div>
            <div class="field field--memo">
              <label>요청사항 메시지 <span class="required">*</span></label>
              <textarea class="textarea textarea--large" placeholder="원하는 장르, 회차 규모, 공개 지역, 타깃 시청자, 편성 목적 등을 자유롭게 적어주세요."></textarea>
            </div>
          </form>
        </section>
      </main>
      ${footer("turnkey")}
    `);
  }

  function footer(kind) {
    const label = kind === "turnkey" ? "신청하기" : "제안 보내기";
    return `
      <div class="footer-bar ${kind === "bundle" ? "footer-bar--bundle" : ""}">
        <div class="footer-bar__inner">
          <button class="button button--ghost js-route" data-route="cart">장바구니로 돌아가기</button>
          <div class="footer-bar__spacer">
            <button class="button button--primary" data-action="submit-proposal" data-kind="${kind}">${label}</button>
          </div>
        </div>
      </div>
    `;
  }

  function successPage() {
    const isBundle = state.lastProposalKind === "bundle";
    const isTurnkey = state.lastProposalKind === "turnkey";
    const chosen = items.filter((item) => state.lastProposalItems.includes(item.id));
    const receiptItems = chosen.map((item) => `
      <div class="receipt-item">
        ${poster(item, 32, "")}
        <div class="selected-item__body">
          <div class="item-title">${escapeHtml(item.title)}</div>
          <div class="item-meta">${item.type} · ${item.episodes}화</div>
        </div>
        <span class="receipt-check">✓</span>
      </div>
    `).join("");

    return shell(`
      <main class="success">
        <div class="success-badge"><span>✓</span></div>
        <h1>${isTurnkey ? "컨시어지 요청이 전송되었어요" : isBundle ? "묶음 제안이 전송되었어요" : "제안이 전송되었어요"}</h1>
        <p>${isTurnkey ? "담당자가 요청사항에 맞는 콘텐츠 구성을 검토합니다." : `제안서가 ${platformName}에게 전달되었습니다.`}<br>답변이 도착하면 알림으로 안내해드릴게요.</p>
        <section class="receipt-card">
          <div class="receipt-row">
            <span class="eyebrow">${isTurnkey ? "요청 번호" : "제안 번호"}</span>
            <strong class="item-meta">${isTurnkey ? "TRK" : "PRP"}-2026-${isTurnkey ? "0108" : isBundle ? "0142" : "0141"}</strong>
          </div>
          <div class="receipt-line"></div>
          ${isTurnkey ? `
            <div class="turnkey-receipt">
              <div class="receipt-total">
                <span class="muted">희망 예산</span>
                <strong class="item-meta">$ 100,000 USD</strong>
              </div>
              <div class="receipt-total">
                <span class="muted">요청 방식</span>
                <strong>담당자 콘텐츠 구성</strong>
              </div>
            </div>
          ` : `<div class="receipt-items">${receiptItems}</div>`}
          <div class="receipt-line"></div>
          ${isTurnkey ? "" : `
            <div class="receipt-total">
              <span class="muted">${isBundle ? "묶음 희망가" : "제안 금액"}</span>
              <strong class="item-meta">$ ${isBundle ? "180,000" : "50,000"} USD</strong>
            </div>
            <div class="receipt-total">
              <span class="muted">플랫폼</span>
              <strong>${platformName}</strong>
            </div>
          `}
        </section>
        <div class="success-actions">
          <button class="button button--ghost" type="button">제안 내역 보기</button>
          <button class="button button--primary js-route" data-route="cart">콘텐츠 더 보기</button>
        </div>
      </main>
    `);
  }

  function render() {
    const route = (window.location.hash || "#cart").replace("#", "");
    if (route === "proposal-single") app.innerHTML = singleProposalPage();
    else if (route === "proposal-bundle") app.innerHTML = bundleProposalPage();
    else if (route === "turnkey-request") app.innerHTML = turnkeyRequestPage();
    else if (route === "success") app.innerHTML = successPage();
    else app.innerHTML = cartPage();
    syncAllSettlementAvailability();
    updateAllSettlementFields();
  }

  app.addEventListener("click", (event) => {
    const routeButton = event.target.closest(".js-route");
    if (routeButton) {
      routeTo(routeButton.dataset.route);
      return;
    }

    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;
    const action = actionTarget.dataset.action;

    if (action === "toggle-item") {
      const id = actionTarget.dataset.id;
      if (state.selected.has(id)) state.selected.delete(id);
      else state.selected.add(id);
      render();
    }

    if (action === "remove-item") {
      event.stopPropagation();
      state.selected.delete(actionTarget.dataset.id);
      render();
    }

    if (action === "toggle-all") {
      if (state.selected.size === items.length) state.selected.clear();
      else items.forEach((item) => state.selected.add(item.id));
      render();
    }

    if (action === "clear-selected") {
      state.selected.clear();
      render();
    }

    if (action === "go-proposal" && state.selected.size > 0) {
      routeTo(actionTarget.dataset.route);
    }

    if (action === "go-concierge-buy") {
      window.location.href = "concierge.html#select";
    }

    if (action === "submit-proposal") {
      state.lastProposalKind = actionTarget.dataset.kind;
      if (state.lastProposalKind === "single") {
        const first = selectedItems()[0] || items[0];
        state.lastProposalItems = [first.id];
      } else if (state.lastProposalKind === "turnkey") {
        state.lastProposalItems = [];
      } else {
        state.lastProposalItems = selectedItems().length >= 2 ? selectedItems().map((item) => item.id) : items.slice(0, 4).map((item) => item.id);
      }
      routeTo("success");
    }

    if (action === "toggle-admin-pricing") {
      const form = actionTarget.closest("form");
      const disabled = actionTarget.checked;
      form?.querySelectorAll('.bundle-item input[name^="price-"]').forEach((input) => {
        input.disabled = disabled;
        input.closest(".input-wrap")?.classList.toggle("is-disabled", disabled);
      });
      form?.querySelector(".bundle-price-note")?.classList.toggle("is-managed", disabled);
      updateAllSettlementFields();
    }
  });

  app.addEventListener("change", (event) => {
    const name = event.target.name;
    if (name === "settlement" || name.startsWith("settlement-")) {
      const scope = name === "settlement"
        ? event.target.closest("form")
        : event.target.closest(".bundle-item");
      updateSettlementFields(scope, event.target.value);
      return;
    }

    if (name !== "distribution" && !name.startsWith("exclusive-")) return;

    const scope = name === "distribution"
      ? event.target.closest("form")
      : event.target.closest(".bundle-item");
    const settlement = syncSettlementAvailability(scope, event.target.value);
    if (!settlement) return;
    updateSettlementFields(scope, settlement.value);
  });

  app.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-chip]");
    if (!chip) return;
    const group = chip.closest(".chip-group, .toggle");
    if (!group) return;
    group.querySelectorAll("[data-chip]").forEach((node) => node.classList.remove("is-active"));
    chip.classList.add("is-active");

    if (chip.dataset.chip === "currency") {
      updateCurrencyLabels(chip.closest("form"), chip.dataset.value);
    }
  });

  function updateCurrencyLabels(form, currency) {
    if (!form) return;
    const symbol = currency === "KRW" ? "₩" : "$";
    form.querySelectorAll(".input-prefix").forEach((node) => {
      node.textContent = symbol;
    });
    form.querySelectorAll(".input-suffix").forEach((node) => {
      if (node.closest(".rs-rate-field")) return;
      node.textContent = currency;
    });
    form.querySelectorAll(".currency-total").forEach((node) => {
      node.textContent = `${symbol} ${money(node.dataset.amount)}`;
    });
  }

  function updateSettlementFields(scope, settlementValue) {
    const fields = scope?.querySelector("[data-settlement-fields]");
    if (!fields) return;

    const amountField = fields.querySelector('[data-settlement-field="amount"]');
    const rsField = fields.querySelector('[data-settlement-field="rs"]');
    const managedPricing = Boolean(scope?.closest("form")?.querySelector('[data-action="toggle-admin-pricing"]')?.checked);
    const enableAmount = settlementValue !== "RS" && !managedPricing;
    const enableRs = settlementValue === "RS" || settlementValue === "MG + RS";

    function setFieldEnabled(field, enabled) {
      field?.classList.toggle("is-disabled", !enabled);
      field?.querySelectorAll("input").forEach((input) => {
        input.disabled = !enabled;
        input.closest(".input-wrap")?.classList.toggle("is-disabled", !enabled);
      });
    }

    fields.classList.toggle("is-mg-rs", enableAmount && enableRs);
    fields.classList.toggle("is-rs-only", !enableAmount && enableRs);
    fields.classList.toggle("is-amount-only", enableAmount && !enableRs);
    setFieldEnabled(amountField, enableAmount);
    setFieldEnabled(rsField, enableRs);
  }

  function updateAllSettlementFields() {
    app.querySelectorAll('select[name="settlement"], select[name^="settlement-"]').forEach((settlement) => {
      const scope = settlement.name === "settlement"
        ? settlement.closest("form")
        : settlement.closest(".bundle-item");
      updateSettlementFields(scope, settlement.value);
    });
  }

  function syncSettlementAvailability(scope, exclusivityValue) {
    const settlement = scope?.querySelector('select[name="settlement"], select[name^="settlement-"]');
    if (!settlement) return null;

    const rsOption = Array.from(settlement.options).find((option) => option.value === "RS");
    if (!rsOption) return settlement;

    rsOption.disabled = exclusivityValue === "독점";
    if (rsOption.disabled && settlement.value === "RS") {
      settlement.value = "MG + RS";
    }
    return settlement;
  }

  function syncAllSettlementAvailability() {
    app.querySelectorAll('select[name="distribution"], select[name^="exclusive-"]').forEach((exclusivity) => {
      const scope = exclusivity.name === "distribution"
        ? exclusivity.closest("form")
        : exclusivity.closest(".bundle-item");
      syncSettlementAvailability(scope, exclusivity.value);
    });
  }

  window.addEventListener("hashchange", render);
  if (!window.location.hash) window.location.hash = "cart";
  render();
})();
