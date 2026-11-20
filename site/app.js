const CATEGORY_ALL = "すべて";
const grid = document.querySelector("#works-grid");
const statusNode = document.querySelector("#gallery-status");
const searchInput = document.querySelector("#work-search");
const filters = document.querySelector("#category-filters");
const loadMoreButton = document.querySelector("#load-more");
const form = document.querySelector("#submission-form");
const formStatus = document.querySelector("#form-status");
const submitButton = document.querySelector("#submit-button");
const isGalleryPreview = grid?.dataset.mode === "preview";
const carouselPrevious = document.querySelector("#carousel-prev");
const carouselNext = document.querySelector("#carousel-next");
const galleryCategories = ["イラスト・画像", "設定・アイデア", "グッズ", "写真・実物", "その他"];
const initialParams = new URLSearchParams(window.location?.search || "");

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
  },
  {
    "title": "展示会でもらった524と自分の524の3Dフィギュア",
    "post_url": "https://x.com/R5ni4/status/2102690943472431114",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "映画館を埋めつくす524たち",
    "post_url": "https://x.com/R5ni4/status/2104905358175285328",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "フェルトの524ぬい",
    "post_url": "https://x.com/R5ni4/status/2113551442602865098",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "門下生が持ってきた524グッズ",
    "post_url": "https://x.com/R5ni4/status/2114687032647987683",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "ほーきーさんのプレートと缶バッジ",
    "post_url": "https://x.com/R5ni4/status/2114688116015726858",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "せいばーさん宅の524（実写合成）",
    "post_url": "https://x.com/R5ni4/status/2121159530944024939",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "オフィスに524（実写合成）",
    "post_url": "https://x.com/R5ni4/status/2121165210866368735",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "ぱんだめし",
    "post_url": "https://x.com/R5ni4/status/2123404280149459120",
    "creator_name": "R-524",
    "creator_url": "https://x.com/R5ni4",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "「524増殖中」524がたくさん並ぶ画像",
    "post_url": "https://x.com/hawkymisc/status/2087110635721281792",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "数字の人が毎日入退社するゲーム（入退社ラッシュ系）",
    "post_url": "https://x.com/aka_keishin/status/2098186359936823537",
    "creator_name": "かんだ",
    "creator_url": "https://x.com/aka_keishin",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "524を流れ星にした画像",
    "post_url": "https://x.com/sorafujitani/status/2098203097428545707",
    "creator_name": "sora",
    "creator_url": "https://x.com/sorafujitani",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "頭が割れた524の画像",
    "post_url": "https://x.com/hawkymisc/status/2100576853320974382",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "箱庭ゲームに524が遊びに来た動画",
    "post_url": "https://x.com/mama_vibecoding/status/2100908873255407837",
    "creator_name": "Miki🎃🐈‍⬛",
    "creator_url": "https://x.com/mama_vibecoding",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "524コイン（3Dプリント）",
    "post_url": "https://x.com/Sagasa8045/status/2101497982902559042",
    "creator_name": "さが@迷えるインドア派アニオタSEおじ",
    "creator_url": "https://x.com/Sagasa8045",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "趣のある524デザイン画像",
    "post_url": "https://x.com/hawkymisc/status/2101663518433198307",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524貨幣（本気モード・展示会に持参）",
    "post_url": "https://x.com/verigridlabs/status/2101969939158745364",
    "creator_name": "VeriGrid",
    "creator_url": "https://x.com/verigridlabs",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "524銅像と銅貨（3Dプリント）",
    "post_url": "https://x.com/Saber5656/status/2102240748582400306",
    "creator_name": "せいばー",
    "creator_url": "https://x.com/Saber5656",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "R-524の概念を擬人化したイラスト",
    "post_url": "https://x.com/hawkymisc/status/2102328521733603483",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "本人そっくりに画像生成された524",
    "post_url": "https://x.com/kouyama_fms/status/2102380511721336906",
    "creator_name": "こうやま🦦 (univ.)",
    "creator_url": "https://x.com/kouyama_fms",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "洞窟の壁画に描かれた524（クロマニョンMMO）",
    "post_url": "https://x.com/yurinakanishi33/status/2102398538059759892",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "クロマニョンMMOに登場する524（撫でると懐く）",
    "post_url": "https://x.com/yurinakanishi33/status/2102536273181475149",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "瀕死524",
    "post_url": "https://x.com/hawkymisc/status/2102767879183552730",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "ChatGPTが考えたR-524さん（擬人化）",
    "post_url": "https://x.com/tori_kizi/status/2103346691697168423",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "524擬人化イラスト（#さがAIイラスト）",
    "post_url": "https://x.com/Sagasa8045/status/2103410622151213436",
    "creator_name": "さが@迷えるインドア派アニオタSEおじ",
    "creator_url": "https://x.com/Sagasa8045",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "524擬人化 別バージョン",
    "post_url": "https://x.com/tori_kizi/status/2103432197013381383",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "524擬人化 さらに別バージョン（大人524）",
    "post_url": "https://x.com/tori_kizi/status/2103434224703557733",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "niji7で生成した524",
    "post_url": "https://x.com/mae616_/status/2103455969284170030",
    "creator_name": "mae616 : 今川焼き",
    "creator_url": "https://x.com/mae616_",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524色の524",
    "post_url": "https://x.com/kouyama_fms/status/2103469614105854106",
    "creator_name": "こうやま🦦 (univ.)",
    "creator_url": "https://x.com/kouyama_fms",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "AI-comm Fighters（524参戦の格闘ゲーム）",
    "post_url": "https://x.com/hawkymisc/status/2103688519881576716",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "マッチョ524ほか まとめ",
    "post_url": "https://x.com/tori_kizi/status/2103744024347849020",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524キーホルダー（3Dプリント）",
    "post_url": "https://x.com/Saber5656/status/2104218597593931933",
    "creator_name": "せいばー",
    "creator_url": "https://x.com/Saber5656",
    "category": "グッズ",
    "comment": ""
  },
  {
    "title": "色相の濁った524",
    "post_url": "https://x.com/hawkymisc/status/2104264989393703238",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524スニーカーの3Dモデルデータ",
    "post_url": "https://x.com/tori_kizi/status/2104493775641100753",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524が524匹",
    "post_url": "https://x.com/asahina_AIauto/status/2104583132066590762",
    "creator_name": "朝日南",
    "creator_url": "https://x.com/asahina_AIauto",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524 Agent Bots Workspace",
    "post_url": "https://x.com/hawkymisc/status/2104952132227194883",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "524と触れ合うノベルアドベンチャーゲーム",
    "post_url": "https://x.com/tori_kizi/status/2105246363017752706",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "524ノベルゲームの紹介動画",
    "post_url": "https://x.com/tori_kizi/status/2105438574971949312",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "524を操作する横スクロールシューティング",
    "post_url": "https://x.com/tori_kizi/status/2105627489871822860",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "524スリング！（ゲーム）",
    "post_url": "https://x.com/musicianmayo/status/2106083528144490613",
    "creator_name": "真夜中らとり",
    "creator_url": "https://x.com/musicianmayo",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "ディアルガ vs パルキア vs 524",
    "post_url": "https://x.com/tori_kizi/status/2106155090310770766",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524が現代社会に転生して入退社芸をするストーリー",
    "post_url": "https://x.com/Saber5656/status/2106220454117810476",
    "creator_name": "せいばー",
    "creator_url": "https://x.com/Saber5656",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "524でパシャリ（ゲーム）",
    "post_url": "https://x.com/musicianmayo/status/2106328724845257028",
    "creator_name": "真夜中らとり",
    "creator_url": "https://x.com/musicianmayo",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "AICatchup会場の524の壁画",
    "post_url": "https://x.com/Jank0vic/status/2106353918230036813",
    "creator_name": "やんこ・タコス・ビリヤニ・個人開発",
    "creator_url": "https://x.com/Jank0vic",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "分別５２４（ゲーム）",
    "post_url": "https://x.com/musicianmayo/status/2106413707958108478",
    "creator_name": "真夜中らとり",
    "creator_url": "https://x.com/musicianmayo",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "524ころがり（ゲーム）",
    "post_url": "https://x.com/tori_kizi/status/2106892798628946266",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "毛並みがあって光る524がコーディング",
    "post_url": "https://x.com/eerm16g/status/2107133091420762447",
    "creator_name": "りさ",
    "creator_url": "https://x.com/eerm16g",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524っち（育成ゲーム風）",
    "post_url": "https://x.com/yurinakanishi33/status/2107462627404427301",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "M5Stack StopWatchで遊べる524",
    "post_url": "https://x.com/tori_kizi/status/2107635438278377818",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "524号病棟",
    "post_url": "https://x.com/kamimochi_2101/status/2108361004669399299",
    "creator_name": "かみもち@AI×量子×中小企業診断士",
    "creator_url": "https://x.com/kamimochi_2101",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524の加護を得たURATA（AI-comm Fighters）",
    "post_url": "https://x.com/hawkieslab/status/2108581708316676452",
    "creator_name": "Hawkie's App and Game Lab",
    "creator_url": "https://x.com/hawkieslab",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "５２４まぎれこみ！（ゲーム）",
    "post_url": "https://x.com/musicianmayo/status/2108956902206111795",
    "creator_name": "真夜中らとり",
    "creator_url": "https://x.com/musicianmayo",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "今日の #524indabuilding",
    "post_url": "https://x.com/livevibecoding/status/2109068649667723264",
    "creator_name": "OG おーじ",
    "creator_url": "https://x.com/livevibecoding",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "増殖する524",
    "post_url": "https://x.com/livevibecoding/status/2109081518954180695",
    "creator_name": "OG おーじ",
    "creator_url": "https://x.com/livevibecoding",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "居酒屋でSaberさんが作った524",
    "post_url": "https://x.com/yurinakanishi33/status/2109231028942561315",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "野生の524（実物）",
    "post_url": "https://x.com/eerm16g/status/2109560294620152305",
    "creator_name": "りさ",
    "creator_url": "https://x.com/eerm16g",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "524なう（Saberさん提供の実物）",
    "post_url": "https://x.com/daredaro_F/status/2109566673783333222",
    "creator_name": "匿名F＠構造婚",
    "creator_url": "https://x.com/daredaro_F",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "524と超かぐや姫",
    "post_url": "https://x.com/eerm16g/status/2109672401596555362",
    "creator_name": "りさ",
    "creator_url": "https://x.com/eerm16g",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "クロマニョンMMOを遊べるように公開（524登場）",
    "post_url": "https://x.com/yurinakanishi33/status/2111382809659285917",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "踊る524",
    "post_url": "https://x.com/marulimoai/status/2111762054751437285",
    "creator_name": "まるぃも",
    "creator_url": "https://x.com/marulimoai",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "Saberさん作の524フィギュア",
    "post_url": "https://x.com/yurinakanishi33/status/2112137860442902817",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "勝手に絞られる524",
    "post_url": "https://x.com/Saber5656/status/2112146186190860476",
    "creator_name": "せいばー",
    "creator_url": "https://x.com/Saber5656",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "入退社芸人プレート（ほーきーさん作）",
    "post_url": "https://x.com/yurinakanishi33/status/2114683223070666974",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "グッズ",
    "comment": ""
  },
  {
    "title": "524増殖中",
    "post_url": "https://x.com/hawkymisc/status/2114683712025849883",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "入退社芸人グッズ（524感を出す改良版）",
    "post_url": "https://x.com/hawkymisc/status/2115127520974741833",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "グッズ",
    "comment": ""
  },
  {
    "title": "#さがAIイラスト の524",
    "post_url": "https://x.com/Sagasa8045/status/2117219957356605542",
    "creator_name": "さが@迷えるインドア派アニオタSEおじ",
    "creator_url": "https://x.com/Sagasa8045",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "Saberさんの机にいる524",
    "post_url": "https://x.com/suna_gaku/status/2120741509054267586",
    "creator_name": "スナガク | Codexではじめるエージェンティックコーディング",
    "creator_url": "https://x.com/suna_gaku",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "524ラーメン315",
    "post_url": "https://x.com/orange_kon0817/status/2120883963464200478",
    "creator_name": "じゅり",
    "creator_url": "https://x.com/orange_kon0817",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "食べ物のイラストになった524",
    "post_url": "https://x.com/Mia7Ritter/status/2122283864383160685",
    "creator_name": "𝐌𝐢𝐚",
    "creator_url": "https://x.com/Mia7Ritter",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524作品の最終版キャプチャ",
    "post_url": "https://x.com/hawkymisc/status/2087083450939609351",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "AI界隈有名人の格闘ゲームに524参戦（紹介ポスト）",
    "post_url": "https://x.com/marulimoai/status/2099829910617592058",
    "creator_name": "まるぃも",
    "creator_url": "https://x.com/marulimoai",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "524が「生まれてる」画像",
    "post_url": "https://x.com/asahina_AIauto/status/2101675558837100970",
    "creator_name": "朝日南",
    "creator_url": "https://x.com/asahina_AIauto",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "展示会の524ブース写真",
    "post_url": "https://x.com/sat0xshi/status/2102645157145481228",
    "creator_name": "sat0xshi",
    "creator_url": "https://x.com/sat0xshi",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "524 in da building",
    "post_url": "https://x.com/livevibecoding/status/2102869490577068292",
    "creator_name": "OG おーじ",
    "creator_url": "https://x.com/livevibecoding",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524スニーカーたち",
    "post_url": "https://x.com/tori_kizi/status/2104124243873268147",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524の飛行機コラボ案",
    "post_url": "https://x.com/asahina_AIauto/status/2104920662347513961",
    "creator_name": "朝日南",
    "creator_url": "https://x.com/asahina_AIauto",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "524のお友達メーカーで作ったお友達（目が401）",
    "post_url": "https://x.com/4o1sobblue/status/2104946727652647391",
    "creator_name": "aoi＠11/23 技術書典21【さ01】",
    "creator_url": "https://x.com/4o1sobblue",
    "category": "設定・アイデア",
    "comment": ""
  },
  {
    "title": "524の南京錠",
    "post_url": "https://x.com/yurinakanishi33/status/2105205185811468289",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "「うちの524ﾁｬﾝが作ってくれました」画像",
    "post_url": "https://x.com/eerm16g/status/2105572411173376126",
    "creator_name": "りさ",
    "creator_url": "https://x.com/eerm16g",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "AICatchup会場の524（右の524）",
    "post_url": "https://x.com/grayscale_alpha/status/2106354051025895846",
    "creator_name": "Kei Yagi",
    "creator_url": "https://x.com/grayscale_alpha",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "524登場の速席アプリ（mae616_さん作）",
    "post_url": "https://x.com/hirococoro/status/2106355247828586527",
    "creator_name": "内海裕子(hiroko utsumi)",
    "creator_url": "https://x.com/hirococoro",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "OpenAI SideQuestで作った524画像",
    "post_url": "https://x.com/mae616_/status/2106448184654614562",
    "creator_name": "mae616 : 今川焼き",
    "creator_url": "https://x.com/mae616_",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "524の画像（筆で生まれた524への反応）",
    "post_url": "https://x.com/tori_kizi/status/2106660105588748648",
    "creator_name": "トリキジ",
    "creator_url": "https://x.com/tori_kizi",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "CRO NEKIで524と対戦",
    "post_url": "https://x.com/yurinakanishi33/status/2107636300191043886",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "524キーホルダー制作の材料",
    "post_url": "https://x.com/Saber5656/status/2108550770786501012",
    "creator_name": "せいばー",
    "creator_url": "https://x.com/Saber5656",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "524524524 画像",
    "post_url": "https://x.com/livevibecoding/status/2109068961879105580",
    "creator_name": "OG おーじ",
    "creator_url": "https://x.com/livevibecoding",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "5245245245245（草原の524）",
    "post_url": "https://x.com/livevibecoding/status/2109086798362423577",
    "creator_name": "OG おーじ",
    "creator_url": "https://x.com/livevibecoding",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "トレーナーのいる524",
    "post_url": "https://x.com/hawkymisc/status/2109646616768713029",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "Saberさん作の524フィギュア（紹介）",
    "post_url": "https://x.com/yurinakanishi33/status/2110753699153023064",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "壁画アイデアを524投稿から借りたゲーム",
    "post_url": "https://x.com/yurinakanishi33/status/2112113049587073484",
    "creator_name": "yuri",
    "creator_url": "https://x.com/yurinakanishi33",
    "category": "その他",
    "comment": ""
  },
  {
    "title": "524スポンサー",
    "post_url": "https://x.com/sorafujitani/status/2112842040598012096",
    "creator_name": "sora",
    "creator_url": "https://x.com/sorafujitani",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "R-524が握る寿司",
    "post_url": "https://x.com/hawkymisc/status/2113294982459302012",
    "creator_name": "ほーきー(Hawkie)",
    "creator_url": "https://x.com/hawkymisc",
    "category": "イラスト・画像",
    "comment": ""
  },
  {
    "title": "からしに紛れた524",
    "post_url": "https://x.com/vibe_walking/status/2114717903761363206",
    "creator_name": "りも(Limo)",
    "creator_url": "https://x.com/vibe_walking",
    "category": "写真・実物",
    "comment": ""
  },
  {
    "title": "入退社公式グッズ",
    "post_url": "https://x.com/marulimoai/status/2114841647737667667",
    "creator_name": "まるぃも",
    "creator_url": "https://x.com/marulimoai",
    "category": "グッズ",
    "comment": ""
  },
  {
    "title": "Fable 5.2の紹介動画（524登場）",
    "post_url": "https://x.com/mae616_/status/2120098240137933055",
    "creator_name": "mae616 : 今川焼き",
    "creator_url": "https://x.com/mae616_",
    "category": "その他",
    "comment": ""
  }
];

