(function () {
  const { escapeHtml } = window.ShortflowCommon;
  const {
    workflowItems,
    workflowStats,
    producerWorkflowItems,
    producerWorkflowStats,
  } = window.ShortflowData;

  function posterClass(tone) {
    if (!tone || tone === 'none') return 'poster none';
    return `poster ${tone}`;
  }

  function renderPoster(item, detail) {
    const className = `${posterClass(item.poster)}${detail ? ' detail-poster' : ''}${item.image ? ' has-image' : ''}`;
    const content = item.image
      ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)} 포스터">`
      : item.poster === 'none' ? '▧' : '';
    return `<span class="${className}">${content}</span>`;
  }

  function renderStats(stats, isProducer, activeFilter = 'all') {
    return `
      <section class="stats-card">
        <div class="section-label"><span></span>워크플로우 현황</div>
        <div class="stats-grid stats-count-${stats.length}">
          ${stats.map(stat => {
            const isFilter = isProducer && stat.filter;
            const active = isFilter && stat.filter === activeFilter;
            const className = `stat ${stat.accent && (!isFilter || active) ? 'accent' : ''} ${active ? 'active' : ''}`.trim();
            const content = `
              <strong>${stat.value}</strong>
              <span>${escapeHtml(stat.label)}</span>
            `;
            return isFilter
              ? `<button class="${className}" type="button" data-workflow-stat-filter="${escapeHtml(stat.filter)}" aria-pressed="${active ? 'true' : 'false'}">${content}</button>`
              : `<div class="${className}">${content}</div>`;
          }).join('')}
        </div>
      </section>
    `;
  }

  const workflowVersionSettlementRows = [
    { content: '대표님이 내 전남친입니다', platform: 'ReelShort', period: '2025-04', platformPay: 6200000, contractAmount: 6200000, whtRate: 10, wht: 620000, wireFee: 35000, fxRate: 1380, fxFee: 8000, krwIn: 5537000, bableRate: 20, bableFee: 1107400, producerPay: 4429600 },
    { content: '대표님이 내 전남친입니다', platform: 'DramaBox', period: '2025-04', platformPay: 2840000, contractAmount: null, whtRate: 16.5, wht: 468600, wireFee: 35000, fxRate: 1380, fxFee: 8000, krwIn: 2328400, bableRate: 20, bableFee: 465680, producerPay: 1862720 },
    { content: '대표님이 내 전남친입니다', platform: 'ShortMax', period: '2025-Q1', platformPay: 5120000, contractAmount: null, whtRate: 16.5, wht: 844800, wireFee: 35000, fxRate: 1448, fxFee: 8000, krwIn: 4232200, bableRate: 20, bableFee: 846440, producerPay: 3385760 },
    { content: '대표님이 내 전남친입니다', platform: 'Viki', period: '2025-04', platformPay: 4500000, contractAmount: 4500000, whtRate: 10, wht: 450000, wireFee: 35000, fxRate: 1402, fxFee: 8000, krwIn: 4007000, bableRate: 20, bableFee: 801400, producerPay: 3205600 },
    { content: '대표님이 내 전남친입니다', platform: 'NovaShort', period: '2025-04', platformPay: 3920000, contractAmount: null, whtRate: 10, wht: 392000, wireFee: 35000, fxRate: 1402, fxFee: 9000, krwIn: 3484000, bableRate: 20, bableFee: 696800, producerPay: 2787200 },
  ];

  function formatMoney(value) {
    if (value == null) return '—';
    return `₩${Number(value || 0).toLocaleString('ko-KR')}`;
  }

  function formatUsdFromKrw(value, fxRate) {
    if (value == null) return '—';
    if (!fxRate) return `$${Number(value || 0).toLocaleString('en-US')}`;
    return `$${Number(value / fxRate).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  }

  function formatPct(value) {
    return value == null ? '—' : `${value}%`;
  }

  function formatFx(value) {
    return value == null ? '—' : `₩${Number(value).toLocaleString('ko-KR')}`;
  }

  function workflowVersionSettlementSummary() {
    return workflowVersionSettlementRows.reduce((summary, row) => {
      summary.krwIn += row.krwIn || 0;
      summary.bableFee += row.bableFee || 0;
      summary.net += row.producerPay || 0;
      return summary;
    }, { krwIn: 0, bableFee: 0, net: 0 });
  }

  function renderWorkflowVersionNotice(state) {
    const status = state.workflowVersionSettlementStatus || 'SCHEDULED';
    const confirmed = status === 'CONFIRMED';
    const summary = workflowVersionSettlementSummary();
    return `
      <section class="workflow-version-notice" aria-label="정산 검토 요청">
        <div class="workflow-version-notice-left">
          <span class="workflow-version-notice-pill">${confirmed ? '검토 완료' : '검토 필요'}</span>
          <h2 class="workflow-version-notice-title">${confirmed ? '4월 처리 대기 중' : '4월 정산 검토 요청'}</h2>
          <p class="workflow-version-notice-desc">${confirmed ? '요청이 접수되었습니다. 지급 완료 후 완료 내역으로 이동합니다.' : '지급액과 공제 내역을 확인한 뒤 요청을 완료해 주세요.'}</p>
        </div>
        <div class="workflow-version-notice-right">
          <div>
            <p class="workflow-version-notice-label">예상 수령액</p>
            <p class="workflow-version-notice-amount">${formatMoney(summary.net)}</p>
          </div>
          <button class="workflow-version-notice-btn" type="button" data-workflow-version-settlement-open>${confirmed ? '상세보기' : '검토하기'} <span aria-hidden="true">→</span></button>
        </div>
      </section>
    `;
  }

  function renderWorkflowVersionSettlementRows() {
    const rows = workflowVersionSettlementRows.map((row, index) => `
      <tr>
        <td class="text-cell">${index === 0 ? escapeHtml(row.content) : ''}</td>
        <td class="text-cell">${escapeHtml(row.platform)}</td>
        <td>${escapeHtml(row.period)}</td>
        <td>${formatMoney(row.platformPay)}</td>
        <td>${formatMoney(row.contractAmount)}</td>
        <td>${formatPct(row.whtRate)}</td>
        <td>${formatUsdFromKrw(row.wht, row.fxRate)}</td>
        <td>${formatUsdFromKrw(row.wireFee, row.fxRate)}</td>
        <td>${formatFx(row.fxRate)}</td>
        <td>${formatMoney(row.fxFee)}</td>
        <td>${formatMoney(row.krwIn)}</td>
        <td>${formatPct(row.bableRate)}</td>
        <td>${formatMoney(row.bableFee)}</td>
        <td class="producer-pay">${formatMoney(row.producerPay)}</td>
      </tr>
    `).join('');
    const summary = workflowVersionSettlementSummary();
    return `${rows}
      <tr class="subtotal-row">
        <td colspan="3">전체 합계</td>
        <td colspan="7"></td>
        <td>${formatMoney(summary.krwIn)}</td>
        <td></td>
        <td>${formatMoney(summary.bableFee)}</td>
        <td class="producer-pay">${formatMoney(summary.net)}</td>
      </tr>
    `;
  }

  function renderWorkflowVersionSettlementModal(state) {
    const open = !!state.workflowVersionSettlementModalOpen;
    const confirmed = state.workflowVersionSettlementStatus === 'CONFIRMED';
    const summary = workflowVersionSettlementSummary();
    return `
      <div class="workflow-settlement-modal-backdrop ${open ? 'show' : ''}" role="dialog" aria-modal="true" aria-labelledby="workflowSettlementModalTitle" data-workflow-version-modal-backdrop>
        <div class="workflow-settlement-modal-panel">
          <div class="workflow-settlement-modal-head">
            <div>
              <div class="workflow-settlement-title-row">
                <h3 id="workflowSettlementModalTitle" class="workflow-settlement-modal-title">2025년 4월 정산 처리 내역</h3>
                ${confirmed ? '<span class="workflow-settlement-modal-badge">검토 완료</span>' : ''}
              </div>
              <p class="workflow-settlement-modal-subtitle">콘텐츠 1건 · 플랫폼 정산 ${workflowVersionSettlementRows.length}건</p>
            </div>
          </div>
          <div class="workflow-settlement-modal-body">
            <div class="workflow-settlement-detail-grid">
              <div class="workflow-settlement-detail-card">
                <p class="workflow-settlement-detail-k">실입금액(원)</p>
                <p class="workflow-settlement-detail-v">${formatMoney(summary.krwIn)}</p>
              </div>
              <div class="workflow-settlement-detail-card">
                <p class="workflow-settlement-detail-k">비에이블 수수료 금액(원)</p>
                <p class="workflow-settlement-detail-v">${formatMoney(summary.bableFee)}</p>
              </div>
              <div class="workflow-settlement-detail-card net">
                <p class="workflow-settlement-detail-k">최종 정산액(원)</p>
                <p class="workflow-settlement-detail-v">${formatMoney(summary.net)}</p>
              </div>
            </div>
            <div class="workflow-settlement-section-head">
              <p class="workflow-settlement-section-title">상세 내역</p>
              <p class="workflow-settlement-section-meta">플랫폼별 지급 및 공제 기준</p>
            </div>
            <div class="workflow-settlement-table-wrap">
              <table class="workflow-settlement-detail-table">
                <thead>
                  <tr class="group-row">
                    <th colspan="2"></th>
                    <th colspan="3"><span class="workflow-settlement-table-group platform">플랫폼 지급</span></th>
                    <th colspan="6"><span class="workflow-settlement-table-group deduct">공제 내역</span></th>
                    <th colspan="3"><span class="workflow-settlement-table-group settle">정산</span></th>
                  </tr>
                  <tr>
                    <th class="text-cell">콘텐츠</th>
                    <th class="text-cell">플랫폼</th>
                    <th>발생월/분기</th>
                    <th>플랫폼 지급액</th>
                    <th>계약 금액</th>
                    <th>원천세 비율</th>
                    <th>원천세 금액(USD)</th>
                    <th>송금 수수료(USD)</th>
                    <th>환율</th>
                    <th>환전 수수료(원)</th>
                    <th>실입금액(원)</th>
                    <th>Bable 수수료율</th>
                    <th>Bable 수수료 금액(원)</th>
                    <th>제작사 정산액(원)</th>
                  </tr>
                </thead>
                <tbody>${renderWorkflowVersionSettlementRows()}</tbody>
              </table>
            </div>
          </div>
          <div class="workflow-settlement-modal-foot">
            <p class="workflow-settlement-modal-help">${confirmed ? '요청이 접수된 내역입니다. 읽기 전용으로 제공됩니다.' : '검토를 마치면 정산 요청을 진행해 주세요.'}</p>
            <div class="workflow-settlement-modal-actions">
              <button type="button" class="workflow-settlement-modal-action" data-workflow-version-settlement-close>닫기</button>
              ${confirmed ? '' : '<button type="button" class="workflow-settlement-modal-action primary" data-workflow-version-settlement-confirm>정산 요청</button>'}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function workflowVersionDistributionRows() {
    return window.ShortflowDistributionData?.rows || [];
  }

  function workflowVersionFormatNumber(value) {
    return Number(value || 0).toLocaleString('ko-KR');
  }

  function workflowVersionTotals() {
    const rows = workflowVersionDistributionRows();
    return rows.reduce((totals, row) => {
      const details = row.platformDetails || [];
      totals.contents += 1;
      totals.platforms += details.length || (row.platforms || []).length;
      details.forEach(platform => {
        totals.views += platform.views || 0;
        totals.follows += platform.follows || 0;
        totals.likes += platform.likes || 0;
      });
      const counts = row.platformStageCounts || {};
      totals.scheduled += counts.scheduled || 0;
      totals.active += counts.active || 0;
      totals.closed += counts.closed || 0;
      return totals;
    }, { contents: 0, platforms: 0, views: 0, follows: 0, likes: 0, scheduled: 0, active: 0, closed: 0 });
  }

  function renderWorkflowVersionDashboardMetric(label, value, meta = '') {
    return `
      <article class="workflow-version-dashboard-metric">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
        ${meta ? `<em>${escapeHtml(meta)}</em>` : ''}
      </article>
    `;
  }

  function renderWorkflowVersionStatusCard(label, value) {
    return `
      <div class="workflow-version-status-card">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>
    `;
  }

  function renderWorkflowVersionSettlementHistory() {
    const history = [
      { month: '2025년 3월', contents: '1편', amount: '₩17,830,481', status: '완료' },
      { month: '2025년 2월', contents: '1편', amount: '₩19,037,064', status: '완료' },
      { month: '2025년 1월', contents: '1편', amount: '₩18,000,808', status: '완료' },
    ];
    return `
      <section class="workflow-version-dashboard-section">
        <div class="workflow-version-section-head">
          <h3>이전 정산 내역</h3>
          <a href="settlement-list.html">전체보기 <span aria-hidden="true">→</span></a>
        </div>
        <div class="workflow-version-history-table">
          ${history.map(item => `
            <div class="workflow-version-history-row">
              <span>${escapeHtml(item.month)}</span>
              <span>${escapeHtml(item.contents)}</span>
              <strong>${escapeHtml(item.amount)}</strong>
              <em>${escapeHtml(item.status)}</em>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderWorkflowVersionDashboard() {
    const totals = workflowVersionTotals();
    return `
      <section class="workflow-version-dashboard">
        <div class="workflow-version-section-head">
          <h3>콘텐츠 운영 요약</h3>
          <span>${workflowVersionFormatNumber(totals.contents)}개 콘텐츠 기준</span>
        </div>
        <div class="workflow-version-dashboard-grid">
          ${renderWorkflowVersionDashboardMetric('조회수', workflowVersionFormatNumber(totals.views), '플랫폼 합산 누적')}
          ${renderWorkflowVersionDashboardMetric('팔로우수', workflowVersionFormatNumber(totals.follows), '플랫폼 합산 누적')}
          ${renderWorkflowVersionDashboardMetric('좋아요수', workflowVersionFormatNumber(totals.likes), '플랫폼 합산 누적')}
          ${renderWorkflowVersionDashboardMetric('계약 플랫폼', `${workflowVersionFormatNumber(totals.platforms)}개`, '전체 콘텐츠 합산')}
        </div>
        <div class="workflow-version-status-grid">
          ${renderWorkflowVersionStatusCard('예정', `${workflowVersionFormatNumber(totals.scheduled)}개`)}
          ${renderWorkflowVersionStatusCard('유통중', `${workflowVersionFormatNumber(totals.active)}개`)}
          ${renderWorkflowVersionStatusCard('종료', `${workflowVersionFormatNumber(totals.closed)}개`)}
        </div>
      </section>
      ${renderWorkflowVersionSettlementHistory()}
    `;
  }

  function filterProducerWorkflowItems(items, filter = 'all') {
    if (filter === 'content') return items.filter(item => (item.contentKind || '콘텐츠') !== '기획안');
    if (filter === 'plan') return items.filter(item => (item.contentKind || '콘텐츠') === '기획안');
    return items;
  }

  function workflowSummary(item, isProducer) {
    if (!isProducer) return '';
    return item.contentKind || '콘텐츠';
  }

  function workflowStatusClass(item) {
    if (!item) return '';
    if (item.statusLabel === '검토중') return 'is-review';
    if (item.statusLabel === '승인완료') return 'is-approved';
    return '';
  }

  function workflowHasNewUpdate(item) {
    return item && item.hasWorkflowUpdate;
  }

  function producerWorkflowListMeta(item) {
    return `${workflowSummary(item, true)} | ${item.statusLabel || item.status}`;
  }

  function platformWorkflowKind(item) {
    return item && item.workflowType ? item.workflowType : '단일';
  }

  function platformStatusLabel(itemOrStatus) {
    const status = typeof itemOrStatus === 'string'
      ? itemOrStatus
      : itemOrStatus ? (itemOrStatus.statusLabel || itemOrStatus.status || '') : '';
    const workflowType = typeof itemOrStatus === 'string' ? '단일' : platformWorkflowKind(itemOrStatus);
    const isConcierge = workflowType === '컨시어지' || workflowType === '턴키';
    const labels = {
      INQUIRY_SENT: isConcierge ? '컨시어지 의뢰 전달' : '구매의사 전달',
      CONFIRM_SENT: isConcierge ? '관리자 추천안 회신' : workflowType === '묶음' ? '관리자 묶음 조건 회신' : '관리자 조건 회신',
      CONFIRM_ACKNOWLEDGED: '컨펌 확인',
      METADATA_GRANTED: '메타데이터 권한 열림',
      CLOSED: '워크플로우 종료',
    };
    return labels[status] || status;
  }

  function platformWorkflowListMeta(item) {
    const workflowType = platformWorkflowKind(item);
    return `${workflowType} | ${platformStatusLabel(item)}`;
  }

  const producerMaterialGroups = [
    {
      title: '영상',
      rows: [
        ['자막O & 음악O', '20/50'],
        ['자막X & 음악O', '0/50'],
        ['자막O & 음악X', '0/50'],
        ['자막X & 음악X', '0/50'],
      ],
    },
    {
      title: '음향트랙',
      rows: [
        ['대사', '20/50'],
        ['음악 & 대사', '20/50'],
      ],
    },
    {
      title: '자막',
      rows: [
        ['영어', '20/50'],
        ['한국어', '0/50'],
        ['일본어', '20/50'],
        ['기타언어', '0/50'],
      ],
    },
    {
      title: '예고편',
      rows: [
        ['자막O & 음악O', '2 개'],
        ['자막X & 음악O', '1 개'],
      ],
    },
    {
      title: '기타 자료',
      rows: [
        ['심의필증', '1 개'],
        ['작품소개서', '1 개'],
        ['포스터', '1 개'],
        ['홍보자료', '2 개'],
      ],
    },
  ];

  function renderProducerMaterialsPanel(item) {
    const renderMaterialCell = (entry) => {
      if (!entry) return '<td></td><td></td>';
      const [label, count] = entry;
      const isEmpty = count === '0개' || count === '0 개' || count.startsWith('0/');
      const countHtml = count.includes('/')
        ? count.replace(/^([^/]+)(\/\d+)$/, '<span class="count-current">$1</span><span class="count-total">$2</span>')
        : `<strong>${escapeHtml(count)}</strong>`;
      return `
        <td class="${isEmpty ? 'is-empty' : ''}">${escapeHtml(label)}</td>
        <td class="count ${isEmpty ? 'is-empty' : ''}">${countHtml}</td>
      `;
    };

    const renderGroupRows = (rows) => {
      const pairedRows = [];
      for (let index = 0; index < rows.length; index += 2) {
        pairedRows.push([rows[index], rows[index + 1]]);
      }

      return pairedRows.map(([left, right]) => `
        <tr>
          ${renderMaterialCell(left)}
          ${renderMaterialCell(right)}
        </tr>
      `).join('');
    };

    return `
      <div class="workflow-material-panel">
        ${producerMaterialGroups.map(group => `
          <section class="workflow-material-group">
            <h4><span></span>${escapeHtml(group.title)}</h4>
            <table class="workflow-material-table">
              <tbody>
                ${renderGroupRows(group.rows)}
              </tbody>
            </table>
          </section>
        `).join('')}
        <div class="workflow-material-submit">
          <p>자료 업로드를 모두 마쳤다면 완료 상태로 알려주세요.</p>
          <button type="button" data-material-upload-complete="${escapeHtml(item.id)}">
            업로드 완료
          </button>
        </div>
      </div>
    `;
  }

  const platformTimelineOffsets = {
    w1: ['2026년 5월 20일 오후 02:18'],
    w2: ['2026년 5월 19일 오후 06:12', '2026년 5월 19일 오후 03:44', '2026년 5월 19일 오전 11:20'],
    w3: ['2026년 5월 19일 오후 01:08'],
    w4: ['2026년 5월 19일 오전 10:42'],
    w5: ['2026년 5월 18일 오후 05:16', '2026년 5월 18일 오후 01:35'],
    w6: ['2026년 5월 18일 오후 07:40', '2026년 5월 18일 오후 05:21', '2026년 5월 18일 오후 02:10', '2026년 5월 18일 오전 10:05'],
    w7: ['2026년 5월 18일 오후 06:55', '2026년 5월 18일 오후 04:18', '2026년 5월 18일 오후 01:02', '2026년 5월 17일 오후 05:33'],
    w8: ['2026년 5월 17일 오후 04:45', '2026년 5월 17일 오후 01:21', '2026년 5월 16일 오후 06:04'],
    w9: ['2026년 5월 16일 오후 03:12', '2026년 5월 16일 오전 11:38'],
    w10: ['2026년 5월 15일 오후 07:30', '2026년 5월 15일 오후 05:14', '2026년 5월 15일 오후 02:42', '2026년 5월 15일 오전 11:08', '2026년 5월 14일 오후 04:27'],
  };

  function platformWorkflowStage(item) {
    const status = item.statusLabel || item.status || '';
    return ['INQUIRY_SENT', 'CONFIRM_SENT', 'CONFIRM_ACKNOWLEDGED', 'METADATA_GRANTED', 'CLOSED'].includes(status)
      ? status
      : 'INQUIRY_SENT';
  }

  function platformTimelineForItem(item) {
    const workflowType = platformWorkflowKind(item);
    const isBundle = workflowType === '묶음';
    const isConcierge = workflowType === '컨시어지' || workflowType === '턴키';
    const stageOrder = ['INQUIRY_SENT', 'CONFIRM_SENT', 'CONFIRM_ACKNOWLEDGED', 'METADATA_GRANTED', 'CLOSED'];
    const stageIndex = stageOrder.indexOf(platformWorkflowStage(item));
    const dates = platformTimelineOffsets[item.id] || [item.date];
    const steps = [
      { key: 'INQUIRY_SENT', title: isConcierge ? '컨시어지 의뢰를 보냈습니다.' : isBundle ? '묶음 구매의사를 보냈습니다.' : '단일 구매의사를 보냈습니다.' },
      { key: 'CONFIRM_SENT', title: isConcierge ? '관리자가 확정 콘텐츠와 조건을 회신했습니다.' : isBundle ? '관리자가 묶음 조건을 회신했습니다.' : '관리자가 조건을 회신했습니다.' },
      { key: 'CONFIRM_ACKNOWLEDGED', title: '플랫폼이 컨펌 내용을 확인했습니다.' },
      { key: 'METADATA_GRANTED', title: isBundle || isConcierge ? '확정 콘텐츠 메타데이터 권한이 열렸습니다.' : '콘텐츠 메타데이터 권한이 열렸습니다.' },
      { key: 'CLOSED', title: '워크플로우가 종료되었습니다.' },
    ];

    return steps
      .slice(0, stageIndex + 1)
      .reverse()
      .map((step, index) => ({
        key: step.key,
        title: step.title,
        date: dates[index] || item.date,
        active: index === 0,
        detail: step.detail,
      }));
  }

  function platformProposalForItem(item) {
    const proposals = {
      w2: {
        price: 'USD 30,000',
        settlementMethod: 'RS',
        rsRatio: '30%',
        distributionType: '비독점',
        region: '중국 제외 글로벌',
        term: '2026.05.01 - 2028.04.30',
        message: '글로벌 숏폼 플랫폼 편성을 검토 중입니다. 로맨스 장르 메인 슬롯에 맞춰 우선 제안드립니다.',
      },
      w3: {
        price: 'MG USD 22,000',
        settlementMethod: 'MG + RS',
        rsRatio: '25%',
        distributionType: '독점',
        region: '중국·태국 제외 글로벌',
        term: '계약일로부터 2년',
        message: '초반 화제성과 여성향 타깃 반응이 좋아 독점 선공개 조건으로 협의하고 싶습니다.',
      },
      w4: {
        price: 'USD 18,000',
        settlementMethod: 'Flat Fee',
        distributionType: '비독점',
        region: '일본 제외 글로벌',
        term: '2026.07.15 - 2027.07.14',
        message: '액션 장르 특집 편성 후보로 검토 중입니다. 메타데이터 확인 후 세부 조건 조율 가능합니다.',
      },
      w5: {
        price: 'USD 12,000',
        settlementMethod: 'RS',
        rsRatio: '35%',
        distributionType: '비독점',
        region: '기타 지정 지역',
        term: '계약일로부터 1년',
        message: '스릴러 코미디 라인업 보강 목적으로 제안드립니다. 시즌형 후속 협의도 열어두고 있습니다.',
      },
      w7: {
        price: 'MG USD 16,500',
        settlementMethod: 'MG + RS',
        rsRatio: '28%',
        distributionType: '독점',
        region: '중국 제외 글로벌',
        term: '2026.08.01 - 2027.07.31',
        message: 'SF 로맨스 카테고리 신규 캠페인에 적합해 보입니다. 자막 제공 범위 확인 부탁드립니다.',
      },
      w10: {
        price: 'USD 32,000',
        settlementMethod: 'RS',
        rsRatio: '30%',
        distributionType: '비독점',
        region: '중국 제외 글로벌',
        term: '계약일로부터 1년',
        message: '청춘 로맨스와 오피스 로맨스를 묶어 주말 편성 패키지로 제안드립니다.',
      },
    };

    return proposals[item.id] || {
      price: 'USD 20,000',
      settlementMethod: 'RS',
      rsRatio: '30%',
      distributionType: '비독점',
      region: '중국 제외 글로벌',
      term: '계약일로부터 1년',
      message: '콘텐츠 특성과 플랫폼 편성 방향이 잘 맞아 유통 제안을 전달드립니다.',
    };
  }

  function platformAdminConditionOverride(item) {
    const overrides = {
      w2: {
        single: {
          price: 'USD 28,000',
          rsRatio: '32%',
          region: '중국·일본 제외 글로벌',
          term: '2026.06.01 - 2028.05.31',
        },
      },
      w6: {
        single: {
          price: 'MG USD 18,000',
          settlementMethod: 'MG + RS',
          rsRatio: '24%',
          distributionType: '독점',
          term: '2026.07.01 - 2028.06.30',
        },
      },
      w10: {
        bundle: {
          bundleAmount: 'USD 35,000',
          regionTermSummary: '중국 제외 글로벌 · 2026.06.01 - 2027.05.31',
          confirmedContents: [
            { title: '첫사랑 리셋 버튼', price: 'USD 11,000', distributionType: '비독점', settlementMethod: 'Flat Fee', rsRatio: '-' },
            { title: '비밀 사내 결혼', price: 'USD 24,000', distributionType: '비독점', settlementMethod: 'RS', rsRatio: '32%' },
          ],
        },
      },
    };

    return overrides[item.id] || {};
  }

  function platformSentContentsForItem(item) {
    const sentContents = {
      w10: [
        { title: '첫사랑 리셋 버튼', price: 'USD 10,000', distributionType: '비독점', settlementMethod: 'Flat Fee', rsRatio: '-' },
        { title: '비밀 사내 결혼', price: 'USD 22,000', distributionType: '비독점', settlementMethod: 'RS', rsRatio: '30%' },
      ],
      w5: [
        { title: '우리 집에 킬러가 산다', price: 'USD 12,000', distributionType: '비독점', settlementMethod: 'RS', rsRatio: '35%' },
        { title: '남편이 AI입니다', price: 'MG USD 15,000', distributionType: '비독점', settlementMethod: 'MG + RS', rsRatio: '25%' },
      ],
      w4: [
        { title: '죽었다가 회귀한 톱스타', price: 'USD 18,000', distributionType: '비독점', settlementMethod: 'Flat Fee', rsRatio: '-' },
        { title: '우리 집에 킬러가 산다', price: 'USD 12,000', distributionType: '비독점', settlementMethod: 'RS', rsRatio: '35%' },
        { title: '오늘부터 악녀 대행합니다', price: 'MG USD 14,000', distributionType: '비독점', settlementMethod: 'MG + RS', rsRatio: '22%' },
      ],
    };

    return sentContents[item.id] || platformConfirmedContents(item);
  }

  function renderPlatformProposalPanel(item) {
    const proposal = platformProposalForItem(item);
    const workflowType = platformWorkflowKind(item);
    const sentContents = platformSentContentsForItem(item);
    const splitProposalPrice = (value) => {
      const text = String(value || '').trim();
      const amount = text.match(/[\d,]+(?:\.\d+)?/)?.[0] || '-';
      const currency = text.replace(amount, '').trim() || '-';
      return { currency, amount };
    };
    const priceParts = splitProposalPrice(proposal.price);
    const renderBundleContentSection = () => workflowType === '묶음' ? `
      <div class="workflow-condition-section">
        <h4>콘텐츠</h4>
        <div class="workflow-confirmed-contents workflow-bundle-contents">
          <table>
            <thead>
              <tr>
                <th>콘텐츠명</th>
                <th>가격</th>
                <th>유통 방식</th>
                <th>정산 방식</th>
                <th>RS 비율</th>
              </tr>
            </thead>
            <tbody>
              ${sentContents.map(content => `
                <tr>
                  <td>${escapeHtml(content.title)}</td>
                  <td>${escapeHtml(content.price)}</td>
                  <td>${escapeHtml(content.distributionType)}</td>
                  <td>${escapeHtml(content.settlementMethod)}</td>
                  <td>${escapeHtml(content.rsRatio || '-')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    ` : '';
    const renderProposalConditionSections = (messageTitle = '메세지') => `
      ${renderBundleContentSection()}
      <div class="workflow-condition-section">
        <h4>유통 조건</h4>
        <table class="workflow-proposal-table workflow-proposal-table-paired">
          <tbody>
            <tr>
              <th>릴리즈기간</th>
              <td>${escapeHtml(proposal.term)}</td>
              <th>릴리즈지역</th>
              <td>${escapeHtml(proposal.region)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="workflow-condition-section">
        <h4>정산 조건</h4>
        <table class="workflow-proposal-table workflow-proposal-table-paired">
          <tbody>
            <tr>
              <th>통화</th>
              <td>${escapeHtml(priceParts.currency)}</td>
              <th>묶음 가격</th>
              <td>${escapeHtml(priceParts.amount)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="workflow-condition-section">
        <h4>${escapeHtml(messageTitle)}</h4>
        <table class="workflow-proposal-table">
          <tbody>
            <tr>
              <td class="workflow-table-message">${escapeHtml(proposal.message)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    if (workflowType === '단일') {
      return `
        <div class="workflow-proposal-panel">
          <section class="workflow-proposal-card">
            ${renderProposalConditionSections()}
          </section>
        </div>
      `;
    }

    return `
      <div class="workflow-proposal-panel">
        <section class="workflow-proposal-card">
          ${renderProposalConditionSections()}
        </section>
      </div>
    `;
  }

  function platformConfirmedContents(item) {
    if (Array.isArray(item.confirmedContents) && item.confirmedContents.length) {
      return item.confirmedContents;
    }

    const proposal = platformProposalForItem(item);
    return [{
      title: item.title,
      price: proposal.price,
      distributionType: proposal.distributionType,
      settlementMethod: proposal.settlementMethod,
      rsRatio: proposal.rsRatio || '-',
    }];
  }

  function isTurnkeyWorkflow(item) {
    return item && item.workflowType === '턴키';
  }

  function isTurnkeyConfirmed(item) {
    const status = item ? (item.statusLabel || item.status || '') : '';
    return ['CONFIRM_SENT', 'CONFIRM_ACKNOWLEDGED', 'METADATA_GRANTED', 'CLOSED'].includes(status);
  }

  function bundledTitle(contents, fallbackTitle) {
    if (contents.length > 1) return `${contents[0].title} 외 ${contents.length - 1}개`;
    return contents[0]?.title || fallbackTitle;
  }

  function platformDetailTitle(item, isProducer, isUnconfirmedPlatformItem) {
    if (isProducer) return item.title;
    const contents = platformConfirmedContents(item);
    if (item.workflowType === '묶음' || item.workflowType === '컨시어지') return bundledTitle(contents, item.title);
    if (isTurnkeyWorkflow(item)) return isTurnkeyConfirmed(item) ? bundledTitle(contents, item.title) : '턴키 구매 의사';
    return isUnconfirmedPlatformItem ? '콘텐츠 미확정' : item.title;
  }

  function platformReceivedConditionForItem(item) {
    const proposal = platformProposalForItem(item);
    const contents = platformConfirmedContents(item);
    const override = platformAdminConditionOverride(item);
    const splitPrice = (value) => {
      const text = String(value || '').trim();
      const amount = text.match(/[\d,]+(?:\.\d+)?/)?.[0] || '-';
      const currency = text.replace(amount, '').trim() || '-';
      return {
        currency,
        amount,
      };
    };
    const priceParts = splitPrice(proposal.price);
    const singleConditions = {
      title: item.title,
      episodes: (item.sub || '').match(/(\d+화)/)?.[1] || '80화',
      runningTime: '회당 2분 내외',
      currency: priceParts.currency,
      amount: priceParts.amount,
      price: proposal.price,
      rsRatio: proposal.rsRatio || '-',
      distributionType: proposal.distributionType,
      settlementMethod: proposal.settlementMethod,
      region: proposal.region,
      term: proposal.term,
      releaseDate: '2026.10.12',
      adminMessage: '검토 후 조정된 조건으로 제안드립니다. 확인 후 회신 부탁드립니다.',
      ...(override.single || {}),
    };
    const overridePriceParts = splitPrice(singleConditions.price);
    singleConditions.currency = singleConditions.currency === priceParts.currency ? overridePriceParts.currency : singleConditions.currency;
    singleConditions.amount = singleConditions.amount === priceParts.amount ? overridePriceParts.amount : singleConditions.amount;

    const bundleTotal = contents.reduce((total, content) => {
      const amount = String(content.price || '').match(/[\d,]+/)?.[0];
      return total + (amount ? Number(amount.replace(/,/g, '')) : 0);
    }, 0);

    const bundleConditions = {
        bundleAmount: bundleTotal ? `USD ${bundleTotal.toLocaleString('en-US')}` : proposal.price,
        licenseRights: item.workflowType === '컨시어지' ? '컨시어지 추천 패키지 유통권' : '번들 패키지 유통권',
        regionTermSummary: `${proposal.region} · ${proposal.term}`,
        confirmedContents: contents,
        ...(override.bundle || {}),
      };

    return {
      single: singleConditions,
      bundle: bundleConditions,
    };
  }

  function diffValue(value) {
    return value || '-';
  }

  function renderDiffRows(rows) {
    return rows.map(row => {
      const sent = diffValue(row.sent);
      const received = diffValue(row.received);
      const changed = sent !== received;
      return `
        <tr class="${changed ? 'is-changed' : ''}">
          <th>${escapeHtml(row.label)}</th>
          <td>${escapeHtml(sent)}</td>
          <td>${escapeHtml(received)}</td>
        </tr>
      `;
    }).join('');
  }

  function renderPlatformConditionDiffPanel(item) {
    const workflowType = platformWorkflowKind(item);
    if (workflowType === '컨시어지' || workflowType === '턴키') return '';

    const proposal = platformProposalForItem(item);
    const condition = platformReceivedConditionForItem(item);
    const rows = workflowType === '단일'
      ? [
          { label: '가격', sent: proposal.price, received: condition.single.price },
          { label: '유통 지역', sent: proposal.region, received: condition.single.region },
          { label: '유통 기간', sent: proposal.term, received: condition.single.term },
        ]
      : [
          { label: '묶음 가격', sent: proposal.price, received: condition.bundle.bundleAmount },
          { label: '유통 지역·기간', sent: `${proposal.region} · ${proposal.term}`, received: condition.bundle.regionTermSummary },
          ...condition.bundle.confirmedContents.flatMap((content, index) => {
            const sentContent = platformSentContentsForItem(item)[index] || {};
            const labelPrefix = content.title;
            return [
              { label: `${labelPrefix} · 가격`, sent: sentContent.price, received: content.price },
            ];
          }),
        ];

    return `
      <section class="workflow-proposal-card workflow-diff-card">
        <h3>조건 변경 비교</h3>
        <table class="workflow-proposal-table workflow-diff-table">
          <thead>
            <tr>
              <th>항목</th>
              <th>보낸 제안</th>
              <th>관리자 제안</th>
            </tr>
          </thead>
          <tbody>
            ${renderDiffRows(rows)}
          </tbody>
        </table>
      </section>
    `;
  }

  function renderPlatformReceivedConditionPanel(item) {
    const isSingle = (item.workflowType || '단일') === '단일';
    const condition = platformReceivedConditionForItem(item);
    const renderReceivedConditionTable = (single) => {
      const distributionRows = [
        ['릴리즈기간', single.term, '릴리즈지역', single.region],
      ];
      const settlementRows = [
        ['통화', single.currency, '묶음 가격', single.amount],
      ];
      const renderPairedTable = (rows) => `
        <table class="workflow-proposal-table workflow-proposal-table-paired">
          <tbody>
            ${rows.map(([leftLabel, leftValue, rightLabel, rightValue]) => `
              <tr>
                <th>${escapeHtml(leftLabel)}</th>
                <td>${escapeHtml(leftValue)}</td>
                <th>${escapeHtml(rightLabel)}</th>
                <td>${escapeHtml(rightValue)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      return `
        <div class="workflow-condition-section">
          <h4>유통 조건</h4>
          ${renderPairedTable(distributionRows)}
        </div>
        <div class="workflow-condition-section">
          <h4>정산 조건</h4>
          ${renderPairedTable(settlementRows)}
        </div>
        <div class="workflow-condition-section">
          <h4>관리자 메세지</h4>
          <table class="workflow-proposal-table">
            <tbody>
              <tr>
                <td class="workflow-table-message">${escapeHtml(single.adminMessage)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    };

    if (isSingle) {
      return `
        <div class="workflow-proposal-panel">
          <section class="workflow-proposal-card">
            ${renderReceivedConditionTable(condition.single)}
          </section>
        </div>
      `;
    }

    return `
      <div class="workflow-proposal-panel">
        <section class="workflow-proposal-card">
          ${renderReceivedConditionTable(condition.single)}
          <div class="workflow-confirmed-contents">
            <h4>확정 콘텐츠</h4>
            <table>
              <thead>
                <tr>
                  <th>콘텐츠명</th>
                  <th>가격</th>
                  <th>유통 방식</th>
                  <th>정산 방식</th>
                  <th>RS 비율</th>
                </tr>
              </thead>
              <tbody>
                ${condition.bundle.confirmedContents.map(content => `
                  <tr>
                    <td>${escapeHtml(content.title)}</td>
                    <td>${escapeHtml(content.price)}</td>
                    <td>${escapeHtml(content.distributionType)}</td>
                    <td>${escapeHtml(content.settlementMethod)}</td>
                    <td>${escapeHtml(content.rsRatio || '-')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;
  }

  function renderPlatformDetailPanel(item, detailMode) {
    if (detailMode === 'received-condition') return renderPlatformReceivedConditionPanel(item);
    return renderPlatformProposalPanel(item);
  }

  function normalizePlatformStageMode(item, detailMode) {
    const availableStages = platformTimelineForItem(item).map(step => step.key);
    return availableStages.includes(detailMode) ? detailMode : platformWorkflowStage(item);
  }

  function renderPlatformAckPanel(item) {
    return `
      <div class="workflow-proposal-panel">
        ${renderPlatformConditionDiffPanel(item)}
      </div>
    `;
  }

  function renderPlatformMetadataPanel(item) {
    const metadataUrl = item.metadataUrl || item.driveUrl || '#';
    return `
      <div class="workflow-proposal-panel">
        <section class="workflow-proposal-card">
          <a class="workflow-metadata-download" href="${escapeHtml(metadataUrl)}" ${metadataUrl === '#' ? '' : 'target="_blank" rel="noopener noreferrer"'}>
            메타데이터 다운로드
          </a>
        </section>
      </div>
    `;
  }

  function renderPlatformClosedPanel(item) {
    return `
      <div class="workflow-proposal-panel">
        <section class="workflow-proposal-card">
          <h3>종료 요약</h3>
          <table class="workflow-proposal-table">
            <tbody>
              <tr>
                <th>상태</th>
                <td>워크플로우 종료</td>
              </tr>
              <tr>
                <th>대상</th>
                <td>${escapeHtml(platformDetailTitle(item, false, item.id === 'w1'))}</td>
              </tr>
              <tr>
                <th>종료 일시</th>
                <td>${escapeHtml(platformTimelineForItem(item)[0]?.date || item.date)}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    `;
  }

  function renderPlatformStageDetail(item, stageKey) {
    if (stageKey === 'CONFIRM_SENT') return renderPlatformReceivedConditionPanel(item);
    if (stageKey === 'CONFIRM_ACKNOWLEDGED') return renderPlatformAckPanel(item);
    if (stageKey === 'METADATA_GRANTED') return renderPlatformMetadataPanel(item);
    if (stageKey === 'CLOSED') return renderPlatformClosedPanel(item);
    return renderPlatformProposalPanel(item);
  }

  function renderPlatformWorkflowDetailBody(item, detailMode) {
    const selectedStage = normalizePlatformStageMode(item, detailMode);
    const timeline = platformTimelineForItem(item);

    return `
      <div class="platform-workflow-stage-layout">
        <div class="timeline-panel platform-timeline-panel">
          <h3>진행 타임라인</h3>
          <ol class="timeline-list platform-timeline-list">
            ${timeline.map(step => `
              <li class="${step.active ? 'active' : ''} ${step.key === selectedStage ? 'selected' : ''}">
                <span class="timeline-selection-bg" aria-hidden="true"></span>
                <button type="button" data-platform-workflow-stage="${escapeHtml(step.key)}">
                  <strong>${escapeHtml(step.title)}</strong>
                  <time>${escapeHtml(step.date)}</time>
                </button>
              </li>
            `).join('')}
          </ol>
        </div>
        <div class="platform-stage-detail" data-platform-workflow-stage-detail>
          ${renderPlatformStageDetail(item, selectedStage)}
        </div>
      </div>
    `;
  }

  function renderTimelinePanel(isProducer, detailTimeline) {
    return `
      <div class="timeline-panel">
        <h3>${isProducer ? '상태 변경 이력' : '진행 타임라인'}</h3>
        <ol class="timeline-list">
          ${detailTimeline.map(step => `
            <li class="${step.active ? 'active' : ''}">
              <strong>${escapeHtml(step.title)}</strong>
              <time>${escapeHtml(step.date)}</time>
            </li>
          `).join('')}
        </ol>
      </div>
    `;
  }

  const producerTimelineByStatus = {
    PRODUCTION_CONTENT_SUBMITTED: [
      { title: '콘텐츠 등록을 신청했어요.', active: true },
      { title: '콘텐츠 등록 신청이 접수되었습니다.' },
      { title: '콘텐츠 정보가 저장되었습니다.' },
    ],
    PRODUCTION_CONTENT_APPROVED: [
      { title: '관리자가 콘텐츠 등록을 승인했어요.', active: true },
      { title: '콘텐츠 등록 신청이 접수되었습니다.' },
    ],
    PRODUCTION_REVISION_REQUESTED: [
      { title: '콘텐츠 수정을 신청했어요.', active: true },
      { title: '콘텐츠 등록이 승인되었습니다.' },
    ],
    PRODUCTION_REVISION_APPROVED: [
      { title: '관리자가 수정 신청을 승인했어요.', active: true },
      { title: '콘텐츠 수정 신청이 접수되었습니다.' },
      { title: '콘텐츠 등록이 승인되었습니다.' },
    ],
    PRODUCTION_REVISION_CANCELLED: [
      { title: '제작사가 수정 신청을 취소했어요.', active: true },
      { title: '콘텐츠 수정 신청이 접수되었습니다.' },
      { title: '콘텐츠 등록이 승인되었습니다.' },
    ],
  };

  function producerTimelineForItem(item) {
    const kind = item.contentKind || '콘텐츠';
    const timelines = {
      PRODUCTION_CONTENT_SUBMITTED: [
        { title: `${kind} 등록을 신청했어요.`, active: true },
        { title: `${kind} 등록 신청이 접수되었습니다.` },
        { title: `${kind} 정보가 저장되었습니다.` },
      ],
      PRODUCTION_CONTENT_APPROVED: [
        { title: `관리자가 ${kind} 등록을 승인했어요.`, active: true },
        { title: `${kind} 등록 신청이 접수되었습니다.` },
      ],
    };
    return timelines[item.status] || producerTimelineByStatus[item.status] || [];
  }

  function renderWorkflowList(items, search, selectedId, isProducer, options = {}) {
    const keyword = search.trim().toLowerCase();
    const filteredItems = items.filter(item => {
      if (!keyword) return true;
      return `${item.title} ${item.englishTitle || ''} ${item.status} ${item.statusLabel || ''}`.toLowerCase().includes(keyword);
    });

    return `
      <section class="list-card workflow-list">
        ${options.title ? `<div class="workflow-list-head"><h2>${escapeHtml(options.title)}</h2></div>` : ''}
        <div class="workflow-search-bar">
          <div class="workflow-search-field">
            <input class="content-search" type="search" placeholder="콘텐츠명으로 검색" value="${escapeHtml(search)}">
            <span class="workflow-search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <circle cx="11" cy="11" r="6"></circle>
                <path d="M16 16l4 4"></path>
              </svg>
            </span>
          </div>
        </div>
        ${filteredItems.map(item => `
          <button class="workflow-item ${item.id === selectedId ? 'selected' : ''}" data-workflow-id="${item.id}" data-status="${escapeHtml(item.status)}">
            ${renderPoster(item, false)}
            <span class="workflow-copy">
              <span class="workflow-title-row">
                <strong>${escapeHtml(item.title)}</strong>
                ${workflowHasNewUpdate(item) ? '<span class="workflow-new-badge" aria-label="상태 변경 이력 업데이트">N</span>' : ''}
              </span>
              ${isProducer
                ? `<em>${escapeHtml(producerWorkflowListMeta(item))}</em>`
                : `<em>${escapeHtml(platformWorkflowListMeta(item))}</em>`}
              <span class="workflow-meta">
                <time>${escapeHtml(item.date)}</time>
              </span>
            </span>
          </button>
        `).join('')}
      </section>
    `;
  }

  function renderWorkflowDetail(item, isProducer, detailMode, state) {
    if (!item) {
      return `
        <section class="empty-panel">
          <div class="empty-icon">▤</div>
          <p>${isProducer ? '콘텐츠를 선택하세요' : '워크플로우를 선택하세요'}</p>
        </section>
      `;
    }

    const isUnconfirmedPlatformItem = !isProducer && item.id === 'w1';
    const title = platformDetailTitle(item, isProducer, isUnconfirmedPlatformItem);
    const subtitle = isProducer ? producerWorkflowListMeta(item) : platformWorkflowListMeta(item);
    const subtitleHtml = subtitle ? `<p>${escapeHtml(subtitle)}</p>` : '';
    const materialUploadEvents = isProducer && state.materialUploadEvents && state.materialUploadEvents[item.id]
      ? state.materialUploadEvents[item.id]
      : [];
    const baseTimeline = isProducer
      ? (item.timeline || producerTimelineForItem(item)).map(step => ({ ...step, date: step.date || item.date }))
      : platformTimelineForItem(item);
    const detailTimeline = materialUploadEvents.length
      ? [
          ...materialUploadEvents.map((step, index) => ({ ...step, active: index === 0 })),
          ...baseTimeline.map(step => ({ ...step, active: false })),
        ]
      : baseTimeline;
    const showGoogleDrive = isProducer && item.status !== 'PRODUCTION_CONTENT_SUBMITTED' && item.driveUrl;
    const showMaterials = isProducer && detailMode === 'materials';
    const platformDetailMode = isProducer ? '' : platformWorkflowStage(item);
    const detailUrl = item.detailUrl || `my-content-detail.html?title=${encodeURIComponent(item.title)}`;

    return `
      <section class="workflow-detail">
        <div class="workflow-detail-head">
          ${renderPoster(item, true)}
          <div class="detail-copy">
            <div class="detail-copy-top">
              <div class="detail-copy-main">
                <h2>${escapeHtml(title)}</h2>
                ${subtitleHtml}
              </div>
              ${isProducer ? `
                <div class="detail-external-actions">
                  <a class="detail-external-action" href="${escapeHtml(detailUrl)}" aria-label="상세보기">
                    <span>상세보기</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M7 17L17 7"></path>
                      <path d="M9 7h8v8"></path>
                    </svg>
                  </a>
                  ${item.driveUrl ? `
                    <a class="detail-external-action drive-action" href="${escapeHtml(item.driveUrl)}" target="_blank" rel="noopener noreferrer" aria-label="구글 드라이브 바로가기">
                      <span>구글 드라이브 바로가기</span>
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M4 6.5h6l2 2h8v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-11Z"></path>
                      </svg>
                    </a>
                  ` : ''}
                </div>
              ` : ''}
            </div>
            ${isProducer ? `
              <div class="detail-switch ${showMaterials ? 'is-materials' : 'is-timeline'}" role="tablist" aria-label="상세 보기 전환">
                <span class="detail-switch-thumb" aria-hidden="true"></span>
                <button class="${!showMaterials ? 'active' : ''}" type="button" data-workflow-detail-mode="timeline">워크플로우</button>
                ${showGoogleDrive ? `<button class="${showMaterials ? 'active' : ''}" type="button" data-workflow-detail-mode="materials">구글 드라이브</button>` : ''}
              </div>
            ` : ''}
          </div>
        </div>
        ${!isProducer
          ? `<div data-platform-workflow-detail-body>${renderPlatformWorkflowDetailBody(item, platformDetailMode)}</div>`
          : showMaterials ? renderProducerMaterialsPanel(item) : renderTimelinePanel(isProducer, detailTimeline)}
      </section>
    `;
  }

  function renderWorkflowView(state, options) {
    const isProducer = options && options.dashboardKind === 'producer';
    const isWorkflowVersion = isProducer && state.tab === 'workflow-version';
    const allItems = isProducer ? producerWorkflowItems : workflowItems;
    const activeFilter = isProducer ? (state.workflowKindFilter || 'all') : 'all';
    const items = isProducer ? filterProducerWorkflowItems(allItems, activeFilter) : allItems;
    const stats = isProducer ? producerWorkflowStats : workflowStats;
    const selected = items.find(item => item.id === state.selectedWorkflowId) || items[0];
    return `
      <div class="dashboard-grid workflow-grid">
        <aside class="left-column">
          ${renderWorkflowList(items, state.workflowSearch, selected?.id || '', isProducer, { title: isWorkflowVersion ? '배급 콘텐츠' : '' })}
        </aside>
        <section class="right-column">
          ${isWorkflowVersion ? renderWorkflowVersionNotice(state) : renderStats(stats, isProducer, activeFilter)}
          ${isWorkflowVersion
            ? renderWorkflowVersionDashboard()
            : renderWorkflowDetail(selected, isProducer, state.workflowDetailMode || 'timeline', state)}
        </section>
      </div>
      ${isWorkflowVersion ? renderWorkflowVersionSettlementModal(state) : ''}
    `;
  }

  window.ShortflowWorkflow = { renderWorkflowView, renderPlatformWorkflowDetailBody, renderPlatformStageDetail };
})();
