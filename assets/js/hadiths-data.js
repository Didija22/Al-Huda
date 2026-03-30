/* AL-HUDA — Données Hadiths (statique, pas de fetch nécessaire) */
window.HADITHS_DATA = {
  "collections": [
    { "id": "bukhari",  "name": "Sahih Al-Bukhari",  "nameAr": "صحيح البخاري",  "color": "#1B6B3A" },
    { "id": "muslim",   "name": "Sahih Muslim",       "nameAr": "صحيح مسلم",     "color": "#2D8653" },
    { "id": "tirmidhi", "name": "Sunan At-Tirmidhi",  "nameAr": "سنن الترمذي",   "color": "#C9A84C" },
    { "id": "abudawud", "name": "Sunan Abu Dawud",    "nameAr": "سنن أبي داود",  "color": "#0F4229" },
    { "id": "nasai",    "name": "Sunan An-Nasa'i",    "nameAr": "سنن النسائي",   "color": "#4CAF7D" },
    { "id": "ibnmajah", "name": "Sunan Ibn Majah",    "nameAr": "سنن ابن ماجه",  "color": "#8B5E3C" }
  ],
  "themes": [
    { "id": "intention",  "name": "Intention & Sincérité", "emoji": "💚" },
    { "id": "foi",        "name": "Foi & Croyance",        "emoji": "🌙" },
    { "id": "salat",      "name": "La Prière",             "emoji": "🕌" },
    { "id": "zakat",      "name": "L'Aumône",              "emoji": "💰" },
    { "id": "siyam",      "name": "Le Jeûne",              "emoji": "🌙" },
    { "id": "akhlaq",     "name": "Comportement",          "emoji": "🌿" },
    { "id": "famille",    "name": "Famille",               "emoji": "👨‍👩‍👧" },
    { "id": "savoir",     "name": "Savoir & Science",      "emoji": "📚" },
    { "id": "patience",   "name": "Patience & Épreuve",    "emoji": "🤲" },
    { "id": "paradis",    "name": "Paradis & Enfer",       "emoji": "✨" },
    { "id": "dhikr",      "name": "Dhikr & Invocation",   "emoji": "📿" },
    { "id": "fraternite", "name": "Fraternité",            "emoji": "🤝" },
    { "id": "dunya",      "name": "Attachement au monde",  "emoji": "🌍" },
    { "id": "tawbah",     "name": "Repentir",              "emoji": "🕊️" },
    { "id": "rizq",       "name": "Subsistance & Rizq",   "emoji": "🌾" }
  ],
  "hadiths": [
    {
      "id": 1,
      "arabic": "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      "french": "Les actes ne valent que par les intentions, et chaque homme n'obtient que ce qu'il a eu l'intention de faire.",
      "narrator": "Omar ibn Al-Khattab", "narratorAr": "عمر بن الخطاب رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 1", "theme": "intention", "grade": "Sahih"
    },
    {
      "id": 2,
      "arabic": "الدِّينُ النَّصِيحَةُ",
      "french": "La religion c'est la sincérité (an-nasiha).",
      "narrator": "Tamim Ad-Dari", "narratorAr": "تميم الداري رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 55", "theme": "intention", "grade": "Sahih"
    },
    {
      "id": 3,
      "arabic": "بُنِيَ الإِسْلامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاةِ، وَإِيتَاءِ الزَّكَاةِ، وَالحَجِّ، وَصَوْمِ رَمَضَانَ",
      "french": "L'Islam est bâti sur cinq piliers : témoigner qu'il n'y a de divinité qu'Allah et que Muhammad est Son messager, accomplir la prière, acquitter la zakat, effectuer le pèlerinage et jeûner le Ramadan.",
      "narrator": "Ibn Omar", "narratorAr": "ابن عمر رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 8", "theme": "foi", "grade": "Sahih"
    },
    {
      "id": 4,
      "arabic": "الإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً، أَعْلاهَا قَوْلُ لا إِلَهَ إِلَّا اللَّهُ، وَأَدْنَاهَا إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ، وَالحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ",
      "french": "La foi a plus de soixante-dix branches. La plus haute est de dire : « Il n'y a de divinité qu'Allah » et la plus basse est d'ôter ce qui obstrue le chemin. La pudeur est une branche de la foi.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 9", "theme": "foi", "grade": "Sahih"
    },
    {
      "id": 5,
      "arabic": "لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
      "french": "Aucun d'entre vous ne croit (vraiment) tant qu'il n'aime pas pour son frère ce qu'il aime pour lui-même.",
      "narrator": "Anas ibn Malik", "narratorAr": "أنس بن مالك رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 13", "theme": "fraternite", "grade": "Sahih"
    },
    {
      "id": 6,
      "arabic": "الصَّلاةُ عِمَادُ الدِّينِ، مَنْ أَقَامَهَا فَقَدْ أَقَامَ الدِّينَ، وَمَنْ تَرَكَهَا فَقَدْ هَدَمَ الدِّينَ",
      "french": "La prière est le pilier de la religion. Celui qui l'accomplit a érigé la religion, et celui qui l'abandonne a démoli la religion.",
      "narrator": "Omar ibn Al-Khattab", "narratorAr": "عمر بن الخطاب رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 2616", "theme": "salat", "grade": "Sahih"
    },
    {
      "id": 7,
      "arabic": "أَوَّلُ مَا يُحَاسَبُ بِهِ الْعَبْدُ يَوْمَ الْقِيَامَةِ مِنْ عَمَلِهِ صَلَاتُهُ، فَإِنْ صَلَحَتْ فَقَدْ أَفْلَحَ وَأَنْجَحَ",
      "french": "Le premier acte dont le serviteur sera jugé le Jour de la Résurrection est la prière. Si elle est bonne, il aura réussi et triomphé.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "nasai", "ref": "Sunan An-Nasa'i 466", "theme": "salat", "grade": "Sahih"
    },
    {
      "id": 8,
      "arabic": "الطَّهُورُ شَطْرُ الإِيمَانِ",
      "french": "La pureté est la moitié de la foi.",
      "narrator": "Abu Malik Al-Ash'ari", "narratorAr": "أبو مالك الأشعري رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 223", "theme": "salat", "grade": "Sahih"
    },
    {
      "id": 9,
      "arabic": "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
      "french": "Quiconque jeûne le Ramadan par foi et en espérant la récompense d'Allah, ses péchés passés lui seront pardonnés.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 38", "theme": "siyam", "grade": "Sahih"
    },
    {
      "id": 10,
      "arabic": "الصِّيَامُ جُنَّةٌ",
      "french": "Le jeûne est un bouclier (contre le péché et le châtiment).",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 1894", "theme": "siyam", "grade": "Sahih"
    },
    {
      "id": 11,
      "arabic": "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
      "french": "Que celui qui croit en Allah et au Jour Dernier dise une bonne parole ou qu'il se taise.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6018", "theme": "akhlaq", "grade": "Sahih"
    },
    {
      "id": 12,
      "arabic": "إِنَّ اللَّهَ لا يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ، وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
      "french": "Certes, Allah ne regarde pas vos apparences ni vos richesses, mais Il regarde vos cœurs et vos actes.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 2564", "theme": "akhlaq", "grade": "Sahih"
    },
    {
      "id": 13,
      "arabic": "إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الأَخْلاقِ",
      "french": "Je n'ai été envoyé que pour parfaire la noblesse des caractères.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Al-Adab Al-Mufrad 273", "theme": "akhlaq", "grade": "Sahih"
    },
    {
      "id": 14,
      "arabic": "أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا، وَخِيَارُكُمْ خِيَارُكُمْ لِنِسَائِهِمْ",
      "french": "Le croyant le plus accompli dans la foi est celui qui a le meilleur caractère, et les meilleurs d'entre vous sont ceux qui traitent le mieux leurs femmes.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 1162", "theme": "famille", "grade": "Sahih"
    },
    {
      "id": 15,
      "arabic": "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ، وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ",
      "french": "La satisfaction du Seigneur est dans la satisfaction du père, et la colère du Seigneur est dans la colère du père.",
      "narrator": "Abdullah ibn Omar", "narratorAr": "عبدالله بن عمر رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 1899", "theme": "famille", "grade": "Sahih"
    },
    {
      "id": 16,
      "arabic": "الْجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ",
      "french": "Le Paradis est sous les pieds des mères.",
      "narrator": "Mu'awiya ibn Jahima", "narratorAr": "معاوية بن جاهمة رضي الله عنه",
      "collection": "nasai", "ref": "Sunan An-Nasa'i 3104", "theme": "famille", "grade": "Sahih"
    },
    {
      "id": 17,
      "arabic": "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
      "french": "Chercher la connaissance est une obligation pour tout musulman.",
      "narrator": "Anas ibn Malik", "narratorAr": "أنس بن مالك رضي الله عنه",
      "collection": "ibnmajah", "ref": "Sunan Ibn Majah 224", "theme": "savoir", "grade": "Sahih"
    },
    {
      "id": 18,
      "arabic": "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
      "french": "Quiconque emprunte un chemin pour y chercher un savoir, Allah lui facilitera un chemin vers le Paradis.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 2699", "theme": "savoir", "grade": "Sahih"
    },
    {
      "id": 19,
      "arabic": "عَجَبًا لِأَمْرِ الْمُؤْمِنِ! إِنَّ أَمْرَهُ كُلَّهُ لَهُ خَيْرٌ، إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ",
      "french": "Admirable est l'affaire du croyant ! Tout ce qui lui arrive est un bien : si une joie l'atteint, il est reconnaissant et c'est un bien pour lui ; si une adversité l'atteint, il est patient et c'est un bien pour lui.",
      "narrator": "Suhayb", "narratorAr": "صهيب رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 2999", "theme": "patience", "grade": "Sahih"
    },
    {
      "id": 20,
      "arabic": "مَا يُصِيبُ الْمُسْلِمَ مِنْ نَصَبٍ وَلا وَصَبٍ وَلا هَمٍّ وَلا حُزْنٍ وَلا أَذًى وَلا غَمٍّ، حَتَّى الشَّوْكَةِ يُشَاكُهَا إِلَّا كَفَّرَ اللَّهُ بِهَا مِنْ خَطَايَاهُ",
      "french": "Aucune fatigue, maladie, souci, tristesse, tort ni peine n'atteint le musulman — même une épine qui le pique — sans qu'Allah n'efface par cela certains de ses péchés.",
      "narrator": "Abu Said Al-Khudri & Abu Hurayra", "narratorAr": "أبو سعيد الخدري وأبو هريرة رضي الله عنهما",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 5641", "theme": "patience", "grade": "Sahih"
    },
    {
      "id": 21,
      "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
      "french": "Gloire à Allah et Sa louange. Gloire à Allah le Très Grand. Deux paroles légères sur la langue, lourdes dans la balance, aimées du Très Miséricordieux.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6682", "theme": "dhikr", "grade": "Sahih"
    },
    {
      "id": 22,
      "arabic": "مَنْ قَالَ لا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ فِي يَوْمٍ مِائَةَ مَرَّةٍ كَانَتْ لَهُ عَدْلَ عَشْرِ رِقَابٍ",
      "french": "Quiconque dit cent fois par jour : « Lā ilāha illallāhu waḥdahu lā sharīka lah... » aura une récompense équivalant à l'affranchissement de dix esclaves.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 3293", "theme": "dhikr", "grade": "Sahih"
    },
    {
      "id": 23,
      "arabic": "حَقُّ الْمُسْلِمِ عَلَى الْمُسْلِمِ سِتٌّ",
      "french": "Le droit du musulman sur le musulman est de six : quand tu le rencontres, salue-le ; quand il t'invite, réponds-lui ; quand il te demande conseil, conseille-le ; quand il éternue et loue Allah, dis-lui yarhamukallah ; quand il est malade, visite-le ; quand il meurt, suis son cortège.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 2162", "theme": "fraternite", "grade": "Sahih"
    },
    {
      "id": 24,
      "arabic": "الْمُسْلِمُ أَخُو الْمُسْلِمِ لا يَظْلِمُهُ وَلا يُسْلِمُهُ",
      "french": "Le musulman est le frère du musulman : il ne lui fait pas de tort et ne l'abandonne pas.",
      "narrator": "Abdullah ibn Omar", "narratorAr": "عبدالله بن عمر رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 2442", "theme": "fraternite", "grade": "Sahih"
    },
    {
      "id": 25,
      "arabic": "مَنْ أَحَبَّ لِقَاءَ اللَّهِ أَحَبَّ اللَّهُ لِقَاءَهُ",
      "french": "Quiconque aime rencontrer Allah, Allah aime le rencontrer.",
      "narrator": "Aïsha & Anas ibn Malik", "narratorAr": "عائشة وأنس رضي الله عنهما",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6507", "theme": "paradis", "grade": "Sahih"
    },
    {
      "id": 26,
      "arabic": "لَا تَدْخُلُوا الْجَنَّةَ حَتَّى تُؤْمِنُوا، وَلَا تُؤْمِنُوا حَتَّى تَحَابُّوا",
      "french": "Vous n'entrerez pas au Paradis tant que vous ne croirez pas, et vous ne croirez pas tant que vous ne vous aimerez pas mutuellement.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 54", "theme": "paradis", "grade": "Sahih"
    },
    {
      "id": 27,
      "arabic": "الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ",
      "french": "L'aumône éteint le péché comme l'eau éteint le feu.",
      "narrator": "Muadh ibn Jabal", "narratorAr": "معاذ بن جبل رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 2616", "theme": "zakat", "grade": "Sahih"
    },
    {
      "id": 28,
      "arabic": "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
      "french": "L'aumône ne diminue pas la richesse.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 2588", "theme": "zakat", "grade": "Sahih"
    },
    {
      "id": 29,
      "arabic": "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
      "french": "Crains Allah où que tu sois, fais suivre la mauvaise action par une bonne — elle l'effacera — et traite les gens avec un bon caractère.",
      "narrator": "Abu Dharr & Muadh ibn Jabal", "narratorAr": "أبو ذر ومعاذ بن جبل رضي الله عنهما",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 1987", "theme": "akhlaq", "grade": "Hasan Sahih"
    },
    {
      "id": 30,
      "arabic": "كُلُّ بَنِي آدَمَ خَطَّاءٌ، وَخَيْرُ الْخَطَّائِينَ التَّوَّابُونَ",
      "french": "Tout fils d'Adam est pécheur, et les meilleurs des pécheurs sont ceux qui se repentent.",
      "narrator": "Anas ibn Malik", "narratorAr": "أنس بن مالك رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 2499", "theme": "tawbah", "grade": "Hasan"
    },
    {
      "id": 31,
      "arabic": "إِنَّ اللَّهَ يَقْبَلُ تَوْبَةَ الْعَبْدِ مَا لَمْ يُغَرْغِرْ",
      "french": "Allah accepte le repentir du serviteur tant que l'agonie (le râle) n'est pas commencée.",
      "narrator": "Abdullah ibn Omar", "narratorAr": "عبدالله بن عمر رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 3537", "theme": "tawbah", "grade": "Hasan"
    },
    {
      "id": 32,
      "arabic": "التَّوْبَةُ تَجُبُّ مَا قَبْلَهَا",
      "french": "Le repentir efface tout ce qui le précède.",
      "narrator": "Amr ibn Al-As", "narratorAr": "عمرو بن العاص رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 121", "theme": "tawbah", "grade": "Sahih"
    },
    {
      "id": 33,
      "arabic": "اللَّهُ أَفْرَحُ بِتَوْبَةِ عَبْدِهِ مِنْ أَحَدِكُمْ سَقَطَ عَلَى بَعِيرِهِ وَقَدْ أَضَلَّهُ فِي أَرْضٍ فَلاةٍ",
      "french": "Allah est plus joyeux du repentir de Son serviteur que l'un d'entre vous qui retrouve son chameau égaré dans un désert.",
      "narrator": "Anas ibn Malik", "narratorAr": "أنس بن مالك رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6309", "theme": "tawbah", "grade": "Sahih"
    },
    {
      "id": 34,
      "arabic": "كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ",
      "french": "Sois dans ce monde comme si tu étais un étranger ou un voyageur de passage.",
      "narrator": "Abdullah ibn Omar", "narratorAr": "عبدالله بن عمر رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6416", "theme": "dunya", "grade": "Sahih"
    },
    {
      "id": 35,
      "arabic": "مَا الدُّنْيَا فِي الآخِرَةِ إِلَّا مِثْلُ مَا يَجْعَلُ أَحَدُكُمْ إِصْبَعَهُ فِي الْيَمِّ",
      "french": "La vie de ce monde par rapport à l'au-delà n'est que comme ce que l'un d'entre vous trempe son doigt dans la mer.",
      "narrator": "Al-Mustaurid Al-Qurashi", "narratorAr": "المستورد القرشي رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 2858", "theme": "dunya", "grade": "Sahih"
    },
    {
      "id": 36,
      "arabic": "ازْهَدْ فِي الدُّنْيَا يُحِبَّكَ اللَّهُ، وَازْهَدْ فِيمَا عِنْدَ النَّاسِ يُحِبَّكَ النَّاسُ",
      "french": "Renonce aux attraits de ce monde, Allah t'aimera. Renonce à ce que les gens possèdent, les gens t'aimeront.",
      "narrator": "Sahl ibn Sa'd", "narratorAr": "سهل بن سعد رضي الله عنه",
      "collection": "ibnmajah", "ref": "Sunan Ibn Majah 4102", "theme": "dunya", "grade": "Sahih"
    },
    {
      "id": 37,
      "arabic": "مَنْ كَانَتِ الدُّنْيَا هَمَّهُ فَرَّقَ اللَّهُ عَلَيْهِ أَمْرَهُ، وَجَعَلَ فَقْرَهُ بَيْنَ عَيْنَيْهِ، وَلَمْ يَأْتِهِ مِنَ الدُّنْيَا إِلَّا مَا كُتِبَ لَهُ",
      "french": "Celui qui fait de ce monde sa principale préoccupation, Allah dispersera ses affaires, placera la pauvreté devant ses yeux, et il n'obtiendra du monde que ce qui lui est écrit.",
      "narrator": "Anas ibn Malik", "narratorAr": "أنس بن مالك رضي الله عنه",
      "collection": "ibnmajah", "ref": "Sunan Ibn Majah 4105", "theme": "dunya", "grade": "Sahih"
    },
    {
      "id": 38,
      "arabic": "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلاً أَنْ يُتْقِنَهُ",
      "french": "Certes, Allah aime que lorsque l'un d'entre vous fait une chose, il la fasse avec excellence et perfection.",
      "narrator": "Aïsha", "narratorAr": "عائشة رضي الله عنها",
      "collection": "abudawud", "ref": "Sunan Abu Dawud — Al-Bayhaqi", "theme": "intention", "grade": "Sahih"
    },
    {
      "id": 39,
      "arabic": "أَفْضَلُ الأَعْمَالِ أَحَبُّهَا إِلَى اللَّهِ وَإِنْ قَلَّ",
      "french": "Les meilleures actions sont les plus aimées d'Allah, même si elles sont peu nombreuses.",
      "narrator": "Aïsha", "narratorAr": "عائشة رضي الله عنها",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6465", "theme": "intention", "grade": "Sahih"
    },
    {
      "id": 40,
      "arabic": "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ",
      "french": "Le meilleur des hommes est celui qui est le plus utile aux autres.",
      "narrator": "Jabir ibn Abdullah", "narratorAr": "جابر بن عبدالله رضي الله عنه",
      "collection": "tirmidhi", "ref": "Al-Mu'jam Al-Awsat — Al-Tabarani", "theme": "akhlaq", "grade": "Hasan"
    },
    {
      "id": 41,
      "arabic": "إِيَّاكُمْ وَالظَّنَّ فَإِنَّ الظَّنَّ أَكْذَبُ الْحَدِيثِ",
      "french": "Méfiez-vous des mauvaises suppositions, car les mauvaises suppositions sont les paroles les plus mensongères.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6064", "theme": "akhlaq", "grade": "Sahih"
    },
    {
      "id": 42,
      "arabic": "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
      "french": "Le fort n'est pas celui qui terrasse les gens. Le fort est celui qui se maîtrise lui-même dans la colère.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6114", "theme": "akhlaq", "grade": "Sahih"
    },
    {
      "id": 43,
      "arabic": "لَا تَحَاسَدُوا وَلَا تَنَاجَشُوا وَلَا تَبَاغَضُوا وَلَا تَدَابَرُوا وَكُونُوا عِبَادَ اللَّهِ إِخْوَانًا",
      "french": "Ne vous jalousez pas, ne vous faites pas d'enchères malhonnêtes, ne vous haïssez pas, ne vous tournez pas le dos et soyez, serviteurs d'Allah, des frères.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6065", "theme": "fraternite", "grade": "Sahih"
    },
    {
      "id": 44,
      "arabic": "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا",
      "french": "Le croyant envers le croyant est comme un édifice dont les parties se soutiennent mutuellement.",
      "narrator": "Abu Musa Al-Ash'ari", "narratorAr": "أبو موسى الأشعري رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 481", "theme": "fraternite", "grade": "Sahih"
    },
    {
      "id": 45,
      "arabic": "مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى",
      "french": "L'exemple des croyants dans leur amour, leur compassion et leur affection mutuelle est comme celui du corps : quand un organe se plaint, le reste du corps répond avec la fièvre et l'insomnie.",
      "narrator": "An-Nu'man ibn Bashir", "narratorAr": "النعمان بن بشير رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6011", "theme": "fraternite", "grade": "Sahih"
    },
    {
      "id": 46,
      "arabic": "مَنْ لَمْ يَشْكُرِ النَّاسَ لَمْ يَشْكُرِ اللَّهَ",
      "french": "Celui qui ne remercie pas les gens ne remercie pas Allah.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 1954", "theme": "akhlaq", "grade": "Sahih"
    },
    {
      "id": 47,
      "arabic": "أَدُّوا الأَمَانَةَ إِلَى مَنِ ائْتَمَنَكَ وَلَا تَخُنْ مَنْ خَانَكَ",
      "french": "Rends l'amanat (dépôt confié) à celui qui te l'a confié et ne trahis pas celui qui t'a trahi.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "abudawud", "ref": "Sunan Abu Dawud 3534", "theme": "akhlaq", "grade": "Hasan Sahih"
    },
    {
      "id": 48,
      "arabic": "مَنْ صَامَ يَوْمًا فِي سَبِيلِ اللَّهِ بَاعَدَ اللَّهُ وَجْهَهُ عَنِ النَّارِ سَبْعِينَ خَرِيفًا",
      "french": "Quiconque jeûne un jour dans le chemin d'Allah, Allah éloigne son visage du Feu de soixante-dix ans.",
      "narrator": "Abu Sa'id Al-Khudri", "narratorAr": "أبو سعيد الخدري رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 2840", "theme": "siyam", "grade": "Sahih"
    },
    {
      "id": 49,
      "arabic": "مَنْ قَامَ لَيْلَةَ الْقَدْرِ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
      "french": "Quiconque veille la nuit du Destin par foi et en espérant la récompense d'Allah, ses péchés passés lui seront pardonnés.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 1901", "theme": "siyam", "grade": "Sahih"
    },
    {
      "id": 50,
      "arabic": "الصَّائِمُ فِي عِبَادَةٍ وَإِنْ كَانَ نَائِمًا",
      "french": "Le jeûneur est en adoration même s'il dort.",
      "narrator": "Abdullah ibn Abi Awfa", "narratorAr": "عبدالله بن أبي أوفى رضي الله عنه",
      "collection": "abudawud", "ref": "Al-Bayhaqi — Shu'ab Al-Iman", "theme": "siyam", "grade": "Hasan"
    },
    {
      "id": 51,
      "arabic": "إِنَّ لِرَبِّكَ عَلَيْكَ حَقًّا، وَلِنَفْسِكَ عَلَيْكَ حَقًّا، وَلِأَهْلِكَ عَلَيْكَ حَقًّا",
      "french": "Certes, ton Seigneur a des droits sur toi, toi-même tu as des droits sur toi, et ta famille a des droits sur toi.",
      "narrator": "Salman Al-Farisi", "narratorAr": "سلمان الفارسي رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 1968", "theme": "famille", "grade": "Sahih"
    },
    {
      "id": 52,
      "arabic": "خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ وَأَنَا خَيْرُكُمْ لِأَهْلِي",
      "french": "Le meilleur d'entre vous est celui qui est le meilleur envers sa famille, et je suis le meilleur d'entre vous envers ma famille.",
      "narrator": "Aïsha", "narratorAr": "عائشة رضي الله عنها",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 3895", "theme": "famille", "grade": "Sahih"
    },
    {
      "id": 53,
      "arabic": "صِلُوا أَرْحَامَكُمْ وَإِنْ قَطَعُوكُمْ",
      "french": "Maintenez les liens de parenté même si vos proches les rompent.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "abudawud", "ref": "Musnad Ahmad 9844", "theme": "famille", "grade": "Hasan"
    },
    {
      "id": 54,
      "arabic": "مَنْ أَحَبَّ أَنْ يُبْسَطَ لَهُ فِي رِزْقِهِ وَيُنْسَأَ لَهُ فِي أَثَرِهِ فَلْيَصِلْ رَحِمَهُ",
      "french": "Que celui qui aime voir son rizq élargi et sa vie prolongée maintienne les liens de parenté.",
      "narrator": "Anas ibn Malik", "narratorAr": "أنس بن مالك رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 5986", "theme": "rizq", "grade": "Sahih"
    },
    {
      "id": 55,
      "arabic": "اطْلُبُوا الرِّزْقَ فِي خَبَايَا الأَرْضِ",
      "french": "Cherchez le rizq dans les trésors cachés de la terre (c'est-à-dire par le travail et l'effort).",
      "narrator": "Ibn Abbas", "narratorAr": "ابن عباس رضي الله عنهما",
      "collection": "abudawud", "ref": "Musnad Al-Bazzar", "theme": "rizq", "grade": "Hasan"
    },
    {
      "id": 56,
      "arabic": "إِنَّ رُوحَ الْقُدُسِ نَفَثَ فِي رُوعِي أَنَّ نَفْسًا لَنْ تَمُوتَ حَتَّى تَسْتَكْمِلَ أَجَلَهَا وَتَسْتَوْعِبَ رِزْقَهَا",
      "french": "Le Saint-Esprit (Jibrîl) a soufflé dans mon cœur qu'aucune âme ne mourra avant d'avoir accompli son terme et épuisé son rizq.",
      "narrator": "Ibn Mas'ud", "narratorAr": "ابن مسعود رضي الله عنه",
      "collection": "ibnmajah", "ref": "Sunan Ibn Majah 2144", "theme": "rizq", "grade": "Sahih"
    },
    {
      "id": 57,
      "arabic": "اسْتَعِينُوا عَلَى إِنْجَازِ الْحَوَائِجِ بِالْكِتْمَانِ",
      "french": "Aidez-vous à accomplir vos besoins par la discrétion (en ne les divulguant pas).",
      "narrator": "Muadh ibn Jabal", "narratorAr": "معاذ بن جبل رضي الله عنه",
      "collection": "abudawud", "ref": "Al-Mu'jam Al-Awsat — Al-Tabarani", "theme": "rizq", "grade": "Hasan"
    },
    {
      "id": 58,
      "arabic": "مَنْ تَوَضَّأَ فَأَحْسَنَ وُضُوءَهُ ثُمَّ قَامَ فَصَلَّى رَكْعَتَيْنِ لَا يُحَدِّثُ فِيهِمَا نَفْسَهُ غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
      "french": "Quiconque fait ses ablutions en les perfectionnant puis accomplit deux raka'ats sans se distraire, ses péchés passés lui seront pardonnés.",
      "narrator": "Uthman ibn Affan", "narratorAr": "عثمان بن عفان رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 160", "theme": "salat", "grade": "Sahih"
    },
    {
      "id": 59,
      "arabic": "مَنْ حَافَظَ عَلَيْهَا كَانَتْ لَهُ نُورًا وَبُرْهَانًا وَنَجَاةً يَوْمَ الْقِيَامَةِ",
      "french": "Quiconque accomplit la prière avec régularité, elle sera pour lui lumière, preuve et salut au Jour de la Résurrection.",
      "narrator": "Abdullah ibn Amr", "narratorAr": "عبدالله بن عمرو رضي الله عنه",
      "collection": "abudawud", "ref": "Musnad Ahmad 6576", "theme": "salat", "grade": "Sahih"
    },
    {
      "id": 60,
      "arabic": "الصَّلَوَاتُ الْخَمْسُ وَالْجُمُعَةُ إِلَى الْجُمُعَةِ كَفَّارَةٌ لِمَا بَيْنَهُنَّ مَا لَمْ تُغْشَ الْكَبَائِرُ",
      "french": "Les cinq prières et le vendredi jusqu'au vendredi suivant sont une expiation pour ce qui est entre eux, à condition de ne pas commettre de grands péchés.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 233", "theme": "salat", "grade": "Sahih"
    },
    {
      "id": 61,
      "arabic": "أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ فَأَكْثِرُوا الدُّعَاءَ",
      "french": "Le serviteur est le plus proche de son Seigneur quand il est en prosternation — augmentez donc les invocations.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 482", "theme": "salat", "grade": "Sahih"
    },
    {
      "id": 62,
      "arabic": "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ وَالْحَسَنَةُ بِعَشْرِ أَمْثَالِهَا",
      "french": "Quiconque lit une lettre du Livre d'Allah aura une récompense, et chaque bonne action est multipliée par dix.",
      "narrator": "Abdullah ibn Mas'ud", "narratorAr": "عبدالله بن مسعود رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 2910", "theme": "savoir", "grade": "Sahih"
    },
    {
      "id": 63,
      "arabic": "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
      "french": "Le meilleur d'entre vous est celui qui apprend le Coran et l'enseigne.",
      "narrator": "Uthman ibn Affan", "narratorAr": "عثمان بن عفان رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 5027", "theme": "savoir", "grade": "Sahih"
    },
    {
      "id": 64,
      "arabic": "فَضْلُ الْعَالِمِ عَلَى الْعَابِدِ كَفَضْلِ الْقَمَرِ عَلَى سَائِرِ الْكَوَاكِبِ",
      "french": "La supériorité du savant sur le simple adorateur est comme la supériorité de la lune sur les autres astres.",
      "narrator": "Abu Darda'", "narratorAr": "أبو الدرداء رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 2682", "theme": "savoir", "grade": "Sahih"
    },
    {
      "id": 65,
      "arabic": "الْعُلَمَاءُ وَرَثَةُ الأَنْبِيَاءِ",
      "french": "Les savants sont les héritiers des prophètes.",
      "narrator": "Abu Darda'", "narratorAr": "أبو الدرداء رضي الله عنه",
      "collection": "abudawud", "ref": "Sunan Abu Dawud 3641", "theme": "savoir", "grade": "Sahih"
    },
    {
      "id": 66,
      "arabic": "إِذَا مَاتَ الإِنْسَانُ انْقَطَعَ عَنْهُ عَمَلُهُ إِلَّا مِنْ ثَلَاثَةٍ: إِلَّا مِنْ صَدَقَةٍ جَارِيَةٍ، أَوْ عِلْمٍ يُنْتَفَعُ بِهِ، أَوْ وَلَدٍ صَالِحٍ يَدْعُو لَهُ",
      "french": "Quand l'homme meurt, son œuvre s'arrête sauf pour trois choses : une aumône continue, un savoir dont on profite, ou un enfant vertueux qui prie pour lui.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 1631", "theme": "savoir", "grade": "Sahih"
    },
    {
      "id": 67,
      "arabic": "الْجَنَّةُ أَقْرَبُ إِلَى أَحَدِكُمْ مِنْ شِرَاكِ نَعْلِهِ وَالنَّارُ مِثْلُ ذَلِكَ",
      "french": "Le Paradis est plus proche de l'un d'entre vous que le lacet de sa sandale, et l'Enfer est pareil.",
      "narrator": "Abdullah ibn Mas'ud", "narratorAr": "عبدالله بن مسعود رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6488", "theme": "paradis", "grade": "Sahih"
    },
    {
      "id": 68,
      "arabic": "مَا أَنَا وَالدُّنْيَا إِنَّمَا أَنَا وَالدُّنْيَا كَرَاكِبٍ اسْتَظَلَّ تَحْتَ شَجَرَةٍ ثُمَّ رَاحَ وَتَرَكَهَا",
      "french": "Qu'est-ce que ce monde et moi ? Je ne suis dans ce monde que comme un cavalier qui s'est mis à l'ombre sous un arbre, puis est reparti en le laissant.",
      "narrator": "Abdullah ibn Mas'ud", "narratorAr": "عبدالله بن مسعود رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 2377", "theme": "dunya", "grade": "Sahih"
    },
    {
      "id": 69,
      "arabic": "حُفَّتِ الْجَنَّةُ بِالْمَكَارِهِ وَحُفَّتِ النَّارُ بِالشَّهَوَاتِ",
      "french": "Le Paradis est entouré de difficultés, et l'Enfer est entouré de désirs.",
      "narrator": "Anas ibn Malik", "narratorAr": "أنس بن مالك رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 2822", "theme": "paradis", "grade": "Sahih"
    },
    {
      "id": 70,
      "arabic": "أَلَا أُخْبِرُكُمْ بِأَهْلِ الْجَنَّةِ؟ كُلُّ ضَعِيفٍ مُتَضَعِّفٍ، لَوْ أَقْسَمَ عَلَى اللَّهِ لَأَبَرَّهُ",
      "french": "Voulez-vous que je vous informe des habitants du Paradis ? Ce sont tous ceux qui paraissent faibles et humbles, mais qui, s'ils juraient par Allah, Il accomplirait leur serment.",
      "narrator": "Haritha ibn Wahb", "narratorAr": "حارثة بن وهب رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6071", "theme": "paradis", "grade": "Sahih"
    },
    {
      "id": 71,
      "arabic": "مَنْ قَالَ سُبْحَانَ اللَّهِ وَبِحَمْدِهِ فِي يَوْمٍ مِائَةَ مَرَّةٍ حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ",
      "french": "Quiconque dit « SubhanAllahi wa bihamdih » cent fois par jour, ses péchés seront effacés même s'ils étaient aussi nombreux que l'écume de la mer.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6405", "theme": "dhikr", "grade": "Sahih"
    },
    {
      "id": 72,
      "arabic": "أَفْضَلُ الذِّكْرِ لَا إِلَهَ إِلَّا اللَّهُ",
      "french": "Le meilleur du dhikr est : Lā ilāha illallāh.",
      "narrator": "Jabir ibn Abdullah", "narratorAr": "جابر بن عبدالله رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 3383", "theme": "dhikr", "grade": "Hasan"
    },
    {
      "id": 73,
      "arabic": "الدُّعَاءُ هُوَ الْعِبَادَةُ",
      "french": "L'invocation, c'est l'adoration.",
      "narrator": "An-Nu'man ibn Bashir", "narratorAr": "النعمان بن بشير رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 2969", "theme": "dhikr", "grade": "Sahih"
    },
    {
      "id": 74,
      "arabic": "لَا يَشْكُرُ اللَّهَ مَنْ لَا يَشْكُرُ النَّاسَ",
      "french": "Celui qui ne remercie pas les gens ne remercie pas Allah.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "abudawud", "ref": "Sunan Abu Dawud 4811", "theme": "akhlaq", "grade": "Sahih"
    },
    {
      "id": 75,
      "arabic": "إِنَّ مِنْ أَشَدِّ النَّاسِ عَذَابًا يَوْمَ الْقِيَامَةِ الْمُصَوِّرُونَ",
      "french": "Parmi les gens qui subiront le châtiment le plus sévère le Jour de la Résurrection se trouvent les faiseurs d'images (qui cherchent à imiter la création d'Allah).",
      "narrator": "Abdullah ibn Mas'ud", "narratorAr": "عبدالله بن مسعود رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 5950", "theme": "foi", "grade": "Sahih"
    },
    {
      "id": 76,
      "arabic": "مَنْ أَصْبَحَ مِنْكُمْ آمِنًا فِي سِرْبِهِ مُعَافًى فِي جَسَدِهِ عِنْدَهُ قُوتُ يَوْمِهِ فَكَأَنَّمَا حِيزَتْ لَهُ الدُّنْيَا بِحَذَافِيرِهَا",
      "french": "Celui d'entre vous qui commence sa journée en sécurité chez lui, en bonne santé dans son corps et avec de quoi manger ce jour-là, c'est comme si on lui avait offert le monde entier.",
      "narrator": "Ubayd Allah ibn Mihsan", "narratorAr": "عبيد الله بن محصن رضي الله عنه",
      "collection": "tirmidhi", "ref": "Sunan At-Tirmidhi 2346", "theme": "patience", "grade": "Hasan"
    },
    {
      "id": 77,
      "arabic": "وَاعْلَمْ أَنَّ النَّصْرَ مَعَ الصَّبْرِ، وَأَنَّ الْفَرَجَ مَعَ الْكَرْبِ، وَأَنَّ مَعَ الْعُسْرِ يُسْرًا",
      "french": "Sache que la victoire accompagne la patience, que la délivrance suit l'épreuve, et qu'après la difficulté vient la facilité.",
      "narrator": "Ibn Abbas", "narratorAr": "ابن عباس رضي الله عنهما",
      "collection": "tirmidhi", "ref": "Musnad Ahmad 2803", "theme": "patience", "grade": "Hasan"
    },
    {
      "id": 78,
      "arabic": "مَا أُعْطِيَ أَحَدٌ عَطَاءً خَيْرًا وَأَوْسَعَ مِنَ الصَّبْرِ",
      "french": "On n'a jamais accordé à personne un don meilleur et plus vaste que la patience.",
      "narrator": "Abu Sa'id Al-Khudri", "narratorAr": "أبو سعيد الخدري رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 1469", "theme": "patience", "grade": "Sahih"
    },
    {
      "id": 79,
      "arabic": "اتَّقُوا الظُّلْمَ فَإِنَّ الظُّلْمَ ظُلُمَاتٌ يَوْمَ الْقِيَامَةِ",
      "french": "Gardez-vous de l'injustice, car l'injustice sera ténèbres le Jour de la Résurrection.",
      "narrator": "Jabir ibn Abdullah", "narratorAr": "جابر بن عبدالله رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 2578", "theme": "akhlaq", "grade": "Sahih"
    },
    {
      "id": 80,
      "arabic": "إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ فِي الأَمْرِ كُلِّهِ",
      "french": "Certes, Allah est doux et Il aime la douceur en toute chose.",
      "narrator": "Aïsha", "narratorAr": "عائشة رضي الله عنها",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 6024", "theme": "akhlaq", "grade": "Sahih"
    },
    {
      "id": 81,
      "arabic": "إِنَّ الْحَلَالَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ وَبَيْنَهُمَا أُمُورٌ مُشْتَبِهَاتٌ",
      "french": "Le licite est évident et l'illicite est évident, et entre les deux se trouvent des choses ambiguës — celui qui évite les choses douteuses préserve sa religion et son honneur.",
      "narrator": "An-Nu'man ibn Bashir", "narratorAr": "النعمان بن بشير رضي الله عنه",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 52", "theme": "foi", "grade": "Sahih"
    },
    {
      "id": 82,
      "arabic": "الْبِرُّ حُسْنُ الْخُلُقِ، وَالإِثْمُ مَا حَاكَ فِي نَفْسِكَ وَكَرِهْتَ أَنْ يَطَّلِعَ عَلَيْهِ النَّاسُ",
      "french": "La piété c'est avoir un bon caractère. Le péché, c'est ce qui te trouble à l'intérieur et dont tu n'aimerais pas que les gens soient informés.",
      "narrator": "Wabisa ibn Ma'bad", "narratorAr": "وابصة بن معبد رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 2553", "theme": "foi", "grade": "Sahih"
    },
    {
      "id": 83,
      "arabic": "مَنْ أَحَبَّ أَنْ يَنْظُرَ إِلَى رَجُلٍ مِنْ أَهْلِ الْجَنَّةِ فَلْيَنْظُرْ إِلَى هَذَا",
      "french": "Quiconque veut voir un homme du Paradis, qu'il regarde cet homme-là.",
      "narrator": "Abu Hurayra à propos de Sa'd ibn Abi Waqqas", "narratorAr": "أبو هريرة عن سعد بن أبي وقاص رضي الله عنهما",
      "collection": "bukhari", "ref": "Sahih Al-Bukhari 1350", "theme": "paradis", "grade": "Sahih"
    },
    {
      "id": 84,
      "arabic": "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ",
      "french": "Quiconque soulage un croyant d'une peine de ce monde, Allah le soulagera d'une peine du Jour de la Résurrection.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 2699", "theme": "fraternite", "grade": "Sahih"
    },
    {
      "id": 85,
      "arabic": "وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ",
      "french": "Allah aide le serviteur tant que le serviteur aide son frère.",
      "narrator": "Abu Hurayra", "narratorAr": "أبو هريرة رضي الله عنه",
      "collection": "muslim", "ref": "Sahih Muslim 2699", "theme": "fraternite", "grade": "Sahih"
    }
  ]
};
