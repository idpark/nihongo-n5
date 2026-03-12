// ===================== DIALOGUES (5 initial chapters) =====================
export const DIALOGUES = [
  // === Chapter 1: はじめまして ===
  {
    id: "ch01",
    chapter: 1,
    title: "はじめまして",
    titleKr: "처음 뵙겠습니다",
    theme: "daily",
    situation: "첫 만남에서 자기소개하기",
    characters: [
      { name: "田中", nameKr: "타나카", role: "일본인 회사원" },
      { name: "キム", nameKr: "김", role: "한국인 유학생" }
    ],
    lines: [
      { speaker: "田中", jp: "はじめまして。田中です。", reading: "はじめまして。たなかです。", kr: "처음 뵙겠습니다. 타나카입니다.", grammarIds: ["g001"], vocabIds: ["v013"] },
      { speaker: "キム", jp: "はじめまして。キムです。韓国人です。", reading: "はじめまして。キムです。かんこくじんです。", kr: "처음 뵙겠습니다. 김입니다. 한국인입니다.", grammarIds: ["g001"], vocabIds: ["v007","v013"] },
      { speaker: "田中", jp: "キムさんは学生ですか。", reading: "キムさんはがくせいですか。", kr: "김 씨는 학생입니까?", grammarIds: ["g003"], vocabIds: ["v003","v012"] },
      { speaker: "キム", jp: "はい、大学の学生です。日本語を勉強しています。", reading: "はい、だいがくのがくせいです。にほんごをべんきょうしています。", kr: "네, 대학 학생입니다. 일본어를 공부하고 있습니다.", grammarIds: ["g001","g004"], vocabIds: ["v003","v010","v014","v126"] },
      { speaker: "田中", jp: "そうですか。私は会社員です。", reading: "そうですか。わたしはかいしゃいんです。", kr: "그렇습니까. 저는 회사원입니다.", grammarIds: ["g001"], vocabIds: ["v001","v005"] },
      { speaker: "キム", jp: "どうぞよろしくお願いします。", reading: "どうぞよろしくおねがいします。", kr: "잘 부탁드립니다.", grammarIds: [], vocabIds: ["v013"] },
      { speaker: "田中", jp: "こちらこそ、よろしくお願いします。", reading: "こちらこそ、よろしくおねがいします。", kr: "저야말로, 잘 부탁드립니다.", grammarIds: [], vocabIds: [] }
    ],
    vocabList: ["v001","v003","v005","v007","v010","v012","v013","v014","v126"],
    grammarList: ["g001","g003","g004"],
    exercises: [
      { type: "comprehension", q: "キムさんは何人ですか？", choices: ["日本人","韓国人","中国人","アメリカ人"], answer: 1 },
      { type: "comprehension", q: "田中さんの職業は何ですか？", choices: ["学生","先生","会社員","医者"], answer: 2 },
      { type: "ordering", words: ["は","です","学生","私"], answer: "私は学生です" },
      { type: "ordering", words: ["は","ですか","学生","キムさん"], answer: "キムさんは学生ですか" },
      { type: "grammar_fill", q: "私 __ 田中です。", answer: "は", choices: ["は","が","を","に"] }
    ],
    culturalNote: "일본에서는 처음 만나면 「はじめまして」라고 인사하고, 반드시 자기 성(姓)을 먼저 소개합니다. 이름보다 성을 사용하는 것이 일반적이며, 상대방의 이름 뒤에 「さん」을 붙여 존칭으로 부릅니다."
  },

  // === Chapter 2: これは何ですか ===
  {
    id: "ch02",
    chapter: 2,
    title: "これは何ですか",
    titleKr: "이것은 무엇입니까?",
    theme: "daily",
    situation: "교실에서 물건에 대해 묻고 답하기",
    characters: [
      { name: "先生", nameKr: "선생님", role: "일본어 선생님" },
      { name: "キム", nameKr: "김", role: "한국인 유학생" }
    ],
    lines: [
      { speaker: "先生", jp: "キムさん、これは何ですか。", reading: "キムさん、これはなんですか。", kr: "김 씨, 이것은 무엇입니까?", grammarIds: ["g005"], vocabIds: ["v009","v016"] },
      { speaker: "キム", jp: "それは辞書です。日本語の辞書です。", reading: "それはじしょです。にほんごのじしょです。", kr: "그것은 사전입니다. 일본어 사전입니다.", grammarIds: ["g001","g004"], vocabIds: ["v017","v023"] },
      { speaker: "先生", jp: "この本は誰のですか。", reading: "このほんはだれのですか。", kr: "이 책은 누구의 것입니까?", grammarIds: ["g006","g004"], vocabIds: ["v019","v022","v031"] },
      { speaker: "キム", jp: "私の本です。", reading: "わたしのほんです。", kr: "제 책입니다.", grammarIds: ["g004"], vocabIds: ["v001","v022"] },
      { speaker: "先生", jp: "あれは何ですか。", reading: "あれはなんですか。", kr: "저것은 무엇입니까?", grammarIds: ["g005"], vocabIds: ["v009","v018"] },
      { speaker: "キム", jp: "あれは時計です。", reading: "あれはとけいです。", kr: "저것은 시계입니다.", grammarIds: ["g001"], vocabIds: ["v018","v029"] },
      { speaker: "先生", jp: "そうですね。机の上に何がありますか。", reading: "そうですね。つくえのうえになにがありますか。", kr: "그렇네요. 책상 위에 무엇이 있습니까?", grammarIds: ["g007","g020"], vocabIds: ["v009","v094","v144","v150"] },
      { speaker: "キム", jp: "ノートと鉛筆があります。", reading: "ノートとえんぴつがあります。", kr: "노트와 연필이 있습니다.", grammarIds: ["g007"], vocabIds: ["v026","v027","v094"] }
    ],
    vocabList: ["v009","v016","v017","v018","v019","v022","v023","v026","v027","v029","v031","v094","v144","v150"],
    grammarList: ["g001","g004","g005","g006","g007"],
    exercises: [
      { type: "comprehension", q: "辞書は誰のですか？", choices: ["先生の","キムさんの","田中さんの","友達の"], answer: 1 },
      { type: "comprehension", q: "机の上に何がありますか？", choices: ["本と辞書","ノートと鉛筆","時計と鍵","本と鉛筆"], answer: 1 },
      { type: "ordering", words: ["は","です","何","これ","か"], answer: "これは何ですか" },
      { type: "grammar_fill", q: "机の上に本が __ 。", answer: "あります", choices: ["あります","います","です","ます"] },
      { type: "grammar_fill", q: "__ 本は面白いです。(이)", answer: "この", choices: ["これ","この","その","あの"] }
    ],
    culturalNote: "일본 학교에서는 수업 시작과 끝에 인사를 합니다. 수업 시작 전에는 「お願いします」(잘 부탁합니다), 수업이 끝나면 「ありがとうございました」(감사했습니다)라고 합니다."
  },

  // === Chapter 3: どこに行きますか ===
  {
    id: "ch03",
    chapter: 3,
    title: "どこに行きますか",
    titleKr: "어디에 갑니까?",
    theme: "daily",
    situation: "길에서 장소를 묻고 이동하기",
    characters: [
      { name: "キム", nameKr: "김", role: "한국인 유학생" },
      { name: "佐藤", nameKr: "사토", role: "일본인 친구" }
    ],
    lines: [
      { speaker: "キム", jp: "佐藤さん、今日はどこに行きますか。", reading: "さとうさん、きょうはどこにいきますか。", kr: "사토 씨, 오늘은 어디에 갑니까?", grammarIds: ["g008"], vocabIds: ["v032","v045","v129"] },
      { speaker: "佐藤", jp: "図書館に行きます。キムさんは？", reading: "としょかんにいきます。キムさんは？", kr: "도서관에 갑니다. 김 씨는요?", grammarIds: ["g008"], vocabIds: ["v032","v044"] },
      { speaker: "キム", jp: "私もです。図書館で勉強します。", reading: "わたしもです。としょかんでべんきょうします。", kr: "저도요. 도서관에서 공부합니다.", grammarIds: ["g009"], vocabIds: ["v044","v066"] },
      { speaker: "佐藤", jp: "じゃ、一緒に行きましょう。", reading: "じゃ、いっしょにいきましょう。", kr: "그럼, 같이 갑시다.", grammarIds: ["g019"], vocabIds: ["v032"] },
      { speaker: "キム", jp: "すみません、駅はどこですか。", reading: "すみません、えきはどこですか。", kr: "실례합니다, 역은 어디입니까?", grammarIds: ["g003"], vocabIds: ["v038","v045","v112"] },
      { speaker: "佐藤", jp: "駅はあそこです。あの大きい建物の隣です。", reading: "えきはあそこです。あのおおきいたてもののとなりです。", kr: "역은 저기입니다. 저 큰 건물 옆입니다.", grammarIds: ["g006"], vocabIds: ["v038","v048","v074","v149"] },
      { speaker: "キム", jp: "銀行はどこですか。", reading: "ぎんこうはどこですか。", kr: "은행은 어디입니까?", grammarIds: ["g003"], vocabIds: ["v040","v045"] },
      { speaker: "佐藤", jp: "銀行は駅の前にあります。", reading: "ぎんこうはえきのまえにあります。", kr: "은행은 역 앞에 있습니다.", grammarIds: ["g007"], vocabIds: ["v038","v040","v094","v147"] }
    ],
    vocabList: ["v032","v038","v040","v044","v045","v048","v066","v074","v094","v112","v129","v147","v149"],
    grammarList: ["g003","g007","g008","g009","g019"],
    exercises: [
      { type: "comprehension", q: "二人はどこに行きますか？", choices: ["駅","銀行","図書館","学校"], answer: 2 },
      { type: "comprehension", q: "銀行はどこにありますか？", choices: ["学校の隣","駅の前","図書館の中","家の近く"], answer: 1 },
      { type: "ordering", words: ["に","行きます","図書館"], answer: "図書館に行きます" },
      { type: "ordering", words: ["で","勉強します","図書館"], answer: "図書館で勉強します" },
      { type: "grammar_fill", q: "図書館 __ 勉強します。", answer: "で", choices: ["に","で","を","は"] },
      { type: "grammar_fill", q: "駅 __ 行きます。", answer: "に", choices: ["に","で","を","は"] }
    ],
    culturalNote: "일본의 「駅」(역)은 단순한 교통 시설이 아니라 쇼핑몰, 식당가가 결합된 복합 시설인 경우가 많습니다. 「駅ビル」(역 빌딩)이나 「エキナカ」(역 안 상점가)에서 쇼핑과 식사를 즐길 수 있습니다."
  },

  // === Chapter 4: 何時ですか ===
  {
    id: "ch04",
    chapter: 4,
    title: "何時ですか",
    titleKr: "몇 시입니까?",
    theme: "daily",
    situation: "하루 일과에 대해 이야기하기",
    characters: [
      { name: "キム", nameKr: "김", role: "한국인 유학생" },
      { name: "山田", nameKr: "야마다", role: "일본인 대학생" }
    ],
    lines: [
      { speaker: "山田", jp: "キムさん、毎日何時に起きますか。", reading: "キムさん、まいにちなんじにおきますか。", kr: "김 씨, 매일 몇 시에 일어납니까?", grammarIds: ["g011","g013"], vocabIds: ["v051","v060","v062"] },
      { speaker: "キム", jp: "六時半に起きます。山田さんは？", reading: "ろくじはんにおきます。やまださんは？", kr: "6시 반에 일어납니다. 야마다 씨는?", grammarIds: ["g011"], vocabIds: ["v053","v062","v118"] },
      { speaker: "山田", jp: "私は七時に起きます。", reading: "わたしはしちじにおきます。", kr: "저는 7시에 일어납니다.", grammarIds: ["g011"], vocabIds: ["v062","v119"] },
      { speaker: "キム", jp: "授業は何時からですか。", reading: "じゅぎょうはなんじからですか。", kr: "수업은 몇 시부터입니까?", grammarIds: ["g012"], vocabIds: ["v051","v068"] },
      { speaker: "山田", jp: "午前九時から午後三時までです。", reading: "ごぜんくじからごごさんじまでです。", kr: "오전 9시부터 오후 3시까지입니다.", grammarIds: ["g012"], vocabIds: ["v054","v055","v121"] },
      { speaker: "キム", jp: "昼ごはんは何時に食べますか。", reading: "ひるごはんはなんじにたべますか。", kr: "점심은 몇 시에 먹습니까?", grammarIds: ["g011","g010"], vocabIds: ["v051","v057","v064"] },
      { speaker: "山田", jp: "十二時に食べます。キムさん、一緒に食べましょう。", reading: "じゅうにじにたべます。キムさん、いっしょにたべましょう。", kr: "12시에 먹습니다. 김 씨, 같이 먹읍시다.", grammarIds: ["g011","g019"], vocabIds: ["v064","v122"] },
      { speaker: "キム", jp: "いいですね。夜は何をしますか。", reading: "いいですね。よるはなにをしますか。", kr: "좋네요. 밤에는 무엇을 합니까?", grammarIds: ["g010","g020"], vocabIds: ["v009","v058","v078","v096"] },
      { speaker: "山田", jp: "テレビを見ます。そして、十一時に寝ます。", reading: "テレビをみます。そして、じゅういちじにねます。", kr: "텔레비전을 봅니다. 그리고 11시에 잡니다.", grammarIds: ["g010","g011"], vocabIds: ["v063","v088"] }
    ],
    vocabList: ["v051","v053","v054","v055","v057","v058","v060","v062","v063","v064","v068","v078","v088","v096","v118","v119","v121","v122"],
    grammarList: ["g010","g011","g012","g013","g019","g020"],
    exercises: [
      { type: "comprehension", q: "キムさんは何時に起きますか？", choices: ["六時","六時半","七時","七時半"], answer: 1 },
      { type: "comprehension", q: "授業は何時までですか？", choices: ["午後一時","午後二時","午後三時","午後四時"], answer: 2 },
      { type: "ordering", words: ["に","起きます","六時","半"], answer: "六時半に起きます" },
      { type: "grammar_fill", q: "九時 __ 五時 __ 仕事です。", answer: "から、まで", choices: ["から、まで","に、に","で、で","は、は"] },
      { type: "grammar_fill", q: "テレビ __ 見ます。", answer: "を", choices: ["を","が","に","で"] }
    ],
    culturalNote: "일본의 회사원들은 보통 아침 일찍 출근하고 밤 늦게 퇴근합니다. 「残業」(잔업, 야근)이 일상적인 회사도 많습니다. 최근에는 「ワークライフバランス」(워크라이프밸런스)를 중시하는 기업도 늘고 있습니다."
  },

  // === Chapter 5: いくらですか ===
  {
    id: "ch05",
    chapter: 5,
    title: "いくらですか",
    titleKr: "얼마입니까?",
    theme: "daily",
    situation: "편의점에서 물건을 사기",
    characters: [
      { name: "キム", nameKr: "김", role: "한국인 유학생" },
      { name: "店員", nameKr: "점원", role: "편의점 점원" }
    ],
    lines: [
      { speaker: "キム", jp: "すみません、このお茶はいくらですか。", reading: "すみません、このおちゃはいくらですか。", kr: "실례합니다, 이 차는 얼마입니까?", grammarIds: ["g006","g015"], vocabIds: ["v019","v070","v086","v112"] },
      { speaker: "店員", jp: "百五十円です。", reading: "ひゃくごじゅうえんです。", kr: "150엔입니다.", grammarIds: ["g001"], vocabIds: ["v071","v117","v122","v123"] },
      { speaker: "キム", jp: "じゃ、お茶を二つください。", reading: "じゃ、おちゃをふたつください。", kr: "그럼, 차 두 개 주세요.", grammarIds: ["g014"], vocabIds: ["v079","v081","v086"] },
      { speaker: "店員", jp: "はい。ほかに何かありますか。", reading: "はい。ほかになにかありますか。", kr: "네. 그 외에 뭐 있으세요?", grammarIds: [], vocabIds: ["v010"] },
      { speaker: "キム", jp: "あのコーヒーも一つください。", reading: "あのコーヒーもひとつください。", kr: "저 커피도 하나 주세요.", grammarIds: ["g014"], vocabIds: ["v079","v080","v087"] },
      { speaker: "店員", jp: "コーヒーは二百円です。", reading: "コーヒーはにひゃくえんです。", kr: "커피는 200엔입니다.", grammarIds: ["g001"], vocabIds: ["v071","v087","v114","v123"] },
      { speaker: "キム", jp: "全部でいくらですか。", reading: "ぜんぶでいくらですか。", kr: "전부 얼마입니까?", grammarIds: ["g015"], vocabIds: ["v070"] },
      { speaker: "店員", jp: "五百円です。", reading: "ごひゃくえんです。", kr: "500엔입니다.", grammarIds: ["g001"], vocabIds: ["v071","v117","v123"] },
      { speaker: "キム", jp: "はい、千円でお願いします。", reading: "はい、せんえんでおねがいします。", kr: "네, 천 엔으로 부탁합니다.", grammarIds: [], vocabIds: ["v010","v124"] },
      { speaker: "店員", jp: "お釣りは五百円です。ありがとうございます。", reading: "おつりはごひゃくえんです。ありがとうございます。", kr: "거스름돈은 500엔입니다. 감사합니다.", grammarIds: ["g001"], vocabIds: ["v111"] }
    ],
    vocabList: ["v010","v019","v070","v071","v079","v080","v081","v086","v087","v111","v112","v114","v117","v122","v123","v124"],
    grammarList: ["g001","g006","g014","g015"],
    exercises: [
      { type: "comprehension", q: "お茶はいくらですか？", choices: ["百円","百五十円","二百円","三百円"], answer: 1 },
      { type: "comprehension", q: "全部でいくらですか？", choices: ["三百円","四百円","五百円","六百円"], answer: 2 },
      { type: "ordering", words: ["を","ください","コーヒー","一つ"], answer: "コーヒーを一つください" },
      { type: "grammar_fill", q: "この時計は __ ですか。", answer: "いくら", choices: ["いくら","何","どこ","誰"] },
      { type: "grammar_fill", q: "お茶 __ 二つください。", answer: "を", choices: ["を","が","は","に"] }
    ],
    culturalNote: "일본의 편의점(コンビニ)은 24시간 영업하며, 음식, 음료뿐만 아니라 공과금 납부, 택배, ATM, 복사·인쇄 등 다양한 서비스를 제공합니다. 대표적인 편의점 체인으로는 セブンイレブン, ファミリーマート, ローソン이 있습니다."
  }
];

