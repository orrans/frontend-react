import React from 'react'
// import { Routes, Route } from 'react-router'
import { Routes, Route } from 'react-router-dom'


import { StayIndex } from './pages/StayIndex.jsx'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { StayCheckout } from './pages/StayCheckout.jsx'
import { StayExploreList } from './cmps/StayExploreList.jsx'
import { UserProfile } from './pages/UserProfile'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />

            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="/stay/:stayId/checkout" element={<StayCheckout />} />
                    <Route path="/stay/:stayId" element={<StayDetails />} />
                    <Route path="/stay" element={<StayExploreList stays={[]} />} />
                    <Route path="/user/profile" element={<UserProfile />} />
                </Routes>

            </main>
            <AppFooter />
        </div>
    )
}