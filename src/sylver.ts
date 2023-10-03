import Game from './game'

import { LevelConfig } from './types'

export default class Silver {
  game: Game;
  level: number;
  value: number;
  priceToLevelUp: number;
  workSylver: HTMLElement | null;
  lvlUpSylver: HTMLElement | null;
  sylverInfo: HTMLElement | null;
  sellButton: HTMLElement | null | undefined;
  addWorkerSylver: HTMLButtonElement;
  priceForWorker: number;
  enableWorker: boolean;
  numWorker: number;
  workerTime: number;
  workerInterval: NodeJS.Timeout | number | null = null;

  constructor(
    game: Game,
    sylverConfig: LevelConfig,
  ) {
    this.game = game;
    this.workSylver = sylverConfig.worker;
    this.lvlUpSylver = sylverConfig.lvlUpButton;
    this.sylverInfo = sylverConfig.infoContainer;
    this.sellButton = sylverConfig.sellButton;
    this.addWorkerSylver = sylverConfig.addWorker;
    this.level = 1;
    this.value = 0;
    this.priceToLevelUp = 10;
    this.priceForWorker = 100;
    this.enableWorker = false;
    this.numWorker = 0;
    this.workerTime = 5000;
    this.workerInterval = null;
  }

  initSylver(): void {
    this.workSylver?.addEventListener('click', () => {
      this.work();
    });

    this.lvlUpSylver?.addEventListener('click', () => {
      this.sylverLevelUp();
    });

    this.sellButton?.addEventListener('click', () => {
      this.game.selling(this.value);
      this.value = 0;
      this.displayInfo();
    });

    this.initAddWorker();

    this.displayInfo();
  }

  initAddWorker() {
    if (this.addWorkerSylver) {
      this.addWorkerSylver.disabled = !this.enableWorker;
      if (this.enableWorker) {
        this.addWorkerSylver?.addEventListener('click', () => {
          this.addWorker();
        });
      }
    }
  }

  work() {
    this.value += this.level;
    this.displayInfo();
  }

  sylverLevelUp() {
    if (this.game.canLevelUp(this.priceToLevelUp)) {
      this.game.levelUp(this.priceToLevelUp);
      this.level += 1;

      // check level for enable add worker
      if (!this.enableWorker && this.level >= 10) {
        this.enableWorker = true;
        this.initAddWorker();
      }

      if (this.level >= 20) {
        this.game.displayUnlockLevel();
      }

      this.priceToLevelUp = this.priceToLevelUp + (this.level * 2);
      this.displayInfo();
    }
  }

  displayInfo() {
    if (this.sylverInfo) {
      this.sylverInfo.innerHTML = `SILVER (lvl ${this.level}) : ${this.value}`;
    }

    if (this.lvlUpSylver) {
      this.lvlUpSylver.innerHTML = `LVL UP ${this.priceToLevelUp}$`;
    }

    if (this.addWorkerSylver) {
      this.addWorkerSylver.innerHTML = `ADD WORKER (${this.numWorker}) : ${this.priceForWorker}$`;
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
      this.priceForWorker = this.priceForWorker * 2;
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

  convert(valueToAdd: number) {
    this.value = this.value + valueToAdd;
  }
}