const state = {
  items: [...CODE_ADDED_WORKS],
  category: !isGalleryPreview && galleryCategories.includes(initialParams.get("category"))
    ? initialParams.get("category") : CATEGORY_ALL,
  query: isGalleryPreview ? "" : initialParams.get("q") || "",
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
  if (isGalleryPreview) {
    card.setAttribute("role", "group");
    card.setAttribute("aria-roledescription", "スライド");
    card.setAttribute("aria-label", item.title || "Xの作品投稿");
  }
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
  embed.dataset.postId = postUrl.split("/").pop();
  const target = document.createElement("div");
  target.className = "tweet-embed";
  const fallback = document.createElement("a");
  fallback.className = "tweet-fallback";
  fallback.href = postUrl;
  fallback.target = "_blank";
  fallback.rel = "noopener noreferrer";
  fallback.textContent = "Xで投稿を見る";
  embed.append(target, fallback);

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

function previewItems(items) {
  const selected = [];
  for (const category of ["イラスト・画像", "グッズ", "設定・アイデア"]) {
    const item = items.find((work) => work.category === category
      && !selected.some((chosen) => chosen.creator_url === work.creator_url))
      || items.find((work) => work.category === category);
    if (item) selected.push(item);
  }
  return [...selected, ...items.filter((item) => !selected.includes(item))].slice(0, 3);
}

function updateGalleryLinks() {
  const categoryLinks = document.querySelector("#category-links");
  if (!categoryLinks) return;
  categoryLinks.replaceChildren();
  galleryCategories.forEach((category) => {
    if (!state.items.some((item) => item.category === category)) return;
    const link = document.createElement("a");
    link.className = "gallery-category-link";
    link.href = `/works/?category=${encodeURIComponent(category)}`;
    link.textContent = category;
    categoryLinks.append(link);
  });
}

function updateGalleryQuery() {
  if (isGalleryPreview || !window.history?.replaceState) return;
  const params = new URLSearchParams();
  if (state.category !== CATEGORY_ALL) params.set("category", state.category);
  if (state.query.trim()) params.set("q", state.query.trim());
  const query = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
}

function carouselLimit() {
  return Math.max(0, (grid.scrollWidth || 0) - (grid.clientWidth || 0));
}

function updateCarouselControls() {
  if (!isGalleryPreview || !carouselPrevious || !carouselNext) return;
  const limit = carouselLimit();
  const left = Math.max(0, grid.scrollLeft || 0);
  carouselPrevious.disabled = left <= 2 || limit <= 2;
  carouselNext.disabled = left >= limit - 2 || limit <= 2;
}

function scrollCarousel(left) {
  const target = Math.max(0, Math.min(left, carouselLimit()));
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (grid.scrollTo) {
    grid.scrollTo({ left: target, behavior: reduceMotion ? "auto" : "smooth" });
  } else {
    grid.scrollLeft = target;
  }
  updateCarouselControls();
}

function moveCarousel(direction) {
  if (!isGalleryPreview) return;
  const left = grid.scrollLeft || 0;
  const start = grid.getBoundingClientRect().left;
  const positions = Array.from(grid.children, (card) => card.getBoundingClientRect().left - start + left);
  const next = direction > 0
    ? positions.find((position) => position > left + 4) ?? carouselLimit()
    : positions.reverse().find((position) => position < left - 4) ?? 0;
  scrollCarousel(next <= 4 ? 0 : next);
}

function renderWorks() {
  const matchingItems = visibleItems();
  const items = isGalleryPreview ? previewItems(matchingItems) : matchingItems;
  grid.replaceChildren();
  const cards = items.map(addWorkCard).filter(Boolean);
  cards.forEach((card) => grid.append(card));
  grid.setAttribute("aria-busy", "false");

  const hasWorkSource = state.configured || CODE_ADDED_WORKS.length > 0;
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
  }
  if (loadMoreButton) {
    loadMoreButton.hidden = state.offset >= state.cmsTotalCount || !state.configured;
    loadMoreButton.disabled = state.loading;
    loadMoreButton.textContent = state.loading ? "読み込み中…" : "もっとみる";
  }
  updateGalleryLinks();
  updateCarouselControls();
  loadXEmbeds();
}

