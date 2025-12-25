import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { PlatypusLoader } from './cmps/PlatypusLoader.jsx'

const StayIndex = lazy(() => import('./pages/StayIndex.jsx').then(module => ({ default: module.StayIndex })))
const StayDetails = lazy(() => import('./pages/StayDetails.jsx').then(module => ({ default: module.StayDetails })))
const StayCheckout = lazy(() => import('./pages/StayCheckout.jsx').then(module => ({ default: module.StayCheckout })))
const UserProfile = lazy(() => import('./pages/UserProfile').then(module => ({ default: module.UserProfile })))
const SearchResults = lazy(() => import('./pages/SearchResults.jsx').then(module => ({ default: module.SearchResults })))
const Login = lazy(() => import('./pages/Login.jsx').then(module => ({ default: module.Login })))
const OrderList = lazy(() => import('./cmps/OrderList.jsx').then(module => ({ default: module.OrderList })))
const ListingList = lazy(() => import('./cmps/ListingList.jsx').then(module => ({ default: module.ListingList })))
const ListingForm = lazy(() => import('./pages/ListingForm.jsx').then(module => ({ default: module.ListingForm })))

export function RootCmp() {
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />

            <main>
                <Suspense fallback={<PlatypusLoader />}>
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
                </Suspense>
            </main>
            <AppFooter />
        </div>
    )
}
