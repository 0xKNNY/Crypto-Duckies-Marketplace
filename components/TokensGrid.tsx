import { FC, useState } from 'react'
import LoadingCard from './LoadingCard'
import { useInView } from 'react-intersection-observer'
import Masonry from 'react-masonry-css'
import useTokens from '../hooks/useTokens'
import SwapCartModal from 'components/SwapCartModal'
import TokenCard from './TokenCard'
import { Token } from 'recoil/cart/atom'

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

type Props = {
  tokens: ReturnType<typeof useTokens>['tokens']
  collectionImage: string | undefined
  viewRef: ReturnType<typeof useInView>['ref']
  isLoading: boolean
}

const TokensGrid: FC<Props> = ({ tokens, viewRef, collectionImage, isLoading }) => {
  const { data, mutate } = tokens
  const [clearCartOpen, setClearCartOpen] = useState(false)
  const [cartToSwap, setCartToSwap] = useState<undefined | Token[]>()

  const didReachEnd = tokens.isFetchingInitialData || !tokens.hasNextPage

  if (!CHAIN_ID) return null

  return (
    <>
      <SwapCartModal
        open={clearCartOpen}
        setOpen={setClearCartOpen}
        cart={cartToSwap}
      />
      <Masonry
        key="tokensGridMasonry"
        breakpointCols={{
          default: 3,
          1280: 2,
          1024: 2,
          768: 1,
          640: 1,
          500: 1,
        }}
        className="masonry-grid p-2 "
        columnClassName="masonry-grid_column"
      >
        {tokens.isFetchingInitialData || isLoading
          ? Array(20)
              .fill(null)
              .map((_, index) => <LoadingCard key={`loading-card-${index}`} />)
          : data?.map((token) => {
              return (
                <TokenCard
                  token={token}
                  collectionImage={collectionImage}
                  mutate={mutate}
                  setClearCartOpen={setClearCartOpen}
                  setCartToSwap={setCartToSwap}
                  key={`${token?.token?.contract}:${token?.token?.tokenId}`}
                />
              )
            })}
        {!didReachEnd &&
          Array(10)
            .fill(null)
            .map((_, index) => {
              if (index === 0) {
                return (
                  <LoadingCard
                    viewRef={viewRef}
                    key={`loading-card-${index}`}
                  />
                )
              }
              return <LoadingCard key={`loading-card-${index}`} />
            })}
      </Masonry>
    </>
  )
}

export default TokensGrid
