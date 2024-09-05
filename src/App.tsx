
import { useState } from 'react';
import TargetIcon from './assets/icons/target.svg';
import RecordIcon from './assets/icons/record.svg';
import HomeIcon from './assets/icons/home.svg';
import PlayIcon from './assets/icons/play.svg';
import ThreeDotsIcon from './assets/icons/three-dots.svg';
import SortIcon from './assets/icons/sort.svg';

import Selector from './components/Selector';
// import ElementSelector from './components/ElementSelector';

import { Button, ChakraProvider } from '@chakra-ui/react';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  const [isOpenSelector, setIsOpenSelector] = useState(false)

  const openSelector = () => {
    setIsOpenSelector(true);
    window.close();
  }

  // const closeSelector = () => {
  //   setIsOpenSelector(false)
  // }

  const handleTarget = async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, url: '*://*/*' });
        console.log('tab', tab)

        // chrome.scripting.executeScript({
        //   target: { tabId: tab.id! },
        //   func: () => {
        //     alert('Hello')
        //   }
        // })

        window.open(
          'selectorElement.html', // URL of the new popup
          'newWindow', // Name of the new window
          'width=400,height=400' // Size and properties of the new window
        );

        // if (!tab) {
        //   toast.error(t('home.elementSelector.noAccess'));
        //   return;
        // }
    
        // await initElementSelector();
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <>
      <ChakraProvider>
        <div className='flex flex-col m-auto w-[350px] h-[700px] bg-[#f3f4f6] overflow-auto shadow-md'>
          <div className='flex flex-col bg-gray-900 px-4 py-6 gap-3 pb-[60px] rounded-b-2xl'>
            <div className='flex flex-row justify-between rounded-b-sm '>
              <p className='text-white min-w-[150px] text-xl'>MKT LOGIN</p>
              <div className='flex gap-3 justify-start'>
                <div className='p-2 bg-gray-800 rounded-md'>
                  <img src={RecordIcon} alt='' width={20} />
                </div>
                <div className='p-2 bg-gray-800 rounded-md' onClick={handleTarget}>
                  <img src={TargetIcon} alt='' width={20} />
                </div>
                <div className='p-2 bg-gray-800 rounded-md'>
                  <img src={HomeIcon} alt='' width={20} />
                </div>
              </div>
            </div>
            <div className='w-full relative'>
              <img src={RecordIcon} alt='' width={20} className='absolute top-2 left-1 ' />
              <input placeholder='Search' className='w-full bg-gray-600 rounded-[6px] text-white pl-8 h-[37px]'/>
            </div>
          </div>
          <div className='w-full h-[500px] bg-gray-100 p-3'>
            <div className='bg-white p-3 mt-[-50px] rounded-md'>
              <div className='flex justify-between'>
                <select className='w-full bg-[#4b5563] text-white rounded-sm h-[30px]'>
                  <option>All</option>
                  <option>A1</option>
                </select>
                <div className='flex justify-center text-white items-center gap-2 w-[90px] ml-3 border-sm bg-[#4b5563]'>
                  <img src={SortIcon} alt='' width={20}/>
                  Sort
                </div>
              </div>
            </div>
            <div className='flex justify-between bg-white p-3 rounded-md mt-2'>
              <div className='flex flex-col max-w-[240px]'>
                <span className='truncate'>Twitter trendsTwitter trendsTwitter trendsTwitter trendsTwitter trends</span>
                <span>5 hours ago</span>
              </div>
              <div className='flex gap-2'>
                <img src={PlayIcon} alt='' width={20} className='cursor-pointer' />
                <img src={ThreeDotsIcon} alt='' width={20}  className='cursor-pointer' />
              </div>
            </div>
          </div>
          <Button colorScheme='teal' variant="outline" onClick={openSelector}>dsahds</Button>
          {isOpenSelector && <Selector />}
          
        {/* <ElementSelector isOpen={isOpenSelector} onClose={closeSelector}/> */}
        </div>
      </ChakraProvider>
      
    </>
  )
}

export default App
