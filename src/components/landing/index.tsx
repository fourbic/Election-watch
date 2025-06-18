import React from 'react'
import Header from './header'
import Hero from './hero'
import StatsSection from './counter'
import Footer from './footer'
import AnalysisComponent from './analysis'

export default function LandingPageComponent() {
  return (
    <div>
        <Header/>
        <Hero/>
        <StatsSection/>
        <AnalysisComponent/>
        <Footer/>
      
    </div>
  )
}
