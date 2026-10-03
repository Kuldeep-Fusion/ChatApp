import { GooeyToaster, gooeyToast } from 'goey-toast'

const Developer = () => {
  return (
    <div className='h-screen bg-amber-300'>
     <GooeyToaster position="bottom-right" />
      <button className='text-white' onClick={() => gooeyToast.success('Saved!')}>
        Save
      </button>
    </div>
  )
}

export default Developer