// Chapter metadata for chapter list display
export const CHAPTER_LIST = [
  { ch: 1, title: "はじめまして", titleKr: "처음 뵙겠습니다", theme: "daily", icon: "👋" },
  { ch: 2, title: "これは何ですか", titleKr: "이것은 무엇입니까?", theme: "daily", icon: "📦" },
  { ch: 3, title: "どこに行きますか", titleKr: "어디에 갑니까?", theme: "daily", icon: "🚶" },
  { ch: 4, title: "何時ですか", titleKr: "몇 시입니까?", theme: "daily", icon: "⏰" },
  { ch: 5, title: "いくらですか", titleKr: "얼마입니까?", theme: "daily", icon: "💰" },
  { ch: 6, title: "何が好きですか", titleKr: "무엇을 좋아합니까?", theme: "daily", icon: "❤️" },
  { ch: 7, title: "食べましょう", titleKr: "먹읍시다", theme: "daily", icon: "🍱" },
  { ch: 8, title: "天気がいいですね", titleKr: "날씨가 좋네요", theme: "daily", icon: "☀️" },
  { ch: 9, title: "週末は何をしましたか", titleKr: "주말에 무엇을 했습니까?", theme: "daily", icon: "📅" },
  { ch: 10, title: "電車に乗ります", titleKr: "전철을 탑니다", theme: "daily", icon: "🚃" },
  { ch: 11, title: "病院に行きたいです", titleKr: "병원에 가고 싶습니다", theme: "daily", icon: "🏥" },
  { ch: 12, title: "家族を紹介します", titleKr: "가족을 소개합니다", theme: "daily", icon: "👨‍👩‍👧" },
  { ch: 13, title: "日本語を勉強しています", titleKr: "일본어를 공부하고 있습니다", theme: "daily", icon: "📚" },
  { ch: 14, title: "もう少し大きいのは", titleKr: "조금 더 큰 것은", theme: "daily", icon: "🔍" },
  { ch: 15, title: "日本に来てよかった", titleKr: "일본에 와서 다행이다", theme: "daily", icon: "✨" },
  { ch: 16, title: "桃太郎 (1)", titleKr: "모모타로 (1)", theme: "fairytale", icon: "🍑" },
  { ch: 17, title: "桃太郎 (2)", titleKr: "모모타로 (2)", theme: "fairytale", icon: "⚔️" },
  { ch: 18, title: "かぐや姫 (1)", titleKr: "카구야히메 (1)", theme: "fairytale", icon: "🎋" },
  { ch: 19, title: "かぐや姫 (2)", titleKr: "카구야히메 (2)", theme: "fairytale", icon: "🌙" },
  { ch: 20, title: "浦島太郎", titleKr: "우라시마 타로", theme: "fairytale", icon: "🐢" },
  { ch: 21, title: "鶴の恩返し", titleKr: "학의 은혜갚음", theme: "fairytale", icon: "🦢" },
  { ch: 22, title: "一寸法師", titleKr: "잇순보시", theme: "fairytale", icon: "👦" },
  { ch: 23, title: "コンビニは便利です", titleKr: "편의점은 편리합니다", theme: "modern", icon: "🏪" },
  { ch: 24, title: "日本のお祭り", titleKr: "일본의 축제", theme: "modern", icon: "🎆" },
  { ch: 25, title: "携帯電話と生活", titleKr: "휴대전화와 생활", theme: "modern", icon: "📱" },
  { ch: 26, title: "日本の食文化", titleKr: "일본의 식문화", theme: "modern", icon: "🍣" },
  { ch: 27, title: "環境問題", titleKr: "환경 문제", theme: "modern", icon: "🌍" }
];
