/* eslint-disable @typescript-eslint/no-explicit-any */
// --------- Game design ---------
// silver < gold < platinum < ruby < diamonds
// silver = 1$
// gold => silver * 2
// platinum => gold * 4
// ruby => platinum * 6
// diamonds => ruby *8
// -------------------------------

import Game from './game';

import { LevelConfig } from './types'

const moneyInfo: HTMLElement | null = document.getElementById('money');
const unlockButton: any = document.getElementById('unlock');

// sylver element
const sylverInfo: HTMLElement | null = document.getElementById('sylverInfo');
const workSylver: HTMLElement | null = document.getElementById('workSylver');
const lvlUpSylver: HTMLElement | null = document.getElementById('lvlUpSylver');
const addWorkerSylver: any = document.getElementById('addWorkerSylver');

// gold element
const goldContainer: HTMLElement | null = document.getElementById('goldContainer');
const goldInfo: HTMLElement | null = document.getElementById('goldInfo');
const workGold: HTMLElement | null = document.getElementById('workGold');
const lvlUpGold: HTMLElement | null = document.getElementById('lvlUpGold');
const convertGold: any = document.getElementById('convertGold');
const addWorkerGold: any = document.getElementById('addWorkerGold');

// sellButton
const sellButton: HTMLElement | null = document.getElementById('sellButton');

const sylverConfig: LevelConfig = {
  worker: workSylver,
  lvlUpButton: lvlUpSylver,
  infoContainer: sylverInfo,
  sellButton,
  addWorker: addWorkerSylver
};

const goldConfig: LevelConfig = {
  worker: workGold,
  lvlUpButton: lvlUpGold,
  infoContainer: goldInfo,
  addWorker: addWorkerGold,
  container: goldContainer,
  converterButton: convertGold
};

function main(): void {
  const game = new Game(moneyInfo, sylverConfig, goldConfig, unlockButton);
  game.start();
}

main();
