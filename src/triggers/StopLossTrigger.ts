import { Trade } from 'ccxt'

import { ICandle } from 'src/interfaces'
import BaseTrigger from './BaseTrigger'


export default class StopLossTrigger extends BaseTrigger {
  onTrade (trade: Trade) {
    if (!this.isLive) return
    const { price } = trade

    // if price reaches or goes below the stop loss price, then
    // we close the position
    if (price <= this.triggerDB.targetPrice) {
      this.advice('close-position', this.triggerDB.targetPrice, this.triggerDB.targetVolume)
      this.close()
    }
  }


  onCandle (_candle: ICandle) {
    // do nothing
  }
}
