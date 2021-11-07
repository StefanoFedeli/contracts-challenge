// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Factory = await hre.ethers.getContractFactory("ETHPool");
  const signers = await hre.ethers.getSigners()
  const pool = await Factory.deploy();

  await pool.deployed();

  console.log("Pool deployed to:", pool.address);

  await pool.connect(signers[1]).deposit({value: ethers.utils.parseEther("0.5")});
  var stake = await pool.stakeOf(signers[1].address);
  console.log("A has: " + stake)

  await pool.connect(signers[0]).distributeRewards({value: ethers.utils.parseEther("1")});
  console.log("T has distributed (1) reward!!");
  var reward = await pool.rewardOf(signers[1].address);
  console.log("A has all the reward: " + reward);

  await pool.connect(signers[2]).deposit({value: ethers.utils.parseEther("1.5")});
  var stake = await pool.stakeOf(signers[2].address);
  console.log("B has: " + stake);

  await pool.connect(signers[0]).distributeRewards({value: ethers.utils.parseEther("1")});
  console.log("T has distributed (1) reward!!");
  console.log("A has " + await pool.rewardOf(signers[1].address));
  console.log("B has " + await pool.rewardOf(signers[2].address));

  console.log("POOL has locked: " + await pool.totalStakes());

  await pool.connect(signers[1]).withdraw();
  console.log("A has withdrawn their stake!!")
  console.log("POOL has locked: " + await pool.totalStakes());
  console.log("A has " + await pool.stakeOf(signers[1].address));
  console.log("B has " + await pool.stakeOf(signers[2].address));

  await pool.connect(signers[2]).withdraw();
  console.log("B has withdrawn their stake!!")
  console.log("POOL has locked: " + await pool.totalStakes());
  console.log("A has " + await pool.stakeOf(signers[1].address));
  console.log("B has " + await pool.stakeOf(signers[2].address));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
