import { BigInt } from "@graphprotocol/graph-ts"
import { ETHPool } from "../generated/ETHPool/ETHPool"
import { Deposit } from "../generated/schema"

export function updateDeposit(call: depositCall): void {
    let id = call.transaction.hash.toHex()
    let transaction = new Deposit(id)
    transaction.owner = call.transaction.sender
    transaction.deposit = call._inputs.value
    transaction.save()
  }