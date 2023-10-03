import Game from "./game";

import { LevelConfig } from "./types";

export default class Gold {
  game: Game;
  level: number;
  value: number;
  priceToLevelUp: number;
  workGold: HTMLElement | null;
  lvlUpGold: HTMLElement | null;
  goldInfo: HTMLElement | null;
  convertButton: HTMLElement | null | undefined;
  addWorkerGold: HTMLButtonElement;
  priceForWorker: number;
  enableWorker: boolean;
  numWorker: number;
  workerTime: number;
  workerInterval: NodeJS.Timeout | number | null = null;

  constructor(game: Game, goldConfig: LevelConfig) {
    this.game = game;
    this.workGold = goldConfig.worker;
    this.lvlUpGold = goldConfig.lvlUpButton;
    this.goldInfo = goldConfig.infoContainer;
    this.convertButton = goldConfig.converterButton;
    this.addWorkerGold = goldConfig.addWorker;
    this.level = 1;
    this.value = 0;
    this.priceToLevelUp = 100;
    this.priceForWorker = 1000;
    this.enableWorker = false;
    this.numWorker = 0;
    this.workerTime = 10000;
    this.workerInterval = null;
  }

  initGold(): void {
    this.workGold?.addEventListener('click', () => {
      this.work();
    });

    this.lvlUpGold?.addEventListener('click', () => {
      this.goldLevelUp();
    });

    this.convertButton?.addEventListener('click', () => {
      this.game.convertToSylver(this.value, 2);
      this.value = 0;
      this.displayInfo();
    });

    this.initAddWorker();

    this.displayInfo();
  }

  displayInfo() {
    if (this.goldInfo) {
      this.goldInfo.innerHTML = `GOLD (lvl ${this.level}) : ${this.value}`;
    }

    if (this.lvlUpGold) {
      this.lvlUpGold.innerHTML = `LVL UP ${this.priceToLevelUp}$`;
    }

    if (this.addWorkerGold) {
      this.addWorkerGold.innerHTML = `ADD WORKER (${this.numWorker}) : ${this.priceForWorker}$`;
    }
  }

  work() {
    this.value += this.level;
    this.displayInfo();
  }

  initAddWorker() {
    if (this.addWorkerGold) {
      this.addWorkerGold.disabled = !this.enableWorker;
      if (this.enableWorker) {
        this.addWorkerGold?.addEventListener('click', () => {
          this.addWorker();
        });
      }
    }
  }

  addWorker() {
    if (this.game.canBuyWorker(this.priceForWorker)) {
      this.game.buyWorker(this.priceForWorker);
      this.numWorker = this.numWorker += 1;
      if (this.numWorker > 1) {
        const stringDecimal: string = `${1}.${this.numWorker}`;
        const divider: number = +stringDecimal;
        this.workerTime = this.workerTime / divider;
      }
      this.priceForWorker = this.priceForWorker * 3;
      this.displayInfo();
      this.startWorker();
    }
  }

  startWorker() {
    if (this.workerInterval) {
      clearInterval(this.workerInterval);
    }

    this.workerInterval = setInterval(() => {
      this.work();
    }, this.workerTime);
  }

  goldLevelUp() {
    if (this.game.canLevelUp(this.priceToLevelUp)) {
      this.game.levelUp(this.priceToLevelUp);
      this.level += 1;

      // check level for enable add worker
      if (!this.enableWorker && this.level >= 20) {
        this.enableWorker = true;
        this.initAddWorker();
      }

      if (this.level >= 50) {
        this.game.displayUnlockLevel();
      }

      this.priceToLevelUp = this.priceToLevelUp + (this.level * 3);
      this.displayInfo();
    }
  }
}
