import React from 'react'
import ElectionFraudTrendChart from './charts/Trendchart'
import NetworkGraph from './charts/NetworkGraph'
import VoterSuppressionHierarchy from './charts/VoterSuppressionHierachy'


export default function AnalysisComponent() {
  return (
    <section className='bg-black text-white relative px-10 py-20 text-center'>
       <h1 className="text-4xl font-bold py-8 mb-10">Analysis</h1>
       <div className=' flex flex-col flex-grow md:flex-row gap-x-4'>
    
      <VoterSuppressionHierarchy/>
     
      
         <NetworkGraph/>
   
        <ElectionFraudTrendChart/>
    
       
        
       </div>
      
    </section>
  )
}
