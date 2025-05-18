import { BrowserProvider, Contract, parseEther } from 'ethers'
import { CONTRACT_ADDRESS, ABI } from './web3-config'

export async function payWithMetamask(amountInEth: string) {
  if (typeof window === 'undefined' || !window.ethereum) {
    alert('MetaMask not found')
    return
  }

  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = new Contract(CONTRACT_ADDRESS, ABI, signer)

  try {
    const tx = await contract.pay({
      value: parseEther(amountInEth),
      gasLimit: 100000,
    })
    await tx.wait()
    return { success: true }
  } catch (err) {
    console.error('Payment error:', err)
    return { success: false, error: err }
  }
}
