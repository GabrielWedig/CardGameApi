import { Card } from 'src/card/card.entity';
import { Game } from 'src/game/game.entity';
import { DataSource, In } from 'typeorm';

export class CardSeeder {
  static async run(dataSource: DataSource) {
    const repo = dataSource.getRepository(Card);
    const gameRepo = dataSource.getRepository(Game);

    const urlPrefix =
      'https://www.geoguessr.com/images/resize:fit:0:256/gravity:ce/plain/seterra/game-area';

    const getImageUrl = (name: string) => `${urlPrefix}/${name}.png`;

    const games = await gameRepo.find({
      where: {
        name: In([
          'América',
          'Europa',
          'Asia',
          'Africa',
          'Oceania',
          'ONU',
          'Outros',
        ]),
      },
    });

    const america = games.find((g) => g.name === 'América');
    const europe = games.find((g) => g.name === 'Europa');
    const asia = games.find((g) => g.name === 'Asia');
    const africa = games.find((g) => g.name === 'Africa');
    const oceania = games.find((g) => g.name === 'Oceania');
    const onu = games.find((g) => g.name === 'ONU');
    // const other = games.find((g) => g.name === 'Outros');

    const africaCards = [
      {
        answer: 'África do Sul',
        imagePath: getImageUrl('safrica'),
        game: africa,
      },
      { answer: 'Angola', imagePath: getImageUrl('angola'), game: africa },
      { answer: 'Argélia', imagePath: getImageUrl('algeria'), game: africa },
      { answer: 'Benin', imagePath: getImageUrl('benin'), game: africa },
      { answer: 'Botswana', imagePath: getImageUrl('botswana'), game: africa },
      {
        answer: 'Burkina Faso',
        imagePath: getImageUrl('burkinafaso'),
        game: africa,
      },
      { answer: 'Burundi', imagePath: getImageUrl('burundi'), game: africa },
      {
        answer: 'Cabo Verde',
        imagePath: getImageUrl('caboverde'),
        game: africa,
      },
      { answer: 'Camarões', imagePath: getImageUrl('cameroon'), game: africa },
      { answer: 'Chade', imagePath: getImageUrl('chad'), game: africa },
      { answer: 'Comores', imagePath: getImageUrl('comoros'), game: africa },
      {
        answer: 'Congo',
        imagePath: getImageUrl('thecongo'),
        game: africa,
      },
      {
        answer: 'Costa do Marfim',
        imagePath: getImageUrl('ivory'),
        game: africa,
      },
      { answer: 'Djibouti', imagePath: getImageUrl('djibouti'), game: africa },
      { answer: 'Egito', imagePath: getImageUrl('egypt'), game: africa },
      { answer: 'Eritreia', imagePath: getImageUrl('eritrea'), game: africa },
      { answer: 'Etiópia', imagePath: getImageUrl('ethiopia'), game: africa },
      { answer: 'Gabão', imagePath: getImageUrl('gabon'), game: africa },
      { answer: 'Gâmbia', imagePath: getImageUrl('gambia'), game: africa },
      { answer: 'Gana', imagePath: getImageUrl('ghana'), game: africa },
      { answer: 'Guiné', imagePath: getImageUrl('guinea'), game: africa },
      {
        answer: 'Guiné Bissau',
        imagePath: getImageUrl('guineabissau'),
        game: africa,
      },
      {
        answer: 'Guiné Equatorial',
        imagePath: getImageUrl('equatorialguinea'),
        game: africa,
      },
      { answer: 'Lesoto', imagePath: getImageUrl('leshoto'), game: africa },
      { answer: 'Libéria', imagePath: getImageUrl('liberia'), game: africa },
      { answer: 'Líbia', imagePath: getImageUrl('libya'), game: africa },
      {
        answer: 'Madagascar',
        imagePath: getImageUrl('madagas'),
        game: africa,
      },
      { answer: 'Malauí', imagePath: getImageUrl('malawi'), game: africa },
      { answer: 'Mali', imagePath: getImageUrl('mali'), game: africa },
      { answer: 'Marrocos', imagePath: getImageUrl('morocco'), game: africa },
      {
        answer: 'Maurício',
        imagePath: getImageUrl('mauritius'),
        game: africa,
      },
      {
        answer: 'Mauritânia',
        imagePath: getImageUrl('mauritania'),
        game: africa,
      },
      {
        answer: 'Moçambique',
        imagePath: getImageUrl('mozamb'),
        game: africa,
      },
      { answer: 'Namíbia', imagePath: getImageUrl('namibia'), game: africa },
      { answer: 'Níger', imagePath: getImageUrl('niger'), game: africa },
      { answer: 'Nigéria', imagePath: getImageUrl('nigeria'), game: africa },
      { answer: 'Quênia', imagePath: getImageUrl('kenya'), game: africa },
      {
        answer: 'República Centro-Africana',
        imagePath: getImageUrl('centralafrican'),
        game: africa,
      },
      {
        answer: 'República Democrática do Congo',
        imagePath: getImageUrl('congo'),
        game: africa,
      },
      { answer: 'Ruanda', imagePath: getImageUrl('rwanda'), game: africa },
      {
        answer: 'São Tomé e Príncipe',
        imagePath: getImageUrl('saotome'),
        game: africa,
      },
      { answer: 'Senegal', imagePath: getImageUrl('senegal'), game: africa },
      {
        answer: 'Serra Leoa',
        imagePath: getImageUrl('sierraleone'),
        game: africa,
      },
      {
        answer: 'Seicheles',
        imagePath: getImageUrl('seychelles'),
        game: africa,
      },
      { answer: 'Tunísia', imagePath: getImageUrl('tunisia'), game: africa },
      { answer: 'Somália', imagePath: getImageUrl('somalia'), game: africa },
      {
        answer: 'Essuatíni',
        imagePath: getImageUrl('swaziland'),
        game: africa,
      },
      { answer: 'Sudão', imagePath: getImageUrl('sudan'), game: africa },
      {
        answer: 'Sudão do Sul',
        imagePath: getImageUrl('southsudan'),
        game: africa,
      },
      { answer: 'Uganda', imagePath: getImageUrl('uganda'), game: africa },
      { answer: 'Tanzânia', imagePath: getImageUrl('tanzania'), game: africa },
      { answer: 'Togo', imagePath: getImageUrl('togo'), game: africa },
      { answer: 'Zâmbia', imagePath: getImageUrl('zambia'), game: africa },
      { answer: 'Zimbábue', imagePath: getImageUrl('zimbabwe'), game: africa },
    ];

    const americaCards = [
      {
        answer: 'Antígua e Barbuda',
        imagePath: getImageUrl('antigua'),
        game: america,
      },
      {
        answer: 'Argentina',
        imagePath: getImageUrl('argentin'),
        game: america,
      },
      {
        answer: 'Bahamas',
        imagePath: getImageUrl('bahamas'),
        game: america,
      },
      {
        answer: 'Barbados',
        imagePath: getImageUrl('barbados'),
        game: america,
      },
      {
        answer: 'Belize',
        imagePath: getImageUrl('belize'),
        game: america,
      },
      {
        answer: 'Bolívia',
        imagePath: getImageUrl('bolivia'),
        game: america,
      },
      {
        answer: 'Brasil',
        imagePath: getImageUrl('brazil'),
        game: america,
      },
      {
        answer: 'Canadá',
        imagePath: getImageUrl('canada'),
        game: america,
      },
      { answer: 'Chile', imagePath: getImageUrl('chile'), game: america },
      {
        answer: 'Colômbia',
        imagePath: getImageUrl('colombia'),
        game: america,
      },
      {
        answer: 'Costa Rica',
        imagePath: getImageUrl('costaric'),
        game: america,
      },
      { answer: 'Cuba', imagePath: getImageUrl('cuba'), game: america },
      {
        answer: 'Dominica',
        imagePath: getImageUrl('domini'),
        game: america,
      },
      {
        answer: 'El Salvador',
        imagePath: getImageUrl('elsalv'),
        game: america,
      },
      {
        answer: 'Equador',
        imagePath: getImageUrl('ecuador'),
        game: america,
      },
      {
        answer: 'Estados Unidos',
        imagePath: getImageUrl('usa'),
        game: america,
      },
      {
        answer: 'Granada',
        imagePath: getImageUrl('grenada'),
        game: america,
      },
      {
        answer: 'Guatemala',
        imagePath: getImageUrl('guatemala'),
        game: america,
      },
      {
        answer: 'Guiana',
        imagePath: getImageUrl('guyana'),
        game: america,
      },
      { answer: 'Haiti', imagePath: getImageUrl('haiti'), game: america },
      {
        answer: 'Honduras',
        imagePath: getImageUrl('honduras'),
        game: america,
      },
      { answer: 'Jamaica', imagePath: getImageUrl('jamaica'), game: america },
      {
        answer: 'México',
        imagePath: getImageUrl('mexico'),
        game: america,
      },
      {
        answer: 'Nicarágua',
        imagePath: getImageUrl('nicagua'),
        game: america,
      },
      {
        answer: 'Panamá',
        imagePath: getImageUrl('panama'),
        game: america,
      },
      {
        answer: 'Paraguai',
        imagePath: getImageUrl('paraguay'),
        game: america,
      },
      { answer: 'Peru', imagePath: getImageUrl('peru'), game: america },
      {
        answer: 'República Dominicana',
        imagePath: getImageUrl('dominica'),
        game: america,
      },
      {
        answer: 'Santa Lúcia',
        imagePath: getImageUrl('saintlucia'),
        game: america,
      },
      {
        answer: 'São Cristóvão e Névis',
        imagePath: getImageUrl('saintkitts'),
        game: america,
      },
      {
        answer: 'São Vicente e Granadinas',
        imagePath: getImageUrl('saintvincent'),
        game: america,
      },
      {
        answer: 'Suriname',
        imagePath: getImageUrl('suriname'),
        game: america,
      },
      {
        answer: 'Trinidad e Tobago',
        imagePath: getImageUrl('trinidad'),
        game: america,
      },
      {
        answer: 'Uruguai',
        imagePath: getImageUrl('uruguay'),
        game: america,
      },
      {
        answer: 'Venezuela',
        imagePath: getImageUrl('venezuel'),
        game: america,
      },
    ];

    const asiaCards = [
      {
        answer: 'Afeganistão',
        imagePath: getImageUrl('afghani'),
        game: asia,
      },
      {
        answer: 'Arábia Saudita',
        imagePath: getImageUrl('saudi'),
        game: asia,
      },
      { answer: 'Armênia', imagePath: getImageUrl('armenia'), game: asia },
      {
        answer: 'Azerbaijão',
        imagePath: getImageUrl('azerbaijan'),
        game: asia,
      },
      { answer: 'Bahrein', imagePath: getImageUrl('bahrain'), game: asia },
      {
        answer: 'Bangladesh',
        imagePath: getImageUrl('bangla'),
        game: asia,
      },
      { answer: 'Brunei', imagePath: getImageUrl('brunei'), game: asia },
      { answer: 'Butão', imagePath: getImageUrl('bhutan'), game: asia },
      { answer: 'Camboja', imagePath: getImageUrl('cambodia'), game: asia },
      {
        answer: 'Cazaquistão',
        imagePath: getImageUrl('kazakhstan'),
        game: asia,
      },
      { answer: 'Qatar', imagePath: getImageUrl('qatar'), game: asia },
      { answer: 'China', imagePath: getImageUrl('china'), game: asia },
      { answer: 'Chipre', imagePath: getImageUrl('cyprus'), game: asia },
      {
        answer: 'Singapura',
        imagePath: getImageUrl('singapore'),
        game: asia,
      },
      {
        answer: 'Coreia do Sul',
        imagePath: getImageUrl('skorea'),
        game: asia,
      },
      {
        answer: 'Coreia do Norte',
        imagePath: getImageUrl('nkorea'),
        game: asia,
      },
      {
        answer: 'Emirados Árabes Unidos',
        imagePath: getImageUrl('uae'),
        game: asia,
      },
      {
        answer: 'Filipinas',
        imagePath: getImageUrl('philipp'),
        game: asia,
      },
      {
        answer: 'Geórgia',
        imagePath: getImageUrl('georgia'),
        game: asia,
      },
      {
        answer: 'Iêmen',
        imagePath: getImageUrl('yemen'),
        game: asia,
      },
      { answer: 'Índia', imagePath: getImageUrl('india'), game: asia },
      { answer: 'Indonésia', imagePath: getImageUrl('indones'), game: asia },
      { answer: 'Irã', imagePath: getImageUrl('iran'), game: asia },
      { answer: 'Iraque', imagePath: getImageUrl('iraq'), game: asia },
      { answer: 'Israel', imagePath: getImageUrl('israel'), game: asia },
      { answer: 'Japão', imagePath: getImageUrl('japan'), game: asia },
      { answer: 'Jordânia', imagePath: getImageUrl('jordan'), game: asia },
      { answer: 'Kuwait', imagePath: getImageUrl('kuwait'), game: asia },
      { answer: 'Laos', imagePath: getImageUrl('laos'), game: asia },
      { answer: 'Líbano', imagePath: getImageUrl('lebanon'), game: asia },
      { answer: 'Malásia', imagePath: getImageUrl('malaysia'), game: asia },
      { answer: 'Maldivas', imagePath: getImageUrl('maldives'), game: asia },
      { answer: 'Mianmar', imagePath: getImageUrl('burma'), game: asia },
      { answer: 'Mongólia', imagePath: getImageUrl('mongolia'), game: asia },
      { answer: 'Nepal', imagePath: getImageUrl('nepal'), game: asia },
      { answer: 'Omã', imagePath: getImageUrl('oman'), game: asia },
      { answer: 'Paquistão', imagePath: getImageUrl('pakistan'), game: asia },
      {
        answer: 'Quirguistão',
        imagePath: getImageUrl('kyrgyzstan'),
        game: asia,
      },
      { answer: 'Russia', imagePath: getImageUrl('russia'), game: asia },
      { answer: 'Síria', imagePath: getImageUrl('syria'), game: asia },
      { answer: 'Sri Lanka', imagePath: getImageUrl('srilanka'), game: asia },
      {
        answer: 'Tajiquistão',
        imagePath: getImageUrl('tajikistan'),
        game: asia,
      },
      { answer: 'Tailândia', imagePath: getImageUrl('thailand'), game: asia },
      {
        answer: 'Timor-Leste',
        imagePath: getImageUrl('easttimor'),
        game: asia,
      },
      {
        answer: 'Turcomenistão',
        imagePath: getImageUrl('turkmenistan'),
        game: asia,
      },
      { answer: 'Turquia', imagePath: getImageUrl('turkey'), game: asia },
      {
        answer: 'Uzbequistão',
        imagePath: getImageUrl('uzbekistan'),
        game: asia,
      },
      {
        answer: 'Vietnã',
        imagePath: getImageUrl('vietnam'),
        game: asia,
      },
    ];

    const europaCards = [
      { answer: 'Albânia', imagePath: getImageUrl('albania'), game: europe },
      { answer: 'Alemanha', imagePath: getImageUrl('germany'), game: europe },
      { answer: 'Andorra', imagePath: getImageUrl('andorra'), game: europe },
      { answer: 'Armênia', imagePath: getImageUrl('armenia'), game: europe },
      { answer: 'Áustria', imagePath: getImageUrl('austria'), game: europe },
      {
        answer: 'Azerbaijão',
        imagePath: getImageUrl('azerbaijan'),
        game: europe,
      },
      {
        answer: 'Bielorrússia',
        imagePath: getImageUrl('belarus'),
        game: europe,
      },
      { answer: 'Bélgica', imagePath: getImageUrl('belgium'), game: europe },
      {
        answer: 'Bósnia e Herzegovina',
        imagePath: getImageUrl('bosnia'),
        game: europe,
      },
      {
        answer: 'Bulgária',
        imagePath: getImageUrl('bulgaria'),
        game: europe,
      },
      { answer: 'Chipre', imagePath: getImageUrl('cyprus'), game: europe },
      { answer: 'Croácia', imagePath: getImageUrl('croatia'), game: europe },
      { answer: 'Dinamarca', imagePath: getImageUrl('denmark'), game: europe },
      {
        answer: 'Eslováquia',
        imagePath: getImageUrl('slovakia'),
        game: europe,
      },
      {
        answer: 'Eslovênia',
        imagePath: getImageUrl('slovenia'),
        game: europe,
      },
      { answer: 'Espanha', imagePath: getImageUrl('spain'), game: europe },
      { answer: 'Estônia', imagePath: getImageUrl('estonia'), game: europe },
      { answer: 'Finlândia', imagePath: getImageUrl('finland'), game: europe },
      { answer: 'França', imagePath: getImageUrl('france'), game: europe },
      {
        answer: 'Geórgia',
        imagePath: getImageUrl('georgia'),
        game: europe,
      },
      {
        answer: 'Grécia',
        imagePath: getImageUrl('greece'),
        game: europe,
      },
      {
        answer: 'Holanda',
        imagePath: getImageUrl('netherland'),
        game: europe,
      },
      {
        answer: 'Hungria',
        imagePath: getImageUrl('hungary'),
        game: europe,
      },
      { answer: 'Irlanda', imagePath: getImageUrl('ireland'), game: europe },
      { answer: 'Islândia', imagePath: getImageUrl('iceland'), game: europe },
      { answer: 'Itália', imagePath: getImageUrl('italy'), game: europe },
      { answer: 'Letônia', imagePath: getImageUrl('latvia'), game: europe },
      {
        answer: 'Liechtenstein',
        imagePath: getImageUrl('liechtenstein'),
        game: europe,
      },
      {
        answer: 'Lituânia',
        imagePath: getImageUrl('lithuan'),
        game: europe,
      },
      {
        answer: 'Luxemburgo',
        imagePath: getImageUrl('luxemburg'),
        game: europe,
      },
      {
        answer: 'Macedônia do Norte',
        imagePath: getImageUrl('macedon'),
        game: europe,
      },
      { answer: 'Malta', imagePath: getImageUrl('malta'), game: europe },
      { answer: 'Moldávia', imagePath: getImageUrl('moldova'), game: europe },
      { answer: 'Mônaco', imagePath: getImageUrl('monaco'), game: europe },
      {
        answer: 'Montenegro',
        imagePath: getImageUrl('montenegro'),
        game: europe,
      },
      {
        answer: 'Noruega',
        imagePath: getImageUrl('norway'),
        game: europe,
      },
      { answer: 'Polônia', imagePath: getImageUrl('poland'), game: europe },
      { answer: 'Portugal', imagePath: getImageUrl('portugal'), game: europe },
      {
        answer: 'Reino Unido',
        imagePath: getImageUrl('uk'),
        game: europe,
      },
      {
        answer: 'República Tcheca',
        imagePath: getImageUrl('czech'),
        game: europe,
      },
      { answer: 'Romênia', imagePath: getImageUrl('romania'), game: europe },
      { answer: 'Russia', imagePath: getImageUrl('russia'), game: europe },
      {
        answer: 'San Marino',
        imagePath: getImageUrl('sanmarino'),
        game: europe,
      },
      { answer: 'Sérvia', imagePath: getImageUrl('serbia'), game: europe },
      { answer: 'Suécia', imagePath: getImageUrl('sweden'), game: europe },
      { answer: 'Suíça', imagePath: getImageUrl('switzlnd'), game: europe },
      { answer: 'Ucrânia', imagePath: getImageUrl('ukraine'), game: europe },
    ];

    const oceaniaCards = [
      {
        answer: 'Austrália',
        imagePath: getImageUrl('austral'),
        game: oceania,
      },
      { answer: 'Fiji', imagePath: getImageUrl('fiji'), game: oceania },
      {
        answer: 'Ilhas Marshall',
        imagePath: getImageUrl('marshallislands'),
        game: oceania,
      },
      {
        answer: 'Ilhas Salomão',
        imagePath: getImageUrl('solomon'),
        game: oceania,
      },
      {
        answer: 'Kiribati',
        imagePath: getImageUrl('kiribati'),
        game: oceania,
      },
      {
        answer: 'Estados Federados da Micronésia',
        imagePath: getImageUrl('micronesia'),
        game: oceania,
      },
      { answer: 'Nauru', imagePath: getImageUrl('nauru'), game: oceania },
      {
        answer: 'Nova Zelândia',
        imagePath: getImageUrl('newzealand'),
        game: oceania,
      },
      { answer: 'Palau', imagePath: getImageUrl('palau'), game: oceania },
      {
        answer: 'Papua Nova Guiné',
        imagePath: getImageUrl('papuanewguinea'),
        game: oceania,
      },
      { answer: 'Samoa', imagePath: getImageUrl('samoa'), game: oceania },
      { answer: 'Tonga', imagePath: getImageUrl('tonga'), game: oceania },
      { answer: 'Tuvalu', imagePath: getImageUrl('tuvalu'), game: oceania },
      { answer: 'Vanuatu', imagePath: getImageUrl('vanuatu'), game: oceania },
    ];

    // const cards = [
    //   {
    //     answer: 'Guiana Francesa',
    //     imagePath: getImageUrl('frenchguiana'),
    //     game: other,
    //   },

    //   {
    //     answer: 'Inglaterra',
    //     imagePath: getImageUrl('england'),
    //     game: europe,
    //   },
    //   { answer: 'Escócia', imagePath: getImageUrl('scotland'), game: europe },
    //   {
    //     answer: 'País de Gales',
    //     imagePath: getImageUrl('wales'),
    //     game: europe,
    //   },

    //   {
    //     answer: 'Cidade do Vaticano',
    //     imagePath: getImageUrl('vatican'),
    //     game: europe,
    //   },

    //   { answer: 'Abkhazia', imagePath: getImageUrl('abkhazia'), game: other },
    //   {
    //     answer: 'Afeganistão (2021)',
    //     imagePath: getImageUrl('area_afghanistan2021'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Afeganistão (Taliban)',
    //     imagePath: getImageUrl('area_afghanistantaliban'),
    //     game: other,
    //   },
    //   {
    //     answer: 'American Samoa',
    //     imagePath: getImageUrl('americansamoa'),
    //     game: other,
    //   },

    //   {
    //     answer: 'Artsakh (NagornoKarabakh)',
    //     imagePath: getImageUrl('artsakh'),
    //     game: other,
    //   },
    //   { answer: 'Aruba', imagePath: getImageUrl('aruba'), game: other },
    //   {
    //     answer: 'Ascension Island',
    //     imagePath: getImageUrl('ascensionisland'),
    //     game: other,
    //   },

    //   {
    //     answer: 'Barotseland',
    //     imagePath: getImageUrl('barotseland'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Basque Country',
    //     imagePath: getImageUrl('basquecountry'),
    //     game: other,
    //   },
    //   { answer: 'Bermuda', imagePath: getImageUrl('bermuda'), game: other },
    //   { answer: 'Bhutan', imagePath: getImageUrl('bhutan'), game: other },
    //   { answer: 'Bonaire', imagePath: getImageUrl('bonaire'), game: other },
    //   {
    //     answer: 'Bougainville',
    //     imagePath: getImageUrl('bougainville'),
    //     game: other,
    //   },
    //   {
    //     answer: 'British Antarctic Territory',
    //     imagePath: getImageUrl('britishantarcticterritory'),
    //     game: other,
    //   },
    //   {
    //     answer: 'British Indian Ocean Territory',
    //     imagePath: getImageUrl('britishindianoceanterritory'),
    //     game: other,
    //   },
    //   {
    //     answer: 'British Virgin Islands',
    //     imagePath: getImageUrl('britishvirginislands'),
    //     game: other,
    //   },

    //   {
    //     answer: 'Catalonia',
    //     imagePath: getImageUrl('catalonia'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Cayman Islands',
    //     imagePath: getImageUrl('caymanislands'),
    //     game: other,
    //   },
    //   { answer: 'Chechnya', imagePath: getImageUrl('chechnya'), game: other },
    //   {
    //     answer: 'Christmas Island',
    //     imagePath: getImageUrl('christmasisland'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Cocos Islands',
    //     imagePath: getImageUrl('cocosislands'),
    //     game: other,
    //   },

    //   {
    //     answer: 'Cook Islands',
    //     imagePath: getImageUrl('cookislands'),
    //     game: other,
    //   },
    //   { answer: 'Crimea', imagePath: getImageUrl('crimea'), game: other },

    //   { answer: 'Curaçao', imagePath: getImageUrl('curacao'), game: other },
    //   { answer: 'Cyprus', imagePath: getImageUrl('cyprus'), game: other },
    //   { answer: 'Darfur', imagePath: getImageUrl('darfur'), game: other },

    //   { answer: 'Eswatini', imagePath: getImageUrl('eswatini'), game: other },
    //   {
    //     answer: 'Falkland Islands',
    //     imagePath: getImageUrl('falklandislands'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Faroe Islands',
    //     imagePath: getImageUrl('faroeislands'),
    //     game: other,
    //   },
    //   {
    //     answer: 'French Guiana',
    //     imagePath: getImageUrl('frenchguiana'),
    //     game: other,
    //   },
    //   {
    //     answer: 'French Polynesia',
    //     imagePath: getImageUrl('frenchpolynesia'),
    //     game: other,
    //   },
    //   {
    //     answer: 'French Southern and Antarctic Lands',
    //     imagePath: getImageUrl('frenchsouthernandantarcticlands'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Gibraltar',
    //     imagePath: getImageUrl('gibraltar'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Greenland',
    //     imagePath: getImageUrl('greenland'),
    //     game: other,
    //   },
    //   { answer: 'Grenada', imagePath: getImageUrl('grenada'), game: other },
    //   {
    //     answer: 'Guadeloupe',
    //     imagePath: getImageUrl('guadeloupe'),
    //     game: other,
    //   },
    //   { answer: 'Guam', imagePath: getImageUrl('guam'), game: other },
    //   { answer: 'Guernsey', imagePath: getImageUrl('guernsey'), game: other },

    //   {
    //     answer: 'Hong Kong',
    //     imagePath: getImageUrl('hongkong'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Isle of Man',
    //     imagePath: getImageUrl('isleofman'),
    //     game: other,
    //   },

    //   { answer: 'Jersey', imagePath: getImageUrl('jersey'), game: other },

    //   { answer: 'Kosovo', imagePath: getImageUrl('kosovo'), game: other },
    //   {
    //     answer: 'Kurdistan',
    //     imagePath: getImageUrl('kurdistan'),
    //     game: other,
    //   },

    //   {
    //     answer: 'Lord Howe Island',
    //     imagePath: getImageUrl('lordhoweisland'),
    //     game: other,
    //   },
    //   { answer: 'Macau', imagePath: getImageUrl('macau'), game: other },

    //   {
    //     answer: 'Martinique',
    //     imagePath: getImageUrl('martinique'),
    //     game: other,
    //   },

    //   { answer: 'Mayotte', imagePath: getImageUrl('mayotte'), game: other },

    //   { answer: 'Niue', imagePath: getImageUrl('niue'), game: other },
    //   {
    //     answer: 'Norfolk Island',
    //     imagePath: getImageUrl('norfolkisland'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Northern Cyprus',
    //     imagePath: getImageUrl('northerncyprus'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Northern Ireland',
    //     imagePath: getImageUrl('northernireland'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Northern Mariana Islands',
    //     imagePath: getImageUrl('northernmarianaislands'),
    //     game: other,
    //   },
    //   { answer: 'Oman', imagePath: getImageUrl('oman'), game: other },
    //   {
    //     answer: 'Palestina',
    //     imagePath: getImageUrl('palestine'),
    //     game: other,
    //   },

    //   {
    //     answer: 'Pitcairn Islands',
    //     imagePath: getImageUrl('pitcairnislands'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Puerto Rico',
    //     imagePath: getImageUrl('puertorico'),
    //     game: other,
    //   },

    //   { answer: 'Quebec', imagePath: getImageUrl('quebec'), game: other },
    //   { answer: 'Reunion', imagePath: getImageUrl('reunion'), game: other },

    //   { answer: 'Saba', imagePath: getImageUrl('saba'), game: other },
    //   {
    //     answer: 'Saint Barthélemy',
    //     imagePath: getImageUrl('saintbarthelemy'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Saint Helena',
    //     imagePath: getImageUrl('sainthelena'),
    //     game: other,
    //   },

    //   {
    //     answer: 'Saint Pierre and Miquelon',
    //     imagePath: getImageUrl('saintpierreandmiquelon'),
    //     game: other,
    //   },

    //   {
    //     answer: 'Sint Eustatius',
    //     imagePath: getImageUrl('sinteustatius'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Sint Maarten',
    //     imagePath: getImageUrl('sintmaarten'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Solomon Islands',
    //     imagePath: getImageUrl('solomonislands'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Somaliland',
    //     imagePath: getImageUrl('somaliland'),
    //     game: other,
    //   },
    //   {
    //     answer: 'South Georgia and the South Sandwich Islands',
    //     imagePath: getImageUrl('southgeorgiaandsouthsandwichislands'),
    //     game: other,
    //   },
    //   {
    //     answer: 'South Ossetia',
    //     imagePath: getImageUrl('southossetia'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Transnistria',
    //     imagePath: getImageUrl('transnistria'),
    //     game: other,
    //   },

    //   {
    //     answer: 'Tristan da Cunha',
    //     imagePath: getImageUrl('tristandacunha'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Turks and Caicos Islands',
    //     imagePath: getImageUrl('turksandcaicosislands'),
    //     game: other,
    //   },

    //   {
    //     answer: 'US Virgin Islands',
    //     imagePath: getImageUrl('usvirginislands'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Wallis and Futuna',
    //     imagePath: getImageUrl('wallisandfutuna'),
    //     game: other,
    //   },
    //   { answer: 'Wallonia', imagePath: getImageUrl('wallonia'), game: other },
    //   {
    //     answer: 'West Papua',
    //     imagePath: getImageUrl('westpapua'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Western Sahara',
    //     imagePath: getImageUrl('westernsahara'),
    //     game: other,
    //   },
    //   {
    //     answer: 'Åland Islands',
    //     imagePath: getImageUrl('alandislands'),
    //     game: other,
    //   },

    //   { answer: 'Tibete', imagePath: getImageUrl('tibet'), game: other },
    // ];
    const onuCards = [
      ...africaCards,
      ...americaCards,
      ...asiaCards,
      ...europaCards,
      ...oceaniaCards,
    ]
      .filter(
        (obj, index, self) =>
          index === self.findIndex((o) => o.answer === obj.answer),
      )
      .map((c) => ({ ...c, game: onu }));

    const cards = [
      //...africaCards,
      ...americaCards,
      // ...asiaCards,
      // ...europaCards,
      // ...oceaniaCards,
      // ...onuCards,
    ];

    for (const card of cards) {
      await repo.save(card);
    }

    console.log('Cards seeded!');
  }
}
