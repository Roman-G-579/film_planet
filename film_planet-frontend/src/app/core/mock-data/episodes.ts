import {Episode} from '../interfaces/episode.interface';

export const EPISODES: Episode[] = [
  {
    id: 1,
    series_id: 16,
    season_id: 1,
    name: 'The Target',
    number: 1,
    description: '\'... when it\'s not your turn.\' - McNulty.\n' +
      '\n' +
      'Baltimore homicide detective Jimmy McNulty gets into hot water and winds up assigned to a detail of narcotics outcasts charged with investigating drug lord Avon Barksdale and his powerful operation in Franklin Terrace. Meanwhile, Avon\'s nephew D\'Angelo is fresh off beating a murder rap, but he finds himself demoted upon his return to the gang.',
    duration: 63,
    releaseDate: new Date(2002,5,2),
    rating: 7.6,
    directors: ['Clark Johnson'],
    writers: ['David Simon']
  },
  {
    id: 2,
    series_id: 16,
    season_id: 1,
    name: 'The Detail',
    number: 2,
    description: '\'You cannot lose if you do not play.\' - Marla Daniels.\n' +
      '\n' +
      'McNulty feels the heat when a witness who testified against D\'Angelo is found murdered. Meanwhile, Greggs is given the lay of the land regarding Avon Barksdale\'s key players, and Herc, Carver and Prez find big-time trouble at the towers.',
    duration: 58,
    releaseDate: new Date(2002,5,9),
    rating: 8,
    directors: ['Clark Johnson'],
    writers: ['David Simon']
  },
  {
    id: 3,
    series_id: 16,
    season_id: 1,
    name: 'The Buys',
    number: 3,
    description: '"The king stay the king." - D\'Angelo.\n' +
      '\n' +
      'The early-morning \'field interviews\' by Herc, Carver and Prez result in a minor riot, a boy losing an eye and some bad publicity for the department. On the other side of the law, D\'Angelo teaches Wallace and Bodie how to play the game (chess) and later impresses Bell with his \'take\' from the low-rises.',
    duration: 56,
    releaseDate: new Date(2002,5,16),
    rating: 8,
    directors: ['Peter Medak'],
    writers: ['David Simon']
  },
  {
    id: 4,
    series_id: 16,
    season_id: 1,
    name: 'Old Cases',
    number: 4,
    description: '"It\'s a thin line \'tween heaven and here." - Bubbles.\n' +
      '\n' +
      'Greggs and McNulty try to get Hardcase to turn informant as arraignment begins for those caught in the raid. Barksdale places a bounty on the head of rival gang leader Omar. Meanwhile, McNulty takes Bubbles on a cultural field trip, and Herc and Carver try to track down Bodie.',
    duration: 60,
    releaseDate: new Date(2002,5,23),
    rating: 7.8,
    directors: ['Clark Johnson'],
    writers: ['David Simon']
  },
  {
    id: 5,
    series_id: 16,
    season_id: 1,
    name: 'The Pager',
    number: 5,
    description: '"..a little slow, a little late." - Avon Barksdale.\n' +
      '\n' +
      'McNulty\'s detail finally gets \'clone\' pagers to track Barksdale and his gang, but nobody can crack the codes used by the callers. Meanwhile, Bell instructs D\'Angelo on how to school his lookouts while simultaneously flushing out a possible snitch. Later, Carver and Herc find Bodie, but their interrogation doesn\'t turn up results.',
    duration: 60,
    releaseDate: new Date(2002,5,30),
    rating: 7.8,
    directors: ['Clark Johnson, Peter Medak'],
    writers: ['David Simon']
  },
  {
    id: 6,
    series_id: 16,
    season_id: 1,
    name: 'The Wire',
    number: 6,
    description: '"..and all the pieces matter." - Freamon.\n' +
      '\n' +
      'When Rawls looks to make a premature arrest for three murders that are linked to D\'Angelo and Avon Barksdale, McNulty and Greggs must argue for a delay in order to preserve the valuable wiretap gains they have made. Meanwhile, Wallace and D\'Angelo struggle with their consciences after Avon pays them blood money.',
    duration: 60,
    releaseDate: new Date(2002,6,7),
    rating: 8,
    directors: ['Ed Bianchi'],
    writers: ['David Simon']
  },
  {
    id: 7,
    series_id: 16,
    season_id: 1,
    name: 'One Arrest',
    number: 7,
    description: '"A man must have a code." - Bunk.\n' +
      '\n' +
      'Tipped off by the wire, Greggs, Herc, Carver and Freamon make a bust, but the incident makes Avon and Stringer suspicious, leading them to close shop in the Pit. Meanwhile, Bunk and McNulty look for another witness in the Gant slaying and hunt a suspect known as \'Mr. Bird.\'',
    duration: 60,
    releaseDate: new Date(2002,6,21),
    rating: 8.3,
    directors: ['Joe Chappelle'],
    writers: ['Rafael Alvarez']
  },
  {
    id: 8,
    series_id: 16,
    season_id: 1,
    name: 'Lessons',
    number: 8,
    description: '"Come at the king, you best not miss." - Omar.\n' +
      '\n' +
      'An unlikely source gives McNulty the tag of a car driven by Stringer Bell. Meanwhile, Greggs and Carver bust a congressional aide carrying dirty cash, but are forced to let him go. Omar earns his \'loose cannon\' moniker.',
    duration: 57,
    releaseDate: new Date(2002,6,28),
    rating: 8,
    directors: ['Gloria Muzio'],
    writers: ['David Simon']
  },
  {
    id: 9,
    series_id: 17,
    season_id: 6,
    name: 'Join or Die',
    number: 1,
    description: 'In an emotionally charged trial John Adams defends the British sentries involved in the Boston Massacre who contend they were provoked into firing on the assembled crowd. John\'s success brings him offers of positions in the Massachusetts government. But after John Hancock rouses a crowd to tar and feather a representative of the British East India Tea Company and the British respond to the growing unrest with oppressive measures, John instead speaks against the British policies and chooses to represent Massachusetts in the Continental Congress.',
    duration: 68,
    releaseDate: new Date(2008,2,16),
    rating: 7,
    directors: ['Tom Hooper'],
    writers: ['Kirk Ellis', 'David McCullough']
  },
  {
    id: 10,
    series_id: 17,
    season_id: 6,
    name: 'Independence',
    number: 2,
    description: 'After viewing the dead and wounded on the battlefield of Concord, John Adams takes up the cause of Independence. Frustrated by the caution of delegates from colonies that do not share Massachusetts plight, the inexperienced politician is abrasive, obnoxious and even insulting. But with the advice of Abigail and Ben Franklin he soon learns he has allies, to cultivate them, to bide his time and to seize opportunities. Following John\'s nomination, George Washington takes charge of the army and enjoys successes despite supply shortages. Back at home, Abigail and the children risk supporting the war effort in most tangible ways but find Mother Nature more threatening.',
    duration: 88,
    releaseDate: new Date(2008,2,16),
    rating: 8.2,
    directors: ['Tom Hooper'],
    writers: ['Kirk Ellis', 'David McCullough']
  },
  {
    id: 11,
    series_id: 16,
    season_id: 2,
    name: 'Ebb Tide',
    number: 1,
    description: '\'Ain\'t never gonna be what it was.\' -- Little Big Roy\n' +
      '\n' +
      'Det. Jimmy McNulty--exiled to police-boat duty--makes a shocking discovery in the Baltimore harbor. Bodie drives to Philly to make a connection for the Barksdale crew and Stringer Bell takes the train to New York to feel out the crew\'s reticent suppliers.',
    duration: 59,
    releaseDate: new Date(2003,5,1),
    rating: 7.9,
    directors: ['Ed Bianchi','Steve Shill'],
    writers: ['David Simon']
  },
  {
    id: 12,
    series_id: 16,
    season_id: 2,
    name: 'Collateral Damage',
    number: 2,
    description: `'They can chew you up, but they gotta spit you out.' -- McNulty
    Major Valchek gets back at Sobotka for the church gift fiasco, and a feud begins. Valchek ups the ante by asking Deputy Commissioner Burrell for a detail to go after Sobotka. Avon Barksdale continues to run his empire from a prison cell--counseling his nephew D'Angelo and going after a guard who is harassing the organization's convicted hit-man Wee-Bey.`,
    duration: 59,
    releaseDate: new Date(2003,5,8),
    rating: 7.8,
    directors: ['Ed Bianchi'],
    writers: ['David Simon']
  },
  {
    id: 12,
    series_id: 16,
    season_id: 2,
    name: 'Hot Shots',
    number: 3,
    description: `'What they need is a union.' -- Russell

Bunk and Freamon chase their crime scene, a container ship, to Philly. Lt. Cedric Daniels--disgusted with his exile to the evidence control unit--makes it known that he's leaving. On orders from Barksdale, Bell finds a way to set up the correctional officer who's been harassing Wee-Bey. McNulty pursues the identity of the Jane Doe found floating in the harbor.`,
    duration: 59,
    releaseDate: new Date(2003,5,15),
    rating: 8,
    directors: ['Elodie Keene'],
    writers: ['David Simon']
  },
];
