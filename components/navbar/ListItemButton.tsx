import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import Link from 'next/link';

const ListItemButton = () => {
  const account = useAccount()
  const { openConnectModal } = useConnectModal();

  if (account.address) {
    return (
      <Link href={`/address/${account.address}`}>
        <a className="mt-1 whitespace-nowrap 5252]">
          [ list ]
        </a>
      </Link>
    )
  }

  return (
    <button onClick={openConnectModal} type="button" className=' px-4 whitespace-nowrap grey dark:border-[#525252] dark:ring-[#525252] dark:focus:ring-4'>
      [ list ]
    </button>
  )
}

export default ListItemButton
