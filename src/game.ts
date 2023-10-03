import Sylver from './sylver';
import Gold from './gold';

import { LevelConfig } from './types'

export default class Game {
  money: number;
  moneyInfo: HTMLElement | null | undefined;
  goldContainer: HTMLElement | null | undefined;
  goldUnlocked: boolean;
  unlockButton: HTMLButtonElement | null | undefined;
  sylverConfig: LevelConfig;
  goldConfig: LevelConfig;
  sylver: Sylver | null;
  gold: Gold | null;
  
  constructor(
    moneyInfo: HTMLElement | null,
    sylverConfig: LevelConfig,
    goldConfig: LevelConfig,
    unlockButton?: HTMLButtonElement | null,
  ) {
    this.moneyInfo = moneyInfo;
    this.money = 0;
    this.goldUnlocked = false;
    this.unlockButton = unlockButton;
    this.sylverConfig = sylverConfig;
    this.goldConfig = goldConfig;
    this.sylver = null;
    this.gold = null;
  }

  start() {
    this.sylver = new Sylver(this, this.sylverConfig);
    this.sylver.initSylver();

    // start game
    this.render();
  }

  render() {
    if (!this.goldUnlocked && this.goldConfig.container) {
      this.goldConfig.container.style.display = 'none';
    }

    // implement here
    this.displayMoney();
  }

  displayUnlockLevel() {
    if (this.unlockButton) {
      this.unlockButton.disabled = false;

      this.unlockButton.addEventListener('click', () => {
        this.manageUnlockGold();
      });
    }
  }

  displayMoney() {
    if (this.moneyInfo) {
      this.moneyInfo.innerHTML = `MONEY : ${this.money}$`;
    }
  }

  selling(value: number) {
    this.money += value;
    this.render();
  }

  canLevelUp(priceToLevelUp: number): boolean {
    if (this.money >= priceToLevelUp) {
      return true;
    }

    return false;
  }

  levelUp(priceToLevelUp: number) {
    this.money = this.money - priceToLevelUp;
    this.render();
  }

  canBuyWorker(priceToAddWorker: number): boolean {
    if (this.money >= priceToAddWorker) {
      return true;
    }

    return false;
  }

  buyWorker(priceToAddWorker: number) {
    this.money = this.money - priceToAddWorker;
    this.render();
  }

  canUnlockGold(priceToUnlockLevel: number): boolean {
    if (this.money >= priceToUnlockLevel) {
      return true;
    }

    return false;
  }

  manageUnlockGold() {
    if (this.canUnlockGold(1000)) {
      if (this.goldConfig.container) {
        this.goldConfig.container.style.display = 'initial';
        this.goldUnlocked = true;
        this.money = this.money - 1000;
        this.gold = new Gold(this, this.goldConfig);
        this.gold.initGold();
      }
    }
  }

  convertToSylver(value: number, multiplicator: number) {
    const valueToAdd: number = value * multiplicator;
    this.sylver?.convert(valueToAdd);
  }
}