let widgetLoading;
function getXWidgets() {
  if (window.twttr?.widgets?.createTweet) return Promise.resolve(window.twttr.widgets);
  if (widgetLoading) return widgetLoading;
  widgetLoading = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => resolve(window.twttr?.widgets?.createTweet ? window.twttr.widgets : null);
    script.onerror = () => resolve(null);
    document.head.append(script);
  });
  return widgetLoading;
}

async function renderXEmbed(shell) {
  if (!shell.isConnected || shell.dataset.embedState) return;
  shell.dataset.embedState = "loading";
  const widgets = await getXWidgets();
  if (!shell.isConnected) return;
  const target = shell.querySelector(".tweet-embed");
  const fallback = shell.querySelector(".tweet-fallback");
  try {
    const tweet = widgets && await widgets.createTweet(shell.dataset.postId, target, {
      lang: "ja",
      dnt: true,
      conversation: "none",
      align: "center",
    });
    if (!shell.isConnected) return;
    if (tweet) {
      fallback.hidden = true;
      shell.dataset.embedState = "ready";
      shell.classList.add("is-embedded");
      return;
    }
  } catch {
    // Keep the original post accessible if X cannot render it.
  }
  shell.dataset.embedState = "unavailable";
  shell.classList.add("is-unavailable");
}

