import { expect } from 'chai'
import { ethers } from 'hardhat'
import '@nomiclabs/hardhat-ethers'

import { ETHPool__factory, ETHPool } from '../build/types'

const { getContractFactory, getSigners } = ethers

describe('Pool', () => {
  let pool: ETHPool

  beforeEach(async () => {
    // 1
    const signers = await getSigners()

    // 2
    const poolFactory = (await getContractFactory('ETHPool', signers[0])) as ETHPool__factory
    pool = await poolFactory.deploy()
    await pool.deployed()
  })

  // 4
  describe('send and retrieve', async () => {
    it('equal balance', async () => {
      await pool.deposit();
    })
  })
})
