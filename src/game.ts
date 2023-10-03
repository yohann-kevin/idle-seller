export default class Game {
  money: number;
  moneyInfo: HTMLElement | null | undefined;
  goldContainer: HTMLElement | null | undefined;
  goldUnlocked: boolean;
  unlockButton: HTMLButtonElement | null | undefined;
  
  constructor(money: number, moneyInfo: HTMLElement | null, goldContainer?: HTMLElement | null, unlockButton?: HTMLButtonElement | null) {
    this.moneyInfo = moneyInfo;
    this.money = money;
    this.money = 0;
    this.goldContainer = goldContainer;
    this.goldUnlocked = false;
    this.unlockButton = unlockButton;
  }

  render() {
    if (!this.goldUnlocked && this.goldContainer) {
      this.goldContainer.style.display = 'none';
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
      if (this.goldContainer) {
        this.goldContainer.style.display = 'initial';
        this.goldUnlocked = true;
      }
    }
  }
}
