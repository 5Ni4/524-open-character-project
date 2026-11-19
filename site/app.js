const CATEGORY_ALL = "すべて";
const grid = document.querySelector("#works-grid");
const statusNode = document.querySelector("#gallery-status");
const countNode = document.querySelector("#works-count");
const searchInput = document.querySelector("#work-search");
const filters = document.querySelector("#category-filters");
const loadMoreButton = document.querySelector("#load-more");
const form = document.querySelector("#submission-form");
const formStatus = document.querySelector("#form-status");
const submitButton = document.querySelector("#submit-button");

const CODE_ADDED_WORKS = [
  {
    "title": "524の3Dモデル画像（黄色・斜めアングル）",
    "post_url": "https://x.com/asahina_AIauto/status/2099976264325247317",
    "creator_name": "朝日南",
    "creator_url": "https://x.com/asahina_AIauto",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "3D化用に生成した、手足と槍・毛皮の524",
    "post_url": "https://x.com/yurinakanishi33/status/2100383351547044054",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "白い524フィギュアの3Dプリント途中",
    "post_url": "https://x.com/asahina_AIauto/status/2101667333966332386",
    "creator_name": "朝日南",
    "creator_url": "https://x.com/asahina_AIauto",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "524擬人化のキャラクターシート（黄パーカー・呪耐性付き）",
    "post_url": "https://x.com/Saber5656/status/2103367386036617645",
    "creator_name": "せいばー",
    "creator_url": "https://x.com/Saber5656",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "524擬人化キャラクターシートとグッズ案",
    "post_url": "https://x.com/hawkymisc/status/2103374586373149153",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "524ちゃん擬人化キャラクターシート（ねこみみフード）",
    "post_url": "https://x.com/marulimoai/status/2103463412919623863",
    "creator_name": "まるぃも",
    "creator_url": "https://x.com/marulimoai",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "524ファッションの全身コーデ生成（4枚）",
    "post_url": "https://x.com/Sagasa8045/status/2103645393355776257",
    "creator_name": "さが@迷えるインドア派アニオタSEおじ",
    "creator_url": "https://x.com/Sagasa8045",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524擬人化イラスト（黄色フード・水鉄砲）",
    "post_url": "https://x.com/YoukeyKaydow/status/2103665863081758979",
    "creator_name": "階堂ゆうき",
    "creator_url": "https://x.com/YoukeyKaydow",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524の画像投稿（中身は要確認）",
    "post_url": "https://x.com/mae616_/status/2103859028199985639",
    "creator_name": "mae616 : 今川焼き",
    "creator_url": "https://x.com/mae616_",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "リアル空間で524をいじれるショート動画",
    "post_url": "https://x.com/Saber5656/status/2104222613296107742",
    "creator_name": "せいばー",
    "creator_url": "https://x.com/Saber5656",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "小さな524を集めて描いた「524」の文字",
    "post_url": "https://x.com/asahina_AIauto/status/2104590351768195267",
    "creator_name": "朝日南",
    "creator_url": "https://x.com/asahina_AIauto",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "同人誌即売会風の「524屋」ブース",
    "post_url": "https://x.com/mae616_/status/2104859872127074646",
    "creator_name": "mae616 : 今川焼き",
    "creator_url": "https://x.com/mae616_",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524の素因数分解ツリー（524=2×2×131）",
    "post_url": "https://x.com/kamimochi_2101/status/2105287867727757350",
    "creator_name": "かみもち@AI×量子×中小企業診断士",
    "creator_url": "https://x.com/kamimochi_2101",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "524ちゃんのお友達がぷるんぷるんするゼリーのWeb実験",
    "post_url": "https://x.com/mama_vibecoding/status/2106218846445256893",
    "creator_name": "Miki",
    "creator_url": "https://x.com/mama_vibecoding",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "「524作ったよ」",
    "post_url": "https://x.com/mae616_/status/2106361379490074906",
    "creator_name": "mae616 : 今川焼き",
    "creator_url": "https://x.com/mae616_",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "ブラウザゲーム「５２４ホームラン！」の発表動画",
    "post_url": "https://x.com/musicianmayo/status/2106842951980888353",
    "creator_name": "真夜中らとり",
    "creator_url": "https://x.com/musicianmayo",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "ブラウザゲーム「５２４クレーン！」の発表動画",
    "post_url": "https://x.com/musicianmayo/status/2109825982979080579",
    "creator_name": "真夜中らとり",
    "creator_url": "https://x.com/musicianmayo",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "3Dプリントした「入退社芸人」プレート",
    "post_url": "https://x.com/hawkymisc/status/2114575567161008437",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "グッズ",
    "comment": ""
  },
  {
    "title": "もらった入退社芸人バッジの実物写真",
    "post_url": "https://x.com/yurinakanishi33/status/2121524966546117105",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "7人7色の524スニーカー",
    "post_url": "https://x.com/R5ni4/status/2103651609783988437",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "お布団で眠る524",
    "post_url": "https://x.com/R5ni4/status/2103867317998526904",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "食パンのベッドで眠る524（#おやすみ524）",
    "post_url": "https://x.com/R5ni4/status/2103869843632197793",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "クロワッサンのベッドで眠る524（#おやすみ524）",
    "post_url": "https://x.com/R5ni4/status/2104208743588413811",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524タピ",
    "post_url": "https://x.com/R5ni4/status/2110689925251371285",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "チョコミントの524",
    "post_url": "https://x.com/R5ni4/status/2113266775765004749",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "入退社芸人の謝罪会見",
    "post_url": "https://x.com/R5ni4/status/2122679856995750133",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "Suicaのシール",
    "post_url": "https://x.com/R5ni4/status/2123007197722599714",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "グッズ",
    "comment": ""
  }
];

