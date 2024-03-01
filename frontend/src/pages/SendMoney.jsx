export const SendMoney = () => {
  return (
    <div class='flex justify-center h-screen bg-gray-100'>
      <div className='h-full flex flex-col justify-center'>
        <div class='border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg'>
          <div class='flex flex-col space-y-1.5 p-6'>
            <h2 class='text-3xl font-bold text-center'>Send Money</h2>
          </div>
          <div class='p-6'>
            <div class='flex items-center space-x-4'>
              <div class='w-12 h-12 rounded-full bg-green-500 flex items-center justify-center'>
                <span class='text-2xl text-white'>A</span>
              </div>
              <h3 class='text-2xl font-semibold'>Friend's Name</h3>
            </div>
            <div class='space-y-4'>
              <div class='space-y-2'>
                <label
                  class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  for='amount'
                >
                  Amount (in Rs)
                </label>
                <input
                  type='number'
                  class='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  id='amount'
                  placeholder='Enter amount'
                />
              </div>
              <button class='justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white'>
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