let embedObserver;
function loadXEmbeds() {
  embedObserver?.disconnect();
  const shells = grid.querySelectorAll(".tweet-shell[data-post-id]");
  if (!("IntersectionObserver" in window)) {
    shells.forEach(renderXEmbed);
    return;
  }
  embedObserver = new window.IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      renderXEmbed(entry.target);
    });
  }, { rootMargin: isGalleryPreview ? "400px 240px" : "400px 0px" });
  shells.forEach((shell) => embedObserver.observe(shell));
}

async function fetchPage(offset = 0) {
  state.loading = true;
  if (loadMoreButton) loadMoreButton.disabled = true;
  try {
    const response = await fetch(`/api/works?offset=${offset}`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("読み込みに失敗しました。");
    const data = await response.json();
    state.configured = Boolean(data.configured);
    const fetchedItems = Array.isArray(data.contents) ? data.contents : [];
    const keepExistingCards = offset === 0 && !state.configured && fetchedItems.length === 0
      && state.items.length === CODE_ADDED_WORKS.length;
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
    if (keepExistingCards) {
      // Keep embeds already loading when no additional CMS source is configured.
      if (loadMoreButton) loadMoreButton.hidden = true;
    } else {
      renderWorks();
    }
  } catch {
    state.loading = false;
    grid.setAttribute("aria-busy", "false");
    statusNode.textContent = state.items.length
      ? "ほかの作品を読み込めませんでした。時間をおいて再度お試しください。"
      : "作品を読み込めませんでした。時間をおいて再度お試しください。";
  } finally {
    state.loading = false;
    if (loadMoreButton) {
      loadMoreButton.disabled = false;
      loadMoreButton.textContent = "もっとみる";
    }
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

carouselPrevious?.addEventListener("click", () => moveCarousel(-1));
carouselNext?.addEventListener("click", () => moveCarousel(1));
if (isGalleryPreview) {
  grid.addEventListener("scroll", updateCarouselControls, { passive: true });
  window.addEventListener?.("resize", updateCarouselControls);
  grid.addEventListener("keydown", (event) => {
    if (event.target !== grid) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") scrollCarousel(0);
    else if (event.key === "End") scrollCarousel(carouselLimit());
    else moveCarousel(event.key === "ArrowRight" ? 1 : -1);
  });
}

filters?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  filters.querySelectorAll("button[data-category]").forEach((filter) => {
    const active = filter === button;
    filter.classList.toggle("is-active", active);
    filter.setAttribute("aria-pressed", String(active));
  });
  updateGalleryQuery();
  renderWorks();
});

searchInput?.addEventListener("input", () => {
  state.query = searchInput.value;
  updateGalleryQuery();
  renderWorks();
});

loadMoreButton?.addEventListener("click", () => {
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

if (searchInput) searchInput.value = state.query;
filters?.querySelectorAll("button[data-category]").forEach((filter) => {
  const active = filter.dataset.category === state.category;
  filter.classList.toggle("is-active", active);
  filter.setAttribute("aria-pressed", String(active));
});
if (form) readConfig();
renderWorks();
fetchPage();
