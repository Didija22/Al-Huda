/* ============================================================
   AL-HUDA — Données du Quiz Islamique
   50 questions authentiques réparties sur 5 catégories
   ============================================================ */

window.QUIZ_DATA = {

  categories: [
    { id: 'coran',     name: 'Coran',     icon: '📖', color: '#1B6B3A' },
    { id: 'hadith',    name: 'Hadiths',   icon: '📜', color: '#C9A84C' },
    { id: 'histoire',  name: 'Histoire',  icon: '🕌', color: '#2D8653' },
    { id: 'prophetes', name: 'Prophètes', icon: '⭐', color: '#4CAF7D' },
    { id: 'pratiques', name: 'Pratiques', icon: '🤲', color: '#0F4229' }
  ],

  questions: [

    /* ============================
       CATÉGORIE : CORAN (10)
    ============================ */
    {
      id: 1,
      category: 'coran',
      difficulty: 'facile',
      question: 'Combien de sourates contient le Saint Coran ?',
      options: ['99 sourates', '112 sourates', '114 sourates', '120 sourates'],
      answer: 2,
      explanation: 'Le Saint Coran contient exactement 114 sourates, de Al-Fatiha (l\'ouverture) à An-Nas (les hommes).'
    },
    {
      id: 2,
      category: 'coran',
      difficulty: 'facile',
      question: 'Quelle est la plus longue sourate du Coran ?',
      options: ['Al-Imran', 'Al-Baqara', 'An-Nisa', 'Al-Maidah'],
      answer: 1,
      explanation: 'Al-Baqara (La Vache) est la plus longue sourate du Coran avec 286 versets. Elle est au début du Coran et contient notamment le verset du Trône (Ayat al-Kursi).'
    },
    {
      id: 3,
      category: 'coran',
      difficulty: 'facile',
      question: 'Quelle est la plus courte sourate du Coran ?',
      options: ['Al-Ikhlas', 'Al-Kawthar', 'Al-Asr', 'An-Nasr'],
      answer: 1,
      explanation: 'Al-Kawthar (L\'Abondance) est la plus courte sourate du Coran avec seulement 3 versets. Elle a été révélée au Prophète ﷺ pour lui annoncer les bienfaits d\'Allah.'
    },
    {
      id: 4,
      category: 'coran',
      difficulty: 'moyen',
      question: 'Quelle est l\'unique sourate du Coran qui ne commence pas par la Basmala ?',
      options: ['Al-Falaq', 'Al-Anfal', 'At-Tawbah', 'Al-Hashr'],
      answer: 2,
      explanation: 'At-Tawbah (Le Repentir, sourate 9) est la seule sourate qui ne commence pas par "Bismillah ir-Rahman ir-Rahim". Cela s\'explique par son contenu qui traite notamment des ruptures de traités avec les polythéistes.'
    },
    {
      id: 5,
      category: 'coran',
      difficulty: 'moyen',
      question: 'Quel est le verset du Coran considéré comme le plus grand (Ayat al-Kursi) ?',
      options: ['Al-Baqara 2:255', 'Al-Fatiha 1:2', 'Al-Imran 3:18', 'Al-Hashr 59:22'],
      answer: 0,
      explanation: 'Le verset du Trône (Ayat al-Kursi) est Al-Baqara 2:255. Le Prophète ﷺ a dit que c\'est le plus grand verset du Coran. Quiconque le récite chaque soir sera sous la protection d\'Allah jusqu\'au matin.'
    },
    {
      id: 6,
      category: 'coran',
      difficulty: 'moyen',
      question: 'En combien d\'années le Coran a-t-il été révélé ?',
      options: ['10 ans', '15 ans', '23 ans', '25 ans'],
      answer: 2,
      explanation: 'Le Coran a été révélé progressivement sur une période de 23 ans : 13 ans à La Mecque et 10 ans à Médine, selon les besoins et les circonstances de la communauté musulmane.'
    },
    {
      id: 7,
      category: 'coran',
      difficulty: 'difficile',
      question: 'Combien de fois le mot "Allah" apparaît-il dans le Coran ?',
      options: ['1209 fois', '2698 fois', '3456 fois', '5000 fois'],
      answer: 1,
      explanation: 'Selon les comptages des savants, le mot "Allah" apparaît 2698 fois dans le Saint Coran. Ce chiffre fait l\'objet d\'un consensus parmi la majorité des spécialistes des sciences coraniques.'
    },
    {
      id: 8,
      category: 'coran',
      difficulty: 'moyen',
      question: 'Quelle sourate est appelée "le cœur du Coran" ?',
      options: ['Al-Fatiha', 'Ya-Sin', 'Al-Kahf', 'Al-Mulk'],
      answer: 1,
      explanation: 'Ya-Sin (sourate 36) est surnommée "le cœur du Coran" d\'après un hadith rapporté par Ahmad et Abu Dawud. Le Prophète ﷺ a recommandé sa récitation pour les malades et les mourants.'
    },
    {
      id: 9,
      category: 'coran',
      difficulty: 'facile',
      question: 'Combien de versets contient Al-Fatiha ?',
      options: ['5 versets', '6 versets', '7 versets', '8 versets'],
      answer: 2,
      explanation: 'Al-Fatiha (L\'Ouverture) contient 7 versets. Elle est récitée dans chaque unité (rak\'a) de la prière. Le Prophète ﷺ l\'a qualifiée de "la mère du Coran" (Umm al-Kitab).'
    },
    {
      id: 10,
      category: 'coran',
      difficulty: 'difficile',
      question: 'Lors de quelle nuit la première révélation du Coran a-t-elle eu lieu ?',
      options: ['La nuit du 1er Mouharram', 'La nuit du Mi\'raj', 'Laylat al-Qadr (nuit du Destin)', 'La nuit du 15 Sha\'ban'],
      answer: 2,
      explanation: 'La première révélation (les 5 premiers versets de la sourate Al-Alaq) a eu lieu lors de Laylat al-Qadr dans le mois de Ramadan, dans la caverne de Hira, alors que le Prophète Muhammad ﷺ avait 40 ans.'
    },

    /* ============================
       CATÉGORIE : HADITHS (10)
    ============================ */
    {
      id: 11,
      category: 'hadith',
      difficulty: 'facile',
      question: 'Quel est le recueil de hadiths considéré comme le plus authentique après le Coran ?',
      options: ['Sahih Muslim', 'Sahih Al-Bukhari', 'Sunan Abu Dawud', 'Sunan Ibn Majah'],
      answer: 1,
      explanation: 'Sahih Al-Bukhari est considéré par les savants comme le livre le plus authentique après le Coran. L\'imam Al-Bukhari a mis 16 ans à le compiler et n\'y a inclus que des hadiths passant par ses critères rigoureux d\'authenticité.'
    },
    {
      id: 12,
      category: 'hadith',
      difficulty: 'moyen',
      question: 'Combien de hadiths contient le Sahih Al-Bukhari (avec répétitions) ?',
      options: ['3033 hadiths', '5456 hadiths', '7563 hadiths', '9082 hadiths'],
      answer: 2,
      explanation: 'Le Sahih Al-Bukhari contient 7563 hadiths avec répétitions, et environ 2602 hadiths sans répétitions. L\'imam Al-Bukhari les a sélectionnés parmi plus de 600 000 hadiths qu\'il avait mémorisés.'
    },
    {
      id: 13,
      category: 'hadith',
      difficulty: 'facile',
      question: 'Quel hadith commence par "Les actes ne valent que par leurs intentions" ?',
      options: ['Premier hadith d\'Arba\'in An-Nawawi', 'Dernier hadith du Bukhari', 'Premier hadith du Muslim', 'Hadith de Jibril'],
      answer: 0,
      explanation: 'Ce hadith d\'Umar ibn al-Khattab (ra) — "Les actes ne valent que par les intentions" — est le premier hadith de l\'Arba\'in An-Nawawi (Les 40 hadiths de l\'Imam Nawawi). Il est fondamental dans l\'Islam.'
    },
    {
      id: 14,
      category: 'hadith',
      difficulty: 'moyen',
      question: 'Qui est le compagnon qui a rapporté le plus grand nombre de hadiths du Prophète ﷺ ?',
      options: ['Aïcha (ra)', 'Ibn Abbas (ra)', 'Abu Hurayra (ra)', 'Anas ibn Malik (ra)'],
      answer: 2,
      explanation: 'Abu Hurayra (ra) est le compagnon qui a rapporté le plus de hadiths : plus de 5 000 hadiths lui sont attribués. Il a accompagné le Prophète ﷺ pendant 3 ans et se consacrait entièrement à mémoriser ses paroles.'
    },
    {
      id: 15,
      category: 'hadith',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que le "Hadith de Jibril" enseigne principalement ?',
      options: ['Les piliers de la prière', 'L\'Islam, l\'Iman et l\'Ihsan', 'Les conditions du jeûne', 'Les règles du Hajj'],
      answer: 1,
      explanation: 'Le Hadith de Jibril (rapporté par Umar ra) définit les trois niveaux de la religion : l\'Islam (la soumission), l\'Iman (la foi) et l\'Ihsan (l\'excellence). C\'est pourquoi on l\'appelle souvent "la mère de la Sunnah".'
    },
    {
      id: 16,
      category: 'hadith',
      difficulty: 'facile',
      question: 'Que signifie le terme "Hadith Qudsi" ?',
      options: ['Un hadith très long', 'Un hadith dont le sens vient d\'Allah mais exprimé par le Prophète ﷺ', 'Un hadith rapporté par de nombreux compagnons', 'Un hadith sur Jérusalem'],
      answer: 1,
      explanation: 'Un Hadith Qudsi est un hadith dont le contenu et le sens proviennent d\'Allah (comme le Coran), mais qui est exprimé avec les propres mots du Prophète Muhammad ﷺ. Il se distingue du Coran qui est révélé dans les deux formes (sens et expression).'
    },
    {
      id: 17,
      category: 'hadith',
      difficulty: 'difficile',
      question: 'Quel imam a compilé le recueil "Al-Muwatta", l\'un des plus anciens livres de hadiths ?',
      options: ['Imam Ahmad ibn Hanbal', 'Imam Malik ibn Anas', 'Imam Ash-Shafi\'i', 'Imam Al-Bukhari'],
      answer: 1,
      explanation: 'Al-Muwatta (Le chemin aplani) a été compilé par l\'Imam Malik ibn Anas (mort en 179H), fondateur de l\'école malikite. C\'est l\'un des premiers grands recueils de hadiths de l\'Islam. Le calife Abbasside Al-Mansur a voulu en faire le code juridique officiel de l\'État.'
    },
    {
      id: 18,
      category: 'hadith',
      difficulty: 'moyen',
      question: 'Les "Kutub as-Sitta" sont les six recueils canoniques de hadiths. Lequel n\'en fait PAS partie ?',
      options: ['Sahih Al-Bukhari', 'Sahih Muslim', 'Muwatta Malik', 'Sunan An-Nasa\'i'],
      answer: 2,
      explanation: 'Les six recueils canoniques (Kutub as-Sitta) sont : Sahih Al-Bukhari, Sahih Muslim, Sunan Abu Dawud, Sunan At-Tirmidhi, Sunan An-Nasa\'i et Sunan Ibn Majah. Le Muwatta de Malik, bien que très important, n\'en fait pas partie.'
    },
    {
      id: 19,
      category: 'hadith',
      difficulty: 'difficile',
      question: 'Qu\'est-ce qu\'un hadith "Mutawatir" ?',
      options: ['Un hadith rapporté par un seul narrateur', 'Un hadith rapporté par un si grand nombre de personnes que leur accord sur un mensonge est impossible', 'Un hadith dont la chaîne de transmission est interrompue', 'Un hadith rapporté uniquement par les compagnons'],
      answer: 1,
      explanation: 'Un hadith Mutawatir est rapporté par un si grand nombre de narrateurs à chaque niveau de la chaîne de transmission qu\'il est impossible qu\'ils se soient tous mis d\'accord sur un mensonge. Ces hadiths procurent une certitude absolue et ont la même valeur probante que le Coran.'
    },
    {
      id: 20,
      category: 'hadith',
      difficulty: 'facile',
      question: 'Le Prophète ﷺ a dit : "La religion, c\'est la sincérité (An-Nasiha)." Envers qui doit-on cette sincérité ?',
      options: ['Uniquement envers Allah', 'Envers Allah, Son Livre, Son Prophète, les dirigeants et le commun des musulmans', 'Uniquement envers les parents', 'Uniquement envers les savants'],
      answer: 1,
      explanation: 'Ce hadith de Tamim Ad-Dari rapporté par Muslim précise que la sincérité (nasiha) est due : envers Allah, Son Livre, Son Prophète ﷺ, les dirigeants des musulmans et le commun des croyants. C\'est un pilier de la vie sociale islamique.'
    },

    /* ============================
       CATÉGORIE : HISTOIRE (10)
    ============================ */
    {
      id: 21,
      category: 'histoire',
      difficulty: 'facile',
      question: 'Qui est le premier calife de l\'Islam après le Prophète Muhammad ﷺ ?',
      options: ['Umar ibn al-Khattab', 'Ali ibn Abi Talib', 'Abu Bakr as-Siddiq', 'Uthman ibn Affan'],
      answer: 2,
      explanation: 'Abu Bakr as-Siddiq (ra) est le premier calife (successeur) du Prophète ﷺ. Son règne dura 2 ans (632-634 après J.-C.). Il consolida l\'unité de la communauté musulmane, supprima les rébellions et initia la compilation du Coran.'
    },
    {
      id: 22,
      category: 'histoire',
      difficulty: 'facile',
      question: 'Quelle est l\'année de l\'Hégire (migration du Prophète ﷺ vers Médine) ?',
      options: ['610 après J.-C.', '615 après J.-C.', '622 après J.-C.', '630 après J.-C.'],
      answer: 2,
      explanation: 'L\'Hégire a eu lieu en 622 après J.-C. Cette date marque le début du calendrier islamique lunaire (calendrier hijri). La migration du Prophète ﷺ de La Mecque à Médine constitue un tournant décisif dans l\'histoire de l\'Islam.'
    },
    {
      id: 23,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Quelle est la première mosquée construite dans l\'histoire de l\'Islam ?',
      options: ['La Mosquée Al-Haram à La Mecque', 'La Mosquée Al-Aqsa à Jérusalem', 'La Mosquée Quba à Médine', 'La Mosquée du Prophète à Médine'],
      answer: 2,
      explanation: 'La Mosquée Quba, construite lors de l\'Hégire en 622 après J.-C., est considérée comme la première mosquée de l\'Islam. Le Prophète ﷺ a posé les premières pierres lui-même lors de son arrivée à proximité de Médine. Prier 2 rak\'as dans cette mosquée équivaut à une Omra.'
    },
    {
      id: 24,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Lors de quelle bataille les musulmans ont-ils subi leur première défaite importante ?',
      options: ['Bataille de Badr', 'Bataille d\'Uhud', 'Bataille des Coalisés (Khandaq)', 'Bataille de Hunayn'],
      answer: 1,
      explanation: 'La Bataille d\'Uhud (625 après J.-C.) fut une défaite partielle pour les musulmans. Après une position avantageuse, les archers qui avaient quitté leur poste en désobéissant au Prophète ﷺ permirent aux Qurayshites de prendre l\'avantage. Le Prophète ﷺ lui-même fut blessé.'
    },
    {
      id: 25,
      category: 'histoire',
      difficulty: 'facile',
      question: 'En quelle année le Prophète Muhammad ﷺ est-il né ?',
      options: ['570 après J.-C.', '580 après J.-C.', '590 après J.-C.', '610 après J.-C.'],
      answer: 0,
      explanation: 'Le Prophète Muhammad ﷺ est né en 570 après J.-C., l\'année dite "de l\'Éléphant" (Am al-Fil), en référence à l\'attaque d\'Abraha contre la Ka\'ba. Il est né un lundi du mois de Rabi\' al-Awwal, à La Mecque.'
    },
    {
      id: 26,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Qui était Khadija (ra) pour le Prophète Muhammad ﷺ ?',
      options: ['Sa mère adoptive', 'Sa première épouse et première croyante en l\'Islam', 'Sa cousine', 'Sa fille aînée'],
      answer: 1,
      explanation: 'Khadija bint Khuwaylid (ra) était la première épouse du Prophète ﷺ et la première personne à croire en lui et à embrasser l\'Islam. Ils se sont mariés quand il avait 25 ans et elle 40 ans. Elle fut un soutien indéfectible jusqu\'à sa mort en 619 après J.-C.'
    },
    {
      id: 27,
      category: 'histoire',
      difficulty: 'difficile',
      question: 'Quel calife omeyyade a ordonné la construction du Dôme du Rocher à Jérusalem ?',
      options: ['Mu\'awiya ibn Abi Sufyan', 'Yazid ibn Mu\'awiya', 'Abd al-Malik ibn Marwan', 'Al-Walid ibn Abd al-Malik'],
      answer: 2,
      explanation: 'Le Dôme du Rocher (Qubbat as-Sakhra) à Jérusalem a été construit par le calife omeyyade Abd al-Malik ibn Marwan, achevé en 692 après J.-C. (72H). C\'est l\'un des plus anciens monuments islamiques encore debout.'
    },
    {
      id: 28,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Combien de califes "bien guidés" (Rashidun) y a-t-il eu après le Prophète ﷺ ?',
      options: ['2', '3', '4', '5'],
      answer: 2,
      explanation: 'Les quatre califes bien guidés (al-Khulafa ar-Rashidun) sont : Abu Bakr as-Siddiq, Umar ibn al-Khattab, Uthman ibn Affan, et Ali ibn Abi Talib (que Allah soit satisfait d\'eux tous). Leur règne s\'étendit de 632 à 661 après J.-C.'
    },
    {
      id: 29,
      category: 'histoire',
      difficulty: 'difficile',
      question: 'Lors de la Bataille de Badr, combien de musulmans affrontaient combien de Qurayshites ?',
      options: ['300 vs 700', '313 vs 1000', '500 vs 1500', '800 vs 2000'],
      answer: 1,
      explanation: 'À la Bataille de Badr (624 après J.-C.), 313 musulmans affrontèrent une armée d\'environ 1000 Qurayshites. Malgré cette infériorité numérique flagrante, les musulmans remportèrent une victoire décisive. Allah envoya des anges pour les soutenir, comme mentionné dans le Coran (3:123).'
    },
    {
      id: 30,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Quelle ville fut la capitale de l\'empire islamique sous les Abbassides ?',
      options: ['Damas', 'Bagdad', 'Le Caire', 'Cordoue'],
      answer: 1,
      explanation: 'Bagdad (en Irak actuel) fut fondée en 762 après J.-C. par le calife abbasside Al-Mansur et devint la capitale de l\'empire abbasside. Elle fut un grand centre de savoir et de civilisation pendant la période dite "Âge d\'Or de l\'Islam".'
    },

    /* ============================
       CATÉGORIE : PROPHÈTES (10)
    ============================ */
    {
      id: 31,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Quel prophète a survécu dans le ventre d\'une baleine ?',
      options: ['Moussa (as)', 'Ibrahim (as)', 'Yunus (as)', 'Idris (as)'],
      answer: 2,
      explanation: 'Yunus (Jonas, as) est le prophète qui fut avalé par une grande baleine après avoir quitté son peuple sans permission divine. Il invoqua Allah depuis les profondeurs : "Il n\'y a de divinité que Toi ! Gloire à Toi ! J\'ai vraiment été du nombre des injustes." (21:87). Allah le sauva.'
    },
    {
      id: 32,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Quel est le seul prophète mentionné dans le Coran comme étant né sans père ?',
      options: ['Muhammad ﷺ', 'Ibrahim (as)', 'Adam (as)', 'Issa (as)'],
      answer: 3,
      explanation: 'Issa (Jésus, as) est né d\'une mère vierge, Maryam (Marie), sans père. Allah a dit : "Le cas de Issa est comme celui d\'Adam : Il l\'a créé de terre et lui a dit : \'Sois!\' et il fut." (3:59). Bien qu\'Adam soit né sans père ni mère, le Coran mentionne explicitement la naissance miraculeuse d\'Issa.'
    },
    {
      id: 33,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Combien de prophètes et messagers sont mentionnés nominalement dans le Coran ?',
      options: ['18 prophètes', '25 prophètes', '30 prophètes', '40 prophètes'],
      answer: 1,
      explanation: 'Vingt-cinq prophètes et messagers sont mentionnés par leur nom dans le Coran, d\'Adam à Muhammad ﷺ. Cependant, l\'Islam enseigne qu\'Allah a envoyé au total 124 000 prophètes (selon certains hadiths) au fil des âges pour guider l\'humanité.'
    },
    {
      id: 34,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète est surnommé "Khalil Allah" (l\'ami intime d\'Allah) ?',
      options: ['Moussa (as)', 'Ibrahim (as)', 'Dawud (as)', 'Soulayman (as)'],
      answer: 1,
      explanation: 'Ibrahim (Abraham, as) est surnommé "Khalil Allah" (l\'ami intime d\'Allah), comme mentionné dans le Coran (4:125) : "Allah a pris Ibrahim comme ami intime." Il est aussi le père de l\'Islam, car il a reconstruit la Ka\'ba avec son fils Isma\'il et institué le Hajj.'
    },
    {
      id: 35,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Quel prophète a reçu la Torah ?',
      options: ['Ibrahim (as)', 'Dawud (as)', 'Moussa (as)', 'Issa (as)'],
      answer: 2,
      explanation: 'Moussa (Moïse, as) est le prophète à qui Allah a révélé la Torah (Tawrat). Il est le prophète le plus souvent mentionné dans le Coran. Il fut envoyé aux Enfants d\'Israël et confronta le Pharaon d\'Égypte.'
    },
    {
      id: 36,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète était charpentier et construisit une arche pour survivre au déluge ?',
      options: ['Ibrahim (as)', 'Nuh (as)', 'Lut (as)', 'Salih (as)'],
      answer: 1,
      explanation: 'Nuh (Noé, as) construisit l\'Arche par ordre divin pour sauver les croyants et les animaux du grand déluge qui punit son peuple pour son incroyance. Il prêcha pendant 950 ans mais seuls quelques-uns le crurent. Le Coran lui consacre la sourate 71 (Nuh).'
    },
    {
      id: 37,
      category: 'prophetes',
      difficulty: 'difficile',
      question: 'Quel prophète fut élevé vivant vers les cieux selon l\'enseignement islamique ?',
      options: ['Idris (as) seulement', 'Issa (as) seulement', 'Idris (as) et Issa (as) tous les deux', 'Muhammad ﷺ lors du Mi\'raj'],
      answer: 2,
      explanation: 'Selon l\'enseignement islamique, deux prophètes furent élevés vivants : Idris (as) — "Nous l\'élevâmes à un rang sublime" (19:57) — et Issa (as) que Allah éleva vers Lui pour le protéger de ceux qui voulaient le tuer (4:158). Issa redescendra avant le Jour du Jugement.'
    },
    {
      id: 38,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète régnait sur les humains, les djinns et les animaux et dont le vent était soumis ?',
      options: ['Dawud (as)', 'Soulayman (as)', 'Ibrahim (as)', 'Yusuf (as)'],
      answer: 1,
      explanation: 'Soulayman (Salomon, as) est le prophète-roi à qui Allah donna une autorité exceptionnelle sur les humains, les djinns, les animaux et le vent. Il connaissait le langage des oiseaux (27:16). Il construisit le premier Temple de Jérusalem.'
    },
    {
      id: 39,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Quel prophète est considéré comme le premier homme et premier prophète ?',
      options: ['Ibrahim (as)', 'Nuh (as)', 'Idris (as)', 'Adam (as)'],
      answer: 3,
      explanation: 'Adam (as) est le premier homme créé par Allah et le premier prophète. Allah le créa de terre argile, lui insuffla Son esprit, lui apprit les noms de toutes choses et ordonna aux anges de se prosterner devant lui. Il est le père de l\'humanité.'
    },
    {
      id: 40,
      category: 'prophetes',
      difficulty: 'difficile',
      question: 'La sourate Yusuf est surnommée "la plus belle des histoires" (ahsan al-qasas). Quel prophet était le père de Yusuf ?',
      options: ['Ibrahim (as)', 'Ishaq (as)', 'Ya\'qub (as)', 'Isma\'il (as)'],
      answer: 2,
      explanation: 'Ya\'qub (Jacob, as) est le père de Yusuf (Joseph, as). Ya\'qub était lui-même prophète, fils d\'Ishaq (Isaac) et petit-fils d\'Ibrahim (Abraham). Ses douze fils sont à l\'origine des douze tribus d\'Israël. Ya\'qub perdit la vue de chagrin pour Yusuf puis recouvra la vue miraculeusement.'
    },

    /* ============================
       CATÉGORIE : PRATIQUES (10)
    ============================ */
    {
      id: 41,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Combien de piliers (arkan) compte l\'Islam ?',
      options: ['3 piliers', '4 piliers', '5 piliers', '6 piliers'],
      answer: 2,
      explanation: 'L\'Islam repose sur 5 piliers : 1) La Shahada (témoignage de foi), 2) As-Salat (la prière, 5 fois par jour), 3) Az-Zakat (l\'aumône légale), 4) As-Sawm (le jeûne du Ramadan), 5) Al-Hajj (le pèlerinage à La Mecque, pour ceux qui en ont la capacité).'
    },
    {
      id: 42,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Combien de fois par jour le musulman doit-il prier ?',
      options: ['3 fois', '5 fois', '7 fois', '10 fois'],
      answer: 1,
      explanation: 'Le musulman est tenu d\'accomplir 5 prières quotidiennes : Fajr (aube), Dhuhr (milieu du jour), Asr (après-midi), Maghrib (coucher du soleil) et Isha (nuit). Ces prières furent prescrites lors de l\'ascension nocturne du Prophète ﷺ (Al-Mi\'raj).'
    },
    {
      id: 43,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Quel est le seuil minimum de richesse (Nisab) à partir duquel la Zakat est obligatoire sur l\'or ?',
      options: ['20 dinars (85g d\'or)', '50 dinars (212g d\'or)', '100 dinars (425g d\'or)', '200 dirhams (595g d\'argent) seulement'],
      answer: 0,
      explanation: 'Le Nisab de l\'or est de 20 mithqal (dinars), soit environ 85 grammes d\'or pur. Si quelqu\'un possède cette quantité d\'or (ou son équivalent en richesse) pendant un an complet (hawl), la Zakat de 2,5% est obligatoire.'
    },
    {
      id: 44,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Combien de jours dure le jeûne du Ramadan ?',
      options: ['28 jours', '29 ou 30 jours selon le croissant lunaire', '30 jours exactement', '31 jours'],
      answer: 1,
      explanation: 'Le mois de Ramadan dure 29 ou 30 jours selon l\'apparition du croissant lunaire, comme tous les mois du calendrier islamique lunaire. Le jeûne débute à l\'aube (Fajr) et se termine au coucher du soleil (Maghrib).'
    },
    {
      id: 45,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Combien de fois le pèlerin effectue-t-il le Tawaf (circumambulation) autour de la Ka\'ba lors du Hajj ?',
      options: ['5 tours', '7 tours', '9 tours', '10 tours'],
      answer: 1,
      explanation: 'Le Tawaf consiste à effectuer 7 tours autour de la Ka\'ba dans le sens antihoraire, en commençant par la Pierre Noire (Al-Hajar al-Aswad). C\'est un rite fondamental du Hajj et de l\'Umra, symbolisant l\'unicité d\'Allah que toutes les créatures cherchent à atteindre.'
    },
    {
      id: 46,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Quelle est la prière surérogatoire (Sunnah) la plus méritoire selon les hadiths ?',
      options: ['La prière du Duha (matin)', 'La prière de la nuit (Qiyam al-Layl/Tahajjud)', 'La prière du Jumu\'a', 'La prière du Witr'],
      answer: 1,
      explanation: 'La prière de la nuit (Qiyam al-Layl ou Tahajjud) est la prière surérogatoire la plus méritoire. Le Prophète ﷺ a dit : "La meilleure prière après les prières obligatoires est la prière de la nuit." (Muslim). Allah descend au ciel le plus bas dans le dernier tiers de la nuit.'
    },
    {
      id: 47,
      category: 'pratiques',
      difficulty: 'difficile',
      question: 'Qu\'est-ce que la "Fidya" dans le contexte du jeûne islamique ?',
      options: ['La prière de compensation', 'L\'expiation pour bris de jeûne par rapport intime', 'La nourriture offerte à un pauvre pour chaque jour de jeûne raté sans possibilité de récupérer', 'Le don fait à la mosquée en Ramadan'],
      answer: 2,
      explanation: 'La Fidya est une compensation alimentaire due par celui qui ne peut pas jeûner ni récupérer ses jours ultérieurement (personnes très âgées, malades chroniques). Elle consiste à nourrir un pauvre pour chaque jour de jeûne manqué, généralement évaluée à la valeur d\'un repas ou 750g de nourriture de base.'
    },
    {
      id: 48,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Combien de rak\'as (unités) contient la prière du Fajr (aube) ?',
      options: ['1 rak\'a', '2 rak\'as', '3 rak\'as', '4 rak\'as'],
      answer: 1,
      explanation: 'La prière du Fajr (Sobh) est la prière du lever du soleil. Elle comprend 2 rak\'as obligatoires (fard), précédées de 2 rak\'as sunnah mu\'akkada (fortement recommandées). Le Prophète ﷺ a dit : "Les deux rak\'as du Fajr valent mieux que le monde et ce qu\'il contient."'
    },
    {
      id: 49,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Qu\'est-ce que la Shahada ?',
      options: ['La prière du vendredi', 'Le témoignage de foi : "Il n\'y a de divinité qu\'Allah et Muhammad est Son messager"', 'L\'ablution rituelle', 'L\'aumône légale annuelle'],
      answer: 1,
      explanation: 'La Shahada (témoignage de foi) est : "Ashhadu an la ilaha illa Allah, wa ashhadu anna Muhammadan rasul Allah" — "Je témoigne qu\'il n\'y a de divinité qu\'Allah et je témoigne que Muhammad est Son messager." C\'est le premier et le plus important pilier de l\'Islam, qui constitue l\'entrée en Islam.'
    },
    {
      id: 50,
      category: 'pratiques',
      difficulty: 'difficile',
      question: 'Dans quelles conditions l\'ablution (wudu) est-elle annulée ?',
      options: [
        'Manger de la viande de chameau, dormir avec perte de conscience, tout ce qui sort des deux voies',
        'Parler fort, rire, marcher longtemps',
        'Toucher le Coran, se laver les mains',
        'Pleurer, éternuer, boire de l\'eau'
      ],
      answer: 0,
      explanation: 'L\'ablution (wudu) est annulée par : 1) Tout ce qui sort des deux voies (urine, selles, gaz...), 2) Le sommeil profond avec perte de conscience, 3) L\'évanouissement ou l\'ivresse, 4) Toucher les parties génitales directement selon de nombreux savants. Manger la viande de chameau est aussi un annulateur selon l\'école hanbalite et le hadith de Muslim.'
    }

  ]
};