const state = {
  items: [...CODE_ADDED_WORKS],
  category: CATEGORY_ALL,
  query: "",
  offset: 0,
  totalCount: CODE_ADDED_WORKS.length,
  cmsTotalCount: 0,
  cmsDuplicateCount: 0,
  loading: false,
  configured: false,
  turnstileToken: "",
};

function safeXPostUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (!new Set(["x.com", "www.x.com", "twitter.com", "www.twitter.com"]).has(host)) return "";
    const match = url.pathname.match(/^\/(?:([^/]+\/status\/\d+)|(i\/status\/\d+))/i);
    if (!match) return "";
    return `https://x.com/${match[1] || match[2]}`;
  } catch {
    return "";
  }
}

const CODE_ADDED_NORMALIZED_POST_URLS = new Set(CODE_ADDED_WORKS.map((item) => safeXPostUrl(item.post_url)));

function safeXProfileUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (!new Set(["x.com", "www.x.com", "twitter.com", "www.twitter.com"]).has(host)) return "";
    const segments = url.pathname.split("/").filter(Boolean);
    if (segments.length !== 1 || segments[0].toLowerCase() === "i") return "";
    return `https://x.com/${segments[0]}`;
  } catch {
    return "";
  }
}

function emptyState(title, message, withLink = false) {
  const wrapper = document.createElement("div");
  wrapper.className = "empty-state";
  const content = document.createElement("div");
  const icon = document.createElement("span");
  icon.className = "empty-icon";
  icon.textContent = "524";
  const heading = document.createElement("h3");
  heading.textContent = title;
  const description = document.createElement("p");
  description.textContent = message;
  content.append(icon, heading, description);
  if (withLink) {
    const link = document.createElement("a");
    link.href = "#submit";
    link.textContent = "作品を送ってみる ↗";
    content.append(document.createElement("br"), link);
  }
  wrapper.append(content);
  return wrapper;
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function addWorkCard(item) {
  const postUrl = safeXPostUrl(item.post_url);
  if (!postUrl) return null;

  const card = document.createElement("article");
  card.className = "work-card";
  card.dataset.category = typeof item.category === "string" ? item.category : "その他";
  card.dataset.search = [item.title, item.creator_name, item.comment, item.category].filter(Boolean).join(" ").toLocaleLowerCase("ja");

  const meta = document.createElement("div");
  meta.className = "work-card-meta";
  const category = document.createElement("span");
  category.className = "category-pill";
  category.textContent = card.dataset.category;
  const date = document.createElement("time");
  date.className = "work-date";
  const dateValue = item.publishedAt || item.createdAt;
  if (dateValue) {
    date.dateTime = dateValue;
    date.textContent = formatDate(dateValue);
  }
  meta.append(category, date);

  const author = document.createElement("p");
  author.className = "work-author";
  const dot = document.createElement("span");
  dot.className = "author-dot";
  dot.setAttribute("aria-hidden", "true");
  const profileUrl = safeXProfileUrl(item.creator_url);
  if (profileUrl && item.creator_name) {
    const profile = document.createElement("a");
    profile.href = profileUrl;
    profile.target = "_blank";
    profile.rel = "noopener noreferrer";
    profile.textContent = item.creator_name;
    author.append(dot, profile);
  } else {
    author.append(dot, document.createTextNode(item.creator_name || "作者"));
  }

  const note = document.createElement("p");
  note.className = "work-note";
  note.textContent = item.comment || "";
  if (!note.textContent) note.hidden = true;

  const embed = document.createElement("div");
  embed.className = "tweet-shell";
  const quote = document.createElement("blockquote");
  quote.className = "twitter-tweet";
  const fallback = document.createElement("a");
  fallback.className = "tweet-fallback";
  fallback.href = postUrl;
  fallback.target = "_blank";
  fallback.rel = "noopener noreferrer";
  fallback.textContent = "Xで投稿を見る ↗";
  quote.append(fallback);
  embed.append(quote);

  card.append(meta, author, note, embed);
  return card;
}

function visibleItems() {
  const query = state.query.trim().toLocaleLowerCase("ja");
  return state.items.filter((item) => {
    const categoryMatches = state.category === CATEGORY_ALL || item.category === state.category;
    const text = [item.title, item.creator_name, item.comment, item.category].filter(Boolean).join(" ").toLocaleLowerCase("ja");
    return categoryMatches && (!query || text.includes(query));
  });
}

function renderWorks() {
  const items = visibleItems();
  grid.replaceChildren();
  const cards = items.map(addWorkCard).filter(Boolean);
  cards.forEach((card) => grid.append(card));
  grid.setAttribute("aria-busy", "false");

  const total = state.totalCount;
  const hasWorkSource = state.configured || CODE_ADDED_WORKS.length > 0;
  countNode.textContent = hasWorkSource
    ? (state.query || state.category !== CATEGORY_ALL ? `${cards.length}件を表示` : `${total.toLocaleString("ja-JP")}件`)
    : "準備中";
  if (cards.length === 0) {
    const noPublishedWorks = state.configured && state.items.length === 0 && state.offset === 0;
    statusNode.replaceChildren(emptyState(
      !hasWorkSource ? "作品一覧を準備しています" : noPublishedWorks ? "掲載作品を募集中です" : "作品が見つかりませんでした",
      !hasWorkSource
        ? "microCMSとの接続が整うと、公開された作品がここに並びます。"
        : noPublishedWorks
          ? "まだ作品はありません。お気に入りの524創作を、作者本人から送ってください。"
          : "検索語や種類を変えて、もう一度探してみてください。",
      noPublishedWorks,
    ));
  } else {
    statusNode.replaceChildren();
    statusNode.textContent = state.query || state.category !== CATEGORY_ALL
      ? `${cards.length}件を表示しています。`
      : "";
  }
  loadMoreButton.hidden = state.offset >= state.cmsTotalCount || !state.configured;
  loadMoreButton.disabled = state.loading;
  loadMoreButton.textContent = state.loading ? "読み込み中…" : "もっと見る ↓";
  if (cards.length) loadXEmbeds();
}

let widgetLoading;
function loadXEmbeds() {
  if (window.twttr?.widgets?.load) {
    window.twttr.widgets.load(grid);
    return;
  }
  if (widgetLoading) return;
  widgetLoading = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = resolve;
    script.onerror = resolve;
    document.head.append(script);
  }).then(() => window.twttr?.widgets?.load?.(grid));
}

