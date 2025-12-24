import { Routes, Route } from 'react-router-dom'
import { StayIndex } from './pages/StayIndex.jsx'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { StayCheckout } from './pages/StayCheckout.jsx'
import { UserProfile } from './pages/UserProfile'
import { SearchResults } from './pages/SearchResults.jsx'
import { Login } from './pages/Login.jsx'
import { OrderList } from './cmps/OrderList.jsx'
import { ListingList } from './cmps/ListingList.jsx'
import { ListingForm } from './pages/ListingForm.jsx'

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
                    <Route path="/stay" element={<SearchResults />} />
                    <Route path="/user/profile" element={<UserProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/orders" element={<OrderList />} />
                    <Route path="/listings" element={<ListingList />} />
                    <Route path="/listings/create" element={<ListingForm />} />
                    <Route path="/listings/:stayId" element={<ListingForm />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}
