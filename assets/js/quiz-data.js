/* ============================================================
   AL-HUDA — Données du Quiz Islamique
   150 questions authentiques réparties sur 5 catégories
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
      options: ['Moussa عليه السلام', 'Ibrahim عليه السلام', 'Yunus عليه السلام', 'Idris عليه السلام'],
      answer: 2,
      explanation: 'Yunus (Jonas, as) est le prophète qui fut avalé par une grande baleine après avoir quitté son peuple sans permission divine. Il invoqua Allah depuis les profondeurs : "Il n\'y a de divinité que Toi ! Gloire à Toi ! J\'ai vraiment été du nombre des injustes." (21:87). Allah le sauva.'
    },
    {
      id: 32,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Quel est le seul prophète mentionné dans le Coran comme étant né sans père ?',
      options: ['Muhammad ﷺ', 'Ibrahim عليه السلام', 'Adam عليه السلام', 'Issa عليه السلام'],
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
      options: ['Moussa عليه السلام', 'Ibrahim عليه السلام', 'Dawud عليه السلام', 'Soulayman عليه السلام'],
      answer: 1,
      explanation: 'Ibrahim (Abraham, as) est surnommé "Khalil Allah" (l\'ami intime d\'Allah), comme mentionné dans le Coran (4:125) : "Allah a pris Ibrahim comme ami intime." Il est aussi le père de l\'Islam, car il a reconstruit la Ka\'ba avec son fils Isma\'il et institué le Hajj.'
    },
    {
      id: 35,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Quel prophète a reçu la Torah ?',
      options: ['Ibrahim عليه السلام', 'Dawud عليه السلام', 'Moussa عليه السلام', 'Issa عليه السلام'],
      answer: 2,
      explanation: 'Moussa (Moïse, as) est le prophète à qui Allah a révélé la Torah (Tawrat). Il est le prophète le plus souvent mentionné dans le Coran. Il fut envoyé aux Enfants d\'Israël et confronta le Pharaon d\'Égypte.'
    },
    {
      id: 36,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète était charpentier et construisit une arche pour survivre au déluge ?',
      options: ['Ibrahim عليه السلام', 'Nuh عليه السلام', 'Lut عليه السلام', 'Salih عليه السلام'],
      answer: 1,
      explanation: 'Nuh (Noé, as) construisit l\'Arche par ordre divin pour sauver les croyants et les animaux du grand déluge qui punit son peuple pour son incroyance. Il prêcha pendant 950 ans mais seuls quelques-uns le crurent. Le Coran lui consacre la sourate 71 (Nuh).'
    },
    {
      id: 37,
      category: 'prophetes',
      difficulty: 'difficile',
      question: 'Quel prophète fut élevé vivant vers les cieux selon l\'enseignement islamique ?',
      options: ['Idris عليه السلام seulement', 'Issa عليه السلام seulement', 'Idris عليه السلام et Issa عليه السلام tous les deux', 'Muhammad ﷺ lors du Mi\'raj'],
      answer: 2,
      explanation: 'Selon l\'enseignement islamique, deux prophètes furent élevés vivants : Idris عليه السلام — "Nous l\'élevâmes à un rang sublime" (19:57) — et Issa عليه السلام que Allah éleva vers Lui pour le protéger de ceux qui voulaient le tuer (4:158). Issa redescendra avant le Jour du Jugement.'
    },
    {
      id: 38,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète régnait sur les humains, les djinns et les animaux et dont le vent était soumis ?',
      options: ['Dawud عليه السلام', 'Soulayman عليه السلام', 'Ibrahim عليه السلام', 'Yusuf عليه السلام'],
      answer: 1,
      explanation: 'Soulayman (Salomon, as) est le prophète-roi à qui Allah donna une autorité exceptionnelle sur les humains, les djinns, les animaux et le vent. Il connaissait le langage des oiseaux (27:16). Il construisit le premier Temple de Jérusalem.'
    },
    {
      id: 39,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Quel prophète est considéré comme le premier homme et premier prophète ?',
      options: ['Ibrahim عليه السلام', 'Nuh عليه السلام', 'Idris عليه السلام', 'Adam عليه السلام'],
      answer: 3,
      explanation: 'Adam عليه السلام est le premier homme créé par Allah et le premier prophète. Allah le créa de terre argile, lui insuffla Son esprit, lui apprit les noms de toutes choses et ordonna aux anges de se prosterner devant lui. Il est le père de l\'humanité.'
    },
    {
      id: 40,
      category: 'prophetes',
      difficulty: 'difficile',
      question: 'La sourate Yusuf est surnommée "la plus belle des histoires" (ahsan al-qasas). Quel prophet était le père de Yusuf ?',
      options: ['Ibrahim عليه السلام', 'Ishaq عليه السلام', 'Ya\'qub عليه السلام', 'Isma\'il عليه السلام'],
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
    },

    /* ============================
       CORAN — Questions 51–70
    ============================ */
    {
      id: 51,
      category: 'coran',
      difficulty: 'facile',
      question: 'Combien de versets compte Al-Fatiha, la première sourate du Coran ?',
      options: ['5 versets', '6 versets', '7 versets', '8 versets'],
      answer: 2,
      explanation: 'Al-Fatiha (L\'Ouverture) compte 7 versets. Elle est appelée "Umm al-Kitab" (la Mère du Livre) et "As-Sab\' al-Mathani" (les sept versets répétés). Elle est récitée dans chaque rak\'a de la prière.'
    },
    {
      id: 52,
      category: 'coran',
      difficulty: 'moyen',
      question: 'Quel est le verset le plus long du Coran ?',
      options: ['Ayat al-Kursi (2:255)', 'Le verset de la dette (2:282)', 'Le verset du voile (24:31)', 'Le verset de l\'héritage (4:11)'],
      answer: 1,
      explanation: 'Le verset 282 de sourate Al-Baqara, dit "verset de la dette" (ayat al-mudayana), est le plus long verset du Coran. Il traite des contrats de prêt et de commerce et compte environ 128 mots en arabe.'
    },
    {
      id: 53,
      category: 'coran',
      difficulty: 'facile',
      question: 'Comment appelle-t-on la formule "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" ?',
      options: ['La Tasmiya ou Basmala', 'La Tahlila', 'La Hamdalah', 'La Takbira'],
      answer: 0,
      explanation: 'La Basmala (ou Tasmiya) est la formule "Bismillahi r-rahmani r-rahim" — "Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux". Elle précède 113 sourates du Coran (sauf At-Tawba) et figure aussi dans le corps de la sourate An-Naml (27:30).'
    },
    {
      id: 54,
      category: 'coran',
      difficulty: 'moyen',
      question: 'Quelle sourate est surnommée "le cœur du Coran" ?',
      options: ['Al-Ikhlas', 'Ya-Sin', 'Al-Kahf', 'Ar-Rahman'],
      answer: 1,
      explanation: 'Ya-Sin (sourate 36) est surnommée "le cœur du Coran" selon un hadith rapporté par Ahmad. Elle est particulièrement récitée pour les mourants et lors des occasions importantes. Certains savants estiment qu\'elle condense les fondements de la foi islamique.'
    },
    {
      id: 55,
      category: 'coran',
      difficulty: 'difficile',
      question: 'Dans quelle sourate Allah dit-il : "Nous avons certes révélé le Coran et Nous en sommes certes le gardien" ?',
      options: ['Al-Hijr (15:9)', 'Al-Furqan (25:1)', 'Az-Zumar (39:1)', 'Al-Qadr (97:1)'],
      answer: 0,
      explanation: 'C\'est dans sourate Al-Hijr, verset 9 : "Inna nahnu nazzalna dh-dhikra wa inna lahu lahafizun." Allah promet Lui-même de préserver le Coran de toute altération, ce qui explique que le Coran soit le seul livre sacré préservé intégralement depuis sa révélation.'
    },
    {
      id: 56,
      category: 'coran',
      difficulty: 'facile',
      question: 'En quelle langue le Coran a-t-il été révélé ?',
      options: ['En hébreu', 'En araméen', 'En arabe', 'En persan'],
      answer: 2,
      explanation: 'Le Coran a été révélé en arabe à travers l\'ange Jibril (Gabriel) au Prophète Muhammad ﷺ. Allah dit : "Nous l\'avons révélé en Coran arabe afin que vous compreniez." (12:2). La langue arabe du Coran est d\'une éloquence inégalée, constituant en elle-même un miracle.'
    },
    {
      id: 57,
      category: 'coran',
      difficulty: 'moyen',
      question: 'Quelle sourate commence par les lettres "Alif, Lam, Mim" ?',
      options: ['Al-Baqara uniquement', 'Al-Baqara, Al-Imran et plusieurs autres', 'Ya-Sin uniquement', 'Al-Fatiha'],
      answer: 1,
      explanation: 'Plusieurs sourates commencent par "Alif Lam Mim" : Al-Baqara (2), Al-Imran (3), Al-Ankabut (29), Ar-Rum (30), Luqman (31) et As-Sajda (32). Ces lettres sont appelées "al-huruf al-muqatta\'a" (lettres isolées) et leur signification exacte est connue d\'Allah seul.'
    },
    {
      id: 58,
      category: 'coran',
      difficulty: 'difficile',
      question: 'Combien de fois le mot "Allah" apparaît-il dans le Coran (approximativement) ?',
      options: ['Environ 500 fois', 'Environ 1200 fois', 'Environ 2700 fois', 'Environ 5000 fois'],
      answer: 2,
      explanation: 'Le nom "Allah" apparaît environ 2698 fois dans le Saint Coran selon les décomptes les plus précis. C\'est le nom propre du Seigneur des mondes, mentionné plus que tout autre terme, reflétant la centralité du tawhid (unicité divine) dans le message coranique.'
    },
    {
      id: 59,
      category: 'coran',
      difficulty: 'moyen',
      question: 'Quelle sourate est lue traditionnellement le vendredi selon la Sunnah du Prophète ﷺ ?',
      options: ['Al-Mulk', 'Al-Kahf', 'Ya-Sin', 'Al-Waqia'],
      answer: 1,
      explanation: 'Il est sunnah de lire la sourate Al-Kahf (La Caverne, sourate 18) le vendredi. Le Prophète ﷺ a dit : "Celui qui lit la sourate Al-Kahf le vendredi sera illuminé d\'une lumière entre deux vendredis." (Al-Hakim, Al-Bayhaqi). Cette sourate contient de nombreuses paraboles et protège du Dajjal.'
    },
    {
      id: 60,
      category: 'coran',
      difficulty: 'facile',
      question: 'Qu\'est-ce que "Ayat al-Kursi" (le verset du Trône) ?',
      options: ['Le verset 255 de la sourate Al-Baqara', 'Le verset 1 de la sourate Al-Fatiha', 'Le verset 33 de la sourate Al-Ahzab', 'Le verset 3 de la sourate Al-Ikhlas'],
      answer: 0,
      explanation: 'Ayat al-Kursi est le verset 255 de la sourate Al-Baqara. C\'est le plus grand verset du Coran selon le Prophète ﷺ qui a dit : "Le verset le plus grand du Coran est : Allah ! Point de divinité en dehors de Lui, le Vivant, Celui qui subsiste par Lui-même." Récité chaque soir, il protège jusqu\'au matin.'
    },
    {
      id: 61,
      category: 'coran',
      difficulty: 'difficile',
      question: 'Combien de "sajda" (prosternations de récitation) y a-t-il dans le Coran ?',
      options: ['7 sajdas', '10 sajdas', '14 ou 15 sajdas', '20 sajdas'],
      answer: 2,
      explanation: 'Il y a 14 sajdas selon la majorité des savants (ou 15 selon d\'autres). Lorsqu\'on récite ou entend ces versets, il est recommandé d\'effectuer une prosternation. Ces versets contiennent généralement une description de la prosternation des créatures devant Allah.'
    },
    {
      id: 62,
      category: 'coran',
      difficulty: 'moyen',
      question: 'Comment nomme-t-on la division du Coran en 30 parties égales ?',
      options: ['Hizb', 'Juz (ou ajza)', 'Maqra', 'Qism'],
      answer: 1,
      explanation: 'Le Coran est divisé en 30 parties appelées "juz" (pluriel : ajza). Cette division facilite la mémorisation et la récitation complète du Coran en un mois (un juz par jour), notamment pendant le Ramadan. Chaque juz est lui-même divisé en deux "hizb".'
    },
    {
      id: 63,
      category: 'coran',
      difficulty: 'facile',
      question: 'Quelle est la seule sourate du Coran qui ne commence pas par la Basmala ?',
      options: ['Al-Ikhlas', 'At-Tawba (Al-Bara\'a)', 'Al-Kawthar', 'Al-Falaq'],
      answer: 1,
      explanation: 'La sourate At-Tawba (Le Repentir, sourate 9) est la seule des 114 sourates à ne pas commencer par la Basmala. Les savants expliquent cela par le fait qu\'elle a été révélée pour annoncer la rupture des traités avec les polythéistes, et la Basmala est une formule de miséricorde qui ne convenait pas à ce contexte.'
    },
    {
      id: 64,
      category: 'coran',
      difficulty: 'difficile',
      question: 'Pendant combien d\'années environ la révélation coranique s\'est-elle étendue ?',
      options: ['10 ans', '13 ans', '23 ans', '30 ans'],
      answer: 2,
      explanation: 'La révélation du Coran s\'est étendue sur environ 23 ans : 13 ans à La Mecque (période mecquoise) et 10 ans à Médine (période médinoise) après l\'Hégire. La première révélation eut lieu dans la grotte de Hira avec les 5 premiers versets de la sourate Al-Alaq.'
    },
    {
      id: 65,
      category: 'coran',
      difficulty: 'moyen',
      question: 'Quelle sourate est appelée "Al-Mu\'awwidhatain" (les deux protectrices) ?',
      options: ['Al-Ikhlas et Al-Kawthar', 'Al-Falaq et An-Nas', 'Al-Fatiha et Al-Baqara', 'Al-Asr et Ad-Duha'],
      answer: 1,
      explanation: 'Al-Mu\'awwidhatain désigne les deux dernières sourates du Coran : Al-Falaq (L\'Aube, 113) et An-Nas (Les Hommes, 114). Le Prophète ﷺ les récitait chaque matin et soir pour se protéger du mal, du mauvais œil et des djinns. "Mu\'awwidhatain" vient du verbe "a\'adha" (se réfugier, se protéger).'
    },
    {
      id: 66,
      category: 'coran',
      difficulty: 'facile',
      question: 'Que signifie le mot "Coran" (Al-Qur\'an) en arabe ?',
      options: ['La lumière', 'La récitation / ce qui est récité', 'Le guide', 'La parole'],
      answer: 1,
      explanation: 'Le mot "Al-Qur\'an" vient de la racine arabe "qara\'a" qui signifie "lire" ou "réciter". Le Coran est donc littéralement "la Récitation" ou "ce qui est récité". La première parole révélée fut précisément "Iqra\'" (Lis ! / Récite !), soulignant cette dimension fondamentale.'
    },
    {
      id: 67,
      category: 'coran',
      difficulty: 'difficile',
      question: 'Qui fut chargé par le Calife Abu Bakr de rassembler le Coran en un seul recueil (Mushaf) ?',
      options: ['Ali ibn Abi Talib', 'Umar ibn al-Khattab', 'Zayd ibn Thabit', 'Uthman ibn Affan'],
      answer: 2,
      explanation: 'Zayd ibn Thabit, le secrétaire du Prophète ﷺ et excellent connaisseur du Coran, fut désigné par le Calife Abu Bakr (sur conseil d\'Umar) pour compiler le Coran en un recueil officiel après la bataille de Yamama (11H). Ce fut le premier Mushaf complet, conservé ensuite par Hafsa, l\'épouse du Prophète ﷺ.'
    },
    {
      id: 68,
      category: 'coran',
      difficulty: 'moyen',
      question: 'Quelle sourate du Coran ne parle que d\'une femme et lui est entièrement dédiée ?',
      options: ['Maryam (19)', 'An-Nisa (4)', 'Al-Mumtahina (60)', 'Az-Zukhruf (43)'],
      answer: 0,
      explanation: 'La sourate Maryam (Marie, sourate 19) est entièrement centrée sur Maryam (Marie), la mère de Issa (Jésus). Elle est la seule femme mentionnée par son prénom dans le Coran. Allah lui consacre une sourate entière pour honorer sa piété, sa chasteté et le miracle de la naissance de son fils sans père.'
    },
    {
      id: 69,
      category: 'coran',
      difficulty: 'facile',
      question: 'Quel ange était chargé d\'apporter la révélation au Prophète Muhammad ﷺ ?',
      options: ['Mikail (Michel)', 'Israfil', 'Jibril (Gabriel)', 'Azrail'],
      answer: 2,
      explanation: 'C\'est l\'ange Jibril (Gabriel, en arabe) qui transmettait la révélation d\'Allah au Prophète Muhammad ﷺ. Allah dit dans le Coran : "Dis : Quiconque est ennemi de Jibril... c\'est lui qui l\'a fait descendre sur ton cœur, par permission d\'Allah." (2:97). Jibril est aussi appelé "Ruh al-Amin" (l\'Esprit fidèle).'
    },
    {
      id: 70,
      category: 'coran',
      difficulty: 'moyen',
      question: 'Dans quelle nuit sacrée le Coran a-t-il été révélé pour la première fois ?',
      options: ['La nuit du 15 Sha\'ban', 'Laylat al-Qadr (la nuit du Destin)', 'La nuit du Mi\'raj', 'La nuit de l\'Isra'],
      answer: 1,
      explanation: 'La première révélation coranique (les 5 premiers versets de la sourate Al-Alaq) descend durant Laylat al-Qadr (la nuit du Destin), dans les dix dernières nuits du Ramadan, dans la grotte de Hira. Allah dit : "Nous l\'avons certes révélé durant la Nuit du Destin." (97:1). Cette nuit vaut mieux que mille mois.'
    },

    /* ============================
       HADITHS — Questions 71–88
    ============================ */
    {
      id: 71,
      category: 'hadith',
      difficulty: 'facile',
      question: 'Quel est le recueil de hadiths considéré comme le plus authentique après le Coran ?',
      options: ['Sahih Muslim', 'Sahih al-Bukhari', 'Sunan Abu Dawud', 'Jami\' at-Tirmidhi'],
      answer: 1,
      explanation: 'Sahih al-Bukhari, compilé par l\'imam Muhammad ibn Ismail al-Bukhari (mort en 256H/870 CE), est unanimement reconnu comme le recueil de hadiths le plus authentique. Al-Bukhari aurait examiné 600 000 hadiths et n\'en retint que 7 275 (avec répétitions), après une méthode de vérification extrêmement rigoureuse.'
    },
    {
      id: 72,
      category: 'hadith',
      difficulty: 'moyen',
      question: 'Que signifie un hadith "Qudsi" (sacré) ?',
      options: [
        'Un hadith révélé par l\'ange Jibril avec les mots exacts d\'Allah',
        'Un hadith où le Prophète ﷺ rapporte les paroles d\'Allah en ses propres mots',
        'Un hadith inventé et donc rejeté',
        'Un hadith rapporté par plus de 10 compagnons'
      ],
      answer: 1,
      explanation: 'Un hadith Qudsi (Sacré) est un hadith où le Prophète ﷺ rapporte les paroles d\'Allah, mais avec ses propres mots (contrairement au Coran où les mots sont ceux d\'Allah). Le Prophète dit par exemple "Allah dit..." ou "Mon Seigneur dit...". Il y a environ 40 hadiths qudsi bien connus, rassemblés dans le recueil d\'Al-Nawawi.'
    },
    {
      id: 73,
      category: 'hadith',
      difficulty: 'facile',
      question: 'Que signifie "Isnad" dans la science du hadith ?',
      options: ['Le texte du hadith', 'La chaîne de transmission des rapporteurs', 'L\'explication du hadith', 'La classification du hadith'],
      answer: 1,
      explanation: 'L\'Isnad (ou Sanad) est la chaîne de transmission d\'un hadith, c\'est-à-dire la liste ordonnée des personnes qui l\'ont rapporté depuis le Prophète ﷺ. Les savants de hadith développèrent une science unique au monde pour vérifier la fiabilité de chaque rapporteur ("rijal al-hadith"). L\'imam Ibn al-Mubarak dit : "L\'Isnad fait partie de la religion."'
    },
    {
      id: 74,
      category: 'hadith',
      difficulty: 'moyen',
      question: 'Qu\'est-ce qu\'un hadith "Mutawatir" ?',
      options: [
        'Un hadith rapporté par un seul compagnon',
        'Un hadith fabriqué',
        'Un hadith rapporté par un si grand nombre de personnes que la fabrication est impossible',
        'Un hadith approuvé par le Prophète ﷺ en silence'
      ],
      answer: 2,
      explanation: 'Un hadith Mutawatir est rapporté par un si grand nombre de personnes à chaque génération que toute entente pour fabriquer un mensonge est rationnellement impossible. Il procure une certitude absolue (yaqin). L\'exemple classique est le hadith "Celui qui ment sur moi intentionnellement, qu\'il s\'apprête à occuper sa place en Enfer" rapporté par plus de 60 compagnons.'
    },
    {
      id: 75,
      category: 'hadith',
      difficulty: 'difficile',
      question: 'Lequel de ces hadiths est fondamental dans la jurisprudence islamique ?',
      options: [
        '"Les actes ne valent que par les intentions"',
        '"Cherchez le savoir jusqu\'en Chine"',
        '"La propreté est la moitié de la foi"',
        '"Le meilleur djihad est une parole juste devant un dirigeant injuste"'
      ],
      answer: 0,
      explanation: '"Innamal a\'malu bi-n-niyyat" — "Les actes ne valent que par les intentions" est l\'un des hadiths les plus importants de l\'Islam. L\'imam Ash-Shafi\'i disait qu\'il constitue un tiers de la religion. Tous les actes d\'adoration doivent être accomplis avec la sincère intention de plaire à Allah pour être valides et récompensés.'
    },
    {
      id: 76,
      category: 'hadith',
      difficulty: 'moyen',
      question: 'Combien de livres (kutub) composent les "Kutub as-Sitta" (les Six Recueils) ?',
      options: ['4 recueils', '6 recueils', '8 recueils', '10 recueils'],
      answer: 1,
      explanation: 'Les "Kutub as-Sitta" (les Six Recueils authentiques) sont : Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, Jami\' at-Tirmidhi, Sunan an-Nasa\'i et Sunan Ibn Majah. Ces six collections constituent la référence principale des hadiths dans la tradition sunnite.'
    },
    {
      id: 77,
      category: 'hadith',
      difficulty: 'facile',
      question: 'Quelle compagne du Prophète ﷺ est la plus grande rapporteuse de hadiths ?',
      options: ['Khadija bint Khuwaylid', 'Fatima az-Zahra', 'Aïcha bint Abi Bakr', 'Umm Salama'],
      answer: 2,
      explanation: 'Aïcha bint Abi Bakr (radiallahu anha), épouse du Prophète ﷺ, est la plus grande rapporteuse de hadiths parmi les femmes avec plus de 2 210 hadiths. Elle était une autorité religieuse de premier plan et les compagnons venaient la consulter après la mort du Prophète ﷺ. Elle vivait le quotidien du Prophète et transmettait ses moindres détails.'
    },
    {
      id: 78,
      category: 'hadith',
      difficulty: 'moyen',
      question: 'Qu\'appelle-t-on "Hadith Mawdu\'" ?',
      options: ['Un hadith très long', 'Un hadith fabriqué / inventé', 'Un hadith dont l\'Isnad est incomplet', 'Un hadith rapporté par un seul compagnon'],
      answer: 1,
      explanation: 'Un hadith Mawdu\' (fabriqué, forgé) est un hadith inventé et faussement attribué au Prophète ﷺ. C\'est la catégorie la plus grave de hadith faible. Les savants compilèrent des ouvrages spéciaux pour les identifier et mettre en garde contre eux. Les rapporter en les attribuant au Prophète ﷺ en sachant qu\'ils sont faux est un péché majeur.'
    },
    {
      id: 79,
      category: 'hadith',
      difficulty: 'difficile',
      question: 'Quel compagnon a rapporté le plus grand nombre de hadiths ?',
      options: ['Abu Hurayra', 'Ibn Umar', 'Anas ibn Malik', 'Ibn Abbas'],
      answer: 0,
      explanation: 'Abu Hurayra (Abd ar-Rahman ibn Sakhr, radiallahu anhu) est le compagnon qui a rapporté le plus grand nombre de hadiths avec 5 374 hadiths. Il a accompagné le Prophète ﷺ pendant environ 3 ans mais s\'y consacra entièrement. Certains compagnons s\'étonnaient de sa mémoire prodigieuse et le Prophète ﷺ pria pour lui afin qu\'il ne puisse pas oublier.'
    },
    {
      id: 80,
      category: 'hadith',
      difficulty: 'facile',
      question: 'Que signifie "Sunnah" dans le contexte islamique ?',
      options: [
        'Uniquement les prières surérogatoires',
        'Les pratiques, paroles, actes et approbations tacites du Prophète ﷺ',
        'Les décisions des Califes bien guidés',
        'Les coutumes arabes préislamiques'
      ],
      answer: 1,
      explanation: 'La Sunnah désigne l\'ensemble des paroles (qawl), actes (fi\'l) et approbations tacites (taqrir) du Prophète Muhammad ﷺ. Elle constitue la deuxième source de la jurisprudence islamique après le Coran. Suivre la Sunnah est une obligation coranique : "Ce que le Messager vous donne, prenez-le ; et ce qu\'il vous interdit, abstenez-vous-en." (59:7)'
    },
    {
      id: 81,
      category: 'hadith',
      difficulty: 'moyen',
      question: 'Selon un hadith célèbre, combien de portes possède le Paradis ?',
      options: ['4 portes', '7 portes', '8 portes', '12 portes'],
      answer: 2,
      explanation: 'Selon un hadith rapporté par al-Bukhari et Muslim, le Paradis (Al-Janna) possède 8 portes. Parmi elles : Bab as-Salat (porte de la prière), Bab al-Jihad (porte du jihad), Bab ar-Rayyan (porte réservée aux jeûneurs), Bab as-Sadaqa (porte de l\'aumône). Celui qui remplit toutes ces conditions peut entrer par n\'importe quelle porte, voire toutes à la fois.'
    },
    {
      id: 82,
      category: 'hadith',
      difficulty: 'difficile',
      question: 'Qu\'est-ce que le "Hadith Ahad" ?',
      options: [
        'Un hadith rapporté par un très grand nombre de personnes',
        'Un hadith rapporté par un nombre limité de personnes (un seul ou quelques-uns) à une génération',
        'Le premier hadith du Sahih al-Bukhari',
        'Un hadith attribué uniquement au Prophète ﷺ sans Isnad'
      ],
      answer: 1,
      explanation: 'Le hadith Ahad (solitaire) est rapporté par un nombre restreint de personnes (une, deux ou quelques-unes) à au moins une génération de sa chaîne de transmission. Contrairement au Mutawatir, il procure une probabilité forte (zann ghalib) mais pas la certitude absolue. La plupart des hadiths sont Ahad. Ils sont cependant obligatoires à suivre en matière de pratique selon la majorité des savants.'
    },
    {
      id: 83,
      category: 'hadith',
      difficulty: 'facile',
      question: 'Le Prophète ﷺ a dit : "Les actes ne valent que par les intentions." Dans quel recueil ce hadith est-il rapporté ?',
      options: ['Sahih Muslim uniquement', 'Sunan Abu Dawud uniquement', 'Sahih al-Bukhari et Sahih Muslim', 'Sunan Ibn Majah uniquement'],
      answer: 2,
      explanation: 'Ce hadith fondamental — "Innamal a\'malu bi-n-niyyat" — est rapporté dans Sahih al-Bukhari (premier hadith du recueil) et Sahih Muslim, rapporté par Umar ibn al-Khattab. Sa position en ouverture du Sahih de Bukhari souligne son importance capitale en islam.'
    },
    {
      id: 84,
      category: 'hadith',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que la "Ziyada ath-Thiqa" dans la terminologie du hadith ?',
      options: [
        'Un hadith supplémentaire inventé',
        'Un ajout fait par un rapporteur fiable dans le texte d\'un hadith, absent chez d\'autres',
        'Le grade maximum d\'authenticité',
        'Un hadith rapporté uniquement par des femmes'
      ],
      answer: 1,
      explanation: 'La "Ziyada ath-Thiqa" (l\'addition du rapporteur fiable) est un ajout présent dans la version d\'un hadith transmis par un rapporteur fiable, mais absent dans les versions des autres rapporteurs. Les savants débattent de son acceptabilité : certains l\'acceptent automatiquement, d\'autres l\'examinent selon le cas.'
    },
    {
      id: 85,
      category: 'hadith',
      difficulty: 'facile',
      question: 'Qu\'est-ce que le "Matan" d\'un hadith ?',
      options: ['La chaîne de transmission', 'Le texte du hadith lui-même', 'Le grade d\'authenticité', 'Le nom du compilateur'],
      answer: 1,
      explanation: 'Le Matan est le corps du texte du hadith, c\'est-à-dire ce que le Prophète ﷺ a dit, fait ou approuvé, par opposition à l\'Isnad qui est la chaîne de transmission. L\'analyse du hadith porte sur deux axes : la vérification de l\'Isnad (chaîne) et l\'examen du Matan (texte), notamment pour détecter les anomalies ou contradictions avec des textes plus solides.'
    },
    {
      id: 86,
      category: 'hadith',
      difficulty: 'difficile',
      question: 'Quel savant a écrit "Al-Muwatta\'", le plus ancien recueil de hadiths compilé de façon systématique ?',
      options: ['Al-Bukhari', 'Imam Malik ibn Anas', 'Imam Ahmad ibn Hanbal', 'Imam Ash-Shafi\'i'],
      answer: 1,
      explanation: 'L\'imam Malik ibn Anas (mort en 179H/795 CE), fondateur de l\'école malikite, a compilé "Al-Muwatta\'" (Le Chemin aplani). C\'est le plus ancien recueil de hadiths organisé de façon systématique, composé de hadiths du Prophète ﷺ et des avis des compagnons et suivants. L\'imam Ash-Shafi\'i disait : "Après le Coran, il n\'est pas de livre sur la surface de la terre plus authentique que le Muwatta\' de Malik."'
    },
    {
      id: 87,
      category: 'hadith',
      difficulty: 'moyen',
      question: 'Que désigne le terme "Sahabi" (compagnon) selon les savants du hadith ?',
      options: [
        'Tout Muslim qui a vu le Prophète ﷺ même brièvement, cru en lui et est mort en Islam',
        'Uniquement les proches du Prophète ﷺ (famille et amis intimes)',
        'Les 10 compagnons à qui le Paradis a été annoncé',
        'Toute personne née avant l\'Hégire'
      ],
      answer: 0,
      explanation: 'Un Sahabi (compagnon) est, selon la définition des savants du hadith (notamment Ibn Hajar al-Asqalani), toute personne qui a rencontré le Prophète Muhammad ﷺ en étant croyante, et est morte dans l\'Islam. Le nombre de compagnons est estimé à plus de 100 000. Tous les compagnons sont considérés comme des transmetteurs fiables.'
    },
    {
      id: 88,
      category: 'hadith',
      difficulty: 'difficile',
      question: 'Qu\'est-ce que le "Jarh wat-Ta\'dil" dans la science du hadith ?',
      options: [
        'La prière et le jeûne surérogatoires',
        'La science d\'évaluation des rapporteurs de hadiths (critique et éloge)',
        'Le classement des sourates du Coran',
        'La méthode de calcul des horaires de prière'
      ],
      answer: 1,
      explanation: 'Le "Jarh wat-Ta\'dil" (critique et éloge) est une science islamique qui consiste à évaluer la fiabilité et l\'intégrité des rapporteurs de hadiths. "Jarh" signifie disqualifier un rapporteur pour un défaut (mauvaise mémoire, mensonge...) et "Ta\'dil" signifie l\'attester fiable. Cette science unique a permis de préserver la pureté de la Sunnah du Prophète ﷺ.'
    },

    /* ============================
       HISTOIRE — Questions 89–106
    ============================ */
    {
      id: 89,
      category: 'histoire',
      difficulty: 'facile',
      question: 'En quelle année eut lieu l\'Hégire (migration du Prophète ﷺ de La Mecque à Médine) ?',
      options: ['En 610 de l\'ère chrétienne', 'En 622 de l\'ère chrétienne', 'En 632 de l\'ère chrétienne', 'En 570 de l\'ère chrétienne'],
      answer: 1,
      explanation: 'L\'Hégire eut lieu en 622 de l\'ère chrétienne. Cette migration marqua un tournant décisif dans l\'histoire de l\'Islam et constitue le point de départ du calendrier islamique (calendrier hégirien). Le Calife Umar ibn al-Khattab instaura plus tard ce calendrier lunaire basé sur l\'Hégire.'
    },
    {
      id: 90,
      category: 'histoire',
      difficulty: 'facile',
      question: 'Comment s\'appelait la ville vers laquelle le Prophète ﷺ a émigré (avant de s\'appeler Médine) ?',
      options: ['Khaybar', 'Tabuk', 'Yathrib', 'Ta\'if'],
      answer: 2,
      explanation: 'La ville s\'appelait Yathrib avant d\'être renommée Al-Madina al-Munawwara (La Ville Illuminée) ou simplement Médine après l\'Hégire du Prophète ﷺ. C\'est dans cette ville que fut établi le premier État islamique, et où repose le Prophète ﷺ. Elle est la deuxième ville sainte de l\'Islam.'
    },
    {
      id: 91,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Quelle est la première bataille de l\'Islam ?',
      options: ['La bataille d\'Uhud', 'La bataille de Badr', 'La bataille du Fossé (Khandaq)', 'La bataille de Khaybar'],
      answer: 1,
      explanation: 'La bataille de Badr eut lieu le 17 Ramadan de l\'an 2 de l\'Hégire (624 CE). C\'est la première grande bataille de l\'Islam opposant 313 musulmans à une armée mecquoise d\'environ 1000 guerriers. Les musulmans remportèrent une victoire décisive contre toute attente. Allah y fit descendre les anges pour aider les croyants.'
    },
    {
      id: 92,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Lors de quelle bataille le Prophète ﷺ fut-il blessé au visage ?',
      options: ['La bataille de Badr', 'La bataille de Khaybar', 'La bataille d\'Uhud', 'La bataille de Hunayn'],
      answer: 2,
      explanation: 'Durant la bataille d\'Uhud (3H/625 CE), le Prophète ﷺ fut blessé au visage, brisant deux de ses dents. Les archers musulmans avaient quitté leur poste malgré les ordres du Prophète ﷺ, permettant à la cavalerie des Quraysh de contourner la montagne et d\'attaquer. Cette bataille enseigna l\'importance de l\'obéissance au commandement.'
    },
    {
      id: 93,
      category: 'histoire',
      difficulty: 'difficile',
      question: 'Quelle fut la première capitale du Califat islamique sous les Omeyyades ?',
      options: ['Bagdad', 'Damas', 'Le Caire', 'Cordoue'],
      answer: 1,
      explanation: 'Damas (Dimashq), en Syrie actuelle, fut la capitale du Califat omeyyade (661-750 CE), fondé par Mu\'awiya ibn Abi Sufyan. Ce fut la première grande capitale islamique en dehors de la péninsule arabique. Les Abbassides déplacèrent ensuite la capitale à Bagdad (762 CE).'
    },
    {
      id: 94,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'En quelle année La Mecque fut-elle conquise par le Prophète ﷺ (Fath Makkah) ?',
      options: ['An 5 de l\'Hégire', 'An 8 de l\'Hégire', 'An 10 de l\'Hégire', 'An 12 de l\'Hégire'],
      answer: 1,
      explanation: 'La conquête de La Mecque (Fath Makkah) eut lieu en l\'an 8 de l\'Hégire (630 CE), lors du mois de Ramadan. Le Prophète ﷺ entra dans la ville avec une armée de 10 000 soldats. Il proclama une amnistie générale pour les Mecquois et purifia la Ka\'ba des 360 idoles qui l\'entouraient. Ce fut un tournant majeur dans l\'histoire de l\'Islam.'
    },
    {
      id: 95,
      category: 'histoire',
      difficulty: 'facile',
      question: 'Quel fut le premier Calife après le décès du Prophète Muhammad ﷺ ?',
      options: ['Umar ibn al-Khattab', 'Ali ibn Abi Talib', 'Abu Bakr as-Siddiq', 'Uthman ibn Affan'],
      answer: 2,
      explanation: 'Abu Bakr as-Siddiq (radiallahu anhu), le plus proche ami du Prophète ﷺ et premier homme adulte converti à l\'Islam, fut désigné premier Calife après le décès du Prophète ﷺ en 11H/632 CE. Son califat dura environ 2 ans. Il consolida l\'État islamique, combattit la riddah (apostasie) et initia les premières conquêtes islamiques.'
    },
    {
      id: 96,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Quelle est la signification de "Khulafa ar-Rashidun" ?',
      options: ['Les califes omeyyades', 'Les quatre califes bien guidés (Abu Bakr, Umar, Uthman, Ali)', 'Les gouverneurs des provinces islamiques', 'Les successeurs des omeyyades'],
      answer: 1,
      explanation: 'Les "Khulafa ar-Rashidun" (Califes bien guidés) sont les quatre premiers califes : Abu Bakr as-Siddiq (11-13H), Umar ibn al-Khattab (13-23H), Uthman ibn Affan (23-35H) et Ali ibn Abi Talib (35-40H). Le Prophète ﷺ a dit : "Je vous exhorte à suivre ma Sunnah et la Sunnah des Califes bien guidés après moi."'
    },
    {
      id: 97,
      category: 'histoire',
      difficulty: 'difficile',
      question: 'Lors de quelle bataille fut conclu le Traité de Hudaybiyya ?',
      options: ['Après la bataille de Badr', 'Sans bataille — lors d\'une tentative de pèlerinage en l\'an 6H', 'Après la bataille du Fossé', 'Après la bataille de Tabuk'],
      answer: 1,
      explanation: 'Le Traité de Hudaybiyya (6H/628 CE) fut conclu non pas après une bataille mais lors d\'une tentative de pèlerinage (\'umra) du Prophète ﷺ avec 1400 compagnons. Bloqués par les Quraysh à Hudaybiyya, ils signèrent une trêve de 10 ans. Allah le qualifia de "victoire manifeste" (fath mubin) dans le Coran (48:1) car il ouvrit la voie à la conquête de La Mecque 2 ans plus tard.'
    },
    {
      id: 98,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Quelle fut la durée du Califat de Umar ibn al-Khattab ?',
      options: ['2 ans', '6 ans', '10 ans', '20 ans'],
      answer: 2,
      explanation: 'Umar ibn al-Khattab (radiallahu anhu) fut Calife pendant environ 10 ans (13-23H / 634-644 CE). Son califat fut marqué par des conquêtes considérables (Perse, Syrie, Égypte, Iraq), la création du diwan (registre des pensions), l\'établissement du calendrier hégirien et une justice sociale exemplaire. Il fut assassiné par l\'esclave persan Abu Lu\'lu\'a.'
    },
    {
      id: 99,
      category: 'histoire',
      difficulty: 'difficile',
      question: 'Quel est le nom de l\'armée islamique qui battit les Perses à la bataille de al-Qadisiyya (636 CE) ?',
      options: ['L\'armée de Khalid ibn al-Walid', 'L\'armée de Sa\'d ibn Abi Waqqas', 'L\'armée de Amr ibn al-As', 'L\'armée de Abu Ubayda ibn al-Jarrah'],
      answer: 1,
      explanation: 'C\'est Sa\'d ibn Abi Waqqas (radiallahu anhu) qui commandait l\'armée islamique lors de la bataille décisive de al-Qadisiyya (15H/636 CE) contre l\'Empire sassanide persan. Malgré l\'infériorité numérique, les musulmans remportèrent la victoire, ouvrant la voie à la conquête de l\'Iraq et de la Perse. Sa\'d fonda ensuite la ville de Kufa.'
    },
    {
      id: 100,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Quel calife a été surnommé "Dhul Nurayn" (le possesseur de deux lumières) ?',
      options: ['Abu Bakr', 'Umar', 'Uthman', 'Ali'],
      answer: 2,
      explanation: 'Uthman ibn Affan (radiallahu anhu) fut surnommé "Dhul Nurayn" (possesseur des deux lumières) car il épousa deux filles du Prophète ﷺ successivement : Ruqayya, puis après son décès, Umm Kulthum. Cette double union le rendit unique parmi tous les compagnons. Son califat (23-35H) fut marqué par la compilation définitive du Mushaf coranique.'
    },
    {
      id: 101,
      category: 'histoire',
      difficulty: 'difficile',
      question: 'Comment s\'appelle l\'évènement où l\'armée abyssine avec ses éléphants tenta d\'attaquer La Mecque ?',
      options: ['L\'année du Feu', 'L\'année de l\'Éléphant (Am al-Fil)', 'L\'année de la Trêve', 'L\'année de la Tristesse'],
      answer: 1,
      explanation: '"Am al-Fil" (l\'Année de l\'Éléphant, vers 570 CE) désigne l\'année de la naissance du Prophète Muhammad ﷺ, lors de laquelle Abraha al-Ashram, gouverneur abyssin du Yémen, marcha vers La Mecque avec une armée d\'éléphants pour détruire la Ka\'ba. Allah envoya des oiseaux (Ababil) qui bombardèrent l\'armée avec des pierres d\'argile (Sijjil). Cette histoire est relatée dans la sourate Al-Fil (105).'
    },
    {
      id: 102,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Quelle est la première mosquée construite en Islam ?',
      options: ['La Mosquée al-Haram (La Mecque)', 'La Mosquée al-Aqsa (Jérusalem)', 'La Mosquée de Quba (Médine)', 'La Mosquée du Prophète (Médine)'],
      answer: 2,
      explanation: 'La Mosquée de Quba est la première mosquée construite en Islam. Le Prophète ﷺ la construisit personnellement lors de son arrivée à Médine pendant l\'Hégire (en 622 CE), avant même d\'entrer dans la ville. Allah révéla à son sujet : "Une mosquée fondée dès le premier jour sur la piété est plus digne d\'y prier." (9:108).'
    },
    {
      id: 103,
      category: 'histoire',
      difficulty: 'difficile',
      question: 'Quel empire islamique a duré le plus longtemps dans l\'histoire ?',
      options: ['Le Califat omeyyade (89 ans)', 'Le Califat abbasside (508 ans)', 'L\'Empire ottoman (environ 600 ans)', 'Le Califat fatimide (262 ans)'],
      answer: 2,
      explanation: 'L\'Empire ottoman (environ 1299-1922 CE) a duré environ 600 ans, le plus long de l\'histoire islamique. À son apogée sous Soliman le Magnifique (1520-1566 CE), il s\'étendait sur trois continents : Europe du Sud-Est, Anatolie, Moyen-Orient et Afrique du Nord. Il prit fin avec l\'abolition du Califat en 1924 par Mustafa Kemal Atatürk.'
    },
    {
      id: 104,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Qui fut le général islamique qui conquit l\'Égypte ?',
      options: ['Khalid ibn al-Walid', 'Sa\'d ibn Abi Waqqas', 'Amr ibn al-As', 'Tariq ibn Ziyad'],
      answer: 2,
      explanation: 'Amr ibn al-As (radiallahu anhu) fut le général qui conquit l\'Égypte en 20H/641 CE sous le Califat de Umar ibn al-Khattab. Il fonda la ville de Fustat (proto-Caire) et fut le premier gouverneur islamique d\'Égypte. L\'Égypte devint un centre majeur de la civilisation islamique, notamment grâce à la ville d\'Al-Azhar fondée plus tard par les Fatimides.'
    },
    {
      id: 105,
      category: 'histoire',
      difficulty: 'difficile',
      question: 'Quel événement est connu sous le nom de "Yawm ad-Dar" (le jour de la maison) ?',
      options: [
        'La mort du Prophète ﷺ dans sa maison',
        'L\'assassinat du Calife Uthman dans sa propre maison',
        'La nuit de la naissance du Prophète ﷺ',
        'La réunion de la Saqifa Banu Sa\'ida après le décès du Prophète ﷺ'
      ],
      answer: 1,
      explanation: '"Yawm ad-Dar" (le jour de la maison) désigne le jour de l\'assassinat du Calife Uthman ibn Affan (radiallahu anhu) dans sa propre maison à Médine, en l\'an 35H/656 CE. Des rebelles venus d\'Égypte, d\'Iraq et de d\'autres régions l\'assiégèrent pendant plusieurs semaines avant de le tuer alors qu\'il récitait le Coran. Cet événement marqua le début de la grande Fitna (discorde) islamique.'
    },
    {
      id: 106,
      category: 'histoire',
      difficulty: 'moyen',
      question: 'Quel général islamique traversa le détroit de Gibraltar et conquit l\'Espagne (Al-Andalus) en 711 CE ?',
      options: ['Musa ibn Nusayr', 'Tariq ibn Ziyad', 'Uqba ibn Nafi', 'Hassan ibn al-Nu\'man'],
      answer: 1,
      explanation: 'Tariq ibn Ziyad (mort vers 720 CE) traversa le détroit de Gibraltar (Jabal Tariq = montagne de Tariq) en 92H/711 CE avec une armée d\'environ 7 000 soldats berbères, débutant la conquête d\'Al-Andalus (Espagne wisigothique). Sa victoire à la bataille de Guadalete contre le roi wisigoth Rodrigue ouvrit l\'Espagne à 800 ans de présence islamique.'
    },

    /* ============================
       PROPHÈTES — Questions 107–122
    ============================ */
    {
      id: 107,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Quel est le premier prophète envoyé par Allah selon l\'Islam ?',
      options: ['Ibrahim (Abraham)', 'Nouh (Noé)', 'Adam', 'Idris (Hénoch)'],
      answer: 2,
      explanation: 'Adam (paix sur lui) est le premier prophète de l\'Islam et aussi le premier être humain créé. Allah le modela de terre, lui insuffla Son Esprit, et le fit Khalifah (vicaire) sur Terre. Le Coran relate sa création, son séjour au Paradis avec son épouse Hawwa (Ève), et sa descente sur Terre après avoir mangé du fruit défendu.'
    },
    {
      id: 108,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Combien de prophètes sont mentionnés dans le Coran ?',
      options: ['10 prophètes', '25 prophètes', '40 prophètes', '124 000 prophètes'],
      answer: 1,
      explanation: '25 prophètes sont mentionnés par nom dans le Saint Coran. Selon les hadiths, le nombre total de prophètes envoyés à l\'humanité est de 124 000, et celui des messagers (rasul) de 313. Parmi les 25 coraniques, citons : Adam, Nouh, Ibrahim, Moussa, Issa et Muhammad (paix sur eux tous).'
    },
    {
      id: 109,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète fut jeté dans le feu par son peuple et en sortit indemne ?',
      options: ['Nouh (Noé)', 'Moussa (Moïse)', 'Ibrahim (Abraham)', 'Lut (Lot)'],
      answer: 2,
      explanation: 'Ibrahim (Abraham, paix sur lui) fut jeté dans un immense bûcher par son peuple et le roi Nemrod après avoir brisé les idoles. Allah ordonna au feu : "Sois fraîcheur et sécurité pour Ibrahim !" Le feu obéit à son Créateur et Ibrahim en sortit indemne. Cet épisode est relaté dans la sourate Al-Anbiya (21:68-69).'
    },
    {
      id: 110,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Quel prophète construisit l\'Arche (Al-Fulk) pour survivre au Déluge ?',
      options: ['Ibrahim', 'Nouh (Noé)', 'Salih', 'Hud'],
      answer: 1,
      explanation: 'Nouh (Noé, paix sur lui) construisit l\'Arche par ordre d\'Allah pour sauver les croyants et une paire de chaque espèce animale du Grand Déluge. Il prêcha son peuple pendant 950 ans sans grand succès. Son histoire est racontée en détail dans la sourate Nouh (71) et dans la sourate Hud (11).'
    },
    {
      id: 111,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète fut avalé par une baleine (poisson géant) ?',
      options: ['Dawud (David)', 'Yunus (Jonas)', 'Yusuf (Joseph)', 'Ilyas (Élie)'],
      answer: 1,
      explanation: 'Yunus (Jonas, paix sur lui) fut avalé par une grande baleine après avoir quitté son peuple sans permission d\'Allah. Dans les ténèbres des profondeurs, il invoqua Allah : "Il n\'y a de divinité que Toi, Gloire à Toi ! Je suis du nombre des injustes." (21:87). Allah l\'entendit et le fit recracher par la baleine sur un rivage. Son histoire est relatée dans les sourates Al-Anbiya et Yunus.'
    },
    {
      id: 112,
      category: 'prophetes',
      difficulty: 'difficile',
      question: 'Quel prophète est le seul à qui Allah a parlé directement sans intermédiaire angélique, selon le Coran ?',
      options: ['Ibrahim', 'Issa', 'Moussa', 'Muhammad ﷺ lors du Mi\'raj'],
      answer: 2,
      explanation: 'Moussa (Moïse, paix sur lui) est "Kalimullah" (celui à qui Allah a parlé directement). Le Coran dit : "Et Allah a parlé à Moussa de vive voix." (4:164). Cette distinction est unique : Allah lui parla directement au mont Sinaï. Cependant, lors du Mi\'raj (l\'Ascension nocturne), le Prophète Muhammad ﷺ fut aussi en présence directe d\'Allah selon certaines interprétations.'
    },
    {
      id: 113,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète fut doté de la capacité de comprendre et parler le langage des oiseaux et des animaux ?',
      options: ['Dawud (David)', 'Sulayman (Salomon)', 'Idris (Hénoch)', 'Ibrahim (Abraham)'],
      answer: 1,
      explanation: 'Sulayman (Salomon, paix sur lui) reçut d\'Allah la capacité de comprendre le langage des oiseaux et des animaux ("ullimna mantiqa t-tayr" - 27:16), ainsi que la maîtrise des vents, des djinns et des fourmis. Son histoire avec la reine de Saba (Bilqis) est célèbre et relatée dans la sourate An-Naml (Les Fourmis, 27).'
    },
    {
      id: 114,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Quel est le titre donné au prophète Ibrahim (Abraham) ?',
      options: ['Khalilullah (L\'ami intime d\'Allah)', 'Kalimullah (Celui à qui Allah a parlé)', 'Ruhullah (L\'Esprit d\'Allah)', 'Nabiyullah (Le Prophète d\'Allah)'],
      answer: 0,
      explanation: 'Ibrahim (Abraham, paix sur lui) est appelé "Khalilullah" — L\'ami intime d\'Allah. Allah dit dans le Coran : "Et Allah a pris Ibrahim pour ami (khalil)." (4:125). C\'est pour cette raison qu\'il est l\'ancêtre de nombreux prophètes et que sa descendance (Ismaïl et Ishaq) perpétua le message divin jusqu\'à Muhammad ﷺ.'
    },
    {
      id: 115,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète est né sans père selon le Coran ?',
      options: ['Yahya (Jean-Baptiste)', 'Moussa (Moïse)', 'Issa (Jésus)', 'Idris (Hénoch)'],
      answer: 2,
      explanation: 'Issa ibn Maryam (Jésus fils de Marie, paix sur lui) est né sans père par miracle divin. Sa mère Maryam (Marie) était vierge. Allah dit : "Son cas est, pour Allah, comme le cas d\'Adam : Il le créa de poussière, puis Il lui dit : Sois !, et il fut." (3:59). Dans l\'Islam, Issa est un prophète et messager d\'Allah mais n\'est pas Dieu ni fils de Dieu.'
    },
    {
      id: 116,
      category: 'prophetes',
      difficulty: 'difficile',
      question: 'Selon le Coran, quelle fut la durée de la prédication de Nouh (Noé) à son peuple ?',
      options: ['100 ans', '300 ans', '950 ans', '1200 ans'],
      answer: 2,
      explanation: 'Le Coran précise que Nouh (Noé, paix sur lui) prêcha son peuple pendant 950 ans : "Nous avons certes envoyé Nouh vers son peuple, et il demeura parmi eux mille ans moins cinquante." (29:14). Malgré cette longue prédication, seuls très peu crurent. Nouh est donc un exemple de patience et de persévérance dans la da\'wah.'
    },
    {
      id: 117,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète fut mis à l\'épreuve par Allah avec la perte de ses enfants, ses biens et sa santé, et demeura patient ?',
      options: ['Ibrahim (Abraham)', 'Ayub (Job)', 'Yahya (Jean-Baptiste)', 'Zakariya (Zacharie)'],
      answer: 1,
      explanation: 'Ayub (Job, paix sur lui) fut éprouvé par Allah avec la perte de ses biens, ses enfants et une grave maladie pendant de longues années. Sa patience et sa foi ne fléchirent jamais. Il invoqua Allah : "Seigneur, me voilà touché par l\'adversité, et Tu es le plus Miséricordieux des miséricordieux." (21:83). Allah le guérit, restaura ses biens et lui redonna une nombreuse descendance.'
    },
    {
      id: 118,
      category: 'prophetes',
      difficulty: 'facile',
      question: 'Dans quelle ville le Prophète Muhammad ﷺ est-il né ?',
      options: ['Médine', 'Ta\'if', 'Jérusalem', 'La Mecque'],
      answer: 3,
      explanation: 'Le Prophète Muhammad ﷺ est né à La Mecque, en Arabie, le 12 Rabi\' al-Awwal de l\'année de l\'Éléphant (vers 570 CE de l\'ère chrétienne). Il naquit dans la tribu des Quraysh, de la lignée noble des Banu Hashim. Son père Abdullah était décédé avant sa naissance, et sa mère Amina mourut alors qu\'il avait 6 ans.'
    },
    {
      id: 119,
      category: 'prophetes',
      difficulty: 'difficile',
      question: 'Quel est le lien de parenté entre les prophètes Ibrahim, Ismaïl et Ishaq ?',
      options: [
        'Ibrahim est le père d\'Ismaïl (par Hajar) et d\'Ishaq (par Sara)',
        'Ismaïl est le père d\'Ibrahim et d\'Ishaq',
        'Ishaq est le père d\'Ibrahim et d\'Ismaïl',
        'Ibrahim, Ismaïl et Ishaq sont frères'
      ],
      answer: 0,
      explanation: 'Ibrahim (Abraham, paix sur lui) est le père d\'Ismaïl (né de Hajar/Agar, l\'ancêtre des Arabes et du Prophète Muhammad ﷺ) et d\'Ishaq (né de Sara, l\'ancêtre des enfants d\'Israël et de nombreux prophètes dont Moussa et Issa). Cette généalogie sacrée est fondamentale pour comprendre les liens entre l\'Islam, le Christianisme et le Judaïsme.'
    },
    {
      id: 120,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète bâtit la Ka\'ba avec son fils Ismaïl ?',
      options: ['Adam', 'Nouh', 'Ibrahim', 'Sulayman'],
      answer: 2,
      explanation: 'Ibrahim et son fils Ismaïl (paix sur eux) élevèrent les fondations de la Ka\'ba à La Mecque sur ordre d\'Allah : "Et [rappelle-toi] quand Ibrahim et Ismaïl relevèrent les fondations de la Maison [en disant] : Seigneur ! Accepte cela de nous !" (2:127). La Ka\'ba est la première maison de culte monothéiste sur Terre, vers laquelle tous les musulmans se tournent pour prier.'
    },
    {
      id: 121,
      category: 'prophetes',
      difficulty: 'difficile',
      question: 'Quel prophète fut le premier à écrire et à apprendre l\'écriture selon les hadiths ?',
      options: ['Adam', 'Ibrahim', 'Idris (Hénoch)', 'Dawud (David)'],
      answer: 2,
      explanation: 'Selon plusieurs traditions islamiques, le prophète Idris (Hénoch, paix sur lui) fut le premier à écrire avec le calame (roseau). Allah dit à son sujet : "Et rappelle-toi dans le Livre Idris. C\'était certes un véridique, un prophète. Et Nous l\'avons élevé en un lieu sublime." (19:56-57). Il est identifié par certains savants à Hénoch de la Bible.'
    },
    {
      id: 122,
      category: 'prophetes',
      difficulty: 'moyen',
      question: 'Quel prophète est le "sceau des prophètes" (Khatam an-Nabiyyin) ?',
      options: ['Ibrahim', 'Issa (Jésus)', 'Muhammad ﷺ', 'Adam'],
      answer: 2,
      explanation: 'Muhammad ﷺ est le "Khatam an-Nabiyyin" (le Sceau des prophètes), c\'est-à-dire le dernier et le final de tous les prophètes. Allah dit : "Muhammad n\'a jamais été le père de l\'un de vos hommes, mais il est le Messager d\'Allah et le Sceau des prophètes." (33:40). Aucun prophète ne viendra après lui. Le message de l\'Islam est destiné à toute l\'humanité jusqu\'au Jour du Jugement.'
    },

    /* ============================
       PRATIQUES — Questions 123–150
    ============================ */
    {
      id: 123,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Combien de rak\'as (unités) contient la prière du Dhuhr (milieu du jour) ?',
      options: ['2 rak\'as', '3 rak\'as', '4 rak\'as', '5 rak\'as'],
      answer: 2,
      explanation: 'La prière du Dhuhr (milieu du jour) comprend 4 rak\'as obligatoires (fard), précédées de 4 rak\'as sunnah et suivies de 2 rak\'as sunnah. Total : 10 rak\'as avec les sunnah. C\'est la prière du milieu de la journée, accomplie après le passage du soleil par son zénith.'
    },
    {
      id: 124,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que le "Taharah" (purification) en Islam ?',
      options: [
        'Uniquement l\'ablution avant la prière',
        'L\'état de pureté rituelle englobant l\'ablution (wudu), le bain (ghusl) et la purification par le sable (tayammum)',
        'La purification du coeur uniquement',
        'Le lavage des vêtements avant la prière'
      ],
      answer: 1,
      explanation: 'La Taharah (pureté rituelle) est une condition indispensable pour de nombreux actes d\'adoration en Islam. Elle comprend : 1) Al-Wudu (ablution mineure), 2) Al-Ghusl (bain purificateur complet, obligatoire après la pollution nocturne, les rapports conjugaux, les règles, l\'accouchement), 3) At-Tayammum (purification symbolique avec la terre pure quand l\'eau est indisponible ou nuisible à la santé).'
    },
    {
      id: 125,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Vers quel lieu saint les musulmans se tournent-ils pour prier ?',
      options: ['Médine (Masjid an-Nabawi)', 'Jérusalem (Al-Aqsa)', 'La Mecque (Al-Ka\'ba)', 'Le mont Sinaï'],
      answer: 2,
      explanation: 'Les musulmans se tournent vers la Ka\'ba à La Mecque (Al-Masjid al-Haram) lors de la prière. C\'est ce qu\'on appelle la Qibla. Allah ordonna dans le Coran : "Tourne-toi vers la Mosquée Sacrée. Et où que vous vous trouviez, tournez vos visages vers elle." (2:144). La Ka\'ba est la Maison d\'Allah, premier lieu de culte établi pour l\'humanité.'
    },
    {
      id: 126,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que "Zakat al-Fitr" ?',
      options: [
        'La Zakat annuelle sur les biens',
        'L\'aumône obligatoire de fin de Ramadan, donnée avant la prière de l\'Aïd',
        'Un don volontaire lors du pèlerinage',
        'La Zakat sur les récoltes agricoles'
      ],
      answer: 1,
      explanation: 'La Zakat al-Fitr est une aumône obligatoire due par tout musulman capable à la fin du Ramadan. Elle équivaut à un Sa\' (environ 2,5 kg) de nourriture de base (dattes, blé, riz...) par personne. Elle doit être donnée avant la prière de l\'Aïd al-Fitr. Le Prophète ﷺ l\'a instituée pour purifier le jeûneur de ses imperfections et nourrir les pauvres lors de la fête.'
    },
    {
      id: 127,
      category: 'pratiques',
      difficulty: 'difficile',
      question: 'Qu\'est-ce que le "Nikah" en Islam ?',
      options: [
        'Le divorce islamique',
        'Le contrat de mariage islamique, fondé sur le consentement et la dot (mahr)',
        'La cérémonie de circoncision',
        'Le testament islamique'
      ],
      answer: 1,
      explanation: 'Le Nikah est le mariage islamique, un contrat légal et spirituel fondé sur : 1) Le consentement libre des deux parties, 2) La présence de deux témoins, 3) Le Wali (tuteur de la mariée), 4) La dot (Mahr) offerte par le mari à l\'épouse. Le mariage en Islam est une Sunnah fortement recommandée : "Le mariage est ma Sunnah, celui qui s\'en détourne n\'est pas de moi." (Ibn Majah).'
    },
    {
      id: 128,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Que signifie "Halal" ?',
      options: ['Interdit par la loi islamique', 'Ce qui est permis/licite selon la loi islamique', 'Obligatoire en Islam', 'Ce qui est recommandé mais non obligatoire'],
      answer: 1,
      explanation: '"Halal" (حلال) signifie "licite", "permis" en arabe. Tout ce qu\'Allah a autorisé est halal : la nourriture (sauf le porc, le sang, l\'alcool, les animaux non égorgés au nom d\'Allah...), les comportements, les transactions. Son opposé est "Haram" (interdit). Entre les deux, il y a le "Makruh" (déconseillé) et le "Mustahabb" (recommandé).'
    },
    {
      id: 129,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Quelle est la différence entre le Hajj et la Umra ?',
      options: [
        'Le Hajj et la Umra sont identiques',
        'Le Hajj est obligatoire une fois dans la vie pour qui en a les moyens ; la Umra est un petit pèlerinage recommandé',
        'La Umra est obligatoire et le Hajj est facultatif',
        'Le Hajj se fait en hiver et la Umra en été'
      ],
      answer: 1,
      explanation: 'Le Hajj est le grand pèlerinage à La Mecque, cinquième pilier de l\'Islam, obligatoire une fois dans la vie pour tout musulman mature, sain et qui en a les moyens. Il s\'effectue exclusivement au mois de Dhul Hijja (8-13). La Umra est le "petit pèlerinage", accompli à n\'importe quel moment de l\'année, fortement recommandé mais non obligatoire. Tous deux comprennent le Tawaf et la Sa\'y.'
    },
    {
      id: 130,
      category: 'pratiques',
      difficulty: 'difficile',
      question: 'Qu\'est-ce que le "Tahajjud" ?',
      options: [
        'La prière surérogatoire accomplie la nuit après le sommeil',
        'La prière du vendredi',
        'La prière de l\'Aïd',
        'La prière en voyage'
      ],
      answer: 0,
      explanation: 'Le Tahajjud est la prière volontaire accomplie pendant la nuit, après s\'être couché et réveillé (contrairement au Qiyam al-Layl qui peut être accompli sans s\'être couché). Allah dit : "Et réveille-toi pour prier durant une partie de la nuit : c\'est une dévotion surérogatoire pour toi." (17:79). C\'est la prière surérogatoire la plus méritoire selon les hadiths.'
    },
    {
      id: 131,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que le "Dhikr" (rappel d\'Allah) ?',
      options: [
        'Uniquement la récitation du Coran',
        'Le fait de se souvenir d\'Allah et de Le mentionner par diverses formules (SubhanAllah, Alhamdulillah, etc.)',
        'La prière communautaire du vendredi',
        'La méditation silencieuse sans paroles'
      ],
      answer: 1,
      explanation: 'Le Dhikr (zikr) désigne le rappel constant d\'Allah à travers des formules comme : SubhanAllah (Gloire à Allah), Alhamdulillah (Louange à Allah), Allahu Akbar (Allah est le Plus Grand), La ilaha illa Allah, etc. Allah dit : "Rappelez-vous d\'Allah par un rappel abondant." (33:41). Le Dhikr est la nourriture du cœur et sa tranquillité.'
    },
    {
      id: 132,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Qu\'est-ce que l\'Adhan (appel à la prière) ?',
      options: [
        'La prière du vendredi',
        'L\'appel public lancé pour annoncer l\'heure de la prière',
        'La prédication islamique',
        'La récitation du Coran à voix haute'
      ],
      answer: 1,
      explanation: 'L\'Adhan est l\'appel à la prière lancé par le Muadhdhin (Muezzin) pour annoncer que l\'heure de la prière est venue. Il commence par "Allahu Akbar" (Allah est le Plus Grand, 4 fois) et se termine par "La ilaha illa Allah". Le premier Muadhdhin de l\'Islam fut Bilal ibn Rabah (radiallahu anhu), un ancien esclave éthiopien libéré par Abu Bakr.'
    },
    {
      id: 133,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que la "Laylat al-Qadr" (la nuit du Destin) ?',
      options: [
        'La nuit de la naissance du Prophète ﷺ',
        'La nuit plus précieuse que mille mois, dans les 10 dernières nuits du Ramadan',
        'La première nuit du mois de Ramadan',
        'La nuit précédant l\'Aïd al-Fitr'
      ],
      answer: 1,
      explanation: 'Laylat al-Qadr est une nuit extraordinaire des dix dernières nuits du Ramadan (probablement une nuit impaire : 21, 23, 25, 27 ou 29). Allah dit : "La nuit du Destin est meilleure que mille mois." (97:3). Durant cette nuit, les anges descendent, la paix et la miséricorde d\'Allah enveloppent la Terre jusqu\'à l\'aube. Celui qui la passe en prière et en dévotion obtient une récompense immense.'
    },
    {
      id: 134,
      category: 'pratiques',
      difficulty: 'difficile',
      question: 'Qu\'est-ce que le "Kaffarah" (expiation) ?',
      options: [
        'La récompense pour les bonnes actions',
        'L\'expiation imposée par la loi islamique pour certaines violations (bris de serment, bris de jeûne par rapport intime, meurtre accidentel...)',
        'Le don optionnel en cas de maladie',
        'La prière de demande de pardon'
      ],
      answer: 1,
      explanation: 'La Kaffarah est une expiation prescrite par la loi islamique pour racheter certaines violations graves. Par exemple : 1) Bris de serment → nourrir 10 pauvres ou les vêtir, ou affranchir un esclave, ou jeûner 3 jours. 2) Rapport intime pendant le jeûne de Ramadan → affranchir un esclave, ou jeûner 60 jours consécutifs, ou nourrir 60 pauvres. Elle combine punition et purification spirituelle.'
    },
    {
      id: 135,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Que signifie "Istighfar" ?',
      options: ['La demande de pardon à Allah', 'La prière du soir', 'L\'aumône volontaire', 'Le jeûne volontaire'],
      answer: 0,
      explanation: '"Istighfar" vient du verbe "ghafara" (pardonner). C\'est l\'acte de demander le pardon d\'Allah, notamment par la formule "Astaghfirullah" (Je demande le pardon d\'Allah). Le Prophète ﷺ dit : "Par Allah, je demande le pardon d\'Allah et je me repens à Lui plus de 70 fois par jour." (Bukhari). L\'Istighfar attire la miséricorde d\'Allah et ouvre les portes des bénédictions.'
    },
    {
      id: 136,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que "Sadaqah Jariyah" (aumône continue) ?',
      options: [
        'La Zakat annuelle obligatoire',
        'Une aumône dont les bienfaits continuent après la mort du donateur',
        'L\'aumône donnée uniquement en Ramadan',
        'Une aumône secrète donnée sans témoins'
      ],
      answer: 1,
      explanation: 'La Sadaqah Jariyah est une aumône dont les effets et récompenses se poursuivent après la mort du donateur. Le Prophète ﷺ a dit : "Quand l\'homme meurt, ses actes s\'arrêtent sauf trois : une sadaqah jariyah, un savoir dont on bénéficie, ou un enfant pieux qui prie pour lui." (Muslim). Exemples : construire une mosquée, creuser un puits, planter un arbre, enseigner le Coran, écrire un livre utile.'
    },
    {
      id: 137,
      category: 'pratiques',
      difficulty: 'difficile',
      question: 'Que signifie "Ijtihad" dans la jurisprudence islamique ?',
      options: [
        'Le consensus des savants',
        'L\'effort intellectuel du juriste pour déduire des jugements à partir des sources islamiques',
        'L\'analogie juridique',
        'La coutume locale'
      ],
      answer: 1,
      explanation: '"Ijtihad" (de la racine "jahada" = faire effort) désigne l\'effort intellectuel maximal d\'un juriste qualifié pour déduire des jugements islamiques à partir du Coran, de la Sunnah, du Ijma\' (consensus) et du Qiyas (analogie) pour des situations nouvelles. Les quatres grandes sources du Fiqh (jurisprudence) sont : le Coran, la Sunnah, l\'Ijma\' (consensus) et le Qiyas (analogie).'
    },
    {
      id: 138,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que le "Miswak" (Siwak) ?',
      options: [
        'Un instrument de musique',
        'Un bâtonnet naturel utilisé pour nettoyer les dents, fortement recommandé par le Prophète ﷺ',
        'Un livre de prières',
        'Une huile parfumée utilisée lors des fêtes islamiques'
      ],
      answer: 1,
      explanation: 'Le Miswak (ou Siwak) est un bâtonnet fait généralement de la racine ou branche de l\'arbre Arak (Salvadora persica), utilisé pour nettoyer les dents. Le Prophète ﷺ l\'utilisait régulièrement et a dit : "Le miswak purifie la bouche et satisfait le Seigneur." Il est recommandé notamment avant la prière, après le lever, après les repas et au moment de l\'ablution.'
    },
    {
      id: 139,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Qu\'est-ce que la "Sujud" (prosternation) dans la prière islamique ?',
      options: [
        'La position debout au début de la prière',
        'La position assise pour réciter les formules finales',
        'La prosternation où le front, le nez, les deux mains, les deux genoux et les orteils touchent le sol',
        'L\'inclinaison du buste (Ruku\')'
      ],
      answer: 2,
      explanation: 'La Sujud (prosternation) est la position de la prière où 7 membres touchent le sol : le front (et le nez), les deux mains, les deux genoux et les extrémités des deux pieds. C\'est le moment de la plus grande proximité du serviteur avec son Seigneur. Le Prophète ﷺ a dit : "Le serviteur est le plus proche de son Seigneur lorsqu\'il est en prosternation." (Muslim).'
    },
    {
      id: 140,
      category: 'pratiques',
      difficulty: 'difficile',
      question: 'Qu\'est-ce que "Al-Aqiqah" en Islam ?',
      options: [
        'La prière funéraire',
        'Le sacrifice animal effectué pour la naissance d\'un enfant (2 moutons pour un garçon, 1 pour une fille)',
        'Le mariage islamique simplifié',
        'L\'aumône de fin de Ramadan'
      ],
      answer: 1,
      explanation: 'L\'Aqiqah est le sacrifice animal effectué pour célébrer et remercier Allah pour la naissance d\'un enfant, de préférence le 7e jour après la naissance. Pour un garçon : 2 moutons ; pour une fille : 1 mouton. Ce jour-là, on donne aussi un prénom à l\'enfant et on lui rase la tête (dont le poids équivaut en argent est donné en aumône). C\'est une Sunnah confirmée du Prophète ﷺ.'
    },
    {
      id: 141,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que "Tawakkul" ?',
      options: [
        'La peur d\'Allah',
        'La confiance totale en Allah après avoir pris les moyens nécessaires',
        'La prière nocturne',
        'L\'obéissance aux parents'
      ],
      answer: 1,
      explanation: 'Le Tawakkul est la confiance et la dépendance totale envers Allah, APRÈS avoir pris toutes les mesures nécessaires et raisonnables. Ce n\'est pas la passivité. Le Prophète ﷺ dit à l\'homme qui laissait son chameau sans l\'attacher en disant "Je me confie à Allah" : "Attache-le d\'abord, puis confie-toi à Allah." (Tirmidhi). Tawakkul = action humaine + confiance divine.'
    },
    {
      id: 142,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Qu\'est-ce que la "Salawat" (ou Duroud) sur le Prophète ﷺ ?',
      options: [
        'La première sourate du Coran',
        'La formule d\'invocation de bénédictions sur le Prophète ﷺ : "Allahumma salli ala Muhammad"',
        'La prière collective du vendredi',
        'Le salut islamique "Assalamu Alaykum"'
      ],
      answer: 1,
      explanation: 'La Salawat (ou Salat sur le Prophète ﷺ) est l\'invocation de bénédictions divines sur le Prophète Muhammad ﷺ. Allah ordonne dans le Coran : "Allah et Ses anges bénissent le Prophète. Ô vous qui croyez ! Priez sur lui et adressez-lui vos salutations." (33:56). La formule standard est : "Allahumma salli ala Muhammad wa ala ali Muhammad" (Prière d\'Ibrahim). C\'est recommandé en tout temps, obligatoire dans la prière.'
    },
    {
      id: 143,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que le "Istikhara" ?',
      options: [
        'La prière funéraire',
        'La prière de consultation divine pour choisir entre deux options',
        'La prière de repentir',
        'La prière de demande de pluie'
      ],
      answer: 1,
      explanation: 'La prière Istikhara est une prière surérogatoire de 2 rak\'as accompagnée d\'une supplication spécifique, dans laquelle on demande à Allah de faciliter ce qui est bon pour soi dans une affaire importante. Jabir ibn Abdallah rapporte : "Le Prophète ﷺ nous enseignait l\'Istikhara pour toutes nos affaires comme il nous enseignait une sourate du Coran." (Bukhari).'
    },
    {
      id: 144,
      category: 'pratiques',
      difficulty: 'difficile',
      question: 'Quelles sont les conditions de validité de la prière (Shurut as-Salat) ?',
      options: [
        'Uniquement la pureté rituelle et la Qibla',
        'La pureté du corps, des vêtements et du lieu, la Qibla, l\'heure prescrite, la couverture de la nudité (\'awra) et l\'intention',
        'Seulement l\'intention et l\'heure',
        'Être debout et connaître Al-Fatiha par cœur'
      ],
      answer: 1,
      explanation: 'Les conditions de validité (shurut) de la prière sont : 1) La pureté rituelle (wudu ou ghusl selon le cas), 2) La propreté du corps, des vêtements et du lieu de prière, 3) Couvrir la \'awra (nudité), 4) Faire face à la Qibla, 5) Respecter le temps prescrit de la prière, 6) L\'intention (niyya). Sans l\'une de ces conditions, la prière est invalide.'
    },
    {
      id: 145,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Qu\'est-ce que "Bismillah" signifie et quand le dit-on ?',
      options: [
        '"Que la paix soit sur toi" — dit en guise de salutation',
        '"Au nom d\'Allah" — dit avant de commencer une action licite',
        '"Gloire à Allah" — dit en cas d\'émerveillement',
        '"Allah est le Plus Grand" — dit au début de la prière'
      ],
      answer: 1,
      explanation: '"Bismillah" signifie "Au nom d\'Allah" (abrégé de Bismillahi r-rahmani r-rahim). On le dit avant de manger, de boire, d\'entrer dans une maison, de commencer un travail, avant la récitation du Coran, et avant toute action licite. Le Prophète ﷺ a dit : "Toute action importante qui ne commence pas par Bismillah est coupée [de bénédiction]." (Ahmad).'
    },
    {
      id: 146,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que le "Eid" (ou Aïd) en Islam ?',
      options: [
        'Un jour de deuil commémorant la mort du Prophète ﷺ',
        'L\'une des deux fêtes islamiques majeures : Aïd al-Fitr (fin du Ramadan) et Aïd al-Adha (fête du sacrifice)',
        'Une fête culturelle arabe sans dimension religieuse',
        'La célébration de la naissance du Prophète ﷺ'
      ],
      answer: 1,
      explanation: 'L\'Islam connaît deux grandes fêtes : 1) Aïd al-Fitr (fête de la rupture du jeûne) — célébrée le 1er Chawwal après le Ramadan, accompagnée de la Zakat al-Fitr et de la prière de l\'Aïd. 2) Aïd al-Adha (fête du sacrifice) — célébrée le 10 Dhul Hijja, commémorant le sacrifice d\'Ibrahim et accompagnée du sacrifice animal (Udhiya). Les deux Aïd sont des occasions de joie, d\'adoration et de partage.'
    },
    {
      id: 147,
      category: 'pratiques',
      difficulty: 'difficile',
      question: 'Qu\'est-ce que le "Qiyas" dans la jurisprudence islamique ?',
      options: [
        'Le consensus de tous les savants musulmans',
        'Le raisonnement par analogie pour étendre un jugement existant à un cas nouveau similaire',
        'La coutume locale acceptée par les savants',
        'L\'interprétation littérale du Coran uniquement'
      ],
      answer: 1,
      explanation: 'Le Qiyas (analogie juridique) est la quatrième source de la jurisprudence islamique (après le Coran, la Sunnah et l\'Ijma\'). Il consiste à appliquer un jugement existant à une situation nouvelle qui partage la même cause effective (\'illa). Exemple : le Coran interdit le vin pour son caractère enivrant ; par Qiyas, tout alcool enivrant est interdit. C\'est une méthode rigoureuse qui évite l\'arbitraire tout en s\'adaptant aux nouvelles réalités.'
    },
    {
      id: 148,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Quand est-il obligatoire d\'effectuer le grand bain (Ghusl) ?',
      options: [
        'Uniquement après les rapports conjugaux',
        'Après la pollution nocturne, les rapports conjugaux, les règles, les lochies (suite de l\'accouchement) et avant la prière du vendredi (selon certains : obligatoire)',
        'Chaque vendredi sans exception',
        'Avant chaque prière obligatoire'
      ],
      answer: 1,
      explanation: 'Le Ghusl (bain purificateur complet) est obligatoire dans 5 cas : 1) Rapport sexuel (même sans éjaculation), 2) Éjaculation (avec plaisir), 3) Fin des règles (hayd), 4) Fin des lochies (nifas, suite d\'accouchement), 5) Mort d\'un musulman (ghusl du défunt). Le Ghusl du vendredi est considéré Sunnah mu\'akkada (fortement recommandé) par la majorité, obligatoire selon Ibn Hazm.'
    },
    {
      id: 149,
      category: 'pratiques',
      difficulty: 'facile',
      question: 'Qu\'est-ce que "SubhanAllah" signifie ?',
      options: [
        '"Allah est le Plus Grand"',
        '"Louange à Allah"',
        '"Gloire à Allah" / "Allah est exempt de toute imperfection"',
        '"Il n\'y a de divinité qu\'Allah"'
      ],
      answer: 2,
      explanation: '"SubhanAllah" (سبحان الله) signifie "Gloire à Allah" ou "Allah est exempt de toute imperfection". C\'est la formule du "Tasbih". Le Prophète ﷺ a dit : "Deux paroles légères sur la langue, lourdes dans la balance, aimées du Tout-Miséricordieux : SubhanAllah wa bihamdihi, SubhanAllah al-Azim." (Bukhari). Les "quatre les meilleures paroles" après le Coran sont : SubhanAllah, Alhamdulillah, La ilaha illa Allah, et Allahu Akbar.'
    },
    {
      id: 150,
      category: 'pratiques',
      difficulty: 'moyen',
      question: 'Qu\'est-ce que la "Khutba" du vendredi ?',
      options: [
        'La récitation du Coran pendant la prière du vendredi',
        'Le prêche/sermon prononcé par l\'imam avant la prière de Jumu\'a (vendredi), en deux parties',
        'La prière collective du vendredi elle-même',
        'L\'appel à la prière (Adhan) du vendredi'
      ],
      answer: 1,
      explanation: 'La Khutba (sermon) du vendredi est prononcée par l\'imam en deux parties séparées par une courte pause assise, avant la prière de Jumu\'a (2 rak\'as). Elle commence par des louanges à Allah et des bénédictions sur le Prophète ﷺ, et comprend des conseils, rappels coraniques et hadiths. Il est obligatoire de l\'écouter en silence. Elle remplace les deux premières rak\'as de la prière du Dhuhr.'
    }

  ]
};