async function fetchPage(offset = 0) {
  state.loading = true;
  loadMoreButton.disabled = true;
  try {
    const response = await fetch(`/api/works?offset=${offset}`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("読み込みに失敗しました。");
    const data = await response.json();
    state.configured = Boolean(data.configured);
    const fetchedItems = Array.isArray(data.contents) ? data.contents : [];
    const uniqueCmsItems = fetchedItems.filter((item) => !CODE_ADDED_NORMALIZED_POST_URLS.has(safeXPostUrl(item.post_url)));
    const duplicateCount = fetchedItems.length - uniqueCmsItems.length;
    if (offset === 0) {
      state.items = [...CODE_ADDED_WORKS, ...uniqueCmsItems];
      state.cmsDuplicateCount = duplicateCount;
    } else {
      state.items = state.items.concat(uniqueCmsItems);
      state.cmsDuplicateCount += duplicateCount;
    }
    state.offset = offset + fetchedItems.length;
    state.cmsTotalCount = Math.max(0, Number(data.totalCount || 0) - state.cmsDuplicateCount);
    state.totalCount = state.cmsTotalCount + CODE_ADDED_WORKS.length;
    renderWorks();
  } catch {
    state.loading = false;
    grid.setAttribute("aria-busy", "false");
    countNode.textContent = state.totalCount ? `${state.totalCount}件` : "読み込み中";
    statusNode.textContent = state.items.length
      ? "ほかの作品を読み込めませんでした。時間をおいて再度お試しください。"
      : "作品を読み込めませんでした。時間をおいて再度お試しください。";
  } finally {
    state.loading = false;
    loadMoreButton.disabled = false;
    loadMoreButton.textContent = "もっと見る ↓";
  }
}

async function readConfig() {
  try {
    const response = await fetch("/api/config", { headers: { Accept: "application/json" } });
    if (!response.ok) return;
    const config = await response.json();
    if (!config.submissionsEnabled || !config.turnstileSiteKey) {
      formStatus.textContent = "投稿受付の準備中です。受付開始まで、Xの公式ハッシュタグから作品を楽しんでください。";
      return;
    }
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!window.turnstile) return;
      window.turnstile.render("#turnstile-widget", {
        sitekey: config.turnstileSiteKey,
        callback(token) {
          state.turnstileToken = token;
          submitButton.disabled = false;
          formStatus.textContent = "投稿を受け付けています。送信内容は確認後に掲載します。";
          formStatus.classList.remove("is-error");
        },
        "expired-callback"() {
          state.turnstileToken = "";
          submitButton.disabled = true;
          formStatus.textContent = "確認の期限が切れました。もう一度チェックしてください。";
        },
        "error-callback"() {
          state.turnstileToken = "";
          submitButton.disabled = true;
          formStatus.textContent = "確認を読み込めませんでした。ページを再読み込みしてください。";
          formStatus.classList.add("is-error");
        },
      });
    };
    document.head.append(script);
  } catch {
    formStatus.textContent = "投稿受付の状態を確認できませんでした。時間をおいて再度お試しください。";
  }
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  filters.querySelectorAll("button[data-category]").forEach((filter) => {
    const active = filter === button;
    filter.classList.toggle("is-active", active);
    filter.setAttribute("aria-pressed", String(active));
  });
  renderWorks();
});

