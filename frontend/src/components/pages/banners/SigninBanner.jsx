import React from 'react'

function SigninBanner() {
  return (
    <>
    <div className="flex justify-center items-center flex-col gap-4 mt-4">
        <div>
        <img className='sm:mx-auto sm:w-full sm:max-w-sm' src="https://assetscdn1.paytm.com/images/catalog/view/308774/1617696247991.png" alt="Paytm Header Logo" />
        </div>
        <div>
            <img className='sm:mx-auto sm:w-full sm:max-w-sm' src="https://assetscdn1.paytm.com/images/catalog/view/1752737003196.png" alt="Paytm Banner" />
        </div>
      </div>
    </>
  )
}

export default SigninBanner