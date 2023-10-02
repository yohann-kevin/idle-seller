import Game from './game.js'

export default class Silver extends Game {
  level: number;
  value: number;
  priceToLevelUp: number;
  workSylver: HTMLElement | null;
  lvlUpSylver: HTMLElement | null;
  sylverInfo: HTMLElement | null;
  sellButton: HTMLElement | null;
  addWorkerSylver: HTMLButtonElement;
  priceForWorker: number;
  enableWorker: boolean;
  numWorker: number;
  workerTime: number;
  workerInterval: NodeJS.Timeout | number | null = null;

  constructor(
      workSylver: HTMLElement | null,
      lvlUpSylver: HTMLElement | null,
      sylverInfo: HTMLElement | null,
      sellButton: HTMLElement | null,
      money: number,
      moneyInfo: HTMLElement | null,
      addWorkerSylver: HTMLButtonElement
    ) {
    super(money, moneyInfo);
    this.workSylver = workSylver;
    this.lvlUpSylver = lvlUpSylver;
    this.sylverInfo = sylverInfo;
    this.sellButton = sellButton;
    this.level = 1;
    this.value = 0;
    this.priceToLevelUp = 10;
    this.addWorkerSylver = addWorkerSylver;
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
      this.selling(this.value);
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
    console.log('work');
    this.value += this.level;
    this.displayInfo();
  }

  sylverLevelUp() {
    if (this.canLevelUp(this.priceToLevelUp)) {
      this.levelUp(this.priceToLevelUp);
      this.level += 1;
      // check level for enable add worker
      if (!this.enableWorker && this.level >= 10) {
        this.enableWorker = true;
        this.initAddWorker();
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
    if (this.canBuyWorker(this.priceForWorker)) {
      this.buyWorker(this.priceForWorker);
      this.numWorker = this.numWorker += 1;
      if (this.numWorker > 1) {
        const stringDecimal: string = `${1}.${this.numWorker}`;
        const divider: number = +stringDecimal;
        this.workerTime = this.workerTime / divider;
        console.log('this.workerTime', this.workerTime);
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
}