searchInput.addEventListener("input", () => {
  state.query = searchInput.value;
  renderWorks();
});

loadMoreButton.addEventListener("click", () => {
  if (!state.loading && state.offset < state.cmsTotalCount) fetchPage(state.offset);
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!state.turnstileToken) {
    formStatus.textContent = "スパム防止の確認を完了してください。";
    formStatus.classList.add("is-error");
    return;
  }

  const data = new FormData(form);
  submitButton.disabled = true;
  formStatus.classList.remove("is-error");
  formStatus.textContent = "送信しています…";
  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        postUrl: data.get("postUrl"),
        creatorName: data.get("creatorName"),
        creatorUrl: data.get("creatorUrl"),
        category: data.get("category"),
        comment: data.get("comment"),
        consent: data.get("consent") === "on",
        website: data.get("website"),
        turnstileToken: state.turnstileToken,
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || "送信できませんでした。入力内容をご確認ください。");
    form.reset();
    window.turnstile?.reset?.();
    state.turnstileToken = "";
    formStatus.textContent = "送信ありがとうございます。内容を確認して、掲載についてご連絡します。";
  } catch (error) {
    formStatus.textContent = error.message || "送信できませんでした。時間をおいて再度お試しください。";
    formStatus.classList.add("is-error");
    window.turnstile?.reset?.();
    state.turnstileToken = "";
  } finally {
    submitButton.disabled = !state.turnstileToken;
  }
});

if (form) readConfig();
renderWorks();
fetchPage();
