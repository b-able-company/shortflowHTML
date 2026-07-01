(function () {
  const { escapeHtml } = window.ShortflowCommon;

  const contractItems = [
    {
      id: 'ct1',
      title: '마지막 우산',
      poster: 'none',
      image: '',
      episodes: 16,
      releaseStart: '2026.05.01',
      releaseEnd: '2028.04.30',
      term: '2년',
      exclusive: true,
      region: '중국 제외 글로벌',
      condition: 'MG + RS',
      amount: '30,000',
      currency: 'USD',
      status: '릴리즈 중',
    },
    {
      id: 'ct2',
      title: '살인범과 룸메이트',
      poster: 'rose',
      image: 'images/살인범과룸메이트.png',
      episodes: 20,
      releaseStart: '2025.09.26',
      releaseEnd: '2026.09.25',
      term: '1년',
      exclusive: false,
      region: '중국·태국 제외 글로벌',
      condition: 'RS',
      amount: '30%',
      currency: 'RS',
      status: '릴리즈 중',
    },
    {
      id: 'ct3',
      title: '우리 집에 킬러가',
      poster: 'indigo',
      image: 'images/우리집에킬러가.png',
      episodes: 10,
      releaseStart: '2026.06.01',
      releaseEnd: '2027.05.31',
      term: '1년',
      exclusive: true,
      region: '중국·일본 제외 글로벌',
      condition: 'Flat Fee',
      amount: '18,000',
      currency: 'USD',
      status: '릴리즈 예정',
    },
    {
      id: 'ct4',
      title: '일곱 번째 약속',
      poster: 'none',
      image: '',
      episodes: 8,
      releaseStart: '2026.03.10',
      releaseEnd: '2028.03.09',
      term: '2년',
      exclusive: false,
      region: '기타 지정 지역',
      condition: 'MG',
      amount: '12,500',
      currency: 'USD',
      status: '릴리즈 중',
    },
    {
      id: 'ct5',
      title: '봄의 잔상',
      poster: 'none',
      image: '',
      episodes: 18,
      releaseStart: '2025.12.01',
      releaseEnd: '2026.06.15',
      term: '1년',
      exclusive: false,
      region: '중국 제외 글로벌',
      condition: 'RS',
      amount: '28%',
      currency: 'RS',
      status: '릴리즈 종료',
    },
  ];

  contractItems.push(
    {
      id: 'ct6',
      title: '재벌집 막내 비서',
      poster: 'indigo',
      image: 'images/재벌집막내비서.png',
      episodes: 12,
      releaseStart: '2025.08.01',
      releaseEnd: '2026.07.20',
      term: '1년',
      exclusive: true,
      region: '기타 지정 지역',
      condition: 'MG',
      amount: '22,000',
      currency: 'USD',
      status: '릴리즈 중',
    },
    {
      id: 'ct7',
      title: '오늘부터 악녀 대행',
      poster: 'magenta',
      image: 'images/오늘부터악녀대행.png',
      episodes: 14,
      releaseStart: '2025.09.01',
      releaseEnd: '2026.08.18',
      term: '1년',
      exclusive: false,
      region: '기타 지정 지역',
      condition: 'RS',
      amount: '32%',
      currency: 'RS',
      status: '릴리즈 중',
    },
    {
      id: 'ct8',
      title: '대표님이 내 전남친',
      poster: 'rose',
      image: 'images/대표님이내전남친.png',
      episodes: 24,
      releaseStart: '2025.11.15',
      releaseEnd: '2026.08.25',
      term: '1년',
      exclusive: true,
      region: '중국 제외 글로벌',
      condition: 'Flat Fee',
      amount: '14,000',
      currency: 'USD',
      status: '릴리즈 중',
    },
    {
      id: 'ct9',
      title: '퇴사했더니 황제',
      poster: 'none',
      image: 'images/퇴사했더니황제.png',
      episodes: 16,
      releaseStart: '2025.10.01',
      releaseEnd: '2026.09.28',
      term: '1년',
      exclusive: false,
      region: '중국·일본 제외 글로벌',
      condition: 'MG + RS',
      amount: '25,000',
      currency: 'USD',
      status: '릴리즈 중',
    },
    {
      id: 'ct10',
      title: '죽었다가 회귀한',
      poster: 'indigo',
      image: 'images/죽었다가회귀한.png',
      episodes: 30,
      releaseStart: '2026.07.15',
      releaseEnd: '2027.07.14',
      term: '1년',
      exclusive: false,
      region: '중국·태국 제외 글로벌',
      condition: 'RS',
      amount: '30%',
      currency: 'RS',
      status: '릴리즈 예정',
    },
    {
      id: 'ct11',
      title: '남편이 AI',
      poster: 'rose',
      image: 'images/남편이AI.png',
      episodes: 9,
      releaseStart: '2026.08.01',
      releaseEnd: '2027.07.31',
      term: '1년',
      exclusive: true,
      region: '중국 제외 글로벌',
      condition: 'Flat Fee',
      amount: '16,500',
      currency: 'USD',
      status: '릴리즈 예정',
    },
    {
      id: 'ct12',
      title: '비밀 베이커리',
      poster: 'none',
      image: '',
      episodes: 18,
      releaseStart: '2026.01.01',
      releaseEnd: '2027.12.31',
      term: '2년',
      exclusive: false,
      region: '기타 지정 지역',
      condition: 'MG',
      amount: '19,000',
      currency: 'USD',
      status: '릴리즈 중',
    },
    {
      id: 'ct13',
      title: '골든아워',
      poster: 'none',
      image: '',
      episodes: 15,
      releaseStart: '2026.02.01',
      releaseEnd: '2028.01.31',
      term: '2년',
      exclusive: true,
      region: '중국·일본 제외 글로벌',
      condition: 'MG + RS',
      amount: '42,000',
      currency: 'USD',
      status: '릴리즈 중',
    },
    {
      id: 'ct14',
      title: '방과 후 미스터리',
      poster: 'none',
      image: '',
      episodes: 11,
      releaseStart: '2026.09.01',
      releaseEnd: '2027.08.31',
      term: '1년',
      exclusive: false,
      region: '중국 제외 글로벌',
      condition: 'RS',
      amount: '25%',
      currency: 'RS',
      status: '릴리즈 예정',
    },
    {
      id: 'ct15',
      title: '유리의 도시',
      poster: 'none',
      image: '',
      episodes: 22,
      releaseStart: '2026.04.01',
      releaseEnd: '2028.03.31',
      term: '2년',
      exclusive: true,
      region: '기타 지정 지역',
      condition: 'Flat Fee',
      amount: '27,000',
      currency: 'USD',
      status: '릴리즈 중',
    },
    {
      id: 'ct16',
      title: '러브 알고리즘',
      poster: 'none',
      image: '',
      episodes: 16,
      releaseStart: '2026.05.15',
      releaseEnd: '2028.05.14',
      term: '2년',
      exclusive: false,
      region: '중국·태국 제외 글로벌',
      condition: 'MG',
      amount: '20,000',
      currency: 'USD',
      status: '릴리즈 중',
    },
    {
      id: 'ct17',
      title: '왕실 리셋',
      poster: 'none',
      image: '',
      episodes: 26,
      releaseStart: '2026.10.01',
      releaseEnd: '2027.09.30',
      term: '1년',
      exclusive: true,
      region: '중국·일본 제외 글로벌',
      condition: 'MG + RS',
      amount: '34,000',
      currency: 'USD',
      status: '릴리즈 예정',
    },
    {
      id: 'ct18',
      title: '블루 계약서',
      poster: 'none',
      image: '',
      episodes: 13,
      releaseStart: '2026.06.01',
      releaseEnd: '2028.05.31',
      term: '2년',
      exclusive: false,
      region: '기타 지정 지역',
      condition: 'RS',
      amount: '29%',
      currency: 'RS',
      status: '릴리즈 중',
    },
    {
      id: 'ct19',
      title: '네온 블라썸',
      poster: 'none',
      image: '',
      episodes: 20,
      releaseStart: '2026.11.01',
      releaseEnd: '2027.10.31',
      term: '1년',
      exclusive: false,
      region: '중국 제외 글로벌',
      condition: 'Flat Fee',
      amount: '13,500',
      currency: 'USD',
      status: '릴리즈 예정',
    },
    {
      id: 'ct20',
      title: '떨어진 왕관',
      poster: 'none',
      image: '',
      episodes: 12,
      releaseStart: '2025.01.01',
      releaseEnd: '2026.01.31',
      term: '1년',
      exclusive: true,
      region: '기타 지정 지역',
      condition: 'MG',
      amount: '18,000',
      currency: 'USD',
      status: '릴리즈 종료',
    },
    {
      id: 'ct21',
      title: '평행선의 우리',
      poster: 'none',
      image: '',
      episodes: 14,
      releaseStart: '2025.03.01',
      releaseEnd: '2026.03.31',
      term: '1년',
      exclusive: false,
      region: '기타 지정 지역',
      condition: 'RS',
      amount: '26%',
      currency: 'RS',
      status: '릴리즈 종료',
    },
    {
      id: 'ct22',
      title: '검은 소금',
      poster: 'none',
      image: '',
      episodes: 8,
      releaseStart: '2025.05.01',
      releaseEnd: '2026.04.30',
      term: '1년',
      exclusive: false,
      region: '중국·태국 제외 글로벌',
      condition: 'Flat Fee',
      amount: '9,500',
      currency: 'USD',
      status: '릴리즈 종료',
    },
    {
      id: 'ct23',
      title: '체리 증거물',
      poster: 'none',
      image: '',
      episodes: 17,
      releaseStart: '2026.06.10',
      releaseEnd: '2028.06.09',
      term: '2년',
      exclusive: true,
      region: '중국·일본 제외 글로벌',
      condition: 'MG + RS',
      amount: '38,000',
      currency: 'USD',
      status: '릴리즈 중',
    },
    {
      id: 'ct24',
      title: '겨울 후계자',
      poster: 'none',
      image: '',
      episodes: 21,
      releaseStart: '2026.06.20',
      releaseEnd: '2028.06.19',
      term: '2년',
      exclusive: false,
      region: '중국 제외 글로벌',
      condition: 'MG',
      amount: '24,000',
      currency: 'USD',
      status: '릴리즈 중',
    }
  );

  const CONTRACT_PAGE_SIZE = 12;

  function posterClass(tone) {
    if (!tone || tone === 'none') return 'poster none';
    return `poster ${tone}`;
  }

  function renderPoster(item) {
    const image = item.image
      ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)} 포스터">`
      : '▧';
    return `<span class="${posterClass(item.poster)} contract-poster ${item.image ? 'has-image' : ''}">${image}</span>`;
  }

  function parseContractDate(value) {
    const [year, month, day] = value.split('.').map(Number);
    return new Date(year, month - 1, day);
  }

  function remainingDays(item) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = parseContractDate(item.releaseEnd);
    return Math.ceil((end - today) / 86400000);
  }

  function remainingLabel(item) {
    const diff = remainingDays(item);
    if (diff < 0) return `D+${Math.abs(diff)}`;
    if (diff === 0) return 'D-day';
    return `D-${diff}`;
  }

  function isEnded(item) {
    return item.status === '릴리즈 종료';
  }

  function statusClass(status) {
    if (status === '릴리즈 중') return 'is-active';
    if (status === '릴리즈 종료') return 'is-ended';
    return 'is-upcoming';
  }

  function statusLabel(status) {
    if (status === '릴리즈 중') return 'Active';
    if (status === '릴리즈 종료') return 'Ended';
    return 'Upcoming';
  }

  function remainingClass(item) {
    return remainingDays(item) <= 90 ? 'is-urgent' : '';
  }

  function amountSummary(item) {
    if (!item.amount) return '-';
    if (!item.currency || item.currency === 'RS') return item.amount;
    return `${item.currency} ${item.amount}`;
  }

  function isRevenueShare(item) {
    return item.currency === 'RS' || String(item.amount || '').includes('%');
  }

  function amountLabel(item) {
    return isRevenueShare(item) ? '수익 배분율' : '계약 금액';
  }

  function amountLine(item) {
    if (isRevenueShare(item)) return `${amountLabel(item)} ${item.amount}`;
    return `${amountLabel(item)} ${amountSummary(item)}`;
  }

  function sortByReleaseEnd(items) {
    return [...items].sort((a, b) => {
      if (isEnded(a) !== isEnded(b)) return isEnded(a) ? 1 : -1;
      const daysDiff = remainingDays(a) - remainingDays(b);
      if (daysDiff !== 0) return daysDiff;
      return a.title.localeCompare(b.title, 'ko');
    });
  }

  const contractFilters = [
    ['all', 'All'],
    ['upcoming', 'Upcoming'],
    ['active', 'Active'],
    ['ended', 'Ended'],
  ];

  function itemMatchesFilter(item, filter) {
    if (filter === 'upcoming') return item.status === '릴리즈 예정';
    if (filter === 'active') return item.status === '릴리즈 중';
    if (filter === 'ended') return item.status === '릴리즈 종료';
    return true;
  }

  function filterCount(filter) {
    return contractItems.filter(item => itemMatchesFilter(item, filter)).length;
  }

  function renderContractFilters(activeFilter) {
    return `
      <nav class="contract-filterbar" aria-label="계약 콘텐츠 상태 필터">
        ${contractFilters.map(([value, label]) => `
          <button class="contract-filter-btn ${activeFilter === value ? 'active' : ''}" type="button" data-contract-filter="${value}">
            ${escapeHtml(label)}
            <span>${filterCount(value)}</span>
          </button>
        `).join('')}
      </nav>
    `;
  }

  function renderContractToolbar(activeFilter, searchValue) {
    return `
      <div class="contract-toolbar">
        ${renderContractFilters(activeFilter)}
        <div class="contract-toolbar-actions">
          <label class="contract-search-wrap">
            <input class="contract-search" type="search" placeholder="콘텐츠명 검색" value="${escapeHtml(searchValue)}" aria-label="콘텐츠명 검색">
          </label>
        </div>
      </div>
    `;
  }

  function renderContractListRow(item) {
    return `
      <tr class="contract-compact-row" onclick="window.ShortflowContracts.openContractDetail('${escapeHtml(item.id)}')">
        <td>
          <div class="contract-table-title">
            ${renderPoster(item)}
            <div>
              <span class="contract-status-pill ${statusClass(item.status)}">${escapeHtml(statusLabel(item.status))}</span>
              <strong>${escapeHtml(item.title)}</strong>
            </div>
          </div>
        </td>
        <td>
          <div class="contract-rights-cell">
            <strong>${escapeHtml(item.exclusive ? '독점' : '비독점')}</strong>
          </div>
        </td>
        <td>
          <div class="contract-rights-cell">
            <strong>${escapeHtml(item.region)}</strong>
          </div>
        </td>
        <td>
          <div class="contract-rights-cell">
            <strong>${escapeHtml(item.releaseStart)} ~ ${escapeHtml(item.releaseEnd)}</strong>
          </div>
        </td>
        <td>
          <span class="contract-dday ${isEnded(item) ? '' : remainingClass(item)}">
            ${escapeHtml(isEnded(item) ? '종료' : remainingLabel(item))}
          </span>
        </td>
        <td><button class="contract-detail-button" type="button">상세</button></td>
      </tr>
    `;
  }

  function renderContractList(items) {
    if (!items.length) {
      return '<div class="contract-empty">해당 상태의 계약 콘텐츠가 없습니다.</div>';
    }

    return `
      <div class="contract-table-wrap contract-list-version">
        <table class="contract-table contract-compact-table">
          <thead>
            <tr>
              <th>콘텐츠</th>
              <th>독점 여부</th>
              <th>릴리즈 지역</th>
              <th>릴리즈 기간</th>
              <th>만료</th>
              <th>상세</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(renderContractListRow).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderContractPagination(currentPage, totalPages) {
    if (totalPages <= 1) return '';

    return `
      <nav class="contract-pagination" aria-label="계약 콘텐츠 페이지">
        <button type="button" data-contract-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="이전 페이지">‹</button>
        ${Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return `
            <button
              class="${page === currentPage ? 'active' : ''}"
              type="button"
              data-contract-page="${page}"
              ${page === currentPage ? 'aria-current="page"' : ''}
            >${page}</button>
          `;
        }).join('')}
        <button type="button" data-contract-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''} aria-label="다음 페이지">›</button>
      </nav>
    `;
  }

  function renderContractModal() {
    return `
      <div class="contract-modal" id="contract-detail-modal" onclick="window.ShortflowContracts.closeContractDetail()">
        <div class="contract-modal-panel" onclick="event.stopPropagation()">
          <button class="contract-modal-close" type="button" onclick="window.ShortflowContracts.closeContractDetail()" aria-label="계약 상세 닫기">×</button>
          <div id="contract-detail-modal-body"></div>
        </div>
      </div>
    `;
  }

  function renderDetailBody(item) {
    return `
      <div class="contract-detail-layout">
        <div class="contract-modal-media">
          ${renderPoster(item)}
        </div>
        <div class="contract-modal-info">
          <div class="contract-modal-status-row">
            <span class="contract-status-pill ${statusClass(item.status)}">${escapeHtml(statusLabel(item.status))}</span>
          </div>
          <div class="contract-modal-heading">
            <h2>${escapeHtml(item.title)}</h2>
            <span>${escapeHtml(String(item.episodes))}회차</span>
          </div>
          <dl class="contract-detail-specs">
            <div>
              <dt>독점 여부</dt>
              <dd>${escapeHtml(item.exclusive ? '독점' : '비독점')}</dd>
            </div>
            <div>
              <dt>릴리즈 지역</dt>
              <dd>${escapeHtml(item.region)}</dd>
            </div>
            <div>
              <dt>계약 기간</dt>
              <dd>${escapeHtml(item.term)}</dd>
            </div>
            <div>
              <dt>정산 방식</dt>
              <dd>${escapeHtml(item.condition)}</dd>
            </div>
            <div>
              <dt>${escapeHtml(amountLabel(item))}</dt>
              <dd>${escapeHtml(amountSummary(item))}</dd>
            </div>
            <div>
              <dt>릴리즈 기간</dt>
              <dd>${escapeHtml(item.releaseStart)} ~ ${escapeHtml(item.releaseEnd)}</dd>
            </div>
            <div>
              <dt>만료까지</dt>
              <dd class="${remainingClass(item)}">${escapeHtml(remainingLabel(item))}</dd>
            </div>
          </dl>
        </div>
      </div>
    `;
  }

  function openContractDetail(id) {
    const item = contractItems.find(contract => contract.id === id);
    const modal = document.getElementById('contract-detail-modal');
    const body = document.getElementById('contract-detail-modal-body');
    if (!item || !modal || !body) return;
    body.innerHTML = renderDetailBody(item);
    modal.classList.add('show');
  }

  function closeContractDetail() {
    document.getElementById('contract-detail-modal')?.classList.remove('show');
  }

  function renderContractsView(state) {
    const activeFilter = state?.contractFilter || 'all';
    const searchValue = state?.contractSearch || '';
    const keyword = searchValue.trim().toLowerCase();
    const filteredItems = sortByReleaseEnd(contractItems.filter(item =>
      itemMatchesFilter(item, activeFilter)
      && (!keyword || item.title.toLowerCase().includes(keyword))
    ));
    const totalPages = Math.max(1, Math.ceil(filteredItems.length / CONTRACT_PAGE_SIZE));
    const currentPage = Math.min(Math.max(Number(state?.contractPage) || 1, 1), totalPages);
    const pageItems = filteredItems.slice((currentPage - 1) * CONTRACT_PAGE_SIZE, currentPage * CONTRACT_PAGE_SIZE);
    return `
      <div class="contracts-view">
        ${renderContractToolbar(activeFilter, searchValue)}
        ${renderContractList(pageItems)}
        ${renderContractPagination(currentPage, totalPages)}
        ${renderContractModal()}
      </div>
    `;
  }

  window.ShortflowContracts = { renderContractsView, openContractDetail, closeContractDetail };
})();
