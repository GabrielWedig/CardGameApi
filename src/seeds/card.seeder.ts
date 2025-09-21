import { Card } from 'src/card/card.entity';
import { Game } from 'src/game/game.entity';
import { DataSource, In } from 'typeorm';

export class CardSeeder {
  static async run(dataSource: DataSource) {
    const repo = dataSource.getRepository(Card);
    const gameRepo = dataSource.getRepository(Game);

    const urlPrefix =
      'https://www.geoguessr.com/images/resize:fit:0:256/gravity:ce/plain/seterra/game-area';

    const games = await gameRepo.find({
      where: {
        name: In([
          'América do Sul',
          'América Central',
          'América do Norte',
          'Europa',
          'Asia',
          'Africa',
          'Oceania',
          'Outros',
        ]),
      },
    });

    const southAmerica = games.find((g) => g.name === 'América do Sul');
    const centralAmerica = games.find((g) => g.name === 'América Central');
    const northAmerica = games.find((g) => g.name === 'América do Norte');
    const europe = games.find((g) => g.name === 'Europa');
    const asia = games.find((g) => g.name === 'Asia');
    const africa = games.find((g) => g.name === 'Africa');
    const oceania = games.find((g) => g.name === 'Oceania');
    const other = games.find((g) => g.name === 'Outros');

    const getImageUrl = (name: string) => `${urlPrefix}/${name}.png`;

    const cards = [
      {
        answer: 'Brasil',
        image_path: getImageUrl('brazil'),
        game: southAmerica,
      },
      {
        answer: 'Argentina',
        image_path: getImageUrl('argentina'),
        game: southAmerica,
      },
      { answer: 'Chile', image_path: getImageUrl('chile'), game: southAmerica },
      { answer: 'Peru', image_path: getImageUrl('peru'), game: southAmerica },
      {
        answer: 'Uruguai',
        image_path: getImageUrl('uruguay'),
        game: southAmerica,
      },
      {
        answer: 'Paraguai',
        image_path: getImageUrl('paraguay'),
        game: southAmerica,
      },
      {
        answer: 'Bolívia',
        image_path: getImageUrl('bolivia'),
        game: southAmerica,
      },
      {
        answer: 'Colômbia',
        image_path: getImageUrl('colombia'),
        game: southAmerica,
      },
      {
        answer: 'Venezuela',
        image_path: getImageUrl('venezuela'),
        game: southAmerica,
      },
      {
        answer: 'Equador',
        image_path: getImageUrl('ecuador'),
        game: southAmerica,
      },
      {
        answer: 'Guiana',
        image_path: getImageUrl('guyana'),
        game: southAmerica,
      },
      {
        answer: 'Suriname',
        image_path: getImageUrl('suriname'),
        game: southAmerica,
      },
      {
        answer: 'Guiana Francesa',
        image_path: getImageUrl('french-guiana'),
        game: southAmerica,
      },
      {
        answer: 'México',
        image_path: getImageUrl('mexico'),
        game: northAmerica,
      },
      {
        answer: 'Estados Unidos',
        image_path: getImageUrl('united-states'),
        game: northAmerica,
      },
      {
        answer: 'Canadá',
        image_path: getImageUrl('canada'),
        game: northAmerica,
      },
      {
        answer: 'Costa Rica',
        image_path: getImageUrl('costa-rica'),
        game: centralAmerica,
      },
      {
        answer: 'Panamá',
        image_path: getImageUrl('panama'),
        game: centralAmerica,
      },
      {
        answer: 'Nicarágua',
        image_path: getImageUrl('nicaragua'),
        game: centralAmerica,
      },
      {
        answer: 'Honduras',
        image_path: getImageUrl('honduras'),
        game: centralAmerica,
      },
      {
        answer: 'El Salvador',
        image_path: getImageUrl('el-salvador'),
        game: centralAmerica,
      },
      {
        answer: 'Guatemala',
        image_path: getImageUrl('guatemala'),
        game: centralAmerica,
      },
      {
        answer: 'Belize',
        image_path: getImageUrl('belize'),
        game: centralAmerica,
      },
      { answer: 'Alemanha', image_path: getImageUrl('germany'), game: europe },
      { answer: 'França', image_path: getImageUrl('france'), game: europe },
      { answer: 'Itália', image_path: getImageUrl('italy'), game: europe },
      { answer: 'Espanha', image_path: getImageUrl('spain'), game: europe },
      { answer: 'Portugal', image_path: getImageUrl('portugal'), game: europe },
      {
        answer: 'Inglaterra',
        image_path: getImageUrl('england'),
        game: europe,
      },
      { answer: 'Escócia', image_path: getImageUrl('scotland'), game: europe },
      {
        answer: 'País de Gales',
        image_path: getImageUrl('wales'),
        game: europe,
      },
      { answer: 'Irlanda', image_path: getImageUrl('ireland'), game: europe },
      { answer: 'Bélgica', image_path: getImageUrl('belgium'), game: europe },
      {
        answer: 'Holanda',
        image_path: getImageUrl('netherlands'),
        game: europe,
      },
      { answer: 'Suíça', image_path: getImageUrl('switzerland'), game: europe },
      { answer: 'Áustria', image_path: getImageUrl('austria'), game: europe },
      { answer: 'Dinamarca', image_path: getImageUrl('denmark'), game: europe },
      { answer: 'Polônia', image_path: getImageUrl('poland'), game: europe },
      {
        answer: 'República Tcheca',
        image_path: getImageUrl('czech-republic'),
        game: europe,
      },
      {
        answer: 'Eslováquia',
        image_path: getImageUrl('slovakia'),
        game: europe,
      },
      {
        answer: 'Eslovênia',
        image_path: getImageUrl('slovenia'),
        game: europe,
      },
      { answer: 'Croácia', image_path: getImageUrl('croatia'), game: europe },
      {
        answer: 'Bósnia e Herzegovina',
        image_path: getImageUrl('bosnia-and-herzegovina'),
        game: europe,
      },
      { answer: 'Sérvia', image_path: getImageUrl('serbia'), game: europe },
      {
        answer: 'Montenegro',
        image_path: getImageUrl('montenegro'),
        game: europe,
      },
      { answer: 'Albânia', image_path: getImageUrl('albania'), game: europe },
      {
        answer: 'Macedônia do Norte',
        image_path: getImageUrl('north-macedonia'),
        game: europe,
      },
      { answer: 'Grécia', image_path: getImageUrl('greece'), game: europe },
      { answer: 'Romênia', image_path: getImageUrl('romania'), game: europe },
      { answer: 'Ucrânia', image_path: getImageUrl('ukraine'), game: europe },
      {
        answer: 'Bielorrússia',
        image_path: getImageUrl('belarus'),
        game: europe,
      },
      {
        answer: 'Lituânia',
        image_path: getImageUrl('lithuania'),
        game: europe,
      },
      { answer: 'Letônia', image_path: getImageUrl('latvia'), game: europe },
      { answer: 'Estônia', image_path: getImageUrl('estonia'), game: europe },
      { answer: 'Islândia', image_path: getImageUrl('iceland'), game: europe },
      {
        answer: 'Luxemburgo',
        image_path: getImageUrl('luxembourg'),
        game: europe,
      },
      {
        answer: 'Liechtenstein',
        image_path: getImageUrl('liechtenstein'),
        game: europe,
      },
      { answer: 'Mônaco', image_path: getImageUrl('monaco'), game: europe },
      {
        answer: 'San Marino',
        image_path: getImageUrl('san-marino'),
        game: europe,
      },
      {
        answer: 'Cidade do Vaticano',
        image_path: getImageUrl('vatican-city'),
        game: europe,
      },
      { answer: 'Andorra', image_path: getImageUrl('andorra'), game: europe },
      {
        answer: 'África do Sul',
        image_path: getImageUrl('south-africa'),
        game: africa,
      },
      { answer: 'Egito', image_path: getImageUrl('egypt'), game: africa },
      { answer: 'Nigéria', image_path: getImageUrl('nigeria'), game: africa },
      { answer: 'Marrocos', image_path: getImageUrl('morocco'), game: africa },
      { answer: 'Argélia', image_path: getImageUrl('algeria'), game: africa },
      { answer: 'Quênia', image_path: getImageUrl('kenya'), game: africa },
      { answer: 'Tanzânia', image_path: getImageUrl('tanzania'), game: africa },
      { answer: 'Etiópia', image_path: getImageUrl('ethiopia'), game: africa },
      { answer: 'Uganda', image_path: getImageUrl('uganda'), game: africa },
      { answer: 'Gana', image_path: getImageUrl('ghana'), game: africa },
      { answer: 'Senegal', image_path: getImageUrl('senegal'), game: africa },
      {
        answer: 'Costa do Marfim',
        image_path: getImageUrl('ivory-coast'),
        game: africa,
      },
      { answer: 'Camarões', image_path: getImageUrl('cameroon'), game: africa },
      {
        answer: 'República Democrática do Congo',
        image_path: getImageUrl('democratic-republic-of-the-congo'),
        game: africa,
      },
      {
        answer: 'República do Congo',
        image_path: getImageUrl('republic-of-the-congo'),
        game: africa,
      },
      {
        answer: 'Moçambique',
        image_path: getImageUrl('mozambique'),
        game: africa,
      },
      { answer: 'Zâmbia', image_path: getImageUrl('zambia'), game: africa },
      { answer: 'Zimbabwe', image_path: getImageUrl('zimbabwe'), game: africa },
      { answer: 'Namíbia', image_path: getImageUrl('namibia'), game: africa },
      { answer: 'Botswana', image_path: getImageUrl('botswana'), game: africa },
      { answer: 'Malawi', image_path: getImageUrl('malawi'), game: africa },
      { answer: 'Ruanda', image_path: getImageUrl('rwanda'), game: africa },
      { answer: 'Burundi', image_path: getImageUrl('burundi'), game: africa },
      { answer: 'Sudão', image_path: getImageUrl('sudan'), game: africa },
      {
        answer: 'Sudão do Sul',
        image_path: getImageUrl('south-sudan'),
        game: africa,
      },
      { answer: 'Somália', image_path: getImageUrl('somalia'), game: africa },
      { answer: 'Líbia', image_path: getImageUrl('libya'), game: africa },
      { answer: 'Mali', image_path: getImageUrl('mali'), game: africa },
      { answer: 'Níger', image_path: getImageUrl('niger'), game: africa },
      { answer: 'Chade', image_path: getImageUrl('chad'), game: africa },
      { answer: 'China', image_path: getImageUrl('china'), game: asia },
      { answer: 'Japão', image_path: getImageUrl('japan'), game: asia },
      { answer: 'Índia', image_path: getImageUrl('india'), game: asia },
      { answer: 'Paquistão', image_path: getImageUrl('pakistan'), game: asia },
      {
        answer: 'Afeganistão',
        image_path: getImageUrl('afghanistan'),
        game: asia,
      },
      {
        answer: 'Bangladesh',
        image_path: getImageUrl('bangladesh'),
        game: asia,
      },
      { answer: 'Irã', image_path: getImageUrl('iran'), game: asia },
      { answer: 'Iraque', image_path: getImageUrl('iraq'), game: asia },
      { answer: 'Israel', image_path: getImageUrl('israel'), game: asia },
      {
        answer: 'Arábia Saudita',
        image_path: getImageUrl('saudi-arabia'),
        game: asia,
      },
      {
        answer: 'Coreia do Sul',
        image_path: getImageUrl('south-korea'),
        game: asia,
      },
      {
        answer: 'Coreia do Norte',
        image_path: getImageUrl('north-korea'),
        game: asia,
      },
      { answer: 'Indonésia', image_path: getImageUrl('indonesia'), game: asia },
      { answer: 'Malásia', image_path: getImageUrl('malaysia'), game: asia },
      {
        answer: 'Filipinas',
        image_path: getImageUrl('philippines'),
        game: asia,
      },
      { answer: 'Tailândia', image_path: getImageUrl('thailand'), game: asia },
      { answer: 'Turquia', image_path: getImageUrl('turkey'), game: asia },
      {
        answer: 'Uzbequistão',
        image_path: getImageUrl('uzbekistan'),
        game: asia,
      },
      {
        answer: 'Cazaquistão',
        image_path: getImageUrl('kazakhstan'),
        game: asia,
      },
      {
        answer: 'Austrália',
        image_path: getImageUrl('australia'),
        game: oceania,
      },
      {
        answer: 'Nova Zelândia',
        image_path: getImageUrl('new-zealand'),
        game: oceania,
      },
      { answer: 'Fiji', image_path: getImageUrl('fiji'), game: oceania },
      { answer: 'Samoa', image_path: getImageUrl('samoa'), game: oceania },
      { answer: 'Tonga', image_path: getImageUrl('tonga'), game: oceania },
      {
        answer: 'Ilhas Marshall',
        image_path: getImageUrl('marshall-islands'),
        game: oceania,
      },
      {
        answer: 'Kiribati',
        image_path: getImageUrl('kiribati'),
        game: oceania,
      },
      { answer: 'Vanuatu', image_path: getImageUrl('vanuatu'), game: oceania },
      { answer: 'Palau', image_path: getImageUrl('palau'), game: oceania },
      { answer: 'Abkhazia', image_path: getImageUrl('abkhazia'), game: other },
      {
        answer: 'Afeganistão (-2021)',
        image_path: getImageUrl('afghanistan-2021'),
        game: other,
      },
      {
        answer: 'Afeganistão (Taliban)',
        image_path: getImageUrl('afghanistan-taliban'),
        game: other,
      },
      {
        answer: 'American Samoa',
        image_path: getImageUrl('american-samoa'),
        game: other,
      },
      { answer: 'Anguilla', image_path: getImageUrl('anguilla'), game: other },
      {
        answer: 'Antigua e Barbuda',
        image_path: getImageUrl('antigua-and-barbuda'),
        game: other,
      },
      { answer: 'Armenia', image_path: getImageUrl('armenia'), game: other },
      {
        answer: 'Artsakh (Nagorno-Karabakh)',
        image_path: getImageUrl('artsakh'),
        game: other,
      },
      { answer: 'Aruba', image_path: getImageUrl('aruba'), game: other },
      {
        answer: 'Ascension Island',
        image_path: getImageUrl('ascension-island'),
        game: other,
      },
      {
        answer: 'Azerbaijão',
        image_path: getImageUrl('azerbaijan'),
        game: other,
      },
      {
        answer: 'Bahamas',
        image_path: getImageUrl('the-bahamas'),
        game: other,
      },
      { answer: 'Bahrain', image_path: getImageUrl('bahrain'), game: other },
      { answer: 'Barbados', image_path: getImageUrl('barbados'), game: other },
      {
        answer: 'Barotseland',
        image_path: getImageUrl('barotseland'),
        game: other,
      },
      {
        answer: 'Basque Country',
        image_path: getImageUrl('basque-country'),
        game: other,
      },
      { answer: 'Bermuda', image_path: getImageUrl('bermuda'), game: other },
      { answer: 'Bhutan', image_path: getImageUrl('bhutan'), game: other },
      { answer: 'Bonaire', image_path: getImageUrl('bonaire'), game: other },
      {
        answer: 'Bougainville',
        image_path: getImageUrl('bougainville'),
        game: other,
      },
      {
        answer: 'British Antarctic Territory',
        image_path: getImageUrl('british-antarctic-territory'),
        game: other,
      },
      {
        answer: 'British Indian Ocean Territory',
        image_path: getImageUrl('british-indian-ocean-territory'),
        game: other,
      },
      {
        answer: 'British Virgin Islands',
        image_path: getImageUrl('british-virgin-islands'),
        game: other,
      },
      { answer: 'Brunei', image_path: getImageUrl('brunei'), game: other },
      { answer: 'Cambodia', image_path: getImageUrl('cambodia'), game: other },
      {
        answer: 'Cape Verde',
        image_path: getImageUrl('cape-verde'),
        game: other,
      },
      {
        answer: 'Catalonia',
        image_path: getImageUrl('catalonia'),
        game: other,
      },
      {
        answer: 'Cayman Islands',
        image_path: getImageUrl('cayman-islands'),
        game: other,
      },
      { answer: 'Chechnya', image_path: getImageUrl('chechnya'), game: other },
      {
        answer: 'Christmas Island',
        image_path: getImageUrl('christmas-island'),
        game: other,
      },
      {
        answer: 'Cocos Islands',
        image_path: getImageUrl('cocos-islands'),
        game: other,
      },
      { answer: 'Comoros', image_path: getImageUrl('comoros'), game: other },
      {
        answer: 'Cook Islands',
        image_path: getImageUrl('cook-islands'),
        game: other,
      },
      { answer: 'Crimea', image_path: getImageUrl('crimea'), game: other },
      { answer: 'Cuba', image_path: getImageUrl('cuba'), game: other },
      { answer: 'Curaçao', image_path: getImageUrl('curacao'), game: other },
      { answer: 'Cyprus', image_path: getImageUrl('cyprus'), game: other },
      { answer: 'Darfur', image_path: getImageUrl('darfur'), game: other },
      { answer: 'Djibouti', image_path: getImageUrl('djibouti'), game: other },
      { answer: 'Dominica', image_path: getImageUrl('dominica'), game: other },
      {
        answer: 'Dominican Republic',
        image_path: getImageUrl('dominican-republic'),
        game: other,
      },
      {
        answer: 'East Timor',
        image_path: getImageUrl('east-timor'),
        game: other,
      },
      {
        answer: 'Equatorial Guinea',
        image_path: getImageUrl('equatorial-guinea'),
        game: other,
      },
      { answer: 'Eritrea', image_path: getImageUrl('eritrea'), game: other },
      { answer: 'Eswatini', image_path: getImageUrl('eswatini'), game: other },
      {
        answer: 'Falkland Islands',
        image_path: getImageUrl('falkland-islands'),
        game: other,
      },
      {
        answer: 'Faroe Islands',
        image_path: getImageUrl('faroe-islands'),
        game: other,
      },
      {
        answer: 'French Guiana',
        image_path: getImageUrl('french-guiana'),
        game: other,
      },
      {
        answer: 'French Polynesia',
        image_path: getImageUrl('french-polynesia'),
        game: other,
      },
      {
        answer: 'French Southern and Antarctic Lands',
        image_path: getImageUrl('french-southern-and-antarctic-lands'),
        game: other,
      },
      {
        answer: 'Gibraltar',
        image_path: getImageUrl('gibraltar'),
        game: other,
      },
      {
        answer: 'Greenland',
        image_path: getImageUrl('greenland'),
        game: other,
      },
      { answer: 'Grenada', image_path: getImageUrl('grenada'), game: other },
      {
        answer: 'Guadeloupe',
        image_path: getImageUrl('guadeloupe'),
        game: other,
      },
      { answer: 'Guam', image_path: getImageUrl('guam'), game: other },
      { answer: 'Guernsey', image_path: getImageUrl('guernsey'), game: other },
      { answer: 'Guinea', image_path: getImageUrl('guinea'), game: other },
      {
        answer: 'Guinea-Bissau',
        image_path: getImageUrl('guinea-bissau'),
        game: other,
      },
      { answer: 'Haiti', image_path: getImageUrl('haiti'), game: other },
      {
        answer: 'Hong Kong',
        image_path: getImageUrl('hong-kong'),
        game: other,
      },
      {
        answer: 'Isle of Man',
        image_path: getImageUrl('isle-of-man'),
        game: other,
      },
      { answer: 'Jamaica', image_path: getImageUrl('jamaica'), game: other },
      { answer: 'Jersey', image_path: getImageUrl('jersey'), game: other },
      { answer: 'Jordan', image_path: getImageUrl('jordan'), game: other },
      { answer: 'Kosovo', image_path: getImageUrl('kosovo'), game: other },
      {
        answer: 'Kurdistan',
        image_path: getImageUrl('kurdistan'),
        game: other,
      },
      { answer: 'Kuwait', image_path: getImageUrl('kuwait'), game: other },
      { answer: 'Laos', image_path: getImageUrl('laos'), game: other },
      { answer: 'Lebanon', image_path: getImageUrl('lebanon'), game: other },
      { answer: 'Lesotho', image_path: getImageUrl('lesotho'), game: other },
      { answer: 'Liberia', image_path: getImageUrl('liberia'), game: other },
      {
        answer: 'Lord Howe Island',
        image_path: getImageUrl('lord-howe-island'),
        game: other,
      },
      { answer: 'Macau', image_path: getImageUrl('macau'), game: other },
      { answer: 'Maldives', image_path: getImageUrl('maldives'), game: other },
      { answer: 'Malta', image_path: getImageUrl('malta'), game: other },
      {
        answer: 'Martinique',
        image_path: getImageUrl('martinique'),
        game: other,
      },
      {
        answer: 'Mauritânia',
        image_path: getImageUrl('mauritania'),
        game: other,
      },
      {
        answer: 'Mauritius',
        image_path: getImageUrl('mauritius'),
        game: other,
      },
      { answer: 'Mayotte', image_path: getImageUrl('mayotte'), game: other },
      { answer: 'Moldova', image_path: getImageUrl('moldova'), game: other },
      { answer: 'Mongólia', image_path: getImageUrl('mongolia'), game: other },
      {
        answer: 'Montserrat',
        image_path: getImageUrl('montserrat'),
        game: other,
      },
      { answer: 'Myanmar', image_path: getImageUrl('myanmar'), game: other },
      { answer: 'Nauru', image_path: getImageUrl('nauru'), game: other },
      { answer: 'Niue', image_path: getImageUrl('niue'), game: other },
      {
        answer: 'Norfolk Island',
        image_path: getImageUrl('norfolk-island'),
        game: other,
      },
      {
        answer: 'Northern Cyprus',
        image_path: getImageUrl('northern-cyprus'),
        game: other,
      },
      {
        answer: 'Northern Ireland',
        image_path: getImageUrl('northern-ireland'),
        game: other,
      },
      {
        answer: 'Northern Mariana Islands',
        image_path: getImageUrl('northern-mariana-islands'),
        game: other,
      },
      { answer: 'Oman', image_path: getImageUrl('oman'), game: other },
      {
        answer: 'Palestina',
        image_path: getImageUrl('palestine'),
        game: other,
      },
      {
        answer: 'Papua Nova Guiné',
        image_path: getImageUrl('papua-new-guinea'),
        game: other,
      },
      {
        answer: 'Pitcairn Islands',
        image_path: getImageUrl('pitcairn-islands'),
        game: other,
      },
      {
        answer: 'Puerto Rico',
        image_path: getImageUrl('puerto-rico'),
        game: other,
      },
      { answer: 'Qatar', image_path: getImageUrl('qatar'), game: other },
      { answer: 'Quebec', image_path: getImageUrl('quebec'), game: other },
      { answer: 'Reunion', image_path: getImageUrl('reunion'), game: other },
      { answer: 'Russia', image_path: getImageUrl('russia'), game: other },
      { answer: 'Saba', image_path: getImageUrl('saba'), game: other },
      {
        answer: 'Saint Barthélemy',
        image_path: getImageUrl('saint-barthelemy'),
        game: other,
      },
      {
        answer: 'Saint Helena',
        image_path: getImageUrl('saint-helena'),
        game: other,
      },
      {
        answer: 'Saint Kitts and Nevis',
        image_path: getImageUrl('saint-kitts-and-nevis'),
        game: other,
      },
      {
        answer: 'Saint Lucia',
        image_path: getImageUrl('saint-lucia'),
        game: other,
      },
      {
        answer: 'Saint Pierre and Miquelon',
        image_path: getImageUrl('saint-pierre-and-miquelon'),
        game: other,
      },
      {
        answer: 'Saint Vincent and the Grenadines',
        image_path: getImageUrl('saint-vincent-and-the-grenadines'),
        game: other,
      },
      {
        answer: 'Seychelles',
        image_path: getImageUrl('seychelles'),
        game: other,
      },
      {
        answer: 'Sierra Leone',
        image_path: getImageUrl('sierra-leone'),
        game: other,
      },
      {
        answer: 'Singapore',
        image_path: getImageUrl('singapore'),
        game: other,
      },
      {
        answer: 'Sint Eustatius',
        image_path: getImageUrl('sint-eustatius'),
        game: other,
      },
      {
        answer: 'Sint Maarten',
        image_path: getImageUrl('sint-maarten'),
        game: other,
      },
      {
        answer: 'Solomon Islands',
        image_path: getImageUrl('solomon-islands'),
        game: other,
      },
      {
        answer: 'Somaliland',
        image_path: getImageUrl('somaliland'),
        game: other,
      },
      {
        answer: 'South Georgia and the South Sandwich Islands',
        image_path: getImageUrl('south-georgia-and-south-sandwich-islands'),
        game: other,
      },
      {
        answer: 'South Ossetia',
        image_path: getImageUrl('south-ossetia'),
        game: other,
      },
      {
        answer: 'Transnistria',
        image_path: getImageUrl('transnistria'),
        game: other,
      },
      {
        answer: 'Trinidad e Tobago',
        image_path: getImageUrl('trinidad-and-tobago'),
        game: other,
      },
      {
        answer: 'Tristan da Cunha',
        image_path: getImageUrl('tristan-da-cunha'),
        game: other,
      },
      {
        answer: 'Turks and Caicos Islands',
        image_path: getImageUrl('turks-and-caicos-islands'),
        game: other,
      },
      { answer: 'Tuvalu', image_path: getImageUrl('tuvalu'), game: other },
      {
        answer: 'US Virgin Islands',
        image_path: getImageUrl('us-virgin-islands'),
        game: other,
      },
      {
        answer: 'Wallis and Futuna',
        image_path: getImageUrl('wallis-and-futuna'),
        game: other,
      },
      { answer: 'Wallonia', image_path: getImageUrl('wallonia'), game: other },
      {
        answer: 'West Papua',
        image_path: getImageUrl('west-papua'),
        game: other,
      },
      {
        answer: 'Western Sahara',
        image_path: getImageUrl('western-sahara'),
        game: other,
      },
      {
        answer: 'Åland Islands',
        image_path: getImageUrl('aland-islands'),
        game: other,
      },
      {
        answer: 'Federated States of Micronesia',
        image_path: getImageUrl('federated-states-of-micronesia'),
        game: other,
      },
      { answer: 'Tibete', image_path: getImageUrl('tibet'), game: other },
    ];

    for (const card of cards) {
      await repo.save(card);
    }

    console.log('Cards seeded!');
  }
}
