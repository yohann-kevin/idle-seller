export default class Game {
  money: number;
  moneyInfo: HTMLElement | null | undefined;
  goldContainer: HTMLElement | null | undefined;
  goldUnlocked: boolean;
  unlockButton: HTMLElement | null;
  
  constructor(money: number, moneyInfo: HTMLElement | null, goldContainer?: HTMLElement | null, unlockButton?: HTMLElement | null) {
    this.moneyInfo = moneyInfo;
    this.money = money;
    this.goldContainer = goldContainer;
    this.goldUnlocked = false;
    this.unlockButton = unlockButton || null;
  }

  render() {
    if (!this.goldUnlocked && this.goldContainer) {
      this.goldContainer.style.display = 'none';
    }
    // implement here
    this.displayMoney();
  }

  manageButtonUnlockLevel() {
    // plop
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
}
