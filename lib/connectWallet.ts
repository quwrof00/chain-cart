export async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask not detected')
    return null
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return accounts[0]
  } catch (err) {
    console.error(err)
    return null
  }
}
