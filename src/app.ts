// --------- Game design ---------
// silver < gold < platinum < ruby < diamonds
// silver = 1$
// gold => silver * 2
// platinum => gold * 4
// ruby => platinum * 6
// diamonds => ruby *8
// -------------------------------

import Game from './game.js';
import Sylver from './sylver.js';

const moneyInfo: HTMLElement | null = document.getElementById('money');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const unlockButton: any = document.getElementById('unlock');
const sylverInfo: HTMLElement | null = document.getElementById('sylverInfo');

const goldContainer: HTMLElement | null = document.getElementById('goldContainer');

// const gold: HTMLElement | null = document.getElementById('gold');
// const platinum: HTMLElement | null = document.getElementById('platinum');
// const ruby: HTMLElement | null = document.getElementById('ruby');
// const diamonds: HTMLElement | null = document.getElementById('diamonds');

const workSylver: HTMLElement | null = document.getElementById('workSylver');
const lvlUpSylver: HTMLElement | null = document.getElementById('lvlUpSylver');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addWorkerSylver: any = document.getElementById('addWorkerSylver');

// sellButton

const sellButton: HTMLElement | null = document.getElementById('sellButton');

const money = 0;

function main(): void {
  const game = new Game(money, moneyInfo, goldContainer, unlockButton);
  game.render();
  const sylver: Sylver = new Sylver(game, workSylver, lvlUpSylver, sylverInfo, sellButton, addWorkerSylver);
  sylver.initSylver();
  // TODO: next step implement gold
}

main();
