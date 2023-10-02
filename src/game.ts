export default class Game {
  money: number;
  moneyInfo: HTMLElement | null | undefined;
  
  constructor(money: number, moneyInfo?: HTMLElement | null) {
    this.moneyInfo = moneyInfo;
    this.money = money;
  }

  displayMoney() {
    if (this.moneyInfo) {
      this.moneyInfo.innerHTML = `MONEY : ${this.money}$`;
    }
  }

  selling(value: number) {
    this.money += value;
    this.displayMoney();
  }

  canLevelUp(priceToLevelUp: number): boolean {
    if (this.money >= priceToLevelUp) {
      return true;
    }

    return false;
  }

  levelUp(priceToLevelUp: number) {
    this.money = this.money - priceToLevelUp;
    this.displayMoney();
  }

  canBuyWorker(priceToAddWorker: number): boolean {
    if (this.money >= priceToAddWorker) {
      return true;
    }

    return false;
  }

  buyWorker(priceToAddWorker: number) {
    this.money = this.money - priceToAddWorker;
    this.displayMoney();
  }
}
