/* ============================================================
   AL-HUDA — Catalogue de la Bibliothèque Islamique
   Pour ajouter un livre : ouvre le fichier dans Google Drive,
   copie l'ID dans l'URL (entre /d/ et /view), colle-le dans driveId.
   ============================================================ */

window.LIBRARY = {

  categories: [

    {
      id: 'aqidah',
      label: 'Aqidah',
      arabic: 'العقيدة',
      desc: 'Fondements de la foi islamique',
      icon: '☝️',
      books: [
        { title: 'Aqidah — Les fondements de la foi', driveId: null },
        { title: "L'Innovation en Islam (Bid'ah)", driveId: null },
        { title: 'Le Diable (Shaytan) et ses ruses', driveId: null },
        { title: 'Djins & Sorcellerie', driveId: null },
      ]
    },

    {
      id: 'eschatologie',
      label: 'Eschatologie',
      arabic: 'الآخرة',
      desc: 'La vie après la mort et les signes de la fin des temps',
      icon: '🌙',
      books: [
        { title: 'Le Dajjal — Le Faux Messie', driveId: null },
        { title: 'Les Jours Derniers', driveId: null },
        { title: 'Le Paradis', driveId: null },
        { title: "L'Enfer", driveId: null },
        { title: 'Le Châtiment de la Tombe', driveId: null },
      ]
    },

    {
      id: 'fiqh',
      label: 'Fiqh',
      arabic: 'الفقه',
      desc: 'Jurisprudence islamique et pratiques cultuelles',
      icon: '📖',
      books: [
        { title: 'La Prière (Salat)', driveId: null },
        { title: 'Le Jeûne (Siyam)', driveId: null },
        { title: "L'Aumône (Zakat & Sadaqa)", driveId: null },
        { title: 'Le Pèlerinage (Hajj & Umra)', driveId: null },
        { title: 'Le Coran', driveId: null },
      ]
    },

    {
      id: 'comportement',
      label: 'Comportement',
      arabic: 'الأخلاق',
      desc: 'Éthique, morale et purification de l\'âme',
      icon: '🌿',
      books: [
        { title: 'Le Bon Comportement', driveId: null },
        { title: 'Les Péchés Majeurs', driveId: null },
        { title: 'Les Passions et leurs dangers', driveId: null },
        { title: 'La Musique en Islam', driveId: null },
        { title: 'La Fornication (Zina)', driveId: null },
        { title: 'Prendre Soin de Soi', driveId: null },
      ]
    },

    {
      id: 'famille',
      label: 'Famille',
      arabic: 'الأسرة',
      desc: 'Mariage, rôles et relations familiales',
      icon: '🏡',
      books: [
        { title: 'Le Mariage en Islam', driveId: null },
        { title: 'La Femme en Islam', driveId: null },
        { title: "L'Homme en Islam", driveId: null },
        { title: 'Les Devoirs envers les Parents', driveId: null },
      ]
    },

    {
      id: 'spiritualite',
      label: 'Spiritualité',
      arabic: 'التزكية',
      desc: 'Invocations, dhikr et renforcement de la foi',
      icon: '🤲',
      books: [
        { title: "L'Invocation (Dua')", driveId: null },
        { title: 'Le Dhikr — Rappel d\'Allah', driveId: null },
        { title: "L'Épreuve et la Patience", driveId: null },
        { title: 'Le Dîne — La Religion', driveId: null },
        { title: 'Communauté Islamique (Clan Islam)', driveId: null },
        { title: 'La Hijra', driveId: null },
      ]
    },

  ]

};
